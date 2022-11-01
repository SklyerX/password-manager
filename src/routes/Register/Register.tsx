import React, { useState } from "react";
import "./register.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../utils/api";
import { Modal, MantineProvider } from "@mantine/core";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showPhrase, setShowPhrase] = useState<boolean>(false);
  const [phrases, setPhrases]: any = useState([]);
  const [opened, setOpened] = useState<boolean>(false);

  const handleRegisteration = () => {
    if (username.length !== 0 && password.length !== 0 && email.length !== 0) {
      registerUser(username, password, email)
        .then((res: any) => {
          if (res.data.success === true) {
            toast.success("Welcome " + res.data.data.Username);
            window.localStorage.setItem("token", res.data.data.Token);

            setPhrases(res.data.data.SudoPermArray);

            setTimeout(() => {
              setShowPhrase(true);
              console.log(phrases);
            }, 2000);
          } else {
            toast.error("Registeration Failed");
          }
        })
        .catch((err) => {
          if (err.message.includes("409")) {
            toast.error("An account with username and or passwords exsits!");
          } else {
            toast.error("Something went wrong... Check backend logs for error");
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

  return (
    <div className="register">
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Confirmation"
        >
          <h3>Have you copied the recovery phrase?</h3>
          <p>
            Please make sure you have this phrase written down on a paper or
            saved somewhere. When you click on confirm button you can no longer
            view you code.
          </p>

          <button id="accept" onClick={() => window.location.replace("/")}>
            Yes, I have copied it.
          </button>
        </Modal>
      </MantineProvider>
      <img src="https://images.pexels.com/photos/1612371/pexels-photo-1612371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
      {showPhrase === false ? (
        <>
          <ToastContainer
            theme="dark"
            autoClose={1900}
            position="bottom-left"
          />
          <div className="info">
            <h4>FREE FOR LIFETIME</h4>
            <h1>
              Register for a new account<span>.</span>
            </h1>
            <a href="/login">
              Already a member? <span>Login</span>
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
            <button onClick={handleRegisteration}>Register</button>
          </div>
        </>
      ) : (
        <>
          <div className="box-keywords">
            <h1>Sudo Permission</h1>
            <p>
              Please enter your keywords to enter Sudo mode and get full access
              to your account.
            </p>
            <textarea
              disabled
              spellCheck={false}
              value={phrases.join(" ")}
            ></textarea>
            <button onClick={() => setOpened(true)}>
              Navigate to Dashboard
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
