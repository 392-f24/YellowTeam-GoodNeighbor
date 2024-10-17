import React, { useEffect, useState } from 'react';
import { useDbUpdate ,useAuthState} from "../utilities/firebase";

export const calcTime = (timer) => {
    const day = Math.floor(timer / (60*24));
    const hour = Math.floor(timer / 60);
    const min = Math.floor(timer);
    if (day > 0) {
        return (
            `${day} day(s)`
        );
    }
    else {
        if (hour > 0) {
            return(
                `${hour} hour(s)`
            );
        }
        else{
            return(`${min} minute(s)`)
        }
    }
}

const CountdownTimer = ({request}) => {
    
  const postTime = new Date(request.post_time).valueOf();
  const [timeRemaining, setTimeRemaining] = useState((postTime/60000 + request.timer) - (new Date()/60000));
  const [updateData, result] = useDbUpdate(`/requests/${request.request_id}`);

  useEffect(() => {
    const timerInterval = setInterval(() => {
        setTimeRemaining((postTime/60000 + request.timer) - (new Date()/60000));
        if(timeRemaining <= 0){
            const updatedData = { ...(request), request_status: "Closed"};
            try{
                updateData(updatedData)
            } 
            catch (error) {
                console.error("Error occurred:", error.message);
            }
        }
        
    }, (1000));

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
    },[]);

    return(
        <div>{calcTime(timeRemaining)} remaining</div>
    );
}
export default CountdownTimer;