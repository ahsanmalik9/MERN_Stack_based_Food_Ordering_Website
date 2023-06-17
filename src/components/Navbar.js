import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'; // for My cart functionality
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
export default function Navbar() {

const [cartView, setCartView] = useState(false)
let data = useCart(); // for dynamic number (badge number) on My cart
// To un comment cntrl + k + u
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")

  }
  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">Food Junction</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* me-auto sy login and signup btn right side py a jaye gy */}
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {/* After login checking the user whether login or not and if login then Order tab will appear in navbar */}
              {(localStorage.getItem("authToken")) ?

                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                </li>

                : " "}
            </ul>

            {/* Login signup btn tb display ho ga jb user login ni hwa ho ga yani jb auth token ni generate hoga
            or auth token tb generate ho ga jb user login ho jaye ga */}

            {(!localStorage.getItem("authToken")) ?

              <div className='d-flex'>
                {/* div inline ni hota to is liye bootstrap ki class (className use kr k inline krty hain) */}
                {/* margins me-1 = margin right,  mx-1 margin left */}
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>

                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>

              </div>
              :
              //My cart functionality && data.lenght for dynamic change in badge number
              <div>
                <div className='btn bg-white text-success mx-2' onClick={()=>{setCartView(true)}}>
                  My Cart {" "}
                  <Badge pill bg = "danger" >{data.length}</Badge> 
                </div>

                {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}

                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                  Logout
                </div>

              </div>

            }

          </div>
        </div>
      </nav>
    </div>
  )
}
