import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  doSignInWithEmailAndPassword,
  doSendEmailVerification,
  doSignInWithGoogle,
  doCreateUserWithEmailAndPassword,
} from "../config/auth";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "../config/firebase";


export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const userCredential = await doSignInWithEmailAndPassword(email, password);
    
      if (userCredential.user && !userCredential.user.emailVerified) {
        await doSendEmailVerification();
      }
      return userCredential.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["authUser"], user);
    },
  });
};


export const useAuthUserQuery = () =>
  useQuery<User | null>({
    queryKey: ["authUser"],
    queryFn: () =>
      new Promise<User | null>((resolve) => {
        onAuthStateChanged(auth, (user) => {
          resolve(user);
        });
      }),
    staleTime: 1000 * 60 * 5, 
  });


export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await signOut(auth);
    },
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
    },
  });
};


export const useGoogleSignInMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const userCredential = await doSignInWithGoogle();
      return userCredential.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["authUser"], user);
    },
  });
};


export const useRegisterMutation = (options?: { onSuccess?: (data: User) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const userCredential = await doCreateUserWithEmailAndPassword(email, password);
     
      if (userCredential.user) {
        await doSendEmailVerification();
      }
      return userCredential.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["authUser"], user);
      if (options?.onSuccess) {
        options.onSuccess(user);
      }
    },
  });
};
