import React from 'react'

const Navbar = ({token,onLogout}) => {
    return (
        <div>
            <nav className=' bg-gray-700 text-white'>
                <div className="mycontainer flex justify-between px-20 h-14 py-5 items-center">

                <div className="logo text-xl font-bold">
                    <span className='text-green-600'>&lt;</span>
            <span>Amaanat</span>
            {/* <span className=''>OP</span> */}
            <span className='text-green-600'>/&gt;</span>
                </div>
                
                
                    {token && (
    <button onClick={onLogout} className="bg-green-600 rounded-md px-3 py-1 cursor-pointer">
      Logout
    </button>)}
                
                </div>
            </nav>
        </div>
    )
}

export default Navbar
