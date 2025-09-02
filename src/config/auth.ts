import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
  import { auth } from "./firebase";
  
  export const doSignInWithEmailAndPassword = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);
  
  export const doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password); // 👈 ojo, email va primero
  
  export const doSendEmailVerification = () => {
    if (!auth.currentUser) throw new Error("No user is currently logged in.");
    return sendEmailVerification(auth.currentUser);
  };
  
  export const doSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  