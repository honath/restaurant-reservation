import React from "react";
import Menu from "../common/Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid">
      <div className="row h-100 vh-100">
        <div className="col-md-2 side-bar p-0">
          <Menu />
        </div>
        <div className="col h-100 p-0">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
