import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import { getERC20Contract } from "src/helpers/utils/web3";
import Web3 from 'web3'

const getTokenBalance = async (tokenAddress: string, decimals: string, account: string, provider: any) => {
  const contract = getERC20Contract(tokenAddress, account, new Web3(provider.provider))

  const BIG_TEN = new BigNumber(10)

  const result = await contract?.methods.balanceOf(account).call();

  return new BigNumber(result).dividedBy(BIG_TEN.pow(decimals)).toNumber();
}

export const useTokenBalance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  const provider = useWeb3React();
  const { account = "", provider: library } = provider;

  useEffect(() => {
    const _fetchData = async () => {
      try {
        setIsLoading(true);
        if (!window.TOKEN_ADDRESS) throw new Error("Set token address");
        if (!window.TOKEN_DECIMALS) throw new Error("Set token decimals");
        if (!account || !library) throw new Error("Please, connect to wallet");
        const balance = await getTokenBalance(window.TOKEN_ADDRESS, window.TOKEN_DECIMALS, account, library);

        setBalance(balance);
      } catch (err) {
        console.error(`Error: Can't fetch token balance. Description: ${err}`);
        setBalance(0);
      } finally {
        setIsLoading(false);
      }
    };
    _fetchData();
  }, [account, library]);

  return {
    isTokenBalanceLoading: isLoading,
    balance,
  };
};
