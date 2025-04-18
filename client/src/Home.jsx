import { getAllDogs, getAllWalkers } from "./apiManager";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
// import "./Home.css";
import { DogDetailsModal } from './modals/DogDetailsModal'

export default function Home() {
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [allWalkers, setAllWalkers] = useState([]);
  const [allDogs, setAllDogs] = useState([]);
  const [dogId, setDogId] = useState(1);
  const [DogDetailsOpen, setDogDetailsOpen] = useState(false);
  console.log(DogDetailsOpen)

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
            <div key={dog.id}>
              <button value={dog.id} onClick={(event) => {
                setDogId(event.target.value)
                setDogDetailsOpen(true)
                
                }}> {dog.name} </button>          
            </div>          
          )})}            

      </div>
          
      <div className="list">
        <h2>Walkers</h2>

        {allWalkers.map((walker) => {
          return <div key={walker.id}>{walker.name}</div>;
        })}
        </div>
          {DogDetailsOpen && (
            <DogDetailsModal
              dogId={dogId}
              onClose={() => setDogDetailsOpen(false)} 
            />
           )} 
    </div>
  );
}