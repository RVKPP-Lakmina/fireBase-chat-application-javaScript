import React, { useEffect } from "react";
import "./chats.css";
import Bottom from "./bottom/Bottom";
import Top from "./top/Top";
import Center from "./center/Center";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { store } from "../../lib/firebase/firebase";
import { dbCollectionNames } from "../../constants/collectionNames";
import { useChatStore } from "../../lib/stores/chatStores";
import { useUserStore } from "../../lib/stores/stores";

const Chats = () => {
  const [openEmojiPicker, setOpenEmojiPicker] = React.useState(false);
  const [textMessage, setTextMessage] = React.useState("");
  const toTheEndRef = React.useRef(null);
  const [chat, setChat] = React.useState([]);
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    toTheEndRef.current?.scrollIntoView({ behavior: "smooth" });

    return () => {
      toTheEndRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onSub = onSnapshot(
      doc(store, dbCollectionNames.chatsCollection, chatId),
      (res) => {
        console.log(res.data())
        setChat(res.data());
      }
    );

    return () => {
      onSub();
    };
  }, [chatId]);

  const handleMessageSend = async () => {
    if (textMessage === "") return;

    try {
      await updateDoc(doc(store, dbCollectionNames.chatsCollection, chatId), {
        senderId: currentUser.id,
        text: textMessage,
        createdAt: new Date(),
      });

      const chatIds = [currentUser.id, user.id];

      chatIds.forEach(async (id) => {
        const userChatRef = doc(
          store,
          dbCollectionNames.chatListCollection,
          id
        );
        const userChatSnapshots = await getDoc(userChatRef);

        if (userChatSnapshots.exists()) {
          const userChatData = userChatSnapshots.data();

          const chatIndex = userChatData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          console.log(userChatData)

          userChatData.chats[chatIndex].lastMessage = textMessage;
          userChatData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatData.chats,
          });
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setTextMessage("");
    }
  };

  const bottomProps = {
    openEmojiPicker,
    setOpenEmojiPicker,
    textMessage,
    setTextMessage,
    handleMessageSend,
  };

  const centerProps = {
    toTheEndRef,
    chat,
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
