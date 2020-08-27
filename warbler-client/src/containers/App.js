import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar";
import Routing from "./Routing";
function App() {
  return (
      <Router>
        <div className="onboarding">
          <NavBar/>
          <Routing/>
        </div>
      </Router>
  );
}

export default App;
