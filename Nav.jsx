import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "./nav.css";
const Nav = () => {
  const nav = useNavigate();
  const role = window.localStorage.getItem("role");
  const check = () => {
    if (role === "admin") {
      return (
        <>
          <h1>Admin</h1>
          <li className="nav-item admin-nav">
            <NavLink className="nav-link  " id="act" to="/viewdata">
              View File
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/viewarea">
              View Area
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/addarea">
              Add Area
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/adddata">
              Upload Data
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/viewusers">
              View Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/viewcase">
              View case
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/viewrequestadmin">
              View case Request
            </NavLink>
          </li>
        </>
      );
    } else if (role === "Police") {
      return (
        <>
          <h1>Police</h1>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={{ color: "white" }}
              to="/adddata"
            >
              Upload Data
            </NavLink>
          </li>
          <li className="nav-item police_nav_item">
            <NavLink
              className="nav-link"
              style={{ color: "white" }}
              to="/viewdatabyid"
            >
              View File
            </NavLink>
          </li>

          <li className="nav-item police_nav_item">
            <NavLink
              className="nav-link"
              style={{ color: "white" }}
              to="/Viewdatacasebyid"
            >
              View case
            </NavLink>
          </li>
          <li className="nav-item police_nav_item">
            <NavLink
              className="nav-link"
              style={{ color: "white" }}
              to="/reqcasedetails"
            >
              Request case details
            </NavLink>
          </li>
          <li className="nav-item police_nav_item">
            <NavLink
              className="nav-link"
              style={{ color: "white" }}
              to="/viewrequestcase"
            >
              Veiw Approved case
            </NavLink>
          </li>
        </>
      );
    } else if (role === "Forensic") {
      return (
        <>
          <h1>Forensic</h1>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={{ color: "white" }}
              to="/viewdatabyid"
            >
              View File
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={{ color: "white" }}
              to="/adddatauser"
            >
              Upload Data
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={{ color: "white" }}
              to="/Viewdatacasebyid"
            >
              View case
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={{ color: "white" }}
              to="/reqcasedetails"
            >
              Request case details
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={{ color: "white" }}
              to="/viewrequestcase"
            >
              Veiw Approved case
            </NavLink>
          </li>
        </>
      );
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-sm container-fluid ">
        <div className="container-fluid">
          <ul
            className="navbar-nav"
            style={{ fontSize: "1.5em", color: "white" }}
          >
            {check()}

            <li className="nav-item">
              <a
                className="nav-link"
                style={{ cursor: "pointer", color: "white" }}
                onClick={() => {
                  axios
                    .post("http://localhost:5000/forenics/endofall")
                    .then((res) => {
                      nav("/");
                    });
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
