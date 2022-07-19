import React, { useCallback, useEffect, useState } from 'react'
import { Tag,Card,Toast } from '@nutui/nutui-react';
import MyCountDown from '../countdown'
import './shop.css'
import axios from 'axios';

export default function ShopPage(props) {
  const [activityInfo,setActivityInfo] = useState([])
  const req = useCallback(() => {
    axios.get('/api/activity')
    .then(function (response) {
        if (response && response.data && response.data){
            setActivityInfo(response.data.data)
        }
    },[])
    .catch(function (error) {
        Toast.fail("Server Connection Failed!")
    }); 
  },[])

  useEffect(() => { req() },[req])
  
  return (
      <ul>
          {activityInfo.map((s)=>{
              return (
                <li key={s.activity_id} onClick={()=>{props.setData(s);props.setDisplay(true);}}>
                <Card
                  imgUrl={s.image}
                  title={s.title}
                  price={s.price}
                  delivery={s.delivery}
                  shopName={s.shop_name}
                  originTpl={
                    <div className="count"> 
                      <MyCountDown  endTime={s.end_time*1000}/>
                    </div>
                  }
                  shopTagTpl={s.tag.map((item,index)=>{
                    if (item === 'Prime'){
                      return <Tag type='danger' key={index}>{item}</Tag>
                    } else if (item === 'Special'){
                      return <Tag plain key={index}>{item}</Tag>
                    } else return  <Tag plain>{item}</Tag>
                  })}
                  footerTpl={<div style={{ fontSize: '12px',paddingRight:'5px' }}>Stock: {s.stock}</div>}
                 ></Card>
                 </li>
              )
          })}
        
      </ul>
    )
}
