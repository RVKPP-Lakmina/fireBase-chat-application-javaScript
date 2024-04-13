import React, { useEffect } from "react";
import "./chats.css";
import Bottom from "./bottom/Bottom";
import Top from "./top/Top";
import Center from "./center/Center";

const Chats = () => {
  const [openEmojiPicker, setOpenEmojiPicker] = React.useState(false);
  const [textMessage, setTextMessage] = React.useState("");
  const toTheEndRef = React.useRef(null);

  useEffect(() => {
    toTheEndRef.current?.scrollIntoView({ behavior: "smooth" });

    return () => {
      toTheEndRef.current = null;
    };
  }, []);

  const bottomProps = {
    openEmojiPicker,
    setOpenEmojiPicker,
    textMessage,
    setTextMessage,
  };

  const centerProps = {
    toTheEndRef,
  };

  return (
    <div className="chats-container">
      <Top />
      <Center {...centerProps} />
      <Bottom {...bottomProps} />
    </div>
  );
};

export default Chats;
