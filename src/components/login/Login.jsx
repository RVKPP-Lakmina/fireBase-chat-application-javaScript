import { toast } from "react-toastify";
import "./login.css";

import React from "react";

const Login = () => {
  const [avatar, setAvatar] = React.useState({
    file: null,
    url: "",
  });

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Login Successful");
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="example@email.com"
            name={"userEmail"}
          />
          <input type="password" placeholder="Password" name="userPassword" />
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="seporator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form>
          <label htmlFor="user-profile-picture">
            <img src={avatar.url || "/avatar.png"} alt="uploaded image" />
            Upload Image
          </label>
          <input
            type="file"
            id="user-profile-picture"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <input type="text" placeholder="Your Name" name={"userName"} />
          <input
            type="email"
            placeholder="example@email.com"
            name={"userEmail"}
          />
          <input type="password" placeholder="Password" name="userPassword" />
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
