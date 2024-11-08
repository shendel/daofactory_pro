import { ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getBlockNumber, getProvider } from "src/helpers/utils/web3";
import { useClient } from "src/hooks/useClient";
import { useSpaceList } from "src/hooks/useSpaces";
import PublishProposalButton from "./PublishProposalButton";

import { ReactComponent as ICON_ArrowUp } from 'src/assets/svg/icon-arrow-up.svg'
import { ReactComponent as ICON_ArrowDown } from 'src/assets/svg/icon-arrow-down.svg'
import { ReactComponent as ICON_Delete } from 'src/assets/svg/icon-delete.svg'
import { ReactComponent as ICON_AddItem } from 'src/assets/svg/icon-add-item.svg'
import { ReactComponent as ICON_SwitchOn } from 'src/assets/svg/icon-switch-on.svg'
import { ReactComponent as ICON_SwitchOff } from 'src/assets/svg/icon-switch-off.svg'

import { translate } from 'src/utils/translate'

import "./index.scss";

type CreateProposalActionsType = {
  title: string;
  body: string;
};

const prepareWhiteList = (whitelist: string): string[] => {
  const items = whitelist.toLowerCase().split(/\r?\n| |\r|\n/g)
  const itemsTrimed = items.map((item) => { return item.trim() })
  return itemsTrimed.filter((item) => { return (item && item.length == 42) })
}

function CreateProposalActions(props: CreateProposalActionsType) {
  const navigate = useNavigate();

  const { spacesData, isLoading: isSpaceLoading } = useSpaceList([
    window.ENS_DOMAIN || "onout.eth",
  ]);

  const [selectedDuration, setSelectedDuration] = useState(0);
  const { send, clientLoading } = useClient();

  const [isWaitResponse, setIsWaitResponse] = useState(false);

  const durationOptions = [
    { value: 0, text: translate('new_props_duration', "Duration:") },
    { value: 86400, text: translate('new_props_duration_1d', "1d") },
    { value: 259200, text: translate('new_props_duration_3d', "3d") },
    { value: 432000, text: translate('new_props_duration_5d', "5d") },
    { value: 604800, text: translate('new_props_duration_1w', "1w") },
    { value: 1209600, text: translate('new_props_duration_2w', "2w") },
    { value: 2419200, text: translate('new_props_duration_1m', "1m") },
  ];

  const handleDurationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDuration(parseInt(e.target.value));
  };

  const { title } = props;

  const [ choices, setChoices ] = useState([
    translate('new_props_def_opt_for', "For"),
    translate('new_props_def_opt_against', "Against"),
    translate('new_props_def_opt_abstain', "Abstain")
  ])

  const [ whitelist, setWhitelist ] = useState("")
  const [ whitelistEnabled, setWhitelistEnabled ] = useState(false)

  
  const handleSubmit = async () => {
    const space = spacesData[0];

    const network = window.NETWORK_ID || space.network;
    setIsWaitResponse(true);

    const preparedWhitelist = (whitelistEnabled) ? prepareWhiteList(whitelist) : []
    try {
      const snapshot = await getBlockNumber(getProvider(network));

      const strategyParams = {
        symbol: window.TOKEN_SYMBOL,
        address: window.TOKEN_ADDRESS,
        decimals: parseInt(window.TOKEN_DECIMALS),
      };

      const dateNow = parseInt((Date.now() / 1e3).toFixed());

      const dateStart = space.voting?.delay
        ? dateNow + space.voting.delay
        : dateNow;

      const dateEnd = space.voting?.period
        ? dateStart + space.voting.period
        : dateStart + durationOptions[selectedDuration].value || 3600;

      const { title, body } = props;

      const strategyWithPower = {
        name: "erc20-balance-of",
        params: {
          symbol: window.TOKEN_SYMBOL,
          address: window.TOKEN_ADDRESS,
          decimals: parseInt(window.TOKEN_DECIMALS),
        },
      }
      const strategyWithoutPower = {
        name: "erc20-with-balance",
        params: {
          symbol: window.TOKEN_SYMBOL,
          address: window.TOKEN_ADDRESS,
          decimals: parseInt(window.TOKEN_DECIMALS),
          minBalance: Number(window.REQUIRED_AMOUNT_TO_VOTE),
        }
      }
      const getStrategy = () => {
        switch (window.VOTE_STRATEGY) {
          case 0:
            return strategyWithPower
          case 1:
            return strategyWithoutPower
        }
      }
      // erc20-with-balance
      const NewProposal = {
        title,
        body,
        snapshot,
        network,
        choices,
        strategies: [getStrategy()],
        type: "single-choice",
        plugins: {},
        whitelist: preparedWhitelist,
        metadata: {
          plugins: [],
        },
        timestamp: 0,
        start: dateStart,
        end: 0,
      };

      NewProposal.timestamp = dateNow;

      NewProposal.end = space.voting?.period
        ? NewProposal.start + space.voting.period
        : dateEnd;

      const result = (await send(space, "proposal", NewProposal)) as any;

      console.log("Result", result);

      setIsWaitResponse(false);
      navigate(`/proposal/${result.id}`);
    } catch (error: any) {
      console.error(`Can't submit proposal. Error: ${error?.message || error}`);
      setIsWaitResponse(false);
    }
  };

  return (
    <>
      <div className="app-widget">
        <div className="app-widget-header">
          {translate('new_props_actions_title', "Actions")}
        </div>
        <div className="p-1">
          <div className="mb-1">
            <h3>
              {translate('new_props_duration_title', "Duration")}
            </h3>
            <DropDown
              handleChange={handleDurationChange}
              selectedDuration={selectedDuration}
              options={durationOptions}
            />
          </div>
          <div className="mb-1">
            <h3>
              {translate('new_props_choices_title', "Choises (minimum two options)")}
            </h3>
            <ChoicesList 
              choices={choices}
              onChange={setChoices}
            />
          </div>
          {window.ALLOW_WHITE_LIST != 0 && (
            <div className="mb-1">
              <Switcher
                value={whitelistEnabled}
                onChange={setWhitelistEnabled}
              />
              {whitelistEnabled && (
                <div>
                  <textarea className="whitelist-textbox" onChange={(e) => { setWhitelist(e.target.value) }}>{whitelist}</textarea>
                </div>
              )}
            </div>
          )}
          <PublishProposalButton
            isTitleFilled={!!title}
            isActionFilled={selectedDuration !== 0}
            onClick={handleSubmit}
            isLoading={clientLoading || isWaitResponse || isSpaceLoading}
          />
        </div>
      </div>
    </>
  );
}

