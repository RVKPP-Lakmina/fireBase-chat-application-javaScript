import React from "react";
import Chats from "./components/chats/Chats";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";

const App = () => {
  const isLogingType = false;

  const ChooseAndBuildComponent = () => {
    if (isLogingType) {
      return <Login />;
    }

    return (
      <React.Fragment>
        <List />
        <Chats />
        <Detail />
      </React.Fragment>
    );
  };

  return (
    <div className="container">
      <ChooseAndBuildComponent />
      <Notification />
    </div>
  );
};

export default App;
