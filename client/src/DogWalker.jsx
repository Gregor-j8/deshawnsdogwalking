import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getWalkerById, getAllDogs, editDog } from "./apiManager";

export const DogWalker = () => {
    const navigate = useNavigate()
  const walkerId = useParams();
  const [walker, setWalker] = useState({});
  const [dogs, setDogs] = useState([]);
  const [doginfo, setDoginfo ] = useState(null)

  useEffect(() => {
    getWalkerById(walkerId.walkerId).then((res) => {
      setWalker(res);
    });
  }, []);
  useEffect(() => {
    getAllDogs().then((res) => {
      setDogs(res);
    });
  }, []);

  useEffect(() => {
    console.log(doginfo)
    if (doginfo === null) {
        return
    } else {
    editDog(doginfo).then(res => {
        navigate(`/dogdetails/${res.id}`)})
    }

  }, [doginfo])

  
  return (
    <div>
      {
      dogs.filter((dog) => dog.walkerId === null &&walker.cities.some((city) => city.id === dog.cityId)).map((dog) => (
           <div key={dog.id}><button onClick={(e) => {
            setDoginfo({
            ...dog,
            walkerId: walker.id
            })}}>{dog.name}</button></div>
        ))}
    </div>
  );
};
