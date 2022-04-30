import './App.css';
import Navbar from "./components/Navbar"
import "./App.css";
import { Routes, Route } from 'react-router-dom'
import CreateUser from './pages/CreateUser';
import { UserAuthContextProvider } from './context/UserAuthContext';
import Members from './pages/Members';
import { UserMemberContextProvider } from './context/UseMembersContext';
import Login from './pages/Login';
import Home from './pages/Home';
import AddEquipment from './pages/AddEquipment';
import UpdateEquipment from './pages/UpdateEquipment';
import Search from './pages/Search';
import Department from './pages/Department';
import Scrap from './pages/Scrap';
import { useState } from 'react';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import ManageUser from './pages/ManageUser';
import ManageDepartment from './pages/ManageDepartment';
import ManageLabs from './pages/ManageLabs';
import ManageEquipment from './pages/ManageEquipment';

function App() {
  const [hideNavbar, setHideNavbar] = useState(false);
  const buttons = document.querySelectorAll('button');
  window.addEventListener('beforeprint', () => {
    buttons.forEach((button) => {
      button.classList.add("hidden")
    })
    setHideNavbar(true)
  })
  window.addEventListener("error", () => {
    // console.clear()
  })
  window.addEventListener("afterprint", () => {
    buttons.forEach((button) => {
      button.classList.remove("hidden")
    })
    setHideNavbar(false)
  })
  return (
    <UserAuthContextProvider>
      <UserMemberContextProvider>
        <div className="App">
         { hideNavbar ? null :  <Navbar /> }
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<Login user={"User"}/>} />
            <Route path="/create" exact element={<CreateUser />} />
            <Route path="/members" exact element={<Members />} />
            <Route path="/add/equipment" exact element={<AddEquipment />} />
            <Route path="/update/equipment" exact element={<UpdateEquipment title={"SIGCE Inventory | Update Equipment"}/>} />
            <Route path="/search" exact element={<Search/>} />
            <Route path="/search/equipment" exact element={<UpdateEquipment title={"SIGCE Inventory | Search Equipment"} />} />
            <Route path="/search/department" exact element={<Department lab={false}/>} />
            <Route path="/search/lab" exact element={<Department lab={true}/>} />
            <Route path="/equipment/:equipmentID" exact element={<UpdateEquipment title={"SIGCE Inventory | Equipment"} searchHide={true}/>} />
            <Route path="/scrap" exact element={<Scrap/>} />
            <Route path="/admin" exact element={<Admin/>} />
            <Route path="/manage/user/:uid" exact element={<ManageUser/>} />
            <Route path="/manage/department/" exact element={<ManageDepartment/>} />
            <Route path="/manage/lab/" exact element={<ManageLabs/>} />
            <Route path="/manage/equipment/" exact element={<ManageEquipment/>} />
            {/* <Route path="/profile" exact element={<Profile/>} /> */}
          </Routes>
        </div>
      </UserMemberContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
