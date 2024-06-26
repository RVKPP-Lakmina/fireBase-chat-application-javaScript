import React from "react";

const Top = ({ user }) => {
  return (
    <div className="top">
      <div className="user">
        <img
          src={user?.avatar || "/avatar.png"}
          alt="user-image-avatar"
          name="user-image-avatar-icon"
        />
        <div className="texts">
          <span>{user?.userName}</span>
          <p>Active 3h ago</p>
        </div>
      </div>
      <div className="icons">
        <img
          src="/phone.png"
          alt="phone-image-avatar"
          name="phone-image-avatar-icon"
        />
        <img
          src="/video.png"
          alt="video-image-avatar"
          name="video-image-avatar-icon"
        />
        <img
          src="/info.png"
          alt="info-image-avatar"
          name="info-image-avatar-icon"
        />
      </div>
    </div>
  );
};

export default React.memo(Top);
