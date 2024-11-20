import { useState, useEffect } from "react"
import { Remarkable } from "remarkable"
import "./index.scss";

function MDPage(props: any) {
  const {
    title,
    source
  } = props
  const [ isLoading, setIsLoading ] = useState(true)
  const [ pageBody, setPageBody ] = useState(``)
  
  
  useEffect(() => {
    setIsLoading(true)
    try {
      fetch(`./pages/${source}`)
        .then(async (res) => {
          const _pageBody = await res.text()
          setPageBody(_pageBody)
          setIsLoading(false)
        })
        .catch((err) => {
          setIsLoading(false)
        })
    } catch (err) {
      setIsLoading(false)
    }
  }, [ source ])

  if (isLoading) {
    return (
      <div className="app-page about">
        <h1>Loading...</h1>
      </div>
    );
  }

  const md = new Remarkable()
  return (
    <div className="app-page mdpage">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: md.render(pageBody)}}></div>
    </div>
  );
}

export default MDPage;
