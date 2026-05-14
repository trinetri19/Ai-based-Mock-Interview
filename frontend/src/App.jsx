import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Questions from "./Pages/Questions";
import Feedback from "./Pages/Feedback";
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/questions' element={<Questions></Questions>}></Route>
    <Route path='/feedback' element={<Feedback></Feedback>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;