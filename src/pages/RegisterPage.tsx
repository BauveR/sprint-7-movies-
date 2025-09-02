import { RegisterForm } from "@/auth/components/RegisterForm";

export const RegisterPage = () => {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-tl from-sky-800 to-sky-400 text-center">
        Register your account
      </h1>
      <RegisterForm />
    </main>
  );
};
