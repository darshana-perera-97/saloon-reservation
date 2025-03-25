import React, { useEffect, useState } from "react";

const ViewAllSaloonsData = () => {
  const [saloons, setSaloons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch saloon data from the API
    fetch("http://localhost:5011/viewAllSaloonsData")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSaloons(data); // Set the data to state
      })
      .catch((error) => {
        setError(error.message); // Set error message if fetching fails
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All Saloons</h2>
      {saloons.length > 0 ? (
        <div>
          {saloons.map((saloon) => (
            <div key={saloon.saloonId} className="saloon-card">
              <h3>{saloon.saloonName}</h3>
              <p>
                <strong>Email:</strong> {saloon.email}
              </p>
              <p>
                <strong>Contact:</strong> {saloon.contact}
              </p>
              <p>
                <strong>Status:</strong> {saloon.status}
              </p>
              <p>
                <strong>Facebook Link: </strong>
                <a
                  href={saloon.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {saloon.facebookLink}
                </a>
              </p>
              <p>
                <strong>Geo Location:</strong> Lat: {saloon.geoLocation.lat},
                Lng: {saloon.geoLocation.lng}
              </p>
              <p>
                <strong>Address:</strong> {saloon.address}
              </p>
              <p>
                <strong>District:</strong> {saloon.district}
              </p>
              <p>
                <strong>City:</strong> {saloon.city}
              </p>
              <div>
                <strong>Open Hours:</strong>
                <ul>
                  {saloon.openHours.map((hour, index) => (
                    <li key={index}>
                      {hour.open} - {hour.close}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No saloons data found.</p>
      )}
    </div>
  );
};

export default ViewAllSaloonsData;
