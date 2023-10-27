import React, {useState} from 'react'
import axios from 'axios';
import '../css/Auth.css'

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSucess] = useState(null);

  const onSubmitHandle = async (e) => {
    try {
        e.preventDefault();
        const response = await axios.post("http://localhost:3001/api/v1/auth/register", {name: name, email: email, password: password});
        console.log(response.status);
        if(response.status === 200)
          setSucess('Sucess')
    } catch (error) {
        setErrorMessage(error.response.data.message);
    }
  } 
  return (
    
    <section className="auth-container">
        <form onSubmit={onSubmitHandle} className="auth-form">
            <h2>Enter Your Account</h2>
            <div className="error-message">{errorMessage && `Error: ${errorMessage}`}</div>
        <input type="text"
          required 
          placeholder="Name" 
          value={name} 
          onChange={e => setName(e.target.value)} />
        <input type="email"
          required 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} />

        <input
            type="password"
            required
            placeholder="Password"
            pattern="().{6,}"
            title="Must contain at least 6 or more characters"
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
            <button className="bnt" type="submit">Register</button>
            { success}
            
        </form>
    </section>
  )
}
