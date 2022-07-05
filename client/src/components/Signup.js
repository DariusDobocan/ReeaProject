import React from 'react';

const Signup = () => {
  return(
 <div>
 <h1>Create Account</h1>
<form action="/auth/signup">
 <section>
     <label for="username">Username</label>
     <input id="username" name="username" type="text" autocomplete="username" required autofocus/>
 </section>
 <section>
     <label for="current-password">Password</label>
     <input id="current-password" name="password" type="password" autocomplete="current-password" required/>
 </section>
 <button type="login">Create account</button>
</form>
  <a href="/auth/login">Already have an account?</a>
</div>
  );
};

export default Signup;
