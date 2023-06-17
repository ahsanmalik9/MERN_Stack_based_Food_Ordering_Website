import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })//use state snippet

  let navigate = useNavigate()
  // ON SUBMIT k through front end sy backend py request hit kryn gy
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({email: credentials.email, password: credentials.password})) // display value on consol
    const response = await fetch("http://localhost:5000/api/loginuser", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      // here through stingify we send data to the backend
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    //console log
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials")
    }
    
    // After login redirect to home page
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email); // saving email in local storage
      localStorage.setItem("authToken", json.authToken); // "authToken" variable name saving auth token in local storage
      console.log(localStorage.getItem("authToken"))
      navigate("/")
    }
    
  }

  //  to override credential values we use OnChange function 
  const onChange = (event) => {

    setcredentials({ ...credentials, [event.target.name]: event.target.value })

  }
  return (
    <div>

      <div className='container'>

        <form onSubmit={handlesubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>
          
          <button type="submit" className=" m-3 btn btn-success">Submit</button>

          <Link to="/createuser" className='m-3 btn btn-danger'> Signup</Link>
        </form>


      </div>
    </div>

  )
}
