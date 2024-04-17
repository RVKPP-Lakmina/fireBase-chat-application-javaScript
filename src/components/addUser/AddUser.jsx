import { toast } from "react-toastify";
import { store } from "../../lib/firebase/firebase";
import "./addUser.css";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { errorMessage } from "../../constants/errorMessages";
import React from "react";
import { useUserStore } from "../../lib/stores/stores";
import { dbCollectionNames } from "../../constants/collectionNames";

const AddUser = () => {
  const [user, setUser] = React.useState(null);
  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userName = formData.get("userName").slice();

    try {
      const usersRef = collection(store, dbCollectionNames.userCollection);

      const q = query(usersRef, where("userName", "==", userName));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAdd = async () => {
    const chatListRef = collection(store, dbCollectionNames.chatListCollection);
    const chatsRef = collection(store, dbCollectionNames.chatsCollection);

    try {
      const newChatRef = doc(chatsRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        message: [],
      });

      await handleUpdateDoc(chatListRef, user, currentUser, newChatRef);
      await handleUpdateDoc(chatListRef, currentUser, user, newChatRef);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdateDoc = async (
    ref,
    theChatRefToBeSender,
    theChatRefToBeReceiver,
    newlyAddedChatRef
  ) => {
    await updateDoc(doc(ref, theChatRefToBeSender.id), {
      chats: arrayUnion({
        chatId: newlyAddedChatRef.id,
        lastMessage: "",
        receiverId: theChatRefToBeReceiver.id,
        //serverTimestamp() is not working inside arrayUnion
        updatedAt: Date.now(),
      }),
    });
  };

  return (
    <div className="add-user">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Name" name={"userName"} />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img
              src={user.avatar || "/avatar.png"}
              alt={user.avatar || "uploaded image"}
            />
            <div className="texts">
              <span>{user.userName}</span>
            </div>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
