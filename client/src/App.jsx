import { BrowserRouter } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";

import AppRoutes from './routes/AppRoutes'; 
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <div className="app">
          <ScrollToTop />
          <Header />
          <main>
            <div className="container">
              <AppRoutes />
            </div>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;