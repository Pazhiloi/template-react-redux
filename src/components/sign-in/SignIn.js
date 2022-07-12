import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';

const SignIn = () => {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')


  const handleSubmit = async (event) => {
     event.preventDefault();

     try {
       await auth.signInWithEmailAndPassword(email, password);
       setemail('');
       setpassword('');
     } catch (error) {
       console.log(error);
     }
   };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">email</label>
      <input
        name="email"
        value={email}
        type="text"
        className="sign-input"
        onChange={(e) => setemail(e.target.value)}
      />
      <label htmlFor="password">password</label>
      <input
        name="password"
        value={password}
        type="text"
        className="sign-input"
        onChange={(e) => setpassword(e.target.value)}
      />
      <button type="submit"> Sign in </button>
    </form>
  );
};

export default SignIn;