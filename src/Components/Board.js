import React, { useRef, useEffect } from "react";
import {MemorizedBox} from "./Box";
import styled from "styled-components";

function Board() {

  const [timeup, setTimeup] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [start, setStart] = React.useState(false);
  const [w, setW] = React.useState(false);

  const H1 = styled.h1`
color : ${w?"black":"transparent"}
  `;

  const refTimer = useRef(0);//use ref to update the count value 
  useEffect(() => {
    if (start) {
      refTimer.current = setInterval(() => {
        setCount((preCount) => preCount + 1);
      }, 1000);

      return () => {
        clearInterval(refTimer.current);
      };
    }
  }, [start]);
  
 const Win = () => {
  console.log('win');
  setW(true)
  setCount(0);
    setTimeup(true);
    clearInterval(refTimer.current);
    setStart(false);
 }

  if (count == 60) {
    setStart(false);
    setCount(0);
    setTimeup(true);
    clearInterval(refTimer.current);
  }
  const Start = () => {
    setTimeup(false);
    setStart(true);
    setW(false);
    setCount(0);
  };

  return (
    <div className="Board">
      <H1>You Win</H1>
      <MemorizedBox timeup={timeup} startfunc={Start} win = {Win}/>
      <div>Count: {count}</div>
     
    </div>
  );
}

export default Board;
