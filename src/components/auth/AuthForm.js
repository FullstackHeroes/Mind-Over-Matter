import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { auth } from "../../store";

class AuthForm extends Component {
  constructor() {
    super();
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidUpdate() {
    if (this.props.user.id) this.props.history.push("/Dashboard");
  }

  handleSignIn(evt) {
    evt.preventDefault();
    const userObj = {
      formName: evt.target.name,
      email: evt.target.email.value,
      password: evt.target.password.value
    };

    if (evt.target.name === "signup") {
      const name = evt.target.userName.value;
      userObj.name = name;
      this.props.auth(userObj);
    } else this.props.auth(userObj);
  }

  render() {
    const { formName, displayName, error } = this.props;

    return (
      <div className={`${formName}-authFormDiv authFormDiv`}>
        <h3 className="authFormHeader">{displayName.toUpperCase()}</h3>

        <form onSubmit={this.handleSignIn} name={formName} className="authForm">
          <div className="authPreBtnDiv">
            <div className="authInputDiv">
              <label htmlFor="email" className="authFormLabel">
                Email:
              </label>
              <input name="email" type="email" className="authInputBox" />
            </div>

            {formName === "signup" ? (
              <div className="authInputDiv">
                <label htmlFor="userName" className="authFormLabel">
                  Name:
                </label>
                <input
                  name="userName"
                  type="userName"
                  className="authInputBox"
                />
              </div>
            ) : (
              ""
            )}

            <div className="authInputDiv">
              <label htmlFor="password" className="authFormLabel">
                Password:
              </label>
              <input name="password" type="password" className="authInputBox" />
            </div>

            {error && error.response && (
              <div className="authErrorMessage"> {error.response.data} </div>
            )}
          </div>

          <div className="authBtnDiv">
            <button type="submit" className="authSignInBtn">
              {displayName}
            </button>

            <button type="button" className="authSignInBtn ">
              <a target="_self" href="/auth/google" className="oAuthText ">
                Google {displayName}
              </a>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapLogin = state => {
  return {
    formName: "login",
    displayName: "Login",
    user: state.user,
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    formName: "signup",
    displayName: "Sign Up",
    user: state.user,
    error: state.user.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    auth: userObj => dispatch(auth(userObj))
  };
};

export const Login = withRouter(
  connect(mapLogin, mapDispatchToProps)(AuthForm)
);
export const Signup = withRouter(
  connect(mapSignup, mapDispatchToProps)(AuthForm)
);
