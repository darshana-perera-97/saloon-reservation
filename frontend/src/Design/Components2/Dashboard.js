import React from "react";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const saloonId = localStorage.getItem("saloonId");

  // Redirect to login if no saloonId in localStorage (not logged in)
  if (!saloonId) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <h1>Welcome to your Dashboard</h1>
      <p>Saloon ID: {saloonId}</p>
      {/* Add more dashboard content here */}
    </div>
  );
}

export default Dashboard;
