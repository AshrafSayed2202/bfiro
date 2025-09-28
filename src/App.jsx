import { useEffect } from "react";
import MainRoute from "./routes";
import { CartProvider } from "./store/Cart";
import { FavoriteProvider } from "./store/Favorite";
import "./assets/styles/index.css";
import "./assets/styles/media.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/features/authSlice";

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  if (status === "loading") {
    return null;
  }

  return (
    <div className="font-gotham">
      <FavoriteProvider>
        <CartProvider>
          <MainRoute />
          <ToastContainer
            position="bottom-center"
            autoClose={1500}
            className="w-[500px]"
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </CartProvider>
      </FavoriteProvider>
    </div>
  );
}

export default App;
