import { NavLink, useLocation } from "react-router-dom";

const Viewdownload = () => {
  const { state } = useLocation();
  console.log(state);
  var r = "http://localhost:5000/static/decrypt/dedownload" + state[0];
  return (
    <>
    <NavLink to="/viewcase" style={{backgroundColor:"white"}}>Home</NavLink>
      {state[1] === "txt" || state[1] === "pdf" ? (
        <object data={r} width="300" height="200"></object>
      ) : state[1] === "png" || state[1] === "jpg" || state[1] === "jpeg" ? (
        <img src={r} alt="unable to load image" />
      ) : (
        ""
      )}
    </>
  );
};

export default Viewdownload;
