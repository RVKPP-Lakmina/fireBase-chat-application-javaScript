import React, { useEffect } from "react";
import Chats from "./components/chats/Chats";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./lib/stores/stores";
import { auth } from "./lib/firebase/firebase";
import { useChatStore } from "./lib/stores/chatStores";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser);

  const ChooseAndBuildComponent = () => {
    if (!currentUser) {
      return <Login />;
    }

    return (
      <React.Fragment>
        <List />
        {chatId && <Chats />}
        {chatId && <Detail />}
      </React.Fragment>
    );
  };

  if (isLoading) {
    return <div className="loading">Loading...!</div>;
  }

  return (
    <div className="container">
      <ChooseAndBuildComponent />
      <Notification />
    </div>
  );
};

export default App;
