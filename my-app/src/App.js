import {Routes , Route , HashRouter } from 'react-router-dom'
import {useEffect } from 'react'
import {useSelector } from 'react-redux';
import Home from './Components/Home/Home'
import Login from './Components/loginSystem/Login'
import Logout from './Components/loginSystem/Logout'
import Register from '../src/Components/loginSystem/Register'
import DashBoard from '../src/Components/loginSystem/DashBoard'
import ChangePasswordForm from './Components/loginSystem/ChangePassword';
import StorePage from './Components/Store/Store'
import AddStore from './Components/loginSystem/AddingStoreToDB'
import StoresPages from './Components/Store/StoresPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import Verify from '../src/Components/loginSystem/VerifyEmailPage'
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
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path="/login" element={<Login />} />
        <Route path="logOut" element={<Logout />} />
        <Route path="/verify-email/:token" element={<Verify />} />
        <Route path='/DashBoard/:userName' element={<DashBoard />} />
        <Route path='/changePassword/:userName' element={<ChangePasswordForm />} />
        <Route path='/addStore' element={<AddStore />} />
        <Route path='/allStores' element={<StoresPages />} />
        <Route exact path="/stores/:storeId" element={<StorePage />} />
        </Routes>
        <ToastContainer position="top-center"/>
    </HashRouter>
    </CookiesProvider>
  )
}

export default App;
