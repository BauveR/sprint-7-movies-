import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomePage } from "@/pages/HomePage";
import { MoviesPage } from "@/pages/MoviesPage";
import { MovieDetailPage } from "@/pages/MovieDetailPage";
import { PersonDetailPage } from "@/pages/PersonDetailPage";
import { LoginPage } from "@/pages/LoginPage";      // <-- corrige esta línea
import { RegisterPage } from "@/pages/RegisterPage"; // <-- y esta
import { ProtectedRoute } from "@/router/ProtectedRoute";
import { FirebaseSmokeTest } from "@/components/FirebaseSmokeTest";


export const AppRouter = () => {
  return (
    <>
      <Header />
      <FirebaseSmokeTest />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/movies" element={<Navigate to="/movies/page/1" replace />} />
          <Route path="/movies/page/:page" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/persons/:id" element={<PersonDetailPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<div className="p-10 text-center">404 - Not Found</div>} />
      </Routes>
      <Footer />
    </>
  );
};
