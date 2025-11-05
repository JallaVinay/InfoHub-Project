import {Route,Routes,BrowserRouter} from "react-router-dom";
import Home from "./components/Home"
import Weather from "./components/Weather"
import Quotes from "./components/Quotes"
import CurrecncyConverter from "./components/CurrecncyConverter"


import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}  />
      <Route path="/Weather" element={<Weather/>}  />
      <Route path="/Quotes" element={<Quotes/>}  />
      <Route path="/currency-converter" element={<CurrecncyConverter/>}  />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
