import React, { useEffect, useState } from "react";
import { Modal, MantineProvider } from "@mantine/core";
import {
  deletePasswordViaApi,
  getPasswords,
  saveNewPasswordViaApi,
  savePasswordToFavourites,
  updatePasswordData,
} from "../../utils/api";
import { passwordIntefaceHandler } from "../../interface/passwords.inteface";
import "./passwords.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Passwords = () => {
  const [passwords, setPasswords] = useState([]);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [newModal, setNewModal] = useState<boolean>(false);
  // Password
  const [AppIcon, setAppIcon] = useState<string>("");
  const [Name, setName] = useState<string>("");
  const [Username, setUsername] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [Url, setUrl] = useState<string>("");
  const [Id, setId] = useState<string>("");
  // Content
  const [editabled, setEditable] = useState<boolean>(false);
  const [sudoPerm, setSudoPerm] = useState<string>("");
  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  // overeaters outlandishness firearmed mourned customize armadas lased perennate uncooled scatterations lixivial fiddled

  useEffect(() => {
    getPasswords().then((res) => {
      setPasswords(res.data.data);
    });
  }, []);

  const handleDelete = (id: string) => {
    if (sudoPerm.length === 0)
      return toast.error("Error! Please fill in the Sudo Perm Field!");

    deletePasswordViaApi(id, sudoPerm.split(" ")).then((res) => {
      if (res.data.success === true) {
        toast.success("Success! Password Deleted!");
        setEditModal(false);
        setDeleteMode(false);
        setEditable(false);

        setTimeout(() => {
          getPasswords()
            .then((res) => {
              setPasswords(res.data.data);
            })
            .catch((err) => {
              console.log(err);
              if (err.message.includes("409")) {
                return toast.error("Invalid Sudo Perm Word(s)");
              }
              toast.error("Something went wrong while deleteing password");
            });
        });
      }
    });
  };

  const handleChangedValues = () => {
    if (
      AppIcon.length !== 0 &&
      Name.length !== 0 &&
      Username.length !== 0 &&
      Password.length !== 0 &&
      Url.length !== 0 &&
      sudoPerm.length !== 0
    ) {
      updatePasswordData(
        Id,
        AppIcon,
        Name,
        Username,
        Password,
        Url,
        sudoPerm.split(" ")
      )
        .then((res) => {
          if (res.data.success === true) {
            toast.success("Success! Password Value(s) Updated!");
            setEditModal(false);
            setEditable(false);

            setTimeout(() => {
              getPasswords()
                .then((res) => {
                  setPasswords(res.data.data);
                })
                .catch((err) => {
                  console.log(err);
                  if (err.message.includes("409")) {
                    return toast.error("Invalid Sudo Perm Word(s)");
                  }
                  toast.error("Something went wrong while deleteing password");
                });
            });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.message.includes("409")) {
            return toast.error("Invalid Sudo Perm Word(s)");
          }
          toast.error(
            "Error! Something went wrong while updating the password!"
          );
        });
    } else {
      return toast.error("Some values are empty!");
    }
  };

  const handleNewPassword = () => {
    if (
      AppIcon.length !== 0 &&
      Name.length !== 0 &&
      Username.length !== 0 &&
      Password.length !== 0 &&
      Url.length !== 0
    ) {
      saveNewPasswordViaApi(AppIcon, Name, Username, Password, Url)
        .then((res) => {
          if (res.data.success === true) {
            toast.success("Success! New password successfully added!");
            setNewModal(false);

            setTimeout(() => {
              getPasswords()
                .then((res) => {
                  setPasswords(res.data.data);
                })
                .catch((err) => {
                  console.log(err);
                  if (err.message.includes("409")) {
                    return toast.error("Invalid Sudo Perm Word(s)");
                  }
                  toast.error("Something went wrong while deleteing password");
                });
            }, 500);
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Somethin went wrong while saving the password!");
        });
    } else {
      return toast.error("Error! One or more values may be missing!");
    }
  };

  const handleSavePassword = () => {
    if (
      AppIcon.length !== 0 &&
      Name.length !== 0 &&
      Username.length !== 0 &&
      Password.length !== 0 &&
      Url.length !== 0
    ) {
      savePasswordToFavourites(Id, AppIcon, Name, Username, Password, Url)
        .then((res) => {
          if (res.data.success === true) {
            toast.success("Success! Password Saved!");
            setEditModal(false);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.message.includes("409")) {
            return toast.error(
              "This password is already saved in your favourites!"
            );
          }
          toast.error("Error! Something went wrong while saving the password!");
        });
    } else {
      return toast.error("Error! One or more field values are missing!");
    }
  };

  return (
    <div className="passwords container">
      <div
        className="upload"
        onClick={() => {
          setNewModal(true);
          setAppIcon("");
          setName("");
          setUsername("");
          setPassword("");
          setUrl("");
        }}
      >
        <i className="fa-solid fa-plus" />
      </div>
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <Modal
          opened={newModal}
          onClose={() => setNewModal(false)}
          title={`Add a new password`}
        >
          <div className="fields">
            <div className="field">
              <h5>App Icon</h5>
              <input
                type="text"
                className="input-primary"
                onChange={(e) => setAppIcon(e.target.value)}
              />
            </div>
            <div className="field">
              <h5>Name</h5>
              <input
                type="text"
                className="input-primary"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <h5>Username</h5>
              <input
                type="text"
                className="input-primary"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="field">
              <h5>Password</h5>
              <input
                type="text"
                className="input-primary"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="field">
              <h5>Url</h5>
              <input
                type="text"
                className="input-primary"
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>

          <button className="button primary mt-2" onClick={handleNewPassword}>
            Add Password
          </button>
        </Modal>
      </MantineProvider>
      <ToastContainer theme="dark" position="top-center" autoClose={3000} />
      {passwords.length !== 0 &&
        passwords.map((password: passwordIntefaceHandler) => (
          <>
            <MantineProvider theme={{ colorScheme: "dark" }}>
              <Modal
                opened={editModal}
                onClose={() => {
                  setEditModal(false);
                  setEditable(false);
                  setDeleteMode(false);
                }}
                title={`Manage ${Name}`}
              >
                <div className="fields">
                  <div className="field">
                    <h5>App Icon</h5>
                    <input
                      type="text"
                      className="input-primary"
                      value={AppIcon}
                      disabled={!editabled}
                      onChange={(e) => setAppIcon(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <h5>Name</h5>
                    <input
                      type="text"
                      className="input-primary"
                      value={Name}
                      disabled={!editabled}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <h5>Username</h5>
                    <input
                      type="text"
                      className="input-primary"
                      value={Username}
                      disabled={!editabled}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <h5>Password</h5>
                    <input
                      type="text"
                      className="input-primary"
                      value={Password}
                      disabled={!editabled}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <h5>Url</h5>
                    <input
                      type="text"
                      className="input-primary"
                      value={Url}
                      disabled={!editabled}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="btns">
                  <div className="btn">
                    <button
                      className="button primary"
                      onClick={() => {
                        setEditable(!editabled);
                        setDeleteMode(false);
                      }}
                    >
                      {editabled ? "Disable Edit Mode" : "Enable Edit Mode"}
                    </button>
                  </div>
                  <div className="btn">
                    <button
                      className="button secondary"
                      onClick={handleSavePassword}
                    >
                      Add To Favourites
                    </button>
                  </div>
                  <div className="btn">
                    <button
                      className="button danger"
                      onClick={() => {
                        setDeleteMode(!deleteMode);
                        setEditable(false);
                      }}
                    >
                      <i className="fa-solid fa-trash" />
                    </button>
                  </div>
                </div>

                {editabled ? (
                  <>
                    <h5>Sudo Permission Words - Submit New Data</h5>
                    <textarea
                      className="textarea"
                      spellCheck={false}
                      onChange={(e) => setSudoPerm(e.target.value)}
                    ></textarea>
                    <div
                      className="button danger mt-2"
                      onClick={handleChangedValues}
                    >
                      Change
                    </div>
                  </>
                ) : (
                  ""
                )}
                {deleteMode ? (
                  <>
                    <h5>Sudo Permission Words - Delete Password</h5>
                    <textarea
                      className="textarea"
                      spellCheck={false}
                      onChange={(e) => setSudoPerm(e.target.value)}
                    ></textarea>
                    <div
                      className="button danger mt-2"
                      onClick={() => handleDelete(Id)}
                    >
                      Delete Password
                    </div>
                  </>
                ) : (
                  ""
                )}
              </Modal>
            </MantineProvider>
            <div
              className="password"
              onClick={() => {
                setEditModal(true);
                setAppIcon(password.AppIcon);
                setName(password.Name);
                setUsername(password.Username);
                setPassword(password.Password);
                setUrl(password.Url);
                setId(password.Id);
              }}
            >
              <div className="password-top">
                <img src={password.AppIcon} />
                <span>{password.Name}</span>
              </div>
              <div className="password-bottom">
                <div className="password-section">
                  <i className="fa-solid fa-user" />
                  <span>{password.Username}</span>
                </div>
                <div className="password-section">
                  <i className="fa-solid fa-key" />
                  <span>
                    {password.Password.replace(password.Password, "*").repeat(
                      12
                    )}
                  </span>
                </div>
                <div className="password-section">
                  <i className="fa-solid fa-globe" />
                  <span>{password.Url}</span>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default Passwords;
