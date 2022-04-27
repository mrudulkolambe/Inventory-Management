import React from 'react'
import HomeCard from '../components/HomeCard'

const Search = () => {
	document.title = "SIGCE Inventory | Search"
	const cardArr = [
		{
			main: "Search",
			desc: "Search By Department",
			icon: "department",
			link: "/search/department"
		},
		{
			main: "Search",
			desc: "Search By Tag Number",
			icon: "hashTag",
			link: "/search/equipment"
		},
		{
			main: "Search",
			desc: "Search By Lab Name",
			icon: "lab",
			link: "/search/lab"
		}
	]
	return (
		<>
			<h1 className='text-white text-6xl px-7 mt-7 text-center'>SIGCE Inventory</h1>
			<div className='flex justify-evenly items-center mt-36 px-14'>
				{
					cardArr.map((card) => {
						return <HomeCard mark={true} key={card.link} main={card.main} desc={card.desc} icon={card.icon} link={card.link} />
					})
				}
			</div>
		</>
	)
}

export default Search