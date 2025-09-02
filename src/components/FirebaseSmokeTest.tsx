// src/components/FirebaseSmokeTest.tsx
import { useEffect } from "react";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "@/config/firebase";

export const FirebaseSmokeTest = () => {
  useEffect(() => {
    fetchSignInMethodsForEmail(auth, "doesnotexist@example.com")
      .then((methods) => {
        console.log("[FB] Auth OK. signInMethods:", methods);
      })
      .catch((e) => {
        console.error("[FB] Auth ERROR:", e);
      });
  }, []);

  return null; // no renderiza nada
};
