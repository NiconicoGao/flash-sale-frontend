import React from 'react'
import { Tabbar, TabbarItem } from '@nutui/nutui-react';
import { useLocation } from 'react-router-dom'



export default function Bottom() {
    const location = useLocation().pathname
    return (
          <Tabbar bottom visible={location==="/manage"?1:0}>
              <TabbarItem tabTitle="Shop" to="/shop" icon="home" />
              <TabbarItem tabTitle="Activity Manage"  to="/activity" icon="my" />
              <TabbarItem tabTitle="Item Manage"  to="/item" icon="my" />
          </Tabbar>
    )
}
