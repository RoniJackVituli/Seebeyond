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


function App() {

  return (
    <Router>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;