import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "./Nav";
const Adddatauser = () => {
  const [caseid, setcaseid] = useState("");
  const [areacode, setareacode] = useState(1);
  const data = JSON.parse(window.localStorage.getItem("data"));
  
  const [file, setFile] = useState("");
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  const [value, setvalue] = useState([]);
  useEffect(() => {
    axios.post("http://localhost:5000/forenics/viewarea").then((response) => {
      setvalue(response.data);
    });
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:5000/forenics/upload";
    const formData = new FormData();
    console.log(data)
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("caseid", caseid);
    formData.append("address", data[4]);
    formData.append("private", data[5]);
    formData.append("uid", data[0]);
    formData.append("areacode", data[7]);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
      alert("uploaded");
      setcaseid("");
    });
  }

  return (
    <>
      <Nav />
      <div
        // style={{
        //   backgroundImage:
        //     "url('https://blog.ipleaders.in/wp-content/uploads/2020/09/abstract-arrows_direction_process_magnifying-glass_search_investigate-100777420-large.jpg')",
        //   backgroundSize:"100% 100%",
        //   height:"100vh"
        // }}
      >
        <div
          style={{
            width: "50%",
            backgroundColor: "green",
            color: "black",
            textAlign: "center",
            marginLeft: "25%",
            position: "relative",
            top: "25%",
            borderRadius: "50px",
          }}
        >
          <h1>Upload data</h1>
          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setcaseid(e.target.value)}
              value={caseid}
              placeholder="Enter caseid"
            />
            <label htmlFor="caseid">caseid</label>
          </div>

          {/* <div className="form-floating mb-3 mt-3">
        <select
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
        </div> */}
          <div className="form-floating mb-3 mt-3">
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                onChange={handleChange}
                className="form-control"
              />

              <button type="submit" className="btn btn-primary">
                Upload
              </button>
            </form>
          </div>

          {/* <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setcodeid(e.target.value)}
            value={codeid}
            placeholder="Enter codeid"
          />
          <label htmlFor="codeid">codeid</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setkeyvalue(e.target.value)}
            value={keyvalue}
            placeholder="Enter keyvalue"
          />
          <label htmlFor="keyvalue">keyvalue</label>
        </div> */}
        </div>
      </div>
    </>
  );
};
export default Adddatauser;
