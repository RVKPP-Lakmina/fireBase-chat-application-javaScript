import React, { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "../../addUser/AddUser";
import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import { store } from "../../../lib/firebase/firebase";
import { useUserStore } from "../../../lib/stores/stores";
import { dbCollectionNames } from "../../../constants/collectionNames";
import { useChatStore } from "../../../lib/stores/chatStores";

const ChatList = () => {
  const [appMode, setAppMode] = useState(false);
  const { currentUser } = useUserStore();
  const { changeChat, chatId } = useChatStore();
  const [chats, setChats] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    try {
      const userChatRef = doc(
        store,
        dbCollectionNames.chatListCollection,
        currentUser.id
      );

      await updateDoc(userChatRef, {
        chats: userChats,
      });

      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.userName.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="chat-list">
      <div className="search">
        <div className="search-bar">
          <img src="/search.png" alt="search" name="search-icon" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchInput(e.target.value)}
          />
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
        {filteredChats.length > 0 &&
          chats.map((chat) => {
            return (
              <div
                className="chat-item"
                key={chat.chatId}
                onClick={() => handleSelect(chat)}
                style={{
                  backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
                }}
              >
                <img
                  src={
                    chat.user.blocked.includes(currentUser.id)
                      ? "/avatar.png"
                      : chat.user.avatar || "/avatar.png"
                  }
                  alt={chat.user.avatar || "chat-item-avatar"}
                  name={chat.user.avatar || "chat-item-avatar-icon"}
                />
                <div className="texts">
                  <span>
                    {chat.user.blocked.includes(currentUser.id)
                      ? "User"
                      : chat.user.userName}
                  </span>
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
