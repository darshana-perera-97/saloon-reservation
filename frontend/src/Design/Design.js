import React from "react";
import CreateSaloon from "./Components/CreateSaloon";
import ViewAllSaloons from "./Components/ViewAllSaloons";
import SaloonLogin from "./Components2/SaloonLogin";
import Dashboard from "./Components2/Dashboard";
import SaloonSetup from "./Components2/SaloonSetup";
import ViewAllSaloonsData from "./Components2/ViewAllSaloonsData";

export default function Design() {
  return (
    <div>
      {/* <CreateSaloon /> */}
      {/* <ViewAllSaloons /> */}
      <SaloonLogin />
      <Dashboard />
      <SaloonSetup />
      <ViewAllSaloonsData />
    </div>
  );
}
