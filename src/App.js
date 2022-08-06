import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';

function App() {
  return (
    <>
        <Router>
          <Navbar />
          <div className="container">
          <Routes>
            <Route path="/" element={<Landing/>}></Route>
            <Route path="home/" element={<Home/>}></Route>
            <Route path="login/" element={<Login/>}></Route>
            <Route path="register/" element={<Register/>}></Route>
          </Routes>
          </div>
        </Router>
    </>
  );
}

export default App;
