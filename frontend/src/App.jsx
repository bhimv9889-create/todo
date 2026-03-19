
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Auth from "./componets/Auth"
import Footer from "./componets/Footer"
import { useState } from "react"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            isLoggedIn ?
              <Dashboard setIsLoggedIn={setIsLoggedIn} />
              :
              <Navigate to="/login" />
          }
        />

        <Route
          path="/login"
          element={
            !isLoggedIn ?
              <Auth setIsLoggedIn={setIsLoggedIn} />
              :
              <Navigate to="/" />
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;