import { getAllDogs, getAllWalkers } from "./apiManager";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import "./Home.css"

export default function Home() {

  const [allWalkers, setAllWalkers] = useState([]);
  const [allDogs, setAllDogs] = useState([]);

  useEffect(() => {
    getAllDogs().then((res) => {
      setAllDogs(res);
    });
    getAllWalkers().then((res) => {
      setAllWalkers(res);
    });
  }, []);

  return (
    <div className="main-container">
      <div className="list">
        <h2>Dogs</h2>
        
        {allDogs.map((dog) => {        
          return (
              <Link to={`/dogdetails/${dog.id}`} key={dog.id}>{dog.name}</Link>    
          )})}            

      </div>
          
      <div className="list">
        <h2>Walkers</h2>

        {allWalkers.map((walker) => {
          return <div key={walker.id}>{walker.name}</div>;
        })}
        </div>
    </div>
  );
}