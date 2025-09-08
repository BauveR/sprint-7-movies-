import { Link } from "react-router-dom";

export const HomePage = () => (
  <main className="max-w-6xl mx-auto p-6">
    <section className="text-center my-16">
      <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
        Bienvenido a MovieBAUVE
      </h1>
      <p className="mt-4 text-gray-600">
        Explora películas populares y descubre el reparto y detalles completos.
      </p>
      <Link
        to="/movies/page/1"
        className="inline-block mt-8 font-bold bg-sky-500 px-5 py-3 rounded-lg hover:bg-sky-600 text-white"
      >
        Ver películas
      </Link>
    </section>
  </main>
);
