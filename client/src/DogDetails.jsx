import { useEffect, useState } from "react";
import { getDogDetails } from "./apiManager";
import { useParams } from "react-router-dom";

export const DogDetails = () => {
    const { dogId } = useParams()
    const [dogDetails, setDogDetails] = useState({})

    useEffect(() => {
        getDogDetails(dogId).then(res => {
            setDogDetails(res)
        }) 
    }, [])

  return (
    <div className="dogdetails">
        <h2>dog name {dogDetails?.name}</h2>
        <h2>city name {dogDetails?.city?.name}</h2>
        <h2>walker {dogDetails?.walker === null ? "" : dogDetails?.walker?.name}</h2>
    </div>
  );
}