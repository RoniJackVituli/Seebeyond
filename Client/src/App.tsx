import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import Navigation from "./components/Web/Navigation/Navigation";
import Footer from "./components/Web/Footer/Footer";
import Container from "./components/UI/Container/Container";
import Volunteer from "./components/Web/Auth/Volunteer/Volunteer";
import Blind from "./components/Web/Auth/Blind/Blind";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import { useSelector } from "react-redux";
// import { RootState } from "./store/store";
import Login from "./components/Web/Auth/Login/Login";
import BlindPage from "./components/Pages/Blind/BlindPage";
import VolunteerPage from "./components/Pages/Volunteer/VolunteerPage";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
  const user = useSelector((state:RootState) => state.user.user);
  
  return (
    <>
      <Router>
        <Navigation />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        <Container>
          <Routes>
            {!user && 
            <>
              <Route path="/volunteer-register" element={<Volunteer />} />
              <Route path="/blind-register" element={<Blind />} />
              <Route path="/login" element={<Login />} />
            </>
            }
            {!user && <Route path="/home" element={<Home />} />}
            {user && user.type === "volunteer" && 
              <Route path="/home" element={<VolunteerPage />} />
            }
            {user && user.type === "blind" && 
              <Route path="/home" element={<BlindPage/>} />
            }
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;
