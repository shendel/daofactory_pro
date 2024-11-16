import { useState, useEffect } from "react"


interface CountDownProps {
  target: Date
}

const CountDown = (props: CountDownProps) => {
  const {
    target
  } = props
  
  const countDownDate = target.getTime()
  
  const [ timeRemain, setTimeRemain ] = useState(``)
  
  useEffect(() => {
    const x = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      setTimeRemain(
        ((days > 0) ? `${days}d` : ``) +
        ((hours > 0 || days > 0) ? ` ${hours}h ` : ``) +
        minutes + "m " +
        seconds + "s"
      )
      if (distance < 0) {
        clearInterval(x);
        setTimeRemain(`EXPIRED`)
      }
    }, 1000)
    return () => {
      clearInterval(x);
    }
  }, [])
  return (
    <div>{timeRemain}</div>
  )
}


export default CountDown