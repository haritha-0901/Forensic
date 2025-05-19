import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import "./area.css";
const Requestcase = () => {
  const [caseid, setcaseid] = useState("");
  const data = JSON.parse(window.localStorage.getItem("data"));

  const [value, setvalue] = useState([]);
  const id = window.localStorage.getItem("id");
  useEffect(() => {
    axios.post("http://localhost:5000/forenics/casewise").then((response) => {
      const flatArray = response.data.flat();
      setvalue(flatArray);
    });
  }, []);
  console.log(value)
  return (
    <>
      <Nav />
      <div
      style={{background:"#181818",backgroundSize:"100% 100%",
      height:"100vh"}}
        // style={{
        //   backgroundImage:
        //     "url('https://blog.ipleaders.in/wp-content/uploads/2020/09/abstract-arrows_direction_process_magnifying-glass_search_investigate-100777420-large.jpg')",
        //   backgroundSize:"100% 100%",
        //   height:"100vh"
        // }}
      >
        <div
        
        >

<div class="signin"> 

    <div class="content"> 

     <h2>Request Access</h2> 

     <div class="form"> 
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

      
    
 </div>
 <div class="inputBox"> 
      <button
            type="submit"
            style={{background:"#0f0"}}
            className="btn"
            onClick={() => {
              if (value.includes(caseid)) {
                axios
                  .post("http://localhost:5000/forenics/requestforcase", { caseid: caseid,userid:id })
                  .then((response) => {
                    alert("request success")
                    setcaseid("")
                  });
              }
              else
              {
                alert("wrong case id")
              }
            }}
          
          >
            Upload
          </button>
        </div>
     </div> 

    </div> 
         
        </div>
      </div>
    </>
  );
};
export default Requestcase;
