import React, { useState } from "react";
import "./chatList.css";
import AddUser from "../../addUser/AddUser";

const ChatList = () => {
  const [appMode, setAppMode] = useState(false);

  return (
    <div className="chat-list">
      <div className="search">
        <div className="search-bar">
          <img src="/search.png" alt="search" name="search-icon" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          className="add"
          src={appMode ? "/minus.png" : "/plus.png"}
          alt="add"
          name="add-icon"
          onClick={() => setAppMode((prev) => !prev)}
        />
        <AddUser/>
      </div>

      <div className="chat-items">
        <div className="chat-item">
          <img
            src="/avatar.png"
            alt="chat-item-avatar"
            name="chat-item-avatar-icon"
          />
          <div className="texts">
            <span>Jane Doe</span>
            <p>message</p>
          </div>
        </div>
        <div className="chat-item">
          <img
            src="/avatar.png"
            alt="chat-item-avatar"
            name="chat-item-avatar-icon"
          />
          <div className="texts">
            <span>Jane Doe</span>
            <p>message</p>
          </div>
        </div>
        <div className="chat-item">
          <img
            src="/avatar.png"
            alt="chat-item-avatar"
            name="chat-item-avatar-icon"
          />
          <div className="texts">
            <span>Jane Doe</span>
            <p>message</p>
          </div>
        </div>
        <div className="chat-item">
          <img
            src="/avatar.png"
            alt="chat-item-avatar"
            name="chat-item-avatar-icon"
          />
          <div className="texts">
            <span>Jane Doe</span>
            <p>message</p>
          </div>
        </div>
        <div className="chat-item">
          <img
            src="/avatar.png"
            alt="chat-item-avatar"
            name="chat-item-avatar-icon"
          />
          <div className="texts">
            <span>Jane Doe</span>
            <p>message</p>
          </div>
        </div>
        <div className="chat-item">
          <img
            src="/avatar.png"
            alt="chat-item-avatar"
            name="chat-item-avatar-icon"
          />
          <div className="texts">
            <span>Jane Doe</span>
            <p>message</p>
          </div>
        </div>
        <div className="chat-item">
          <img
            src="/avatar.png"
            alt="chat-item-avatar"
            name="chat-item-avatar-icon"
          />
          <div className="texts">
            <span>Jane Doe</span>
            <p>message</p>
          </div>
        </div>
        <div className="chat-item">
          <img
            src="/avatar.png"
            alt="chat-item-avatar"
            name="chat-item-avatar-icon"
          />
          <div className="texts">
            <span>Jane Doe</span>
            <p>message</p>
          </div>
        </div>
        <div className="chat-item">
          <img
            src="/avatar.png"
            alt="chat-item-avatar"
            name="chat-item-avatar-icon"
          />
          <div className="texts">
            <span>Jane Doe</span>
            <p>message</p>
          </div>
        </div>
        <div className="chat-item">
          <img
            src="/avatar.png"
            alt="chat-item-avatar"
            name="chat-item-avatar-icon"
          />
          <div className="texts">
            <span>Jane Doe</span>
            <p>message</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
