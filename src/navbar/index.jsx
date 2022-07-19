import React from 'react'
import { NavBar } from '@nutui/nutui-react';
import { useLocation } from 'react-router-dom'


export default function MyNavBar() {
  const location = useLocation().pathname
  // height: 57px;line-height: 57px;text-align: center;background: white;font-weight: 700;font-size: 20px;color: rgb(51, 51, 51);box-shadow: rgba(0, 0, 0, 0.07) 0px 4px 10px;
  return (
    <NavBar style={{fontSize:20,fontWeight:700,color:"rgb(30, 30, 30)"}} title={location==="/item"?"Item Manage":(location==="/activity"?"Activity Manage":"Lobo Shop")} 
      onClickTitle={(e) => console.log('')}
      onClickBack={(e) => console.log('')}
      onClickIcon={(e) => console.log('')}/>
  )
}
