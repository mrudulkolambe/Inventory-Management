import React from 'react'
import { PlusIcon, PencilAltIcon, SearchIcon, HashtagIcon, BeakerIcon, LibraryIcon, UserGroupIcon, UserIcon, ChipIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

const HomeCard = ({ main, desc, icon, link, mark }) => {
	return (
		<Link to={link} className="overflow-hidden relative hover:shadow-2xl hover:-translate-y-1 duration-200 text-white max-w-sm w-60 h-60 bg-gray-500 bg-opacity-40 rounded-lg shadow-md  cursor-pointer flex justify-center items-center">
			<div className="flex flex-col items-center">
				{ icon === "Add" ? <PlusIcon className='stroke-1  w-20 h-20 mb-5 ' /> : icon === "Update" ? <PencilAltIcon className='stroke-1  w-20 h-20 mb-5' /> : icon === "hashTag" ? <HashtagIcon className='stroke-1  w-20 h-20 mb-5 ' /> : icon === "lab" ? <BeakerIcon className='mb-5 h-20 w-20 stroke-1'/> : icon === "department" ? <LibraryIcon className='stroke-1 h-20 w-20 mb-5'/> : icon === "members" ? <UserGroupIcon className='stroke-1 h-20 w-20 mb-5'/> : icon === "user" ? <UserIcon className='stroke-1 h-20 w-20 mb-5'/> : icon === "chip" ? <ChipIcon className='stroke-1 h-20 w-20 mb-5'/> : <SearchIcon className='stroke-1  w-20 h-20 mb-5 ' />}
				<h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">{main}</h5>
				<span className="text-md text-gray-500 dark:text-gray-400">{desc}</span>
			</div>
		</Link>
	)
}

export default HomeCard