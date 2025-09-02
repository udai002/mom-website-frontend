import React, { useEffect, useState } from 'react'
import {DNA , Oval , Watch} from 'react-loader-spinner'

const CustomeLoader = () => {

  const Quotes = [
    "If life gives you lemons, just remember, there are people out there getting oranges. Go find them!",
    "Don’t take life too seriously. You’ll never get out of it alive",
    "You don’t have to be great to start, but you have to start to be great.",
    "If you want to shine like the sun, you’ve got to burn like it too. Just don’t forget sunscreen",
    "Don’t wait for opportunity to knock. Build your own door and then text opportunity the address.",
    "The road to success is always under construction, so better pack some snacks.",
  ]

  const [quote , setQuote] = useState("You don’t have to be great to start, but you have to start to be great.")

  const generateRandomeQuotes = ()=>{
    const randomQuote = Math.floor(Math.random()*Quotes.length);
      setQuote(Quotes[randomQuote])
    
  }

  useEffect(()=>{
    const timeInterval = setInterval(()=>{
      generateRandomeQuotes()
    }, 5000)

    return ()=> clearInterval(timeInterval)
  } , [])

  
  return (
    <div className='fixed w-full h-screen flex flex-col justify-center items-center bg-black/75 top-0 z-20'>
      <Oval width={200} color='#00a99d' />
      <p className='mt-5 text-[#dbfffd] text-center text-lg w-96 font-thin2'>"{quote}"</p>
    </div>
  )
}

export default CustomeLoader
