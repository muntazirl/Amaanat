import React from 'react'

const Navbar = () => {
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
                
                
                    <button className='flex items-center cursor-pointer bg-green-600 rounded-md p-1 gap-3 '>
                        <img src="/public/icons/github.svg" alt="" className='invert w-7' />
                        <span className='text-green-50'>Github</span>
                    </button>
                
                </div>
            </nav>
        </div>
    )
}

export default Navbar
