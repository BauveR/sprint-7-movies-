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

/**
 * Hook: usuario actual (escucha 1 vez y se desuscribe para evitar fugas)
 */
export const useAuthUserQuery = () =>
  useQuery<User | null>({
    queryKey: ["authUser"],
    queryFn: () =>
      new Promise<User | null>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          resolve(user);
          unsubscribe(); // ✅ evita fugas
        });
      }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

/**
 * Hook: login con email/password
 * - Tipado para que `error.message` esté disponible en los componentes
 */
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

/**
 * Hook: login con Google
 */
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

/**
 * Hook: register con email/password
 */
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

/**
 * Hook: logout
 */
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
