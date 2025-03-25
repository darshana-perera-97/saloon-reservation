import React, { useState, useEffect } from "react";

// 25 districts in Sri Lanka
const districts = [
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Colombo",
  "Galle",
  "Gampaha",
  "Hambantota",
  "Jaffna",
  "Kalutara",
  "Kandy",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matale",
  "Matara",
  "Moneragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya",
];

// Cities for each district
const cities = {
  Colombo: ["Colombo 1", "Colombo 2", "Colombo 3", "Colombo 4", "Colombo 5"],
  Gampaha: ["Gampaha City", "Walpola", "Negombo", "Kadawatha", "Mirigama"],
  Galle: ["Galle City", "Ambalangoda", "Habaraduwa", "Bentota", "Unawatuna"],
  Kandy: ["Kandy City", "Peradeniya", "Nittambuwa", "Mawanella", "Gampola"],
  Badulla: ["Badulla City", "Bimbar", "Passara", "Hali-ela", "Ella"],
  Anuradhapura: [
    "Anuradhapura City",
    "Mihintale",
    "Rambewa",
    "Kekirawa",
    "Puttalam",
  ],
  Jaffna: ["Jaffna City", "Chunnakam", "Point Pedro", "Tellippalai", "Manipay"],
  Matale: ["Matale City", "Dambulla", "Rambukkana", "Kundasale", "Galewela"],
  Kalutara: ["Kalutara City", "Beruwala", "Aluthgama", "Panadura", "Moratuwa"],
  Vavuniya: [
    "Vavuniya City",
    "Mulliyan",
    "Thandikulam",
    "Vavuniya North",
    "Koviladi",
  ],
  Trincomalee: [
    "Trincomalee City",
    "Kantalai",
    "Muttur",
    "Kinniya",
    "Serunuwara",
  ],
  Ratnapura: [
    "Ratnapura City",
    "Kiriella",
    "Agalawatta",
    "Balangoda",
    "Kolonna",
  ],
  Polonnaruwa: [
    "Polonnaruwa City",
    "Minneriya",
    "Dimbulagala",
    "Habarana",
    "Laggala",
  ],
  Puttalam: ["Puttalam City", "Chilaw", "Mannar", "Kalpitiya", "Muttur"],
  Moneragala: [
    "Moneragala City",
    "Buttala",
    "Kataragama",
    "Udawalawe",
    "Damahana",
  ],
  Mullaitivu: [
    "Mullaitivu City",
    "Vattuvakal",
    "Kokilai",
    "Oddusuddan",
    "Puthukkudiyiruppu",
  ],
  Hambantota: [
    "Hambantota City",
    "Tangalle",
    "Weeraketiya",
    "Ambalantota",
    "Beliatta",
  ],
  Kegalle: [
    "Kegalle City",
    "Mawanella",
    "Warakapola",
    "Yatiyanthota",
    "Ruwanwella",
  ],
  "Nuwara Eliya": [
    "Nuwara Eliya City",
    "Ambewela",
    "Ramboda",
    "Horton Plains",
    "Wattappola",
  ],
  Kilinochchi: [
    "Kilinochchi City",
    "Pooneryn",
    "Karachchi",
    "Iranamadu",
    "Mulliyan",
  ],
  Kurunegala: ["Kurunegala City", "Maho", "Puttalam", "Dambulla", "Galgamuwa"],
  Mannar: ["Mannar City", "Musali", "Nanattan", "Mannar North", "Periyamadu"],
  Matara: ["Matara City", "Tissamaharama", "Kirinda", "Akuressa", "Dikwella"],
  Kegalle: [
    "Kegalle City",
    "Warakapola",
    "Mawanella",
    "Yatiyanthota",
    "Ruwanwella",
  ],
  Batticaloa: [
    "Batticaloa City",
    "Kalmunai",
    "Eravur",
    "Valaichchenai",
    "Chenkalady",
  ],
  Ampara: [
    "Ampara City",
    "Kalmunai",
    "Samanthurai",
    "Pottuvil",
    "Addalachchenai",
  ],
};

