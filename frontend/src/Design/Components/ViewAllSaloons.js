import { useEffect, useState } from "react";
import EditSaloon from "./EditSaloon";

function ViewAllSaloons() {
  const [saloons, setSaloons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editSaloon, setEditSaloon] = useState(null);

  // Fetch saloons on component mount
  useEffect(() => {
    fetch("http://localhost:5011/viewAllSaloons")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSaloons(data);
        } else {
          setError(data.message || "No saloons found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to fetch saloons.");
        setLoading(false);
      });
  }, []);

  // Update saloon list after edit
  const handleUpdate = (updatedSaloon) => {
    const updatedList = saloons.map((saloon) =>
      saloon.saloonId === updatedSaloon.saloonId ? updatedSaloon : saloon
    );
    setSaloons(updatedList);
    setEditSaloon(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Saloons</h2>

      {loading ? (
        <div className="text-center">Loading saloons...</div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Saloon Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {saloons.map((saloon, index) => (
                <tr key={saloon.saloonId}>
                  <td>{index + 1}</td>
                  <td>{saloon.saloonName}</td>
                  <td>{saloon.email}</td>
                  <td>{saloon.contact}</td>
                  <td>
                    <span
                      className={`badge ${
                        saloon.status === "Live"
                          ? "bg-success"
                          : saloon.status === "Hibernate"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {saloon.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => setEditSaloon(saloon)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editSaloon && (
            <EditSaloon
              saloon={editSaloon}
              onUpdate={handleUpdate}
              onCancel={() => setEditSaloon(null)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ViewAllSaloons;
