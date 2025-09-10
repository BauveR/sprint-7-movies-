import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  doSignInWithEmailAndPassword,
  doSendEmailVerification,
  doSignInWithGoogle,
  doCreateUserWithEmailAndPassword,
} from "../config/auth";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import type { FirebaseError } from "firebase/app";
import { auth } from "../config/firebase";


export const useAuthUserQuery = () =>
  useQuery<User | null>({
    queryKey: ["authUser"],
    queryFn: () =>
      new Promise<User | null>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          resolve(user);
          unsubscribe(); 
        });
      }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });


export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<User, FirebaseError, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      const cred = await doSignInWithEmailAndPassword(email, password);
      if (cred.user && !cred.user.emailVerified) {
        await doSendEmailVerification();
      }
      return cred.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["authUser"], user);
    },
  });
};


export const useGoogleSignInMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<User, FirebaseError, void>({
    mutationFn: async () => {
      const cred = await doSignInWithGoogle();
      return cred.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["authUser"], user);
    },
  });
};


export const useRegisterMutation = (options?: { onSuccess?: (data: User) => void }) => {
  const queryClient = useQueryClient();
  return useMutation<User, FirebaseError, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      const cred = await doCreateUserWithEmailAndPassword(email, password);
      if (cred.user) {
        await doSendEmailVerification();
      }
      return cred.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["authUser"], user);
      options?.onSuccess?.(user);
    },
  });
};


export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, FirebaseError, void>({
    mutationFn: async () => {
      await signOut(auth);
    },
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
    },
  });
};
