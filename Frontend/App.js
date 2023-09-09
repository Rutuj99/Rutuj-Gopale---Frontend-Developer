import './App.css';
import Banner from './Components/Banner';
import DrawerTab from './Components/DrawerTab';
import Mid_Body from './Components/Mid_Body';
import {Route,Routes} from "react-router-dom"
import Login from './Components/Login';
import Signup from './Components/Signup';


function App() {
  return (
    <div className="App">
     <Banner/>
     <Routes>
     <Route path="/" element={<Mid_Body/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<Signup/>}/>
     </Routes>
    </div>
  );
}

export default App;
