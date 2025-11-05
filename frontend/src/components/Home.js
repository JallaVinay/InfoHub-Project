import NavBar from "./NavBar"
import { Link } from "react-router-dom"
import "./Home.css"

const Home = () => (
    <>
        <NavBar/>

  <div className="home-page">
    <div className="home-container">
      <h1>Welcome to InfoHub</h1>

      <p className="home-text">
        InfoHub is your everyday companion for weather updates, currency conversion,
        and motivational quotes — all in one place.
      </p>

      <div className="feature-images">
        <Link to="/weather" className="image-box">
          <img src="https://cdn-icons-png.flaticon.com/512/869/869869.png" alt="Weather"/>
          <button className="btn btn-info">Weather</button>
        </Link>

        <Link to="/currency-converter" className="image-box">
          <img src="https://cdn-icons-png.flaticon.com/512/1444/1444797.png" alt="Currency"/>
          <button className="btn btn-info">Currency</button>
        </Link>

        <Link to="/quotes" className="image-box">
          <img src="https://media.istockphoto.com/id/1473443216/vector/stop-thinking-start-doing-vector-illustration.jpg?s=612x612&w=0&k=20&c=pKvB5xT_ORTfDj2_6f5lgMHa0EZ3SxSomkBeBpzK1ck=" alt="Quotes"/>
          <button className="btn btn-info">Quotes</button>
        </Link>
      </div>
    </div>
  </div>
  </>
)

export default Home
