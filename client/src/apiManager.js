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