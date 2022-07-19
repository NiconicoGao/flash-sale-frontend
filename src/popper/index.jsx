import React, { useState } from 'react'
import { Popup,CellGroup,Cell,Divider,CircleProgress,Toast } from '@nutui/nutui-react';
import "./popper.css"
import axios from 'axios';

export default function Popper(props) {
    const data = props.data
    const [percent,setPercent] = useState(0)
    const onOpen = ()=>{
        setPercent(100*(data.total-data.stock)/data.total)
    }

    const onClick = () =>{
        setPercent(100*(data.total-data.stock+1)/data.total);
        setTimeout(() => {
            props.setDisplay(false)
            window.location.reload()
        }, 1000);
        console.log(data)
        axios.get('/api/order',{
            params: {
                id: data.activity_id
              },
        })
        .then(function (response) {
            if (!response || !response.data){
                Toast.fail("Server Data Failed!")
                return
            }

            if (response.data.code !==0){
                Toast.fail(response.data.message)
                return
            }

            Toast.success("Order Success")
            
        },[])
        .catch(function (error) {
            Toast.fail("Server Connection Failed!")
        }); 

    }

    return (
        <Popup visible={ props.display } 
                style={{ height: 'auto',paddingBottom:"20px" }} 
                position="bottom" 
                onClose={ () => { props.setDisplay(false)}} 
                onOpen={onOpen}>
            <div className='outside'>
                <span className='price'>
                    {data.price_str}
                </span>
            </div>
            <Divider>Order Detail</Divider>
            <div>
                <CellGroup>
                    <Cell title="Name" desc={<span style={{color:"black"}}>{data.title}</span>}/>
                    <Cell title="Stock" desc={<span style={{color:"black"}}>{data.stock}</span>}/>
                    <Cell title="Merchant" desc={<span style={{color:"black"}}>{data.shopName}</span>}/>
                </CellGroup>
            </div>

            <div className='buy' onClick={onClick}>
                <CircleProgress progress={percent} strokeWidth={10} >BUY</CircleProgress>
            </div>

        </Popup>
    )
}
