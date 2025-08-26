import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router'
import Authentication from './pages/Authentication/Authentication'
import NavBarContext from "./context/NavBarContext"
import Sidenavbar from './components/Navigation/Sidenavbar'
import Prescription from "./pages/Prescription"
import Investors from './components/Investors'
import Contact from "./pages/Users"
import Employee  from "./pages/Employee"
import Mangemployee from './components/ManageJobs'
import ManageJobs from "./pages/Jobs"
import { useEffect } from 'react'
import useAdmin from './context/AuthContext'
import ProtectedRoute from './components/Navigation/ProtectedRoute'

const nonNavbarPages = [
  "/auth"
]

import Edit from "./components/Users/Editemp"

import TopComponent from "./components/TopComponent"



function App() {
  const location = useLocation()
  const pathLocatoin = location.pathname
  

  
  return (
    <>
          <NavBarContext>

        <div className='flex w-full h-[100vh] jusity-center align-center border-box'>
          {!nonNavbarPages.includes(pathLocatoin) &&<Sidenavbar className="flex-shrink" />}
          <div className='flex-1'>
            <TopComponent />
            <Routes >
              <Route path="/auth" element={<Authentication />} />
              <Route element={<ProtectedRoute/>} >
              <Route path="/job" element={<ManageJobs />} />
              <Route path="/" Component={Mangemployee} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/investor" element={<Investors />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/prescription" element={<Prescription />} />
              <Route path="/edit" element={<Edit/>} />
            </Route>
            </Routes>
          </div>
        </div>
      </NavBarContext>
    </>
  )
}

export default App
