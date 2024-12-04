import { useScroll } from 'framer-motion'
import React, { useState ,useContext , useEffect } from 'react'
import { Card, Col, Row ,Button, Toast} from 'react-bootstrap'
import {useLocation , useNavigate } from 'react-router-dom'
import { UserContext  } from './App'
import axios from 'axios'

const Home = () => {
    
    const [cartValue,setCartValue] = useContext(UserContext)
    const [items,setItems] = useState([])

    const [sellerFlag,setSellerFlag] = useState(false);
    const location = useLocation();
    const navigation = useNavigate();

    const [toastFlag,setToastFlag] = useState(true)
    
    const [cart,setCart] = useState([]);

    const moveToFinal = async() => {

        navigation("/final",{state:{allItem:cart}})
        setCart([]);

    }

    const setCartVals = (x) => {
       
      setToastFlag(true)
       setCart((prev)=>{
          return [...prev,x]
       })


    }
    
    const goToControls = async() => {
         
      if(location.state.userId){
        navigation("/user",{state:{userId:location.state.userId}})
      }

    }


    useEffect(()=>{
      
      console.log(location.state.userId , "< ==== HomePage" );
      console.log(cart)
      if(location.state.userId){
        setSellerFlag(true)
      }

      const getItems = async() => {
         
        try{
           
          const response = await axios.get("http://localhost:5000/getItems");
          console.log(response," <==== getItems response")
          setItems(response.data)

        }catch(e){}

      }

      getItems();

    },[])
   
     
    

  return (


    <div style={{width:"100%",display:"grid",placeItems:"center",marginTop:"100px",backgroundColor:""}} >
            
               
             
               {
                sellerFlag?<div style={{marginLeft:"81%",display:"flex"}}>
                <Button onClick={goToControls} variant='success'> Add items </Button><Button variant='danger' href='/' style={{marginLeft:"15px"}} >LogOut</Button></div>:<></>
              }
                
              

             <p></p>
            
             <Row style={{width:"100%",backgroundColor:""}} >
                 <Col lg = {8} >
                 <Row>
                 {items.map((x)=>{

                    return <Col lg = {4} > 
                     
                     <Card style={{width:"100%",marginBottom:"15px"}} >
                      <Card.Header>{x.name}</Card.Header>
                     <Card.Body><img src= {`${x.image}`} style={{width:"100%",height:"100%",objectFit:"cover"}} /></Card.Body>
                        <Card.Body>
                          
                          <p></p>
                          
                          
                          </Card.Body>

                        <Card.Footer>

                        <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
                        {x.price}
                       
                       <Button variant='success' onClick={e=>setCartVals(x)} style={{marginLeft:"15px"}} >Add To Cart</Button>
                        </div>
                         
                     </Card.Footer>

                     </Card>
                     </Col>
                 })}
                 </Row>
                 </Col>
                 <Col lg = {4} >
                    
                    <Toast show = {toastFlag}  >
                    
                     <div style={{padding:"15px"}}>
                     <h4>Cart</h4>
                     {
                      cart.map((x)=>{
                        return <Card style={{padding:"10px",marginBottom:"15px"}}>
                           <h3>{x.name}</h3>

                          
                          <p></p>
                          {x.price}
                          
                          </Card>
                      })
                   }
                    <Button variant='dark' onClick={e=>setCart([])} style={{marginRight:"15px"}} > Clear </Button>
                    <Button variant='success' onClick={moveToFinal} > Final </Button>
                     </div>
                   
                    </Toast>

                 </Col>

             </Row>

            

             
    </div>
  )
}

export default Home