
import axios from "axios";
import { useState } from "react";
import { useLocation,useNavigate  } from "react-router-dom";
const Updatearea = () => {
var rx=0;
const {state}=useLocation();
const nav = useNavigate();
const [aid, setaid] = useState(state[rx++]);
const [area, setarea] = useState(state[rx++]);
const [pincode, setpincode] = useState(state[rx++]);
const submitdata = () => {
 const value={aid:aid,area:area,pincode:pincode};
axios.post("http://localhost:5000/forenics/updatearea", value).then
    (response=>{
      nav('/viewarea')
    })};
return (
<div>
    <h1>Add area</h1>
        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setaid(e.target.value)}
            value={aid}
            placeholder="Enter aid"
          />
          <label htmlFor="aid">aid</label>
        </div>

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

 <input
          type="submit"
          className="btn btn-primary"
          onClick={submitdata}
          style={{ width: "100%" }}
        />
</div>
)
}
export default Updatearea;
