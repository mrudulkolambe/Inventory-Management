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
import { useState } from 'react';

function App() {
  return (
    <UserAuthContextProvider>
      <UserMemberContextProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/create" exact element={<CreateUser />} />
            <Route path="/members" exact element={<Members />} />
            <Route path="/add/equipment" exact element={<AddEquipment />} />
            <Route path="/update/equipment" exact element={<UpdateEquipment />} />
            <Route path="/search" exact element={<Search/>} />
            <Route path="/search/equipment" exact element={<UpdateEquipment />} />
            <Route path="/search/department" exact element={<Department/>} />
            <Route path="/equipment/:equipmentID" exact element={<UpdateEquipment searchHide={true}/>} />
          </Routes>
        </div>
      </UserMemberContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
