import React from "react";
import "./userInfo.css";
import { useUserStore } from "../../../lib/stores/stores";

const UserInfo = () => {
  const { currentUser } = useUserStore();

  return (
    <div className="user-info">
      <div className="user">
        <img src={currentUser.avatar ? currentUser.avatar : "./avatar.png"} />
        <h2>{currentUser.userName}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" />
        <img src="./video.png" />
        <img src="./edit.png" />
      </div>
    </div>
  );
};

export default UserInfo;
