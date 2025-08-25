import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import index from './pages/Home'
import Authentication from './pages/Authentication/Authentication'
import Table from './components/Table'
import Mangemployee from './components/ManageJobs'

function App() {

  return (
    <>
     <Routes>
      <Route path='/' Component={Mangemployee} />
     </Routes>
     {/* <Mangemployee></Mangemployee> */}
    </>
  )
}

export default App