// Days of the week
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const SaloonSetup = () => {
  const [saloonId, setSaloonId] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [geoLocation, setGeoLocation] = useState({ lat: "", lng: "" });
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [openHours, setOpenHours] = useState(
    daysOfWeek.map(() => ({ open: "08:00", close: "18:00" })) // Default values for each day
  );

  // Fetch saloonId from local storage
  useEffect(() => {
    const storedSaloonId = localStorage.getItem("saloonId");
    if (storedSaloonId) {
      setSaloonId(storedSaloonId);
    }
  }, []);

  // Handle district selection
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    setCity(""); // Reset city when district changes
  };

  // Handle city selection
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Handle open hours change
  const handleOpenHourChange = (dayIndex, field, value) => {
    const updatedOpenHours = [...openHours];
    updatedOpenHours[dayIndex][field] = value;
    setOpenHours(updatedOpenHours);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !district ||
      !city ||
      !address ||
      !geoLocation.lat ||
      !geoLocation.lng
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    const saloonDetails = {
      saloonId, // From localStorage
      facebookLink: facebookLink || "", // Optional
      geoLocation: {
        lat: parseFloat(geoLocation.lat),
        lng: parseFloat(geoLocation.lng),
      },
      address,
      district,
      city,
      openHours,
    };

    console.log("Sending Data:", saloonDetails); // For debugging

    // Send saloon details to the backend API
    fetch("http://localhost:5011/createSaloonSetup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saloonDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Saloon setup created:", data);
        alert("Saloon setup created successfully!");
        // Clear form if needed
        setFacebookLink("");
        setGeoLocation({ lat: "", lng: "" });
        setAddress("");
        setDistrict("");
        setCity("");
        setOpenHours(daysOfWeek.map(() => ({ open: "08:00", close: "18:00" })));
      })
      .catch((error) => {
        console.error("Error creating saloon setup:", error);
        alert("Error creating saloon setup. Please try again.");
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Saloon Setup</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Facebook Link */}
          <div className="form-group col-md-6">
            <label>Facebook Link (optional)</label>
            <input
              type="url"
              className="form-control"
              value={facebookLink}
              onChange={(e) => setFacebookLink(e.target.value)}
            />
          </div>

          {/* Geo Location */}
          <div className="form-group col-md-6">
            <label>Geo Location</label>
            <div className="d-flex">
              <input
                type="number"
                className="form-control mr-2"
                placeholder="Latitude"
                value={geoLocation.lat}
                onChange={(e) =>
                  setGeoLocation({ ...geoLocation, lat: e.target.value })
                }
              />
              <input
                type="number"
                className="form-control"
                placeholder="Longitude"
                value={geoLocation.lng}
                onChange={(e) =>
                  setGeoLocation({ ...geoLocation, lng: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* District Dropdown */}
        <div className="form-group">
          <label>District</label>
          <select
            className="form-control"
            value={district}
            onChange={handleDistrictChange}
          >
            <option value="">Select District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* City Dropdown */}
        {district && (
          <div className="form-group">
            <label>City</label>
            <select
              className="form-control"
              value={city}
              onChange={handleCityChange}
            >
              <option value="">Select City</option>
              {cities[district] &&
                cities[district].map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Open Hours */}
        <div className="form-group">
          <label>Open Hours</label>
          {openHours.map((day, index) => (
            <div key={index} className="d-flex mb-3">
              <div className="form-group mr-2">
                <label>{daysOfWeek[index]}</label>
                <input
                  type="time"
                  className="form-control"
                  value={day.open}
                  onChange={(e) =>
                    handleOpenHourChange(index, "open", e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label>Close Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={day.close}
                  onChange={(e) =>
                    handleOpenHourChange(index, "close", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Save Saloon Setup
        </button>
      </form>
    </div>
  );
};

export default SaloonSetup;
