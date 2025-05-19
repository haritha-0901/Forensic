import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./register.css";
const Register = () => {
  const { state } = useLocation();
  console.log(state);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [addresss, setaddresss] = useState("");
  const [keydata, setkeydata] = useState("");
  const [role, setrole] = useState("Police");
  const [areacode, setareacode] = useState(1);
  const [value, setvalue] = useState([]);
  useEffect(() => {
    if (state !== null) {
      setname(state["name"]);
      setemail(state["email"]);
      setpassword(state["password"]);
      setaddresss(state["addresss"]);
      setkeydata(state["keydata"]);
      setrole(state["role"]);
      setareacode(state["areacode"]);
    }
  }, []);
  useEffect(() => {
    axios.post("http://localhost:5000/forenics/viewarea").then((response) => {
      setvalue(response.data);
    });
  }, []);
  const nav = useNavigate();
  console.log(value);
  const submitdata = () => {
    if (name !== "" && email !== "" && password !== "") {
      const value = {
        name: name,
        email: email,
        password: password,
        addresss: addresss,
        keydata: keydata,
        role: role,
        areacode: areacode,
      };
      axios
        .post("http://localhost:5000/forenics/insertusers", value)
        .then((res) => {
          alert("success");
          if (role === "Police") {
            alert("success");

            nav("/");
          } else if (role === "Forensic") {
            alert("success");

            nav("/");
          }
        });
    } else {
      alert("check details");
    }
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
      <div class="register">
        <h1>Register</h1>
        <div class="content">
          <div class="form">
            <div className="  mt-3">
              <input
                id="inp"
                type="text"
                className="form-control"
                onChange={(e) => setname(e.target.value)}
                value={name}
                placeholder="Enter name"
              />
              <label htmlFor="name">name</label>
            </div>

            <div className="">
              <input
                id="inp"
                type="text"
                className="form-control"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                placeholder="Enter email"
              />
              <label htmlFor="email">email</label>
            </div>

            <div className=" ">
              <input
                id="inp"
                type="password"
                className="form-control"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                placeholder="Enter password"
              />
              <label htmlFor="password">password</label>
            </div>

            <div className="">
              <input
                id="inp"
                type="text"
                className="form-control"
                onChange={(e) => setaddresss(e.target.value)}
                value={addresss}
                placeholder="Enter addresss"
              />
              <label htmlFor="addresss">addresss</label>
            </div>

            <div className="">
              <input
                id="inp"
                type="text"
                className="form-control"
                onChange={(e) => setkeydata(e.target.value)}
                value={keydata}
                placeholder="Enter keydata"
              />
              <label htmlFor="keydata">keydata</label>
            </div>
            <div className="">
              <select
                id="inp"
                class="form-select"
                onChange={(e) => setrole(e.target.value)}
                value={role}
              >
                <option>Police</option>
                <option>Forensic</option>
                <option>Admin</option>
              </select>
              <label htmlFor="keydata">role</label>
            </div>

            <div className="">
              <select
                id="inp"
                class="form-select"
                onChange={(e) => setareacode(e.target.value)}
                value={areacode}
              >
                {value.map((v) => {
                  return (
                    <option value={v[0]}>
                      {v[1]}-{v[2]}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="keydata">Area</label>
            </div>
            {/* {name !== "" && (
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    nav("/checkcam", {
                      state: [
                        {
                          name: name,
                          email: email,
                          password: password,
                          addresss: addresss,
                          keydata: keydata,
                          role: role,
                          areacode: areacode,
                        },
                        "register",
                      ],
                    });
                  }}
                >
                  Register cam
                </button>
              </div>
            )} */}
            <div class="inputBox mb-2">
              <input
                type="submit"
                className="btn btn-primary"
                onClick={submitdata}
              />
            </div>
            <div class="links">
              <NavLink to="/">Login</NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Register;
