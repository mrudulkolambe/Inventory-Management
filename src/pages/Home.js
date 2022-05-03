import React from 'react'
import HomeCard from '../components/HomeCard'

const Home = ({ nav }) => {
	nav(true)
	document.title = "SIGCE Inventory | Home"
	const cardArr = [
		{
			main: "Add",
			desc: "Add Equipment To Inventory",
			icon: "Add",
			link: "/add/equipment"
		},
		{
			main: "Update",
			desc: "Update Equipment In Inventory",
			icon: "Update",
			link: "/update/equipment"
		},
		{
			main: "Search",
			desc: "Search Equipment In Inventory",
			icon: "search",
			link: "/search"
		}
	]
	return (
		<>
			<h1 className='text-white text-6xl px-7 mt-7 text-center'>SIGCE Inventory</h1>
			<div className='flex justify-evenly items-center mt-36 px-14'>
				{
					cardArr.map((card) => {
						return <HomeCard key={card.link} main={card.main} desc={card.desc} icon={card.icon} link={card.link} />
					})
				}
			</div>
		</>
	)
}

export default Home