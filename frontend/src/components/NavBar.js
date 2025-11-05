import { NavLink } from 'react-router-dom'

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <NavLink className="navbar-brand" to="/">
      <h1 className="m-0 h3">
        Info<span className="text-info">Hub</span>
      </h1>
    </NavLink>

    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto mr-5">

        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Home
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/weather"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Weather
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/currency-converter"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Currecncy Converter
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/quotes"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Quotes
          </NavLink>
        </li>

      </ul>
    </div>
  </nav>
)

export default NavBar
