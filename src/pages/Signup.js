import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    otherName: "",
    phone: "",
    country: "",
    state: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Inline countries + states
  const countries = {
    Nigeria: ["Lagos", "Abuja", "Oyo", "Rivers"],
    USA: ["California", "Texas", "New York"],
    UK: ["London", "Manchester", "Birmingham"],
    Canada: ["Ontario", "Quebec", "Alberta"],
    Ghana: ["Accra", "Kumasi", "Takoradi"],
    Kenya: ["Nairobi", "Mombasa", "Kisumu"],
    // Add more countries as needed
  };

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/checkout");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validate = () => {
    let newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (!validate()) return;

    // Save user in localStorage
// For header / profile name
localStorage.setItem("username", formData.firstName);

// For profile page details
localStorage.setItem("userProfile", JSON.stringify(formData));

localStorage.setItem("isLoggedIn", "true");


    navigate("/checkout");
  };

  const selectedCountry = countries[formData.country];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; font-family: Arial, sans-serif; }
        body { background: #fcb59bff; }
        .page { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .container { background: #fd6128; width: 100%; max-width: 420px; padding: 30px 25px; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
        .avatar { width: 70px; height: 70px; background: #4aa3df; border-radius: 8px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; }
        h2 { text-align: center; margin-bottom: 8px; }
        .subtitle { text-align: center; color: #777; margin-bottom: 20px; font-size: 14px; }
        input, select, textarea { width: 100%; padding: 12px; margin-bottom: 12px; border-radius: 5px; border: 1px solid #ddd; font-size: 14px; }
        textarea { resize: none; }
.signup-btn {
  width: 100%;
  padding: 14px;
  background: #1e90ff;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(30, 144, 255, 0.6),
              0 0 20px rgba(30, 144, 255, 0.4);
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.signup-btn:hover {
  box-shadow: 0 0 15px rgba(30, 144, 255, 0.9),
              0 0 30px rgba(30, 144, 255, 0.7);
  transform: translateY(-1px);
}

        .login-text { text-align: center; font-size: 13px; margin-top: 10px; }
        .login-text a { color: #4aa3df; text-decoration: none; font-weight: bold; }
        small { color: red; display: block; margin-bottom: 8px; }
      `}</style>

      <div className="page">
        <div className="container">
          <div className="avatar">👤</div>

          <h2>Create personal Account</h2>
          <p className="subtitle">Fill in your personal details</p>

          {/* Metadata Fields */}
          <input name="firstName" placeholder="First Name" onChange={handleChange} />
          {errors.firstName && <small>{errors.firstName}</small>}

          <input name="otherName" placeholder="Other Name" onChange={handleChange} />

          <input name="phone" placeholder="Phone Number" onChange={handleChange} />
          {errors.phone && <small>{errors.phone}</small>}

          <select name="country" onChange={handleChange}>
            <option value="">Select Country</option>
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <small>{errors.country}</small>}

          <select name="state" onChange={handleChange}>
            <option value="">Select State / City</option>
            {selectedCountry?.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <small>{errors.state}</small>}

          <textarea name="address" rows="3" placeholder="Home Address" onChange={handleChange} />
          {errors.address && <small>{errors.address}</small>}

          {/* Auth Fields */}
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          {errors.email && <small>{errors.email}</small>}

          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          {errors.password && <small>{errors.password}</small>}

          <input type="password" name="confirmPassword" placeholder="Retype Password" onChange={handleChange} />
          {errors.confirmPassword && <small>{errors.confirmPassword}</small>}

          <button className="signup-btn" onClick={handleSignUp}>SIGN UP</button>

          <div className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}
