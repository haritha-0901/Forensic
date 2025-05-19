import Updatedata from "./updatedata";
import Viewdata from "./viewdata";
import Adddata from "./adddata";
import Updatetransactiondata from "./updatetransactiondata";
import Viewtransactiondata from "./viewtransactiondata";
import Addtransactiondata from "./addtransactiondata";
import Updateusers from "./updateusers";
import Viewusers from "./viewusers";
import Addusers from "./addusers";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Viewtransactiondatasingle from "./viewtransactiondatasingle";
import Viewdatacase from "./viewdatacase";
import Viewcasesingle from "./viewcasesingle";
import Register from "./Register";
import Viewdatabyid from "./adddatabyid";
import Requestcase from "./Requestcase";
import Viewrequestcase from "./Viewrequestcase";
import Viewrequestadmin from "./Viewrequestadmin";
import Viewdownload from "./Viewdownload";
import Updatearea from "./updatearea";
import Viewarea from "./viewarea";
import Addarea from "./addarea";
import Adddatauser from "./adddatauser";
import Viewrequestcasebyid from "./Viewrequestcasebyid";
import Viewdatacasebyid from "./Viewrequestcasebyid";
import Checkcam from "./Facecheck/Checkcam";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/checkcam" element={<Checkcam />} />
        <Route path="/updatedata" element={<Updatedata />} />
        <Route path="/viewdata" element={<Viewdata />} />
        <Route path="/adddata" element={<Adddata />} />
        <Route path="/adddatauser" element={<Adddatauser />} />
        <Route
          path="/updatetransactiondata"
          element={<Updatetransactiondata />}
        />
        <Route path="/viewtransactiondata" element={<Viewtransactiondata />} />
        <Route path="/addtransactiondata" element={<Addtransactiondata />} />
        <Route path="/updateusers" element={<Updateusers />} />
        <Route path="/viewusers" element={<Viewusers />} />
        <Route path="/addusers" element={<Addusers />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/viewtransactiondatasingle"
          element={<Viewtransactiondatasingle />}
        />
        <Route path="/viewcase" element={<Viewdatacase />} />
        <Route path="/viewcasesingle" element={<Viewcasesingle />} />
        <Route path="/register" element={<Register />} />
        <Route path="/viewdatabyid" element={<Viewdatabyid />} />
        <Route path="/reqcasedetails" element={<Requestcase />} />
        <Route path="/viewrequestcase" element={<Viewrequestcase />} />
        <Route path="/viewrequestadmin" element={<Viewrequestadmin />} />
        <Route path="/viewdownload" element={<Viewdownload />} />

        <Route path="/updatearea" element={<Updatearea />} />
        <Route path="/viewarea" element={<Viewarea />} />
        <Route path="/addarea" element={<Addarea />} />
        <Route path="/viewdatacasebyid" element={<Viewdatacasebyid />} />
      </Routes>
    </>
  );
};

export default App;
