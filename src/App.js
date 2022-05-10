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
import Shift from './pages/Shift';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import WaitingForConfirmation from './pages/WaitingForConfirmation';
import Users from './pages/Users';
import ImportXLXS from './pages/ImportXLXS';

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
  const [nav, setNav] = useState(true);
  return (
    <UserAuthContextProvider>
      <UserMemberContextProvider>
        <div className="App">
         { hideNavbar ? null :  <Navbar nav={nav}/> }
          <Routes>
            <Route path="/" exact element={<Home  nav={setNav}/>} />
            <Route path="/login" exact element={<Login user={"User"} nav={setNav}/>} />
            <Route path="/create" exact element={<CreateUser  nav={setNav}/>} />
            <Route path="/members" exact element={<Members  nav={setNav}/>} />
            <Route path="/add/equipment" exact element={<AddEquipment  nav={setNav}/>} />
            <Route path="/update/equipment" exact element={<UpdateEquipment title={"SIGCE Inventory | Update Equipment"} nav={setNav}/>} />
            <Route path="/search" exact element={<Search nav={setNav}/>} />
            <Route path="/search/equipment" exact element={<UpdateEquipment title={"SIGCE Inventory | Search Equipment"}  nav={setNav}/>} />
            <Route path="/search/department" exact element={<Department lab={false} nav={setNav}/>} />
            <Route path="/search/lab" exact element={<Department lab={true} nav={setNav}/>} />
            <Route path="/equipment/:equipmentID" exact element={<UpdateEquipment title={"SIGCE Inventory | Equipment"} searchHide={true} nav={setNav}/>} />
            <Route path="/scrap" exact element={<Scrap nav={setNav}/>} />
            <Route path="/admin" exact element={<Admin nav={setNav}/>} />
            <Route path="/manage/user/:uid" exact element={<ManageUser nav={setNav}/>} />
            <Route path="/manage/department/" exact element={<ManageDepartment nav={setNav}/>} />
            <Route path="/manage/lab/" exact element={<ManageLabs nav={setNav}/>} />
            <Route path="/manage/equipment/" exact element={<ManageEquipment nav={setNav}/>} />
            <Route path="/shift/" exact element={<Shift nav={setNav}/>} />
            <Route path="/change-password" exact element={<ForgetPassword setHideNavbar={setNav}/>} />
            <Route path="/reset-password" exact element={<ResetPassword setHideNavbar={setNav}/>} />
            <Route path="/wait-for-confirmation" exact element={<WaitingForConfirmation nav={setNav}/>} />
            <Route path="/authorize-user" exact element={<Users nav={setNav}/>} />
            <Route path="/xlxs" exact element={<ImportXLXS nav={setNav}/>} />
            {/* <Route path="/profile" exact element={<Profile/>} /> */}
          </Routes>
        </div>
      </UserMemberContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
