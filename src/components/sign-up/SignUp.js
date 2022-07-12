import React, { useState } from 'react';
import { auth, createUserProfileDocument } from '../../firebase/firebase';

const SignUp = () => {
  const [displayName, setdisplayName] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
console.log(email);
console.log(displayName);
console.log(password);
console.log(confirmPassword);

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      setdisplayName('');
      setemail('');
      setpassword('');
      setconfirmPassword('');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="sign-up-form">
      <label htmlFor="displayName">displayName</label>
      <input
        onChange={(e) => setdisplayName(e.target.value)}
        type="text"
        name="displayName"
        className="sign-input"
        value={displayName}
      />
      <label htmlFor="email">email</label>
      <input
        onChange={(e) => setemail(e.target.value)}
        type="text"
        name="email"
        className="sign-input"
        value={email}
      />
      <label htmlFor="password">password</label>
      <input
        onChange={(e) => setpassword(e.target.value)}
        type="text"
        name="password"
        className="sign-input"
        value={password}
      />
      <label htmlFor="confirmPassword">confirmPassword</label>
      <input
        onChange={(e) => setconfirmPassword(e.target.value)}
        type="text"
        name="confirmPassword"
        className="sign-input"
        value={confirmPassword}
      />
      <button type="submit">SIGN UP</button>
    </form>
  );
};

export default SignUp;