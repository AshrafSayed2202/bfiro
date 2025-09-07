import { useEffect } from 'react';
import MainRoute from './routes';
import { CartProvider } from './store/Cart';
import { FavoriteProvider } from './store/Favorite';
import './assets/styles/index.css';
import './assets/styles/media.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

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