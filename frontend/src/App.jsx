import './App.css'

import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import Auth from './componets/Auth'
import Footer from './componets/Footer'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <>
      {isLoggedIn ? (
        <Dashboard setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Auth setIsLoggedIn={setIsLoggedIn} />
      )}
      <Footer />
    </>
  );
}

export default App;