import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { errorMessage } from "../constants/errorMessages";
import { storage } from "./firebase/firebase";

const uploadFiles = async (file) => {
  const date = new Date();

  console.log(file);

  const storageRef = ref(storage, `images/${date + file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        reject(errorMessage.OTHER_ERROR + error.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export default uploadFiles;
