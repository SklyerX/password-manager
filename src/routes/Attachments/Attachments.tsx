import React, { useEffect, useState } from "react";
import {
  deleteAttachment,
  getAttachments,
  uploadAttachment,
} from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  MantineProvider,
  Modal,
  Textarea,
  TextInput,
} from "@mantine/core";
import { attachmentsHandler } from "../../interface/attachments.interface";
import "./attachements.scss";

const Attachments = () => {
  const [attachments, setAttachments] = useState([]);
  const [opened, setOpened] = useState<boolean>(false);
  const [sudoPerm, setSudoPerm] = useState<string>("");
  const [uploadModal, setUploadModal] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");

  const covert2base64 = (e: any) => {
    const file = e.target.files[0];
    const reader: any = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result.toString());
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    getAttachments()
      .then((res) => {
        setAttachments(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong while loading attachments");
      });
  }, []);

  const handleDelete = (Id: string) => {
    deleteAttachment(Id, sudoPerm.split(" "))
      .then((res) => {
        if (res.status === 200) {
          setOpened(false);
          toast.success("Success! Attachment deleted!");

          setTimeout(() => {
            getAttachments()
              .then((res) => {
                setAttachments(res.data);
              })
              .catch((err) => {
                console.error(err);
                toast.error("Something went wrong while loading attachments");
              });
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong while deleting the attachment!");
      });
  };

  const submitAttachment = () => {
    if (image.length !== 0 && name.length !== 0) {
      uploadAttachment(name, image)
        .then((res) => {
          if (res.data.success === true || res.status === 200) {
            toast.success("Success! Attachment Uploaded");
            setUploadModal(false);

            setTimeout(() => {
              getAttachments()
                .then((res) => {
                  setAttachments(res.data);
                })
                .catch((err) => {
                  console.error(err);
                  toast.error("Something went wrong while loading attachments");
                });
            }, 2000);
          }
        })
        .catch((err) => {
          if (err.message.includes("409")) {
            return toast.error("Failure! Attachment with this name exists!");
          }
          console.error(err);
          setUploadModal(false);
          toast.error("Something went wrong while uploading the image!");
        });
    } else {
      if (image.length === 0) {
        toast.error("Please select a image to upload!");
      }
      if (name.length === 0) {
        toast.error("Please select a name to upload!");
      }
    }
  };

  return (
    <div className="attachments container">
      <ToastContainer theme="dark" position="top-center" autoClose={3000} />
      <div className="upload-btn" onClick={() => setUploadModal(true)}>
        <i className="fa-solid fa-plus" />
      </div>
      <MantineProvider theme={{ colorScheme: "dark" }}>
        <Modal
          opened={uploadModal}
          onClose={() => setUploadModal(false)}
          title="Upload Image"
        >
          <div
            className="upload-area"
            style={{
              padding: "5rem",
              border: "1px solid #999",
              display: "grid",
              placeItems: "center",
              borderRadius: 5,
            }}
          >
            <label htmlFor="file" style={{ cursor: "pointer" }}>
              Upload
            </label>
            <br />
            <input
              type="file"
              id="file"
              onChange={(e) => covert2base64(e)}
              style={{ opacity: 0, position: "absolute", zIndex: -1 }}
            />
            <br />
          </div>
          <TextInput label="Name" onChange={(e) => setName(e.target.value)} />
          <br />
          {image && (
            <img src={image} style={{ width: "25rem", filter: "blur(10px)" }} />
          )}
          <br />
          <Button color="green" onClick={submitAttachment}>
            Upload Attachment
          </Button>
        </Modal>
      </MantineProvider>
      <div className="images">
        {attachments.map((image: attachmentsHandler) => (
          <>
            <MantineProvider theme={{ colorScheme: "dark" }}>
              <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Delete Image - Permission Required"
              >
                <Textarea
                  label="Sudo Permission Words"
                  onChange={(e) => setSudoPerm(e.target.value)}
                />
                <br />
                <Button color="red" onClick={() => handleDelete(`${image.Id}`)}>
                  Delete Image
                </Button>
              </Modal>
            </MantineProvider>
            <div className="image" key={image.Name}>
              <img src={image.Base64} alt={`${image.Name}'s Attachment`} />
              <div className="operation-name">
                <h3>{image.Name}</h3>
                <div>
                  <a href={image.Base64} download>
                    <i className="fa-solid fa-download dl" />
                  </a>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => setOpened(true)}
                  />
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Attachments;
