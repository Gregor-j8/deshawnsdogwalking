export const getAllDogs = () => {
  return fetch("http://localhost:5000/dogs").then(res => res.json())
};
export const getDogDetails = (dogId) => {
  return fetch(`http://localhost:5000/dogdetails/${dogId}`).then(res => res.json())
};

export const getAllWalkers = () => {
  return fetch("http://localhost:5000/walkers").then(res => res.json())
};