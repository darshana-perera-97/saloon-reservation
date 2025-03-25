import { useState } from "react";

function EditSaloon({ saloon, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    saloonName: saloon.saloonName,
    email: saloon.email,
    contact: saloon.contact,
    password: saloon.password,
    status: saloon.status,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.saloonName ||
      !formData.email ||
      !formData.contact ||
      !formData.password ||
      !formData.status
    ) {
      setError("All fields are required.");
      return;
    }

    fetch(`http://localhost:5011/editSaloon/${saloon.saloonId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Saloon updated successfully!") {
          onUpdate({ ...saloon, ...formData });
        } else {
          setError(data.message || "Failed to update.");
        }
      })
      .catch((err) => setError("Error updating saloon."));
  };

  return (
    <div className="modal-overlay">
      <div className="card p-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h4>Edit Saloon</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Saloon Name"
            name="saloonName"
            value={formData.saloonName}
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            placeholder="Contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <select
            className="form-select mb-3"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Live">Live</option>
            <option value="Hibernate">Hibernate</option>
            <option value="Suspended">Suspended</option>
          </select>
          <button className="btn btn-success me-2" type="submit">
            Save
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditSaloon;
