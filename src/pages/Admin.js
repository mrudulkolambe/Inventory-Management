import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeCard from '../components/HomeCard'
import { useUserContext } from '../context/UseMembersContext'
import { useUserAuth } from '../context/UserAuthContext'

const Admin = ({nav}) => {
  nav(true)
  document.title = "SIGCE Inventory | Admin"
  const navigate = useNavigate()
  const { user } = useUserAuth()
  const { admin } = useUserContext()
  useEffect(() => {
    if (user && admin.length !== 0) {
      if (admin.includes(user.uid)) {
        return;
      }
      else {
        navigate("/")
      }
    }
  }, [user, admin]);
  const cardArray = [
    {
      main: "Authorize",
      desc: "Authorize User",
      icon: "user",
      link: "/authorize-user"
    },
    {
      main: "Members",
      desc: "Members Signed In",
      icon: "members",
      link: "/members"
    },
    {
      main: "Department",
      desc: "Manage Department",
      icon: "department",
      link: "/manage/department"
    },
    {
      main: "Lab",
      desc: "Manage Lab",
      icon: "lab",
      link: "/manage/lab"
    },
    {
      main: "Equipment",
      desc: "Manage Equipment",
      icon: "chip",
      link: "/manage/equipment"
    }
  ]

  return (
    <>
      <div className='m-auto flex justify-evenly flex-wrap items-center mt-48 px-14 gap-y-10 gap-x-10'>
        {
          cardArray.map((card) => {
            return <HomeCard key={card.link} main={card.main} desc={card.desc} icon={card.icon} link={card.link} />
          })
        }
      </div>
    </>
  )
}
export default Admin