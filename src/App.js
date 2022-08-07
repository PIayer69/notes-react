import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from './pages/Landing';
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="welcome/" element={<Landing/>}></Route>
          <Route path='*' element={<NotFoundPage />} ></Route>
        </Routes>
    </Router>
  );
}

export default App;
