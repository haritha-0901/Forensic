import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Viewrequestcase = () => {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [value, setvalue] = useState([]);

  const id = window.localStorage.getItem("id");
  useEffect(() => {
    axios
      .post("http://localhost:5000/forenics/caserequestwise", { userid: id })
      .then((response) => {
        setData(response.data);
        setvalue(response.data);
      });
  }, []);
  const viewdata = (e) => {
    console.log(e);
    nav("/viewcasesingle", { state: e[1] });
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

  return (
    <div
      // style={{
      //   backgroundImage:
      //     "url('https://blog.ipleaders.in/wp-content/uploads/2020/09/abstract-arrows_direction_process_magnifying-glass_search_investigate-100777420-large.jpg')",
      //   height: "100vh",
      // }}
    >
      <Nav />
      <h3 style={{color:"white",textAlign:"center", marginTop:"25px",marginBottom:"20px",fontWeight:"bold"}}>View Case</h3>
      <input
        type="search" style={{marginBottom:"20px"}}
        onChange={(e) => searchdata(e.target.value)}
        className="form-select"
        placeholder="Search"
      />
      <div className="table-responsive">
        <table className="table table-bordered" id="table_id">
          <thead>
            <tr>
              {/* <th>keyvalue</th> */}
              <th>Caseid</th>
              <th>Approve</th>
              <th>download</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => {
              return (
                <tr key={d[0]}>
                  <td>
                    {d[2] === 1 ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => viewdata(d)}
                      >
                        {d[1]}
                      </button>
                    ) : (
                      d[1]
                    )}
                  </td>
                  <td>
                    {d[2] === 1
                      ? "approved"
                      : d[1] == -1
                      ? "rejected"
                      : "approvepending"}
                  </td>

                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Viewrequestcase;
