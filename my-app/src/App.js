import {Routes , Route  , BrowserRouter as Router , useLocation } from 'react-router-dom'
import {useEffect } from 'react'
import {useSelector  } from 'react-redux';
import Login from './Components/loginSystem/Login'
import Logout from './Components/loginSystem/Logout'
import Register from '../src/Components/loginSystem/Register'
import DashBoardMain from './Components/DashBoard/DashBoardMain';
import ChangePasswordForm from './Components/loginSystem/ChangePassword';
import StorePage from './Components/Store/StoreMainPage'
import AddStore from './Components/loginSystem/AddingStoreToDB'
import StoresPages from './Components/Store/StoresPage'
import FilteredStores from './Components/Store/FilteredStores';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import Verify from '../src/Components/loginSystem/VerifyEmailPage'
import ProfilePage from './Components/loginSystem/ProfilePage';
import Home from './Components/Home/Home'
import 'aos/dist/aos.css'
import NavBar from './Components/Home/NavBar';
import MainFooter from './Components/Footer/MainFooter';
function App() {
  const error = useSelector((state) => state.user.error);
  const passwordError = useSelector((state) => state.user.passwordError); 
  console.log('error login', error);
  const msg = useSelector((state) => state.user.msg);
  console.log('msg login', msg);
  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if(passwordError) {
      toast.error(passwordError)
    }
    else if(msg) {
      toast.success(msg);
    }
  }, [error, msg  , passwordError]);


  return (
    <CookiesProvider>
    <Router>
      <NavBarWrapper />
      {/* <DarkMode /> */}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path="/login" element={<Login />} />
        <Route path="logOut" element={<Logout />} />
        <Route path="/verify-email/:token" element={<Verify />} />
        <Route path='/DashBoard/:userName' element={<DashBoardMain />} />
        <Route path='/changePassword/:userName' element={<ChangePasswordForm />} />
        <Route path='/addStore' element={<AddStore />} />
        <Route path='/allStores' element={<StoresPages />} />
        <Route path='/stores/selling/:sellingTypes' element={<FilteredStores />} />
        <Route exact path="/stores/:storeId" element={<StorePage />} />
        {/* <Route exact path="/stores/:storeName" element={<StorePage />} /> */}
        <Route path="/users/:userName/profile" element={<ProfilePage />} />
        </Routes>
        <ToastContainer position="top-center"/>
        <FooterWrapper />
        </Router>
    </CookiesProvider>
  )
}
function FooterWrapper() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const excludeFooter = isLoginPage || isRegisterPage;

  return !excludeFooter && <MainFooter />;
}

function NavBarWrapper() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const excludeFooter = isLoginPage || isRegisterPage;

  return !excludeFooter && <NavBar />;
}

export default App;
