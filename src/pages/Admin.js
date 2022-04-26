import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/UseMembersContext'
import { useUserAuth } from '../context/UserAuthContext'
import { CheckIcon } from '@heroicons/react/outline'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase_config'

const Admin = () => {
  document.title = "SIGCE Inventory | Admin"
  const { user } = useUserAuth()
  const { admin, allDepts, departmentArray } = useUserContext()
  const navigate = useNavigate()
  const [checked, setChecked] = useState(true);
  const [department, setDepartment] = useState("")
  const [labData, setLabData] = useState("")
  const [lab, setLab] = useState("")
  useEffect(() => {
    if (user.uid !== undefined && admin.uid !== undefined) {
      if (user.uid === admin.uid) {
        return
      }
      else {
        navigate("/login")
      }
    }
  }, [admin, user]);
  const handleCheckBox = (index) => {
    checked ? setChecked(false) : setChecked(true)
    setDepartment("")
  }
  const addDept = async () => {
    const docRef = doc(db, "DEPARTMENTS", "DEPARTMENTS");
    await updateDoc(docRef, {
      DEPARTMENTS: arrayUnion(department)
    })
    .then(() => {
      setDepartment("")
    })
  }
  const addLab = async () => {
    const docRef = doc(db, "LABS", "LABS");
    setLabData(`${department} ${lab}`)
    console.log(labData)
    await updateDoc(docRef, {
      LABS: arrayUnion(labData)
    }).then(() => {
      setLab("")
      setLabData("")
    })
  }
  return (
    <>
      <div className='hidden'>
        <button className='w-32 mx-3 py-3 hover:bg-red-700 duration-200 rounded-lg text-lg text-white bg-red-600'>Delete Dept</button>
        <button className='w-32 mx-3 py-3 hover:bg-red-700 duration-200 rounded-lg text-lg text-white bg-red-600'>Delete Lab</button>

        <button className='w-32 mx-3 py-3 hover:bg-green-700 duration-200 rounded-lg text-lg text-white bg-green-600'>Add Dept</button>
        <button className='w-32 mx-3 py-3 hover:bg-green-700 duration-200 rounded-lg text-lg text-white bg-green-600'>Add Lab</button>
      </div>

      <div className=''>
        <div className='my-4 text-white flex items-center cursor-pointer' onClick={() => { handleCheckBox(0) }}>
          <div className={checked ? 'h-6 w-6 bg-indigo-500 text-white border-2 border-indigo-600 rounded-md cursor-pointer duration-300' : "duration-300 cursor-pointer h-6 w-6 rounded-md bg-gray-400 border-2 border-white"} >
            <CheckIcon className={checked ? 'text-white' : "hidden"} />
          </div>
          <p className='ml-3'>Add Department</p>
        </div>

        <div className='w-full flex justify-center items-center'>
          {
            checked ? <div className='w-full flex justify-center items-center'>
              <input
                className="border-none w-2/12 h-14 px-8 py-4 rounded-l-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                value={department}
                onChange={(e) => { setDepartment(e.target.value.toUpperCase()) }}
                placeholder="Add Department"
              />
              <button className='text-white bg-indigo-500 px-12 rounded-r-lg py-4' onClick={addDept}>Add</button>
            </div> : <div className='w-full flex justify-center items-center'>
              <select className="w-2/12 px-8 py-4 h-14 rounded-l-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" value={department} onChange={(e) => { setDepartment(e.target.value) }}>
                {
                  departmentArray && departmentArray.map((department) => {
                    return <option value={department} key={department}>{department.length === 0 ? "---Choose Option---" : `${department}`}</option>
                  })
                }
              </select>
              <input
                className="border-none w-2/12 h-14 px-8 py-4 font-medium bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                value={lab}
                onChange={(e) => { setLab(e.target.value) }}
                placeholder="Add Lab"
              />
              <button className='text-white bg-indigo-500 px-12 rounded-r-lg py-4' onClick={addLab}>Add</button>
              {/* <select className={!lab ? "hidden" : "w-2/12 px-8 py-3 font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"} disabled={department.length === 0}> */}
              {/* {
                department.length === 0 ?
                  <option key="" value="">{"---Choose Department---"}</option> :
                  labs.map((lab) => {
                    return <option value={lab} key={lab}>{lab.length === 0 ? "---Choose Option---" : `${lab}`}</option>
                  })
              } */}
              {/* </select> */}
            </div>
          }
        </div>
      </div>
        {/* <p className='text-white text-center mt-4 cursor-pointer title' data-title='Hover'>hey</p> */}
    </>
  )
}
// className={searchBtnText === "Searching..." ? "inline w-4 h-4 mr-3 text-white animate-spin" : "hidden"}
export default Admin