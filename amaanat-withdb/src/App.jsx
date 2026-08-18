import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))

  const logout=()=>{
    localStorage.removeItem("token")
    setToken(null)
  }
  return (
    <>
    <Navbar token={token} onLogout={logout}/>
      {token ? <Manager/> : <Login onAuth={()=>
        setToken(localStorage.getItem("token"))
      } />}
      <Footer/>
      <ToastContainer theme="dark"/>      
    </>
  )
}

export default App
