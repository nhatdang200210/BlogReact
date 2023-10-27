import React, { useReducer } from "react";

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import News from "./components/News";
import Register from "./components/Register";
import Home from "./components/Home";
import Status from "./components/Status";
import Footer from "./components/Footer"
import AppReducer from "./components/reducers/AppReducer"
import AppContext from "./components/AppContext";

function App() {
  const initialState = {user: null, posts:[]};
  const [state, dispatch] = useReducer(AppReducer,initialState)
  return (
    <AppContext.Provider value = {{state, dispatch}}>
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/status" element={<Status />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      <Footer />
    </div>
    </AppContext.Provider>
  )
}

export default App;
