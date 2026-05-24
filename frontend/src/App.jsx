import { useState } from "react";
import "./App.css";

function App() {

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    experience: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "https://YOUR-RENDER-URL.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      setMessage(data.message);

      setFormData({
        fullname: "",
        email: "",
        phone: "",
        experience: ""
      });

    } catch (error) {

      setMessage("Submission failed");
    }
  };

  return (

    <div className="container">

      <h1>Barista Competition</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
        >
          <option value="">
            Select Experience
          </option>

          <option value="Beginner">
            Beginner 0-1 years
          </option>

          <option value="Intermediate">
            Intermediate 2-3 years
          </option>

          <option value="Professional">
            Professional 4+ years
          </option>
        </select>

        <button type="submit">
          Register
        </button>

      </form>

      {message && <p>{message}</p>}

    </div>
  );
}

export default App;
