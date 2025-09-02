import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth"; // <-- antes importabas "./auth-firebase" (no existe)
  import { auth } from "./firebase";
  
  // login con email y password
  export const doSignInWithEmailAndPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  // registrar usuario con email y password
  export const doCreateUserWithEmailAndPassword = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, password);
  };
  
  // enviar email de verificación
  export const doSendEmailVerification = async () => {
    if (auth.currentUser) {
      return sendEmailVerification(auth.currentUser);
    }
    throw new Error("No user is currently logged in.");
  };
  
  // login con Google
  export const doSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  