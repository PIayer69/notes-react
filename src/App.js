import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from './pages/Landing';
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const api_url = 'http://192.168.1.69:8000/api/';
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home api_url={api_url}/>}></Route>
          <Route path="login/" element={<Landing api_url={api_url} page='login'/>}></Route>
          <Route path="register/" element={<Landing api_url={api_url} page='register'/>}></Route>
          <Route path='*' element={<NotFoundPage />} ></Route>
        </Routes>
    </Router>
  );
}

export default App;
