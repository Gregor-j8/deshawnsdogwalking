export const getAllDogs = () => {
  return fetch("http://localhost:5000/dogs").then(res => res.json())
};
export const getDogDetails = (dogId) => {
  return fetch(`http://localhost:5000/dogdetails/${dogId}`).then(res => res.json())
};

export const getAllWalkers = () => {
  return fetch("http://localhost:5000/walkers").then(res => res.json())
};

export const getAllCities = () => {
  return fetch("http://localhost:5000/cities").then(res => res.json())
}

export const addDog = (dog) => {
  return fetch("http://localhost:5000/dogs", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dog)
  }).then(res => res.json())
}

export const addCity = (city) => {
  return fetch("http://localhost:5000/cities", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(city)
  }).then(res => res.json())
}

export const getWalkerById = (id) => {
  return fetch(`http://localhost:5000/walkers/${id}`).then(res => res.json())
};

export const editDog = (dog) => {
  return fetch(`http://localhost:5000/dogs/${dog.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dog)
  }).then(res => res.json())
}

export const createCityWalker = (jointable) => {
  return fetch(`http://localhost:5000/citywalkers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jointable)
  }).then(res => res.json())
}

export const deleteCityWalker = (id) => {
  return fetch(`http://localhost:5000/citywalkers/${id}`, {method: 'DELETE'}).then(res => res.json())
}

export const getCitywalkers = () => {
  return fetch(`http://localhost:5000/citywalkers`).then(res => res.json())
}

export const changeWalkerName = (walker) => {
  return fetch(`http://localhost:5000/walkers/${walker.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(walker)
  }).then(res => res.json())
}
