import React from "react";
import "./addUser.css";

const AddUser = () => {
  return (
    <div className="add-user">
      <form>
        <input type="text" placeholder="Name" name={"userName"} />
        <button>Search</button>
      </form>
      <div className="user">
        <div className="detail">
          <img src={"/avatar.png"} alt="uploaded image" />
          <div className="texts">
            <span>Jane Doe</span>
          </div>
        </div>
        <button>Add User</button>
      </div>
    </div>
  );
};

export default AddUser;
