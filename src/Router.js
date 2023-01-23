import './style.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Pages/HomePage/Home'
import { Login } from './Pages/LoginPage/Login';
import { Register } from './Pages/RegisterPage/Register';
import { Modify } from './Pages/ModifyPage/Modify';
import { History } from './Pages/HistoryPage/History';
import NavbarMain from './Components/NavbarMain/NavbarMain';
import { Footer } from './Pages/FooterPage/Footer';

function Router() {
  return (
    <>
    <NavbarMain />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/modify" element={<Modify/>}/>
      <Route path="/history" element={<History/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    <Footer />
    </>
  );
}

export default Router;


