import React, { useRef, useEffect } from "react";
import {MemorizedBox} from "./Box";
import styled from "styled-components";

function Board() {

  const [timeup, setTimeup] = React.useState(false);
  const [count, setCount] = React.useState(50);
  const [start, setStart] = React.useState(false);
  const [w, setW] = React.useState(false);
  const [shwTup, setShwTup] = React.useState(false);

  const WinMsg = styled.h3`
color : ${w?"black":"transparent"}
  `;
  const Timeup = styled.h3`
  `;
  // color : ${shwTup?"black":"transparent"}

  const refTimer = useRef(0);//use ref to update the count value 
  useEffect(() => {
    if (start) {
      refTimer.current = setInterval(() => {
        setCount((preCount) => preCount - 1);
      }, 1000);

      return () => {
        clearInterval(refTimer.current);
      };
    }
  }, [start]);
  
 const Win = () => {
  setW(true)
  setCount(50);
    setTimeup(true);
    clearInterval(refTimer.current);
    setStart(false);
 }

  if (count == 40) {
    setStart(false);
    setCount(50);
    setTimeup(true);
    setShwTup(true);
    clearInterval(refTimer.current);
  }
  const Start = () => {
    setTimeup(false);
    setStart(true);
    setShwTup(false);
    setW(false);
    setCount(50);
  };

  return (
    <div className="Board">
      <WinMsg>You Win</WinMsg>
      <MemorizedBox timeup={timeup} startfunc={Start} win = {Win}/>
      <div>Count: {count}</div>
     { shwTup&&<Timeup>Timeup</Timeup>}
     
    </div>
  );
}

export default Board;
