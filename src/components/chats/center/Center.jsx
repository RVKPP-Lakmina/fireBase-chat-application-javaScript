import React from "react";

const Center = ({ toTheEndRef, chat, img, currentUser }) => {
  console.log(chat);
  return (
    <div className="center">
      {chat?.messages?.map((message) => {
        <div
          className={`message ${
            message.senderId === currentUser.id ? "own" : ""
          }`}
          key={message.createdAt}
        >
          {message.img && (
            <img
              src={message.img}
              alt={message.img.toString() + "-user-avatar-image"}
              name={message.img.toString() + "-user-avatar-img-icon"}
            />
          )}
          <div className="text">
            <p>{message.text}</p>
            {/* <span>1 min ago</span> */}
          </div>
        </div>;
      })}
      {img.url && (
        <div className="message own">
          <div className="texts">
            <img src={img.url} alt="" />
          </div>
        </div>
      )}
      <div ref={toTheEndRef}></div>
    </div>
  );
};

export default React.memo(Center);
