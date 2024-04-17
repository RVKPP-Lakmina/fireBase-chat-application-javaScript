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
import uploadFiles from "../../lib/upload";

const Chats = () => {
  const [openEmojiPicker, setOpenEmojiPicker] = React.useState(false);
  const [textMessage, setTextMessage] = React.useState("");
  const toTheEndRef = React.useRef(null);
  const [chat, setChat] = React.useState([]);
  const [img, setImg] = React.useState({
    file: null,
    url: "",
  });
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
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
        console.log(res.data());
        setChat(res.data());
      }
    );

    return () => {
      onSub();
    };
  }, [chatId]);

  const handleMessageSend = async () => {
    if (textMessage === "") return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await uploadFiles(img.file);
      }

      await updateDoc(doc(store, dbCollectionNames.chatsCollection, chatId), {
        senderId: currentUser.id,
        text: textMessage,
        createdAt: new Date(),
        ...(imgUrl && { img: imgUrl }),
      });

      const userIds = [currentUser.id, user.id];

      userIds.forEach(async (id) => {
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

          userChatData.chats[chatIndex].lastMessage = textMessage;
          userChatData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
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
      setImg({
        file: null,
        url: "",
      });
    }
  };

  const handleImageSend = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const bottomProps = {
    openEmojiPicker,
    setOpenEmojiPicker,
    textMessage,
    setTextMessage,
    handleMessageSend,
    handleImageSend,
    isCurrentUserBlocked,
    isReceiverBlocked,
  };

  const centerProps = {
    toTheEndRef,
    chat,
    img,
    currentUser,
  };

  const topProps = { currentUser, user };

  return (
    <div className="chats-container">
      <Top {...topProps} />
      <Center {...centerProps} />
      <Bottom {...bottomProps} />
    </div>
  );
};

export default Chats;
