import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  doSignInWithEmailAndPassword,
  doSendEmailVerification,
  doSignInWithGoogle,
  doCreateUserWithEmailAndPassword,
} from "../config/auth";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "../config/firebase";

/**
 * Hook para iniciar sesión con email y password.
 */
export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const userCredential = await doSignInWithEmailAndPassword(email, password);
      // Envía email de verificación si no está verificado
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

/**
 * Hook para obtener el usuario actual de Firebase (suscrito a cambios de sesión).
 */
export const useAuthUserQuery = () =>
  useQuery<User | null>({
    queryKey: ["authUser"],
    queryFn: () =>
      new Promise<User | null>((resolve) => {
        onAuthStateChanged(auth, (user) => {
          resolve(user);
        });
      }),
    staleTime: 1000 * 60 * 5, // cache 5 min
  });

/**
 * Hook para cerrar sesión.
 */
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

/**
 * Hook para iniciar sesión con Google.
 */
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

/**
 * Hook para registrar un nuevo usuario con email y password.
 */
export const useRegisterMutation = (options?: { onSuccess?: (data: User) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const userCredential = await doCreateUserWithEmailAndPassword(email, password);
      // Enviar email de verificación
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
