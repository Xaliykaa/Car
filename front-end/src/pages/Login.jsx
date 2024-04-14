// import React from "react";
// import { useState } from "react";
// //import { useNavigate } from "react-router-dom";
// //import { Link } from "react-router-dom";
// //import axios, { isAxiosError } from "axios";
// import "../styles/login.css";
// function Login() {
//     // const [email, setEmail] = useState()
//     // const [password, setPassword] = useState()
//     // const navigate = useNavigate();

//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     axios.post('http://localhost:3001/login', { email, password })
//     //         .then(result => {
//     //             if (result.data == "Success"){
//     //                 navigate('/home')
//     //             }else{
//     //                 alert(result.data);
//     //             }
//     //         })
//     //         .catch(err => console.log(err))
//     // };

//     return (
//         <div className="Auth-form-container">
//             <form className="Auth-form" onSubmit={handleSubmit}>
//                 <div className="Auth-form-content">
//                     <h3 className="Auth-form-title" >Login</h3>
//                     <div className="form-group mt-3">
//                         <label>Email address</label>
//                         <input
//                             type="email"
//                             className="form-control mt-1"
//                             placeholder="Enter email"
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group mt-3">
//                         <label>Password</label>
//                         <input
//                             type="password"
//                             className="form-control mt-1"
//                             placeholder="Enter password"
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <div className="d-grid gap-2 mt-3">
//                         <button type="submit" className="btn btn-primary">
//                             Login
//                         </button>
//                     </div>
//                     <p className="forgot-password text-right mt-2">
//                         Forgot <a href="/recovery">password?</a>
//                     </p>
//                     <div className="d-grid gap-2 mt-3">
//                         <Link to="/register" className="btn btn-primary border w-100 bg-light" >
//                             Register
//                         </Link>
//                     </div>

//                 </div>
//             </form>
//         </div>
//     );
// }
// export default Login;
import React, { useState } from "react";
import axios from "axios";
import "../styles/login.css";

function Login() {
  const [gmail, setEmail] = useState("");
  const [password, setPass] = useState("");

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    try {
      await axios.post("http://localhost:8080/login", {
        gmail,
        password
      });
      alert("Successfully logged in");
      window.location = "/home";
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Нэвтрэх</h3>
          <div className="form-group mt-3">
            <label>И-Мэйл хаяг</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="И-Мэйл оруулах"
              value={gmail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Нууц үг</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Нууц үг оруулах"
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <div className="d-grid gap-5 mt-3">
            <button type="submit" className="btn">
              Нэвтрэх
            </button>
          </div>
          <p className="forgot-password">
            <a href="#">Нууц үг мартсан?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
