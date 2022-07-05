import React from 'react';

const Login = () => {
  return(
 // <div style={{ marginTop: '50px' }}>
 //   <label for="uname"><b>Username</b></label>
 //   <input type="text" placeholder="Enter Username" name="uname" required/>
 //
 //   <label for="psw"><b>Password</b></label>
 //   <input type="password" placeholder="Enter Password" name="psw" required/>
 //
 //   <button type="submit">Login</button>
 //
 // </div>
 <div>
 <h1>Log In</h1>
<form action="/auth/login">
 <section>
     <label for="username">Username</label>
     <input id="username" name="username" type="text" autocomplete="username" required autofocus/>
 </section>
 <section>
     <label for="current-password">Password</label>
     <input id="current-password" name="password" type="password" autocomplete="current-password" required/>
 </section>
 <button type="login">Log In</button>
</form>
  <a href="/auth/signup">Create account</a>
</div>
  );
};

export default Login;
