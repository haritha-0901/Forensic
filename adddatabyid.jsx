import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Viewdatabyid = () => {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [value, setvalue] = useState([]);
  const id = window.localStorage.getItem("id");
  useEffect(() => {
    axios
      .post("http://localhost:5000/forenics/viewdatabyid", { id: id })
      .then((response) => {
        setData(response.data);
        setvalue(response.data);
      });
  }, []);
  const viewdata = (e) => {
    nav("/viewtransactiondatasingle", { state: e[0] });
  };
  const deletec = (e) => {
    axios
      .post("http://localhost:5000/forenics/deletedata", { id: e })
      .then((response) => {
        window.location.reload();
      });
  };
  const searchdata = (e) => {
    const r = [];

    for (var k of value) {
      var v = 0;

      for (var n of k) {
        n = "" + n;
        if (n.toLowerCase().indexOf(e) !== -1) {
          v = 1;
          break;
        }
      }
      if (v === 1) {
        r.push(k);
      }
    }
    setData(r);
  };
  const download = (d) => {
    axios
      .post("http://localhost:5000/forenics/downloadfile", { data: d })
      .then((response) => {
        alert("kindly check in download folder");
      });
  };
  return (
    <div
      // style={{
      //   backgroundImage:
      //     "url('https://blog.ipleaders.in/wp-content/uploads/2020/09/abstract-arrows_direction_process_magnifying-glass_search_investigate-100777420-large.jpg')",
      //   height: "100vh",
      // }}
    >
      <Nav />
      <h3 style={{ color: "white", textAlign: "center" }}>Data</h3>
      <input
        type="search"
        onChange={(e) => searchdata(e.target.value)}
        className="form-select"
        placeholder="Search"
      />
      <div className="table-responsive" style={{marginRight:"17%"}}>
        <table className="table table-bordered" id="table_id">
          <thead>
            <tr>
              <th>did</th>
              <th>filename</th>
              <th>codeid</th>
              {/* <th>keyvalue</th> */}
              <th>caseid</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => {
              return (
                <tr key={d[0]}>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => viewdata(d)}
                    >
                      {d[0]}
                    </button>
                  </td>
                  <td>{d[1]}</td>
                  <td>{d[2]}</td>
                  <td>{d[3]}</td>
                  {/* <td>{d[4]}</td> */}
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => deletec(d[0])}
                    >
                      delete
                    </button>
                  </td>
                  {/* <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => download(d)}
                    >
                      Download
                    </button>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Viewdatabyid;
