import axios from "axios";
import { useState } from "react";
import Nav from "./Nav";
import "./area.css";
const Addarea = () => {
  const [area, setarea] = useState("");
  const [pincode, setpincode] = useState("");
  const submitdata = () => {
    const value = { area: area, pincode: pincode };
    axios
      .post("http://localhost:5000/forenics/insertarea", value)
      .then((res) => {
        alert("success");
        setarea("");
        setpincode("");
      });
  };
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

<div class="signin"> 

<div class="content"> 

<h2>Add area</h2>

 <div class="form"> 
 <div className="form-floating mb-3 mt-3">
 <input
              type="text"
              className="form-control"
              onChange={(e) => setarea(e.target.value)}
              value={area}
              placeholder="Enter area"
            />
            <label htmlFor="area">area</label>
   </div>

   <div className="form-floating mb-3 mt-3">
   <input
              type="text"
              className="form-control"
              onChange={(e) => setpincode(e.target.value)}
              value={pincode}
              placeholder="Enter pincode"
            />
            <label htmlFor="pincode">pincode</label>
   </div> 
  <div class="inputBox"> 
  <input
            type="submit"
            className="btn"
            onClick={submitdata}
            style={{ width: "100%" }}
          />
    </div>
</div>
 </div> 

</div> 
      </div>
      
    </>
  );
};
export default Addarea;
