import React, { useEffect } from 'react'
import { Card,Row,Col ,Button } from 'react-bootstrap'
import { useLocation , useNavigate } from 'react-router-dom'

const Final = () => { 
    
    const location = useLocation();
    const userId = location.state.allItem[0].userId;

    const navigation = useNavigate();

    const moveToHome = () => {
         
        navigation("/home",{state:{userId:userId}})

        

    }
 
    useEffect(()=>{
         
        console.log(location.state)

    })

  return (
    <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
         
         <div className='changeWidth' style={{marginTop:"50px"}} >
            <p></p>
             <Button onClick={moveToHome} variant='danger'>Go Back</Button>
             <p></p>
             <Card style={{padding:"15px"}}>
                <Row>
                  {
                    location.state.allItem.map((x)=>{
                        return <Col lg ={4}> <Card style={{marginBottom:"15px"}}>
                            <Card.Header>{x.name}</Card.Header>
                            <Card.Body>
                                <img src = {`${x.image}`} style={{width:"100%",height:"100px",objectFit:"cover"}} />
                            </Card.Body>
                            <Card.Footer>{x.price}</Card.Footer>
                        </Card>
                        </Col>
                    })
                  }

                </Row>



             </Card>
            <p></p>
            <Button variant = "success" >Done</Button>
         </div>

    </div>
  )
}

export default Final