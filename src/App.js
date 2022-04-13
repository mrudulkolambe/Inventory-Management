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
            <Route path="/user/:userID" exact element={<Members />} />
            <Route path="/add/equipment" exact element={<AddEquipment />} />
            <Route path="/update/equipment" exact element={<UpdateEquipment />} />
          </Routes>
        </div>
      </UserMemberContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
