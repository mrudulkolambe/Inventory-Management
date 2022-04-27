import { ChevronDownIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'

const Dropdown = ({ selected, update, member }) => {
	const [dropdown, setDropdown] = useState(false);
	const handleDropdown = () => {
		dropdown ? setDropdown(false) : setDropdown(true)
	}
	return (
		<>
			<div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className='relative m-auto rounded items-center border-gray-500 w-6/12 border-2 p-2 px-3 flex justify-between text-sm'>
				<p className='font-bold'>{selected ? "ADMIN" : "USER"}</p>
				<p><ChevronDownIcon className='text-center text-white stroke-2 cursor-pointer h-6 w-6' onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} onClick={handleDropdown} /></p>
				<div className={dropdown ? 'duration-300 absolute w-full mt-3 border-gray-800 zindex1000 top-full left-0 rounded-lg p-3 bg-gray-800 shadow-lg' : "h-0 overflow-hidden duration-300 absolute zindex1000 top-full left-0"}>
					<p onClick={() => {
						update("ADMIN", member)
						setDropdown(false)
					}} className={selected ? 'px-3 py-1 hover:bg-gray-600 duration-200 text-green-500 font-bold rounded cursor-pointer' : 'px-3 py-1 hover:bg-gray-600 duration-200 rounded cursor-pointer'}>ADMIN</p>
					<p onClick={() => {
						update("USER", member)
						setDropdown(false)
					}} className={!selected ? 'px-3 py-1 hover:bg-gray-600 duration-200 text-green-500 font-bold rounded cursor-pointer' : 'px-3 py-1 hover:bg-gray-600 duration-200 rounded cursor-pointer'}>USER</p>
					<p onClick={() => {
						update("delete", member)
						setDropdown(false)
					}} className='px-3 py-1 hover:bg-red-600 duration-200 rounded cursor-pointer'>Delete</p>
				</div>
			</div>
		</>
	)
}

export default Dropdown