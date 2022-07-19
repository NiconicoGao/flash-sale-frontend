import  React, {useRef }from "react";
import {CountDown } from '@nutui/nutui-react';


export default function MyCountDown(props) {
    const stateRef = useRef({
        endTime: props.endTime
    })
    return (
        <CountDown endTime={stateRef.current.endTime}></CountDown>
    )
}
