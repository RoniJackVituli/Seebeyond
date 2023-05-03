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


function App() {

  return (
    <Router>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/volunteer-register" element={<Volunteer />} />
          <Route path="/blind-register" element={<Blind />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;