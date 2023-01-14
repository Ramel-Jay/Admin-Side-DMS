import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CashUpdateRequest from "./pages/CashUpdateRequest/CashUpdateRequest";
import CashDisapprove from './pages/CashDisapprove/CashDisapprove';
import CashApprove from "./pages/CashApprove/CashApprove";
import Home from "./pages/Home/Home";
import Dashboard from './pages/Dashboard/Dashboard';
import Post from "./pages/Post";
import InKindApprove from "./pages/InKindApprove/InKindApprove";
import InKindDisapprove from "./pages/InKindDisapprove/InKindDisapprove";
import InKindUpdateRequest from "./pages/InKindUpdateRequest/InKindUpdateRequest";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import InvalidRoute from "./pages/InvalidRoute";
import LogOut from "./pages/LogOut";

function App() {


  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/cashdisapprove" exact element={<CashDisapprove />} />
          <Route path="/cashupdaterequest/:id" exact element={<CashUpdateRequest />} />
          <Route path="/cashapprove" exact element={<CashApprove />} />
          <Route path="/post" exact element={<Post />} />
          <Route path="/inkindapprove" exact element={<InKindApprove />} />
          <Route path="/inkinddisapprove" exact element={<InKindDisapprove/>}/>
          <Route path="/inkindupdaterequest/:id" exact element={<InKindUpdateRequest />}/>
          <Route path="/registration" exact element={<Registration />}/>
          <Route path="/logout" exact element={<LogOut />}/>
          <Route path="/login" exact element={<Login />}/>
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="*" element={<InvalidRoute />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
