import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import index from './pages/Home'
import Authentication from './pages/Authentication/Authentication'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' Component={index} />
      <Route path='/auth' Component={Authentication} />
     </Routes>
    </>
  )
}

export default App
