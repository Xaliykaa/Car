// import { useState } from "react";
// //import { useNavigate } from "react-router-dom";
// //import { Link } from "react-router-dom";
// //import axios, { isAxiosError } from "axios";
// import "../styles/register.css";
// function Signup() {
//     // const [name, setName] = useState()
//     // const [email, setEmail] = useState()
//     // const [password, setPassword] = useState()
//     // const navigate = useNavigate();

//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     axios.post('http://localhost:3001/register', { name, email, password })
//     //         .then(result => {
//     //             console.log(result)
//     //             navigate('/login')
//     //         })
//     //         .catch(err => console.log(err))
//     // };

//     return (
//         <div className="Auth-form-container">
//             <form className="Auth-form" onSubmit={handleSubmit}>
//                 <div className="Auth-form-content">
//                     <h3 className="Auth-form-title" >Register</h3>
//                     <div className="form-group mt-3">
//                         <label>Name</label>
//                         <input
//                             type="text"
//                             className="form-control mt-1"
//                             placeholder="Enter name"
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                     </div>
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
//                             Register
//                         </button>
//                     </div>
//                     <div className="d-grid gap-2 mt-3">
//                         <Link to="/login" className="btn btn-primary border w-100 bg-light" >
//                             Login
//                         </Link>
//                     </div>

//                 </div>
//             </form>
//         </div>
//     );
// }
// export default Signup



import { useState } from "react";
import axios from "axios";
import "../styles/register.css";

function Register() {
  const [gmail, setNewEmail] = useState("");
  const [password, setNewPass] = useState("");
  const [user_name, setName] = useState("");
  const [phone, setPhone] = useState("");

  async function handleRegister(event) {
    event.preventDefault(); // Prevent default form submission

    try {
      await axios.post("http://localhost:8080/register", {
        user_name,
        gmail,
        password,
        phone
      });
      alert("Successfully registered");
      window.location = "/login";
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleRegister}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Бүртгүүлэх</h3>
          <div className="form-group mt-3">
            <label>Нэр</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Нэр оруулах"
              value={user_name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Утасны дугаар</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Дугаар оруулах"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>И-Мэйл хаяг</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="И-Мэйл оруулах"
              value={gmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Нууц үг</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Нууц үг оруулах"
              value={password}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </div>
          <div className="d-grid gap-5 mt-3">
            <button type="submit" className="btn">
              {/* btn-primary"> */}
              Бүртгүүлэх
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
