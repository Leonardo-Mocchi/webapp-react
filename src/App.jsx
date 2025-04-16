import { Routes, Route } from "react-router-dom";
// Layout
import DefaultLayout from "./layouts/DefaultLayout";
// Pages
import HomePage from "./pages/HomePage";
import Movies from "./pages/movies";
import Movie from "./pages/Movie"

export default function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" Component={Movie} />
      </Route>
    </Routes>
  );
}
