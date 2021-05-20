import React, {useState,useEffect} from "react";
import classes from "./Timer.css";

export default function Timer(props) {
	let [time, setTime, timer] = useState(0);

	 const incrementTime = () => {
		 timer = setTimeout(()=>{
				let newTime = time +1;
				setTime(newTime);
			}, 1000)
		}

		incrementTime();

return (
	<div className={classes.timer}>
		<h1 className={classes.digits}>⏳ {time}</h1>
	</div>
);
}
