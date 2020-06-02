import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className='container mt-5 pb-5'>
        <form>
          <div class='form-group'>
            <label>Username</label>
            <input
              type='email'
              class='form-control'
              placeholder='Enter username'
            />
          </div>
          <div class='form-group'>
            <label>Password</label>
            <input
              type='password'
              class='form-control'
              id='exampleInputPassword1'
              placeholder='Password'
            />
          </div>

          <button type='submit' class='btn btn-primary'>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
