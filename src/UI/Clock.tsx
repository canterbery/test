
import React , {useState,useEffect} from "react";

const Clock = ()=>{

    const [date,setDate]=useState(new Date().toLocaleString());
    function tick(){
         setDate(new Date().toLocaleString())
    }
     
    useEffect(
        ()=>{
            const timer = setInterval(tick,1000);
            return function clear() {
                clearInterval(timer);
                };
        },[]
    )
    return (
        <span>
          {date}
        </span>
      );
}
export default Clock