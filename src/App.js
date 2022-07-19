import '@nutui/nutui-react/dist/style.css'
import {Route, Switch } from "react-router-dom"
import Bottom from "./bottom";
import ItemPage from "./item";
import MyNavBar from "./navbar";
import ShopPage from "./shop";
import "./app.css"

import {Row,Col } from '@nutui/nutui-react'
import Popper from "./popper";
import React,{useState} from 'react'
import ActivityPage from './activity';

function App() {
  const [display,setDisplay] = useState(false)
  const [data,setData] = useState({stock:0,total:1})
  const state = {
    display:display,
    setDisplay:setDisplay,
    data:data,
    setData:setData,
  }
  
  return (
    <Row>
      <Col span="24">
        <MyNavBar />
      </Col>
      <Col span="24" offset="1">
        <Switch>
          {/* <Route path={"/"} element={<ShopPage/> }></Route> */}
          <Route exact path={"/shop"}><ShopPage {...state}/></Route>
          <Route exact path={"/item"}><ItemPage/></Route>
          <Route exact path={"/activity"}><ActivityPage/></Route>
        </Switch>
      </Col>
      
      <Col span="24">
        <Bottom/>
      </Col> 
      <Popper {...state}/>
    </Row>
  );
}

export default App;
