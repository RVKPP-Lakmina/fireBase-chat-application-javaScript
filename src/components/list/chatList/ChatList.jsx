import React, { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "../../addUser/AddUser";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { store } from "../../../lib/firebase/firebase";
import { useUserStore } from "../../../lib/stores/stores";
import { dbCollectionNames } from "../../../constants/collectionNames";
import { useChatStore } from "../../../lib/stores/chatStores";

const ChatList = () => {
  const [appMode, setAppMode] = useState(false);
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(store, dbCollectionNames.chatListCollection, currentUser.id),
      async (res) => {
        const userDetailsItem = res.data().chats;

        const allPromisses = userDetailsItem.map(async (userDetail) => {
          const userDocRef = doc(
            store,
            dbCollectionNames.userCollection,
            userDetail.receiverId
          );
          const userDocSnap = await getDoc(userDocRef);

          return { ...userDetail, user: userDocSnap.data() };
        });

        const chatData = await Promise.all(allPromisses);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    changeChat(chat.chatId, chat.user);
  };

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
        {appMode && <AddUser />}
      </div>

      <div className="chat-items">
        {chats.length > 0 &&
          chats.map((chat) => {
            return (
              <div
                className="chat-item"
                key={chat.chatId}
                onClick={() => handleSelect(chat)}
              >
                <img
                  src={chat.user.avatar || "/avatar.png"}
                  alt={chat.user.avatar || "chat-item-avatar"}
                  name={chat.user.avatar || "chat-item-avatar-icon"}
                />
                <div className="texts">
                  <span>{chat.user.userName}</span>
                  <p>{chat.lastMessage}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ChatList;
