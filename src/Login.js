import { useScroll } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useHref, useNavigate } from 'react-router-dom';

const Login = () => {


    const [flag,setFlag] = useState("login");
    

    const navigation = useNavigate();

    const [loginVal,setLoginVal] = useState({
        name:"",
        password:""
    })

    const [registerVal,setRegisterVal] = useState({
        name:"",
        password:"",
        re_password:""
    })

    const loginUser = async() => {
       
      try{
         
        const response = await axios.post("https://react3-frontend.vercel.app/login",{
          name:loginVal.name,
          password:loginVal.password
        });
        console.log(response , "<===response login" );
        
        const userId = response.data[0]._id

        if(response.data.length>0){
             navigation("/home",{state:{userId:userId}})
          
        }

      }catch(e){}


    }

    const registerUser = async() => {
        
      try{
         
        const response = await axios.post("https://react3-frontend.vercel.app/register",registerVal);
        console.log(response);
        
        if(response.statusText === 'OK'){
           
          setFlag("login")

          setRegisterVal((prev)=>{
            return {...prev,name:"",password:"",re_password:""}
          })

        }
      

      }catch(e){
         
        if(e){
          console.log(e);
        }

      }




    }

    const goToHomeBuyer = async() => {

      try{

        navigation("/home",{state:{userId:null}})
      
      
      }catch(e){}





    }
    


    let element ;

    switch(flag){

        case "login":
            element = <div> 
                 
                 <input value={loginVal.name} style={{width:"300px",border:"0px solid",backgroundColor:"#dedede",padding:"10px"}} placeholder='name' onChange={e=>setLoginVal((prev)=>{
                    return {...prev,name:e.target.value}
                 })}/>
                  <p></p>
                 <input value={loginVal.password} style={{width:"100%",border:"0px solid",backgroundColor:"#dedede",padding:"10px"}} placeholder='password' onChange={e=>setLoginVal((prev)=>{
                    return {...prev,password:e.target.value}
                 })} />
                 <p></p>
                 <Button variant='success' onClick={loginUser} >Login</Button>
                   <p></p>
                 <Button  variant='link' onClick={e=>{
                  setFlag("register");
                  setLoginVal((prev)=>{
                    return {...prev,name:"",password:""}
                  })
                 }} >New ? Register</Button>
                 </div> 

                 break;
        
        case "register":
              
            element = <div> 
                 
            <input  style={{width:"300px",border:"0px solid",backgroundColor:"#dedede",padding:"10px"}} placeholder='name' onChange={e=>setRegisterVal((prev)=>{
               return {...prev,name:e.target.value}
            })}/>
             <p></p>
            <input  type='password' style={{width:"100%",border:"0px solid",backgroundColor:"#dedede",padding:"10px"}} placeholder='password' onChange={e=>setRegisterVal((prev)=>{
               return {...prev,password:e.target.value}
            })} />
                <p></p>
            <input  type='password'  style={{width:"100%",border:"0px solid",backgroundColor:"#dedede",padding:"10px"}} placeholder='re_password' onChange={e=>setRegisterVal((prev)=>{
               return {...prev,re_password:e.target.value}
            })} />

            <p></p>

              <Button variant='success' onClick={registerUser} >Register</Button>
              <p></p>
              <Button variant='link' onClick={e=>setFlag("login")}  > Already Have a account ?</Button>


            </div>
         
        

    }


  return (

    <div style={{display:"grid",placeItems:"center"}}>
           
           <div style={{marginTop:"20%",backgroundColor:""}} >
                {
                    element
                }
           </div>
           

           <hr></hr>

           <Button onClick={goToHomeBuyer} variant='success' style={{width:"25%"}} > Enter as Buyer </Button>
       
    </div>
  )
}

export default Login