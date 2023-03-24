// import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/login.page";
// import Login from "./pages/login/login.page.";
// import Places from "./pages/places/places.page";
// import Place from "./pages/place/place.page";
// import PlaceList from "./pages/placees-list/places-list.page";
// import PlaceDetails from "./pages/place-details/place-details.page";
import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import PrivateRoute from "./components/general/private-route/private-route.component";

import 'react-toastify/dist/ReactToastify.css';
import UploadData from "./pages/upload-data/upload-data.page";
import Home from "./pages/home/home.page";
import Statisitics from "./pages/statistics/statistics.page";
import Users from "./pages/users/users.page";
function App() {
  return (
    <Router>
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/upload-data" element={<UploadData />}></Route>
        <Route path="/statistics" element={<Statisitics />}></Route>
        <Route path="/users" element={<Users />}></Route>
        {/* <Route path="/places" element={<PrivateRoute><Places /></PrivateRoute>}></Route>
        <Route path="/places/:cityName" element={<PrivateRoute><Place /></PrivateRoute>}></Route>
        <Route path="/places-list/:cityName" element={<PrivateRoute><PlaceList /></PrivateRoute>}></Route>
        <Route path="/place-details/:id" element={<PrivateRoute><PlaceDetails /></PrivateRoute>}></Route> */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
    // </div>
  );
}


export default App;
