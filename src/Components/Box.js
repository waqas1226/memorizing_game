import React, { useEffect, useState } from "react";
import A from "../A.JPG";
import B from "../B.JPG";
import C from "../C.JPG";
import D from "../D.JPG";
import E from "../E.JPG";
import F from "../F.JPG";
import blank from "../blank.jpg";
import checked from "../bg16.jpg";
import styled from "styled-components";

const Div = styled.div`
display: flex;
width: 190px;
flex-wrap: wrap;  
`;

export function Box(props) {
  //array of src of pictures
  const state = [A, B, C, D, E, F, A, B, C, D, E, F, blank, checked];
  //positions of pictures
  let unshuffled = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const [scndclk, setScndclk] = useState(false);
  const [isClick, setIsClick] = useState([false]);
  const [matched, setMatched] = useState([false]);
  const [timecom, setTimecom] = useState(true);
  const [start, setStart] = useState(false);
  const [fstClicked, setFstClicked] = useState("");
  
  //shuffling positions 
  const [rndmAray, setRndmAray] = useState(
    unshuffled
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  );

  console.log("Box rendered");

  function Check(e) {
    if (start) {
      //disable the matched parts
      if (!matched[e.target.id]) {
        // checking clicked matching
        const isClickCopy = [...isClick];
        isClickCopy[e.target.id] = true;//change state of clicked item to display
        setIsClick(isClickCopy);

        let d = !scndclk;
        setScndclk(d);

        if (d === true) {
        setFstClicked(e.target.id);//store first clicked item id to remain displayed
        } else {
          const isClickCopy1 = [...isClick];

          //display second clicked image for 1 second
          setTimeout(() => {
            isClickCopy1[fstClicked] = false;
            isClickCopy1[e.target.id] = false;
            setIsClick(isClickCopy1);
            // checked matching
            if (state[e.target.id] === state[fstClicked]) {
              const matchedCopy = [...matched];
              matchedCopy[e.target.id] = true;
              matchedCopy[fstClicked] = true;
              setMatched(matchedCopy);
              // setMatched(prev=>[...prev, prev[fstClicked] = true, prev[e.target.id] = true]);

            }
          }, 1000);
        }
      
    }
    }
  }
  const TrueMatched = matched.filter(remvn1);//filter the true state items in matched array
  function remvn1(vl) {
    return vl === true;
  }
  if (TrueMatched.length >= 11) {
    props.win(); //call to display win
  }

  //if given time completed
  if (props.timeup && timecom) {
    setFstClicked("");
    setIsClick([false]);
    setMatched([false]);
    setScndclk(false);
    setTimecom(false);
    setStart(false);
  }
  //start function
  const Start = () => {
    setFstClicked("");
    setTimecom(true);
    setIsClick([false]);
    setMatched([false]);
    setScndclk(false);
    props.startfunc();
    setStart(true);

    setRndmAray(
      unshuffled
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    );
  };

  return (

    <div>
    <div className="center">
     
      <Div>
        {rndmAray.map((i) => (
          <img
            key={i}
            onClick={Check}
            src={matched[i] ? state[13] : isClick[i] ? state[i] : state[12]}
            id={i}
            alt="box"
            height="60"
            width="60"
          />
        ))}
      </Div>
      </div>
      <button onClick={Start}>Start</button>
    </div>
  );
}

export const MemorizedBox = React.memo(Box);
