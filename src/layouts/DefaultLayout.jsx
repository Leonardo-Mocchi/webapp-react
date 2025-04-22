import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLoader } from "../contexts/LoaderContext";
import Loader from "../components/Loader";

export default function DefaultLayout() {
  const { isLoading } = useLoader();

  return (
    <>
      <Header />
      <div className="main-container">
        {isLoading && (
          <div className="loader-overlay">
            <Loader />
          </div>
        )}
        <Outlet />
      </div>
      <Footer />
    </>
  );
}