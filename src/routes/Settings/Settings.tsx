import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  deleteAccount,
  downloadPasswords,
  uploadPasswordsViaFileAndApi,
} from "../../utils/api";
import "react-toastify/dist/ReactToastify.css";
import "./settings.scss";
import { MantineProvider, Modal } from "@mantine/core";

// sidekicks alterer ruffled fireproof microphylls vitiable lampshells parroting infolders dispersed pterygoid employee

const Settings = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [upload, setUpload] = useState<boolean>(false);
  const [sudoPerm, setSudoPerm] = useState<string>("");
  const [type, setType] = useState<string>("");
  // Credentials
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // Uploader
  const [showSubmit, setShowSubmit] = useState<boolean>(false);
  const [fileData, setFileData] = useState<string>("");

  const uploadPasswordsViaFile = () => {
    uploadPasswordsViaFileAndApi(JSON.parse(fileData)).then((res) => {
      if (res.data.success === true) {
        toast.success("Success! Passwords uploaded...");
        setUpload(false);

        setTimeout(() => {
          window.location.replace("/passwords");
        }, 3100);
      }
    });
  };

  const handleDeleteAndDownload = () => {
    if (sudoPerm.length === 0)
      return toast.error("Error! Please fill out the Sudo permission filed");
    if (type === "download") {
      downloadPasswords(sudoPerm.split(" "))
        .then((res) => {
          if (res.data.success === true) {
            toast.success(
              "Success! Password downloaded. Check Your Desktop for a file named passwords.json"
            );
            setOpened(false);
            window.electronAPI.download(res.data.data);
          }
        })
        .catch((err) => {
          if (err.message.includes("409")) {
            return toast.error("Error! Invalid Sudo Perm Word(s)");
          }
          toast.error(
            "Error! Something went wrong while downloading the passwords!"
          );
        });
    } else if (type === "delete") {
      if (
        email.length !== 0 &&
        username.length !== 0 &&
        password.length !== 0
      ) {
        deleteAccount(username, password, email, sudoPerm.split(" "))
          .then((res) => {
            if (res.data.success === true) {
              toast.success(res.data.message);
              setOpened(false);
              setTimeout(() => {
                window.location.reload();
              }, 3100);
            }
          })
          .catch((err) => {
            console.error(err);
            if (err.message.includes("409")) {
              return toast.error(
                "Error! Some of the values you entered may be incorrect!"
              );
            }
            toast.error("Something went wrong while deleting this account!");
          });
      } else {
        toast.error("One or more of the required fields is missing!");
      }
    }
  };

  return (
    <div className="settings container">
      <ToastContainer theme="dark" position="top-center" autoClose={3000} />
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title={`${type.charAt(1).toUpperCase()} Password`}
        >
          {type === "delete" ? (
            <>
              <h5>Username</h5>
              <input
                type="text"
                className="input-primary"
                onChange={(e) => setUsername(e.target.value)}
              />
              <h5>Email</h5>
              <input
                type="text"
                className="input-primary"
                onChange={(e) => setEmail(e.target.value)}
              />
              <h5>Password</h5>
              <input
                type="text"
                className="input-primary"
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          ) : (
            ""
          )}

          <textarea
            className={`textarea ${type === "delete" ? "mt-2" : ""}`}
            onChange={(e) => setSudoPerm(e.target.value)}
          ></textarea>

          <button
            className={`button ${
              type === "download" ? "secondary" : "danger"
            } mt-2`}
            onClick={() =>
              type === "download"
                ? "Download" && handleDeleteAndDownload()
                : "Delete" && handleDeleteAndDownload()
            }
            // onClick={() => {
            //   handleDeleteAndDownload();
            // }}
          >
            {type === "download" ? "Download" : "Delete"}
          </button>
        </Modal>
        <Modal
          opened={upload}
          onClose={() => setUpload(false)}
          title="Upload Passwords"
        >
          <div className="uploader">
            <label
              htmlFor="file"
              style={{
                cursor: "pointer",
                marginTop: "1.5rem",
              }}
            >
              Upload
            </label>
            <br />
            <input
              type="file"
              id="file"
              style={{ opacity: 0, position: "absolute", zIndex: -1 }}
              accept=".json"
              onChange={(e) => {
                const files: any = e.target.files;
                let reader = new FileReader();
                reader.readAsText(files[0]);
                reader.onload = (e) => {
                  setFileData(`${e.target?.result}`);
                  setShowSubmit(true);
                };
              }}
            />
          </div>

          {showSubmit ? (
            <button
              className="button primary mt-2"
              onClick={uploadPasswordsViaFile}
            >
              Upload Files
            </button>
          ) : (
            ""
          )}
        </Modal>
      </MantineProvider>
      <div className="box">
        <div className="controls">
          <div className="control">
            <h3>Download Account Details</h3>
            <p>
              Download your account details such as, passwords, favourites,
              attachments, database url, port, and other account related
              information. The reason you might want to download this is to have
              your account backed up and to re-upload it on a new device
            </p>
            <button
              className="button primary mt-2"
              onClick={() => {
                setOpened(true);
                setType("download");
              }}
            >
              Download
            </button>
          </div>
          <div className="control mt-2">
            <h3>Delete Account</h3>
            <p>
              If you want to delete your account please press the button below.
              Please note that by deleting you account everything will be
              deleted such as Passwords, Favouries, Attachments, Account
              Credentails, Database Url, Port Number, Encryptor Key, and more.
            </p>
            <button
              className="button danger mt-2"
              onClick={() => {
                setOpened(true);
                setType("delete");
              }}
            >
              Delete
            </button>
          </div>
          <div className="control mt-2">
            <h3>Upload Password</h3>
            <p>
              If you have exported password(s) from a different pc and or
              account you can import them by into this account by clicking the
              import button and selecting the proper file. If the incorrect file
              is provided the proccess will be terminated.
            </p>
            <button
              className="button secondary mt-2"
              onClick={() => {
                setUpload(true);
                setType("upload");
              }}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
