import MainRoute from "./routes";
import "./assets/styles/index.css";
import "./assets/styles/media.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);
  return (
    <>
      <div className="font-gotham">
        <MainRoute />
        <ToastContainer
          position="bottom-center"
          autoClose={1500}
          className={"w-[500px]"}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
}

export default App;
