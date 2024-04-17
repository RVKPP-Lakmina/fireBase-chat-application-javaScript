import { toast } from "react-toastify";
import "./login.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, store } from "../../lib/firebase/firebase";
import React from "react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { errorMessage } from "../../constants/errorMessages";
import uploadFiles from "../../lib/upload";
import { dbCollectionNames } from "../../constants/collectionNames";

const Login = () => {
  const [avatar, setAvatar] = React.useState({
    file: null,
    url: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);

    const { userEmail, userPassword } = Object.fromEntries(formData);

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      toast.success("Login Successful");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.target);

    const { userName, userEmail, userPassword } = Object.fromEntries(formData);

    if (!userName || !userEmail || !userPassword)
      return toast.warn("Please enter inputs!");

    if (!avatar.file) return toast.warn("Please upload an avatar!");

    const usersRef = collection(store, "users");

    const q = query(usersRef, where("userName", "==", "userName"));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return toast.warn("Select another username");
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      if (res.code == 400) {
        if (errorMessage[res.message]) {
          return toast.error(errorMessage[res.message]);
        } else {
          return toast.error(errorMessage.OTHER_ERROR);
        }
      }

      const imageUploadRes = await uploadFiles(avatar.file);

      await setDoc(doc(store, dbCollectionNames.userCollection, res.user.uid), {
        userName,
        userEmail,
        id: res.user.uid,
        blockedList: [],
        avatar: imageUploadRes,
      });

      await setDoc(doc(store, dbCollectionNames.chatListCollection, res.user.uid), {
        chats: [],
      });

      toast.success("Account is created! You can login now!!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="example@email.com"
            name={"userEmail"}
          />
          <input type="password" placeholder="Password" name="userPassword" />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : " Login"}
          </button>
        </form>
      </div>
      <div className="seporator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="user-profile-picture">
            <img src={avatar.url || "/avatar.png"} alt="uploaded image" />
            Upload Image
          </label>
          <input
            type="file"
            id="user-profile-picture"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <input type="text" placeholder="Your Name" name={"userName"} />
          <input
            type="email"
            placeholder="example@email.com"
            name={"userEmail"}
          />
          <input type="password" placeholder="Password" name="userPassword" />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
