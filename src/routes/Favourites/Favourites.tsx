import React, { useEffect, useState } from "react";
import { passwordIntefaceHandler } from "../../interface/passwords.inteface";
import { toast, ToastContainer } from "react-toastify";
import { deleteFavouriteViaApi, getFavourites } from "../../utils/api";
import "react-toastify/dist/ReactToastify.css";
import "./favourites.scss";
import { MantineProvider, Modal } from "@mantine/core";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [deleteable, setDeleteable] = useState<boolean>(false);
  const [sudoPerm, setSudoPerm] = useState<string>("");
  const [Id, setId] = useState<string>("");

  useEffect(() => {
    getFavourites()
      .then((res) => {
        if (res.status === 200) {
          setFavourites(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error! Something went wrong while loading favourites!");
      });
  }, []);

  const handleFavDelete = () => {
    console.log(Id);
    if (sudoPerm.length !== 0) {
      deleteFavouriteViaApi(Id, sudoPerm.split(" "))
        .then((res) => {
          if (res.data.success === true) {
            toast.success("Success! Password Deleted.");
            setDeleteable(false);

            setTimeout(() => {
              getFavourites()
                .then((res) => {
                  if (res.status === 200) {
                    setFavourites(res.data.data);
                  }
                })
                .catch((err) => {
                  console.error(err);
                  toast.error(
                    "Error! Something went wrong while loading favourites!"
                  );
                });
            });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.message.includes("409")) {
            return toast.error(
              "Error! Invalid Word or Words in the Sudo Perm field"
            );
          }
          toast.error(
            "Error! Somenthing went wrong while deleting the password!"
          );
        });
    } else {
      toast.error("Error! Please fill in the Sudo Perm field!");
    }
  };

  return (
    <div className="favourites container">
      <ToastContainer theme="dark" position="top-center" autoClose={3000} />
      {favourites.map((favourite: passwordIntefaceHandler) => (
        <>
          <MantineProvider theme={{ colorScheme: "dark" }}>
            <Modal
              opened={deleteable}
              title="Delete Password"
              onClose={() => setDeleteable(false)}
            >
              <textarea
                className="textarea"
                onChange={(e) => setSudoPerm(e.target.value)}
              ></textarea>
              <button className="button danger mt-2" onClick={handleFavDelete}>
                Delete Password
              </button>
            </Modal>
          </MantineProvider>
          <div
            className="password"
            onClick={() => {
              setDeleteable(true);
              setId(favourite.Id);
            }}
          >
            <div className="password-top">
              <img src={favourite.AppIcon} />
              <span>{favourite.Name}</span>
            </div>
            <div className="password-bottom">
              <div className="password-section">
                <i className="fa-solid fa-user" />
                <span>{favourite.Username}</span>
              </div>
              <div className="password-section">
                <i className="fa-solid fa-key" />
                <span>
                  {favourite.Password.replace(favourite.Password, "*").repeat(
                    12
                  )}
                </span>
              </div>
              <div className="password-section">
                <i className="fa-solid fa-globe" />
                <span>{favourite.Url}</span>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Favourites;
