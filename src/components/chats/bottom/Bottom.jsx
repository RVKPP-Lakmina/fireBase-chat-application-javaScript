import React from "react";
import EmojiPicker from "emoji-picker-react";

const Bottom = ({
  openEmojiPicker,
  setOpenEmojiPicker,
  textMessage,
  setTextMessage,
  handleMessageSend,
  handleImageSend,
  isCurrentUserBlocked,
  isReceiverBlocked,
}) => {
  const handleEmojiClickEvents = (event) => {
    setTextMessage((prev) => prev + event.emoji);
    setOpenEmojiPicker(false);
  };

  return (
    <div className="bottom">
      <div className="icons">
        <label htmlFor="imgUploadDoc">
          <img
            src="/img.png"
            alt="img-image-avatar"
            name="img-image-avatar-icon"
          />
        </label>
        <input
          type="file"
          id="imgUploadDoc"
          onChange={handleImageSend}
          style={{ display: "none" }}
        />
        <img
          src="/camera.png"
          alt="camera-image-avatar"
          name="camera-image-avatar-icon"
        />
        <img
          src="/mic.png"
          alt="mic-image-avatar"
          name="mic-image-avatar-icon"
        />
      </div>
      <input
        type="text"
        value={textMessage}
        placeholder={
          isCurrentUserBlocked || isReceiverBlocked
            ? "You cannot send any messages"
            : "Type a message..."
        }
        onChange={(e) => setTextMessage(e.target.value)}
        disabled={isCurrentUserBlocked || isReceiverBlocked}
      />
      <div className="emoji">
        <img
          src="/emoji.png"
          alt="emoji-image-avatar"
          name="emoji-image-avatar-icon"
          onClick={() => setOpenEmojiPicker((prev) => !prev)}
        />
        <div className="picker">
          <EmojiPicker
            open={openEmojiPicker}
            onEmojiClick={handleEmojiClickEvents}
          />
        </div>
      </div>
      <button
        className="send-button"
        onClick={handleMessageSend}
        disabled={isCurrentUserBlocked || isReceiverBlocked}
      >
        {" "}
        Send{" "}
      </button>
    </div>
  );
};

export default React.memo(Bottom);
