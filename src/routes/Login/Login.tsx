import React, { useEffect, useState } from "react";
import { loginUser, validateSudoPermRequest } from "../../utils/api";
import "react-toastify/dist/ReactToastify.css";
import "./login.scss";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showRecoveryPhrase, setShowRecoveryPhrase] = useState<boolean>(true);
  const [recoveryPhrase, setRecoveryPhrase] = useState<string>("");

  useEffect(() => {
    setShowRecoveryPhrase(false);
  }, []);

  const handleAuthentication = () => {
    if (username.length !== 0 && password.length !== 0 && email.length !== 0) {
      loginUser(username, password, email).then((res: any) => {
        if (res.data.success === true) {
          toast.success("Welcome " + res.data.data.Username);
          window.localStorage.setItem("token", res.data.data.Token);

          setTimeout(() => {
            setShowRecoveryPhrase(true);
          }, 2000);
        } else {
          toast.error("Authentication Failed");
        }
      });
    } else {
      if (username.length === 0) {
        toast.error("Missing Username Value");
      }
      if (password.length === 0) {
        toast.error("Missing Password Value");
      }
      if (email.length === 0) {
        toast.error("Missing Email Value");
      }
    }
  };

  const handleRecoveryPhrase = () => {
    if (recoveryPhrase.length !== 0) {
      const splittedValue = recoveryPhrase.split(" ");

      validateSudoPermRequest(splittedValue)
        .then((res: any) => {
          if (res.data.success === true) {
            toast.success("Success! Sudo Permission Granted");

            setTimeout(() => {
              window.location.replace("/");
            }, 2000);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      toast.error("Missing Recovery Phrase");
    }
  };

  return (
    <div className="login">
      <ToastContainer theme="dark" autoClose={1900} position="bottom-left" />
      <img src="https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?cs=srgb&dl=pexels-valdemaras-d-1647962.jpg&fm=jpg" />
      {showRecoveryPhrase === false ? (
        <>
          <div className="info">
            <h4>ENJOY FOR LIFETIME</h4>
            <h1>
              Log into your account<span>.</span>
            </h1>
            <a href="/register">
              Don't have an account? <span>Register</span>
            </a>
          </div>
          <div className="box">
            <div className="inputs">
              <div className="input input-double">
                <input
                  type="text"
                  placeholder="SkylerX12341"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="testpassword85633"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input">
                <input
                  type="email"
                  id="large"
                  placeholder="youremail@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button onClick={handleAuthentication}>Authorize</button>
          </div>
        </>
      ) : (
        <>
          <div className="goback">
            <span onClick={() => setShowRecoveryPhrase(false)}>
              <i className="fa-solid fa-chevron-left"></i> back
            </span>
          </div>
          <div className="box-keywords">
            <h1>Sudo Permission</h1>
            <p>
              Please enter your keywords to enter Sudo mode and get full access
              to your account.
            </p>
            <textarea
              onChange={(e) => setRecoveryPhrase(e.target.value)}
              spellCheck={false}
            ></textarea>
            <button onClick={handleRecoveryPhrase}>Grant Permission</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
