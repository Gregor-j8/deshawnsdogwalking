import { getAllCities, getAllDogs, getAllWalkers } from "./apiManager";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import "./Home.css"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(prev => !prev);
  const [allWalkers, setAllWalkers] = useState([]);
  const [filteredWalkers, setFilteredWalkers] = useState([]);
  const [allDogs, setAllDogs] = useState([]);
  const [allCities, setAllCities] = useState([])
  const [cityId, setCityId] = useState(0)

  useEffect(() => {
    getAllDogs().then((res) => {
      setAllDogs(res);
    });
    getAllWalkers().then((res) => {
      setAllWalkers(res);
    });
    getAllCities().then((res) => {
      setAllCities(res)
    })
  }, []);

  useEffect(() => {
    setFilteredWalkers(allWalkers)

  }, [allWalkers])

  useEffect(() => {
    const filtered = allWalkers.filter(w => {
      return w.cities.some(c => c.id === cityId)
    })


    setFilteredWalkers(filtered)

  }, [cityId])

  return (
    <div className="main-container">
      <div className="list">
        <Link to="/adddog">Add Dog</Link>
        <h2>Dogs</h2>
        {allDogs.map((dog) => {
          return (
            <Link to={`/dogdetails/${dog.id}`} key={dog.id}>{dog.name}</Link>
          )
        })}

      </div>

      <div className="list">

        <h2>Walkers</h2>

        {filteredWalkers.map((walker) => {
          return <div key={walker.id}>{walker.name}</div>;
        })}
        <div className="dropdown mt-4">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            onClick={toggleDropdown}
            aria-expanded={isOpen}>
            City
          </button>

          <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
            {allCities.map(c => {
              return <li key={c.id}><button onClick={() => {setCityId(c.id); setIsOpen(false)}} className="dropdown-item">{c.name}</button></li>
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}