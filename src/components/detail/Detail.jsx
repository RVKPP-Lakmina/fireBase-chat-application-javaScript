import React from "react";
import "./detail.css";
import { auth, store } from "../../lib/firebase/firebase";
import { useChatStore } from "../../lib/stores/chatStores";
import { useUserStore } from "../../lib/stores/stores";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { dbCollectionNames } from "../../constants/collectionNames";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, chageBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlockedUser = async () => {
    if (!user) return;

    const userDocRef = doc(
      store,
      dbCollectionNames.userCollection,
      currentUser.id
    );
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="detail-container">
      <div className="user">
        <img
          src={user?.avatar || "/avatar.png"}
          alt="user-image-avatar"
          name="user-image-avatar-icon"
        />
        <h2>{user?.userName}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
          adipisci totam quaerat rerum ratione nulla nemo voluptate harum. Quod
          consectetur saepe itaque voluptas eos doloribus iusto officiis omnis
          at labore?
        </p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="/arrowUp.png" alt="arrowUp" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="/arrowUp.png" alt="arrowUp" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="/arrowUp.png" alt="arrowUp" />
          </div>
          <div className="photos">
            <div className="photo-item">
              <div className="photo-detail">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Ford_Mustang_FR500GT_Nr22_Oschersleben2008.jpg"
                  alt="uploaded image"
                />
                <span>photo_2024.png</span>
              </div>
              <img
                src="/download.png"
                alt="download image"
                className="download-icon-image"
              />
            </div>
            <div className="photo-item">
              <div className="photo-detail">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Ford_Mustang_FR500GT_Nr22_Oschersleben2008.jpg"
                  alt="uploaded image"
                />
                <span>photo_2024.png</span>
              </div>
              <img
                src="/download.png"
                alt="download image"
                className="download-icon-image"
              />
            </div>
            <div className="photo-item">
              <div className="photo-detail">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Ford_Mustang_FR500GT_Nr22_Oschersleben2008.jpg"
                  alt="uploaded image"
                />
                <span>photo_2024.png</span>
              </div>
              <img
                src="/download.png"
                alt="download image"
                className="download-icon-image"
              />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="/arrowUp.png" alt="arrowUp" />
          </div>
        </div>
        <button onClick={handleBlockedUser}>
          {isCurrentUserBlocked
            ? "You are Blocked"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
