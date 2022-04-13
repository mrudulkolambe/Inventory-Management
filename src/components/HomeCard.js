import React from 'react'
import { PlusIcon, PencilAltIcon, SearchIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

const HomeCard = ({ main, desc, icon, link }) => {
	return (
		<Link to={link} class="hover:shadow-2xl hover:-translate-y-1 duration-200 text-white max-w-sm w-60 h-60 bg-gray-500 bg-opacity-40 rounded-lg shadow-md  cursor-pointer">
			<div class="flex justify-end px-4 py-4">
				<div id="dropdown" class="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
					<ul class="py-1" aria-labelledby="dropdownButton">
						<li>
							<a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
						</li>
						<li>
							<a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
						</li>
						<li>
							<a href="#" class="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="flex flex-col items-center pb-10">
				{ icon === "Add" ? <PlusIcon className='stroke-1  w-20 h-20 mb-5 ' /> : icon === "Update" ? <PencilAltIcon className='stroke-1  w-20 h-20 mb-5' /> : <SearchIcon className='stroke-1  w-20 h-20 mb-5 ' />}
				<h5 class="mb-1 text-2xl font-medium text-gray-900 dark:text-white">{main}</h5>
				<span class="text-md text-gray-500 dark:text-gray-400">{desc}</span>
			</div>
		</Link>
	)
}

export default HomeCard