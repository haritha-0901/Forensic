import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Viewcasesingle = () => {
  const nav = useNavigate();
  const {state}=useLocation();
  const [data, setData] = useState([]);
  const [value, setvalue] = useState([]);
  useEffect(() => {
    axios.post("http://localhost:5000/forenics/casewisesingle",{cid:state}).then((response) => {
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
  const download=(d)=>{
    var k=["txt","png","jpg","pdf","PNG"]
    axios
    .post("http://localhost:5000/forenics/downloadfile", { data: d })
    .then((response) => {
        var r=d[1].split(".")[1]
        console.log(k.includes(r))
        if(k.includes(r))
        {
          nav("/viewdownload",{state:[d[1],r]})
        }
        else
        {
          alert("file is not in viewable format")
        }
    });

  }
  return (
    <div
        // style={{
        //   backgroundImage:
        //     "url('https://blog.ipleaders.in/wp-content/uploads/2020/09/abstract-arrows_direction_process_magnifying-glass_search_investigate-100777420-large.jpg')",
        //   backgroundSize:"100% 100%",
        //   height:"100vh"
        // }}
      >  <Nav/>
      <h3 style={{color:"white",textAlign:"center"}}>Data</h3>
      <input
        type="search"
        onChange={(e) => searchdata(e.target.value)}
        className="form-select"
        placeholder="Search"
      />
      <div className="table-responsive">
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
                    {window.localStorage.getItem("role")==="admin"?<button
                      className="btn btn-primary"
                      onClick={() => deletec(d[0])}
                    >
                      delete
                    </button>:""}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => download(d)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Viewcasesingle;
