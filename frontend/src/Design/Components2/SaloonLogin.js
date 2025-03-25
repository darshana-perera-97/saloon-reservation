import React, { useState, useEffect } from "react";

function SaloonLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saloonId, setSaloonId] = useState(null); // State to check if saloonId exists in localStorage
  const [saloonName, setSaloonName] = useState(null); // Store saloonName

  useEffect(() => {
    // Check if saloonId exists in localStorage
    const storedSaloonId = localStorage.getItem("saloonId");
    if (storedSaloonId) {
      setSaloonId(storedSaloonId);
      setSaloonName(localStorage.getItem("saloonName"));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Clear previous error message
    setError("");

    // Simple validation for email and password
    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }

    // Make the API call to login
    fetch("http://localhost:5011/loginSaloon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Login successful.") {
          // Save saloonId to local storage
          localStorage.setItem("saloonId", data.saloonId);
          localStorage.setItem("saloonName", data.saloonName);
          localStorage.setItem("status", data.status);

          // Update state
          setSaloonId(data.saloonId);
          setSaloonName(data.saloonName);
        } else {
          setError(data.message || "Failed to login.");
        }
      })
      .catch((err) => {
        setError("Error during login.");
        console.error(err);
      });
  };

  const handleNavigateToDashboard = () => {
    // Handle navigation to Dashboard
    // If you want to redirect to another page, you can use window.location or window.location.href
    alert("Redirecting to Dashboard...");
    // For now, just show an alert or handle as you prefer
  };

  return (
    <div className="container">
      {/* Check if saloonId exists in localStorage */}
      {saloonId ? (
        <div className="card p-4" style={{ maxWidth: "400px", margin: "auto" }}>
          <h3 className="text-center">Welcome {saloonName}</h3>
          <p className="text-center">Saloon ID: {saloonId}</p>
          <button
            className="btn btn-primary w-100"
            onClick={handleNavigateToDashboard}
          >
            Navigate to Dashboard
          </button>
        </div>
      ) : (
        <div className="card p-4" style={{ maxWidth: "400px", margin: "auto" }}>
          <h3 className="text-center">Saloon Login</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SaloonLogin;
