export const getAllDogs = () => {
  return fetch("/api/dogs").then(res => res.json())
};

export const getAllWalkers = () => {
  return fetch("/api/walkers").then(res => res.json())
};