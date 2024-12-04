import React, { useEffect, useState } from 'react'
import { Card , Row,Col, Button } from 'react-bootstrap';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = () => {
   
    const [itemList,setItemList] = useState([]);
    const location = useLocation();
    const navigation = useNavigate();

    const [userId,setUserId] = useState("")
    const [image,setImage] = useState()

    const [item,setItem] = useState({
        name:"",
        price:"",
        image:"",
        userId:""
    })

    const deletItem = async(id) => {

      try{
         
        const response = await axios.post("https://react3-frontend.vercel.app/deleteItem",{
          id:id
        })
        console.log(response , "<===== delete response");
        window.location.reload();

      }catch(e){
        console.log(e);
      }





    }

    const registerItem = async() => { 
        
          try{ 

            const form = new FormData();

            form.append('key','e34b686ea01e7391d28fa5bb390e65bb');
            form.append('image',image)

            const response1 = await axios.post("https://api.imgbb.com/1/upload",form)

            console.log(response1 , "<=== image upload")
             
            const response = await axios.post("https://react3-frontend.vercel.app/registerItem",{
                name:item.name,
                price:item.price,
                image:response1.data.data.url,
                userId:location.state.userId
            })
            console.log(response)

            window.location.reload();


        }catch(e){
            console.log(e);
        }

         



    }

    const goBackHome = async() => {
        
         navigation("/home",{state:{userId:location.state.userId}})

    }

    useEffect(()=>{
        
       
       
        console.log(location.state.userId , "<==== current user Id");

        const getItems = async() => {

             try{
               
              const response = await axios.get("https://react3-frontend.vercel.app/getItems");
              console.log(response,"get item response")

              setItemList(response.data)
              

             }catch(e){
               
              if(e){
                console.log(e);
              }



             }



        }

       getItems();

    },[])


  return (


    <div style={{ width:"100%",backgroundColor:"",marginTop:"10%" }} > 
          
         

          <Button onClick={goBackHome} >Go Back</Button>
          <p></p>
          <Card style={{padding:"15px"}} >
              
              <Row> 

                <Col lg ={4} >
                  
                  <div style={{width:"100%",backgroundColor:"",display:"flex",flexDirection:"column"}} >
                        
                         <Button style={{width:"50%"}} variant='success'> Items</Button>
                         <p></p>
                         <Button style={{width:"50%"}} variant='success'> Buyers</Button>
                 
                  </div>
                
                </Col>

                <Col lg ={8} >

                <div style={{padding:"15px",width:"100%",backgroundColor:""}} >

                       <input onChange={e=>setItem((prev)=>{
                          return {...prev,name:e.target.value}
                       })} placeholder='Item Name' style={{widht:"100%",padding:"15px",border:"0px solid",backgroundColor:"#dedede"}}  /> 
                       
                       <p></p>
                       
                       <input onChange={e=>setItem((prev)=>{
                          return {...prev,price:e.target.value}
                       })} placeholder='price' style={{widht:"100%",padding:"15px",border:"0px solid",backgroundColor:"#dedede"}}  /> 
                       
                       <p></p> 
                       <input type='file' onChange={e=>setImage(e.target.files[0])} />
                       <p></p>
                       <Button onClick={registerItem}> Save </Button>    
                
                </div>
                
                
                </Col>


              </Row>
              <h3 style={{marginLeft:"5px"}} > My Items </h3>
              <div style={{padding:"5px"}} >
                <Row >
                  
                       {
                          itemList.map((x)=>{
                             
                            
                               
                              if(x.userId === location.state.userId){
                                 return<Col lg = {4}><Card style={{margin:"3px"}}>
                                 <Card.Body> <img src = {`${x.image}`} style={{width:"100%",height:"100px",objectFit:"cover"}} /> </Card.Body>
                                 <Card.Footer style={{display:"flex",justifyContent:"space-between"}}>{x.price}

                                  <Button variant='danger' onClick={e=>deletItem(x._id)} >Delete</Button>
                                 </Card.Footer>
                               </Card>
                               </Col> 
                              }
                             

                            

                          })
                       }
                  
                  
                
                </Row>
              </div>
               

          </Card>

    </div>
  )
}

export default User