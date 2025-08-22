import React, { createContext, useState } from 'react'

export const Store=createContext(null)

export default function NavBarContext({children}) {
  const[open , setOpen]=useState(true)
  return (
    <Store.Provider value={{open,setOpen}}>{children}</Store.Provider>
  )
}