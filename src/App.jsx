import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Authentication from './pages/Authentication/Authentication'
// import Data from './pages/data'
import NavBarContext from "./context/NavBarContext"
import Sidenavbar from './components/Navigation/Sidenavbar'
import Prescription from "./pages/Prescription"
import Investors from './components/Investors'
import Contact from "./pages/Users"
import Employee  from "./pages/Employee"

function App() {
  return (
    <>
          <NavBarContext>
        <div className='flex w-full h-[100vh] jusity-center align-center border-box'>
          <Sidenavbar className="flex-shrink" />
          <div className='flex-1'>
            <Routes >
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Authentication />} />
              {/* <Route path="/data" element={<Data />} /> */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/investor" element={<Investors />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/prescription" element={<Prescription />} />
            </Routes>
          </div>
        </div>
      </NavBarContext>
    </>
  )
}

export default App
