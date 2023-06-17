import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
//import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-night.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './screens/Home';
import Login from './screens/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';

function App() {
  return (
    // import Cart Provider from context reducer to ye router global bngya hai
    <CartProvider>
   <Router>
    <div> 
      <Routes> 
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/createuser" element={<Signup/>} />
        <Route exact path="/myorder" element={<MyOrder/>} />
      </Routes>
    </div>
   </Router>
    </CartProvider>
  );
}

export default App;
