import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  document.title = "SIGCE Inventory | Admin"

  return (
    <>
      <div className='flex items-center justify-center'>
        <Link to="/members" className='text-white bg-green-600 hover:bg-green-700 duration-200 rounded-lg p-3'>Members</Link>
        <Link to="/" className='text-white bg-green-600 hover:bg-green-700 duration-200 rounded-lg p-3'>Members</Link>
      </div>
    </>
  )
}
export default Admin