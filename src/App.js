import logo from './logo.svg';
import './App.css';
import {Route,Routes} from 'react-router-dom'
import Second from './Second';
import Third from './Third';
import Home from './Home';
import { CiShoppingCart } from "react-icons/ci";
import { useState ,useContext,createContext } from 'react';
import { Toast } from 'react-bootstrap';
import { BiLogIn } from 'react-icons/bi';
import Login from './Login';
import User from './User';
import Final from './Final';

export const UserContext = createContext();

function App() { 


  const [cartValue,setCartValue] = useState([]);

  

  return (

    <div className="" style={{width:"100%",display:"grid",placeItems:"center"}}>
       

        <div style={{width:"100%",height:"100px",backgroundColor:"green",display:"grid",placeItems:"center"}} >
            <div style={{backgroundColor:"",display:"flex",justifyContent:"space-between"}} className='changeWidth marginOnMobile' >
                  <h1 style={{color:"white"}}>Ekart</h1>  
            </div>
        </div>

        <div className='changeWidth marginOnMobile'  > 

        <UserContext.Provider value = {[cartValue,setCartValue]}  >

        <Routes>
             <Route path = "/" element = {<Login/>}  />
             <Route path = "/home" element = {<Home/>}  />
             <Route path = "/user" element = {<User/>}  />
             <Route path = "/final" element = {<Final/>} />

        </Routes>
        </UserContext.Provider>
        </div>
       
    </div>
  );
}

export default App;
