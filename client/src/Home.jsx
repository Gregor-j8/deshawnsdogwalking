import { addCity, getAllCities, getAllDogs, getAllWalkers } from "./apiManager";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useParams } from "react-router-dom";
import "./Home.css"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(prev => !prev);
  const [allWalkers, setAllWalkers] = useState([]);
  const [filteredWalkers, setFilteredWalkers] = useState([]);
  const [allDogs, setAllDogs] = useState([]);
  const [allCities, setAllCities] = useState([])
  const [cityId, setCityId] = useState(0)
  const [city, setCity] = useState({})

  useEffect(() => {
    getAllDogs().then((res) => {
      setAllDogs(res);
    });
    getAllWalkers().then((res) => {
      setAllWalkers(res);
    });
  }, []);

  useEffect(() => {
    setFilteredWalkers(allWalkers)

  }, [allWalkers])

  useEffect(() => {
    getAllCities().then((res) => {
      setAllCities(res)
    })
  }, [allCities])

  useEffect(() => {
    const filtered = allWalkers.filter(w => {
      return w.cities.some(c => c.id === cityId)
    })

    setFilteredWalkers(filtered)

  }, [cityId])

  const handleSubmit = () => {
    addCity(city).then(
      setCity({}),
      getAllCities().then((res) => {
      setAllCities(res)
    }))
  }

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
        <p>add city name</p>
        <input type="text" onChange={(e) => {setCity({...city, name: e.target.value})}}/>
        <button onClick={handleSubmit}>Add city</button>
        <h2>Cities</h2>
        {allCities.map((city) => {
          return (
            <div key={city.id}>{city.name}</div>
          )
        })}

      </div>

      <div className="list">

        <h2>Walkers</h2>

        {filteredWalkers.map((walker) => {
          return <><Link to={`/editwalker/${walker.id}`} key={walker.id}>{walker.name}</Link> <Link to={`dogwalker/${walker.id}`}>add Dog</Link></>;
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