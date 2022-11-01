import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./setup.scss";

const Setup = () => {
  const [accepted, setAccepted] = useState<boolean>(false);
  const [database, setDatabase] = useState<string>("");
  const [port, setPort] = useState<string>("");
  const [encryptor, setEncryptor] = useState<string>("");

  useEffect(() => {
    const splited = window.location.href.split("?");

    if (splited.includes("changeOfHeart=true")) {
      setAccepted(true);
    }
  }, []);

  const handleConfiguration = () => {
    if (database.length !== 0 && port.length !== 0 && encryptor.length !== 0) {
      if (port.length > 4) {
        return toast.error("Port length is higher than 4");
      }
      if (/^[a-zA-Z]*$/.test(encryptor) === true) {
        if (encryptor.length > 32) {
          toast.error("Only 32 letters are allowed!");
        }

        window.electronAPI.save([database, port, encryptor]);

        toast.success("Success! Setup completed!");

        setTimeout(() => {
          window.location.replace("/login");
        }, 2000);
      } else {
        toast.error("Only letters are allowed!");
      }
    } else {
      if (database.length === 0) {
        toast.error("Database Field Is Empty!");
      }
      if (port.length === 0) {
        toast.error("Port Field Is Empty!");
      }
      if (encryptor.length === 0) {
        toast.error("Encryptor Field Is Empty!");
      }
    }
  };

  return (
    <div className="setup">
      {accepted ? (
        <div className="setup-content">
          <div className="inputs">
            <div className="input">
              <h4 className="label">Port Number:</h4>
              <input
                type="number"
                placeholder="3001"
                onChange={(e) => setPort(e.target.value)}
              />
            </div>
            <div className="input">
              <h4 className="label">Mongo Connection:</h4>
              <input
                type="text"
                placeholder="mongodb+srv//"
                onChange={(e) => setDatabase(e.target.value)}
              />
            </div>
            <div className="input">
              <h4 className="label">Encryptor:</h4>
              <input
                type="text"
                maxLength={32}
                onChange={(e) => setEncryptor(e.target.value)}
              />
            </div>
          </div>
          <ToastContainer
            theme="dark"
            position="bottom-left"
            autoClose={1950}
          />
          <button onClick={handleConfiguration} id="submit">
            Configure
          </button>
        </div>
      ) : (
        <div className="onboarding">
          <img src="https://o.remove.bg/downloads/347a0cf6-3ea4-4573-bdeb-656021602e85/undraw_File_bundle_re_6q1e__1_-removebg-preview.png" />
          <h1>Are you ready to start?</h1>
          <p>
            Before we being please take a moment to read the following. We are
            not responsible if you loose your account. Everything is hosted
            locally so on the next page you will fill out some information to
            let us connect you to the api privatly!
          </p>

          <button onClick={() => setAccepted(true)}>Okay!</button>
        </div>
      )}
    </div>
  );
};

export default Setup;
