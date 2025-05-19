import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";
const Login = () => {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const nav = useNavigate();
  const submitdata = () => {
    const value = { id: name, password: password };
    axios.post("http://localhost:5000/forenics/login", value).then((res) => {
      console.log(res.data);
      if (res.data !== null) {
        if (res.data[6] === "admin") {
          alert("success");
          setname("");
          setpassword("");
          window.localStorage.setItem("id", res.data[0]);
          window.localStorage.setItem("data", JSON.stringify(res.data));
          window.localStorage.setItem("role", "admin");
          nav("/adddata");
        } else if (res.data[6] === "Police") {
          alert("success");
          setname("");
          setpassword("");
          window.localStorage.setItem("id", res.data[0]);
          window.localStorage.setItem("data", JSON.stringify(res.data));
          window.localStorage.setItem("role", "Police");
          nav("/adddata");
        } else if (res.data[6] === "Forensic") {
          alert("success");
          setname("");
          setpassword("");
          window.localStorage.setItem("id", res.data[0]);
          window.localStorage.setItem("data", JSON.stringify(res.data));
          window.localStorage.setItem("role", "Forensic");
          nav("/adddata");
        }
      } else {
        alert("failed");
      }
    });
  };
  return (
    <section>
      {" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <div class="signin">
        <div class="content">
          <h2>Sign In</h2>

          <div class="form">
            <div className="form-floating mb-3 mt-3">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setname(e.target.value)}
                value={name}
                placeholder="Enter Id"
              />
              <label htmlFor="Id">Enter Id</label>
            </div>
            <div className="form-floating mb-3 mt-3">
              <input
                type="password"
                className="form-control"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                placeholder="Enter password"
              />
              <label htmlFor="password">Enter password</label>
            </div>
            <div class="links">
              <a href="#">Forgot Password</a>
              <NavLink to="/register">Register</NavLink>
            </div>
            or
            {/* {name !== "" && (
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    nav("/checkcam", { state: [name, "login"] });
                  }}
                >
                  Check cam
                </button>
              </div>
            )} */}
            <div class="inputBox">
              <input
                type="submit"
                className="btn btn-primary"
                onClick={submitdata}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    // <div style={
    //   {
    //     backgroundImage:"url('https://blog.ipleaders.in/wp-content/uploads/2020/09/abstract-arrows_direction_process_magnifying-glass_search_investigate-100777420-large.jpg')",
    //     height:"100vh"}}>
    //   <div style={{width:"50%",backgroundColor:"green",color:"black",textAlign:"center",marginLeft:"25%",position:"relative",top:"25%",borderRadius:"50px"}}>
    //   <h1>Login</h1>
    //   <div className="form-floating mb-3 mt-3">
    //     <input
    //       type="text"
    //       className="form-control"
    //       onChange={(e) => setname(e.target.value)}
    //       value={name}
    //       placeholder="Enter Id"
    //     />
    //     <label htmlFor="Id">Id</label>
    //   </div>

    //   <div className="form-floating mb-3 mt-3">
    //     <input
    //       type="password"
    //       className="form-control"
    //       onChange={(e) => setpassword(e.target.value)}
    //       value={password}
    //       placeholder="Enter password"
    //     />
    //     <label htmlFor="password">password</label>
    //   </div>

    //   <input
    //     type="submit"
    //     className="btn btn-primary"
    //     onClick={submitdata}
    //     style={{ width: "100%" }}
    //   />
    //   <NavLink to="/register" style={{backgroundColor:"white"}}>Register</NavLink>
    //   </div>
    // </div>
  );
};

export default Login;
