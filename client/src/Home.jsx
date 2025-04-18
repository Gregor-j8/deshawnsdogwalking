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

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [allDogs, setAllDogs] = useState([]);
  const [allWalkers, setAllWalkers] = useState([]);

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
          return <div key={dog.id}>{dog.name}</div>;
        })}
      </div>

      <div className="list">
        <h2>Walkers</h2>

        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>Walker Cities</DropdownToggle>
          <DropdownMenu></DropdownMenu>
        </Dropdown>

        {allWalkers.map((walker) => {
          return <div key={walker.id}>{walker.name}</div>;
        })}
      </div>
    </div>
  );
}
