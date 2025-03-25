import { useState } from "react";

function CreateSaloon() {
  const [formData, setFormData] = useState({
    saloonName: "",
    email: "",
    contact: "",
    password: "",
  });
  const [responseMsg, setResponseMsg] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5011/createSaloon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setResponseMsg(`✅ ${data.message} | Saloon ID: ${data.saloonId}`);
      setFormData({ saloonName: "", email: "", contact: "", password: "" });
    } catch (error) {
      setResponseMsg(`❌ ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Create Saloon</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Saloon Name</label>
            <input
              type="text"
              className="form-control"
              name="saloonName"
              placeholder="Enter saloon name"
              value={formData.saloonName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contact</label>
            <input
              type="text"
              className="form-control"
              name="contact"
              placeholder="Enter contact number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Create Saloon
          </button>
        </form>

        {responseMsg && (
          <div
            className={`alert mt-3 ${
              responseMsg.startsWith("✅") ? "alert-success" : "alert-danger"
            }`}
          >
            {responseMsg}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateSaloon;
