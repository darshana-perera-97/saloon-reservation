import React, { useEffect, useState } from "react";

function Dashboard() {
  const [saloonData, setSaloonData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the saloonId from localStorage
    const saloonId = localStorage.getItem("saloonId");

    if (!saloonId) {
      setError("Saloon not logged in. Please log in first.");
      setLoading(false);
      return;
    }

    // Fetch the saloon data from the backend using the saloonId
    fetch(`http://localhost:5011/getSaloonData/${saloonId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setError(data.message); // If there's an error from the backend
        } else {
          setSaloonData(data); // Set the saloon data
        }
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((err) => {
        setError("Error fetching data.");
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h3>Saloon Dashboard</h3>
      <div className="card p-4">
        <h4>Saloon Name: {saloonData?.saloonName}</h4>
        <p>
          <strong>Email:</strong> {saloonData?.email}
        </p>
        <p>
          <strong>Contact:</strong> {saloonData?.contact}
        </p>
        <p>
          <strong>Status:</strong> {saloonData?.status}
        </p>

        {/* Display other relevant information */}
        {/* Example: */}
        <div className="mt-3">
          <h5>Services Offered:</h5>
          <ul>
            {saloonData?.services?.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>

        {/* Button to navigate back to login or logout */}
        <button
          onClick={() => {
            localStorage.removeItem("saloonId");
            localStorage.removeItem("saloonName");
            window.location.href = "/login"; // Redirect to login page or home page
          }}
          className="btn btn-danger mt-3"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
