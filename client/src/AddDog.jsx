import { useEffect, useState } from "react"
import { addDog, getAllCities } from "./apiManager"
import { useNavigate } from "react-router-dom"

export const AddDog = () => {
    const [dog, setDog] = useState({})
    const [allCities, setAllCities] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllCities().then((res) => {
            setAllCities(res)
        })
    }, [])

    const handleSubmit = () => {
        addDog(dog).then(res => {
            navigate(`/dogdetails/${res.id}`)
        })
    }

    return (
        <div>
            <div>
                <p>Name</p>
                <input type="text" onChange={(e) => { setDog({ ...dog, name: e.target.value }) }} />
                <p>City Id Number</p>
                <input type="number" onChange={(e) => { setDog({ ...dog, cityId: e.target.value }) }} />
                <button onClick={handleSubmit}>submit</button>
            </div>
            <div>
                {allCities.map(city => {
                    return <h2 key={city.id}>{city.id}: {city.name}</h2>
                })}
            </div>
        </div>
    )
}