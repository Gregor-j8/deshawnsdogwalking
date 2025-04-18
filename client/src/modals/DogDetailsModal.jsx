import { useEffect, useState } from "react";
import "./DogDetailsModal.css"
import { getDogDetails } from "../apiManager";

export const DogDetailsModal = ({ onClose, dogId }) => {
    const [dogDetails, setDogDetails] = useState({})

    useEffect(() => {
        getDogDetails(dogId).then(res => {
            setDogDetails(res)
        }) 
    }, [])

  return (
    <div>
    <div className="modal">
        This is dog details
        <h1>{dogDetails.name}</h1>
        <h1>{dogDetails?.city?.name}</h1>
        <h1>{dogDetails.name}</h1>
        <button className="close-btn" onClick={() => {
            console.log("not working")
        }}>×</button>
      </div>
      </div>
  );
    

};
