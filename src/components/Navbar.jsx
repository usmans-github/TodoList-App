import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex md:justify-between justify-around bg-blue-900 text-white py-2'>
      
            <div className="logo">
                <span className='text-xl font-bold mx-8'>iTask</span>
            </div>
       
        <ul className="flex gap-4 mx-9 md:gap-8">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Tasks</li>
            
        </ul>
    </nav>
  )
}

export default Navbar
