import React,{ useEffect, useState} from 'react'
import { CellGroup,Input,ActionSheet,Cell,Button,Toast,Checkbox} from '@nutui/nutui-react';
import "./activity.css"
import axios from 'axios';

let spuInfo = []
export default function ActivityPage() {
    // form
    const [activityName, setActivityName] = useState("")
    const onActivityNameChange = (value)=>{setActivityName(value)}

    //item detail 
    const [itemName, setItemName] = useState("")
    const [itemPrice, setItemPrice] = useState("")
    const [itemDesc, setItemDesc] = useState("")
    const [itemId, setItemId] = useState("")

    // picker
    const [visible, setVisible] = useState(false)
    const chooseItem = (d) =>{
        setVisible(false)
        setItemName(d.name)
        setItemPrice(d.price_str)
        setItemDesc(d.desc)
        setItemId(d.id)
    }

    // checkbox
    const [prime, setPrime] = useState(false)
    const [special,setSpecial] = useState(false)
    const onPrimeChange =(state) => {
       setPrime(state)
    }
    const onSpecialChange = (state) => {
        setSpecial(state)
    }

    // effect
    useEffect(() => {  
        axios.get('/api/spuinfo')
        .then(function (response) {
            if (response && response.data && response.data){
                spuInfo = response.data.data
            }
        },[])
        .catch(function (error) {
            Toast.fail("Server Connection Failed!")
        }); 
    },[visible])

    // Activity Manage
    const [newPrice,setNewPrice] = useState("")
    const [stock,setStock] = useState("")
    const [totalTime,setTotalTime] = useState("")

    const onPriceChange = (value) => { setNewPrice(value)}
    const onStockChange = (value) => { setStock(value)}
    const onTimeChange = (value) => { setTotalTime(value)}

    const onActivitySubmit = ()=>{
        if (!activityName || !itemId || !itemPrice || !newPrice || !stock || !totalTime){
            Toast.text('Please check your input')
            return
        }
        let sendData = {
            act_name: activityName,
            spu_id: itemId,
            sale_price: parseFloat(newPrice) ,
            total_stock: parseInt(stock) ,
            total_time: parseInt(totalTime),
            prime: prime,
            special:special,
        }

        axios.post('/api/activity', sendData)
        .then(function (response) {
            Toast.success("Create Success!")
        })
        .catch(function (error) {
            Toast.fail("Create Failed!")
        });
    }
    return (
    <div className='activity'>
        <CellGroup>
            <Input label="Act Name" placeholder='Input Activity Name' change={onActivityNameChange} requireShow />
        </CellGroup>
        <h2>Choose Item</h2>
        <CellGroup>
            <Cell title='Item' desc='Click to Choose' onClick={()=>{setVisible(true)}}></Cell>
            <Input defaultValue={itemName} label="Name" placeholder='Choose an Item' readonly={true}  />
            <Input defaultValue={itemPrice} label="Price" placeholder='Choose an Item' readonly={true}  />
            <Input defaultValue={itemDesc} label="Desc" placeholder='Choose an Item' readonly={true}  />
        </CellGroup>

        <h2>Activity Detail</h2>
        <CellGroup>
            <Input label="New Price" placeholder='Input New Price' type='digit' change={onPriceChange} requireShow />
            <Input label="Stock" placeholder='Input total stock' type='digit'change={onStockChange} requireShow />
            <Input label="Total time" placeholder='Input total time (/s)' change={onTimeChange} type='digit' requireShow />
        </CellGroup>
        <CellGroup>
            <Cell>
                <span style={{marginLeft:"10px",marginRight:"15px"}}>
                    <Checkbox textPosition="right" label="Prime" checked={prime} onChange={onPrimeChange} />
                </span>
                <span  style={{marginLeft:"15px",marginRight:"10px"}}>
                    <Checkbox textPosition="right" label="Special" checked={special} onChange={onSpecialChange} />
                </span>  
            </Cell>
        </CellGroup>
       


        <Button block type="primary" onClick={onActivitySubmit}>Submit</Button>

        <ActionSheet
            visible={visible}
            menuItems={spuInfo}
            choose={chooseItem}
            cancel={() => setVisible(false)}
        />

     </div>
  )
}
