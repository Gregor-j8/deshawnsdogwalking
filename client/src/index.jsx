import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import { DogDetails } from "./DogDetails";
import { AddDog } from "./AddDog";
import { DogWalker } from "./Dogwalker";
import { EditWalker } from "./EditWalker";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/dogdetails/:dogId" element={<DogDetails/>}/>
      <Route path="/adddog" element={<AddDog/>}/>
      <Route path="dogwalker/:walkerId" element={<DogWalker/>} />
      <Route path="/editwalker/:walkerId" element={<EditWalker/>}/>
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
