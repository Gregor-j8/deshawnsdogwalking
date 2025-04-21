import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { changeWalkerName, createCityWalker, deleteCityWalker, getAllCities, getCitywalkers, getWalkerById } from "./apiManager"

export const EditWalker = () => {
    const { walkerId } = useParams()
    const [walkerInfo, setWalkerInfo] = useState({})
    const [allCities, setAllCities] = useState([])
    const [walkerName, setWalkerName] = useState('')
    const navigate = useNavigate()

    const getInfo = () => {
        getWalkerById(walkerId).then(res => {
            setWalkerInfo(res)
            setWalkerName(res.name)
        })
        getAllCities().then(res => {
            setAllCities(res)
        })
    }

    useEffect(() => {
        getInfo()
    }, [])

    const handleChange = (value, obj) => {
        if (value) {
            createCityWalker(obj).then(() => {
                getInfo()
            })
        } else {
            getCitywalkers().then(res => {
                const jointable = res.find(cw => cw.walkerId == obj.walkerId && cw.cityId == obj.cityId)
                deleteCityWalker(jointable.id).then(() => {
                    getInfo()
                })
            })
        }
    }
    
    const handleSave = () => {
        changeWalkerName({id: walkerInfo.id, name: walkerName}).then(() => {
            navigate("/")
        })
    }

    return (
        <div>
            <input type="text" value={walkerName} onChange={(e) => {setWalkerName(e.target.value)}}/>
            
            {allCities.length > 0 && allCities.map(c => {
                let value = walkerInfo.cities.some(city => c.id === city.id)

                return <p key={c.id}><input type="checkbox" onChange={() => { value = !value, handleChange(value, {walkerId: walkerInfo.id, cityId: c.id}) }} defaultChecked={value} />{c.name}</p>
            })}
            <button onClick={handleSave}>Save</button>
            <button onClick={() => {navigate("/")}}>Cancel</button>
        </div>
    )
}