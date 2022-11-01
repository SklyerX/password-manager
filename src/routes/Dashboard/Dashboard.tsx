import React, { useEffect, useState } from "react";
import {
  checkApiHealth,
  getAttachmentsLength,
  getFavouritesLength,
  getPasswordsLength,
} from "../../utils/api";
import "./dashboard.scss";

const Dashboard = () => {
  const [healthy, setHealthy] = useState<boolean>(false);
  const [passwordsLength, setPasswordsLength] = useState<number>(0);
  const [attachmentsLength, setAttachmentsLength] = useState<number>(0);
  const [favouritesLength, setFavouritesLength] = useState<number>(0);

  useEffect(() => {
    checkApiHealth()
      .then((res: any) => {
        if (res.data.success === true) {
          setHealthy(true);
        }
      })
      .catch((err) => {
        setHealthy(false);
        console.log(err);
      });

    getPasswordsLength()
      .then((res) => {
        setPasswordsLength(res.data.data.length);
      })
      .catch((err) => console.error(err));

    getAttachmentsLength()
      .then((res) => {
        setAttachmentsLength(res.data.data.length);
      })
      .catch((err) => console.error(err));

    getFavouritesLength()
      .then((res) => {
        setFavouritesLength(res.data.data.length);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dashboard container">
      <div className="dashboard-top">
        <h4>Statistics</h4>
        <div className="statistics">
          <div className="statistic">
            <span className="statistic-definer">
              <i className="fa-solid fa-box" /> All Passwords
            </span>
            <span className="count">{passwordsLength}</span>
          </div>
          <div className="statistic">
            <span className="statistic-definer">
              <i className="fa-solid fa-link" /> Attachments
            </span>
            <span className="count">{attachmentsLength}</span>
          </div>
          <div className="statistic">
            <span className="statistic-definer">
              <i className="fa-solid fa-star" /> Favourites
            </span>
            <span className="count">{favouritesLength}</span>
          </div>
        </div>
      </div>
      <div className="dashboard-bottom">
        <section>
          <h3>Api Health</h3>
          <p>{healthy ? "🟢 Active" : "🔴 Offline"}</p>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
