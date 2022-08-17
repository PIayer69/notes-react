import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from './pages/Landing';
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login/" element={<Landing page='login'/>}></Route>
          <Route path="register/" element={<Landing page='register'/>}></Route>
          <Route path='*' element={<NotFoundPage />} ></Route>
        </Routes>
    </Router>
  );
}

export default App;
