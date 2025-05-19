import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Viewdatacase = () => {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [value, setvalue] = useState([]);
  useEffect(() => {
    axios.post("http://localhost:5000/forenics/casewise").then((response) => {
      setData(response.data);
      setvalue(response.data);
    });
  }, []);
  const viewdata = (e) => {
    nav("/viewcasesingle", { state: e[0] });
  };
  const deletec = (e) => {
    axios
      .post("http://localhost:5000/forenics/bycase", { id: e })
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
      .then((response) => {});
  };
  return (
    <div
    style={{background:"#181818",backgroundSize:"100% 100%",
    height:"100vh"}}
        // style={{
        //   backgroundImage:
        //     "url('https://png.pngtree.com/background/20230528/original/pngtree-this-video-shows-the-office-office-in-a-game-picture-image_2772502.jpg')",
        //   backgroundSize:"100% 100%",
        //   height:"100vh"
        // }}
      >  <Nav />
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
                 
                 
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => deletec(d[0])}
                    >
                      delete
                    </button>
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
export default Viewdatacase;