function ChoicesList(props: any) {
  const {
    choices,
    onChange
  } = props
  
  const onAddNew = () => {
    onChange([...choices,""])
  }
  const onDelOne = (indexForDel:number) => {
    const newChoises = choices.filter((val: string, index: number) => {
      return (indexForDel != index)
    })
    onChange([...newChoises])
  }
  const onChangeOne = (index:number, newValue:string) => {
    choices[index] = newValue
    onChange([...choices])
  }
  const onMoveUp = (index:number) => {
    const t: string = choices[index-1]
    choices[index-1] = choices[index]
    choices[index] = t
    onChange([...choices])
  }
  const onMoveDown = (index:number) => {
    const t: string = choices[index+1]
    choices[index+1] = choices[index]
    choices[index] = t
    onChange([...choices])
  }
  return (
    <div className="choices-list">
      {/* @ts-ignore */}
      {choices.map((choise: string, index: number) => {
        return (
          <div className="choice-item" key={index}>
            <input type="text" value={choise} onChange={(e) => { onChangeOne(index, e.target.value) }}/>
            {choices.length > 2 && (
              <button onClick={() => { onDelOne(index) }}>
                <ICON_Delete fill="currentColor" />
              </button>
            )}
            {index > 0 && (
              <button onClick={() => { onMoveUp(index) }}>
                <ICON_ArrowUp fill="currentColor" />
              </button>
            )}
            {index < (choices.length-1) && (
              <button onClick={() => { onMoveDown(index) }}>
                <ICON_ArrowDown fill="currentColor" />
              </button>
            )}
          </div>
        )
      })}
      <div className="add-holder">
        <button onClick={onAddNew}>
          <ICON_AddItem fill="currentColor" />
          <span>
            {translate('new_props_add_new_choice', "Add new choice")}
          </span>
        </button>
      </div>
    </div>
  )
}

type DropDownProps = {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedDuration: number;
  options: {
    text: string;
    value: number;
  }[];
};

function Switcher(props: any) {
  const {
    value,
    onChange
  } = props
  return (
    <div className={`switcher ${value ? '-active' : ''}`} onClick={() => { onChange(!value) }}>
      <h3>
        {translate('new_props_whitelist_enabled', "Whitelist enabled")}
      </h3>
      {value ? (
        <ICON_SwitchOn fill="currentColor" />
      ) : (
        <ICON_SwitchOff fill="currentColor" />
      )}
    </div>
  )
}
function DropDown(props: DropDownProps) {
  const { handleChange, options } = props;

  return (
    <select
      className="actionDropdown textCenter"
      name="option"
      onChange={handleChange}
    >
      {options.map((option, i) => {
        return (
          <option key={i} value={i}>
            {option.text}
          </option>
        );
      })}
    </select>
  );
}

export default CreateProposalActions;
