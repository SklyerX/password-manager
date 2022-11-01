import {
  SidebarItems,
  SidebarItemsSecond,
  userProfile,
} from "../../utils/mocks/sidebar";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-top">
          <img src={userProfile} alt="User Profile" />
          <hr />
        </div>
        <div className="sidebar-content">
          <div className="sidebar-item">
            <h4>Vault & Items</h4>
            {SidebarItems.map((item) => (
              <a
                href={item.href}
                key={item.id}
                className={
                  window.location.href.includes(`${item.href}`) ? "active" : ""
                }
              >
                <i className={item.icon} /> {item.name}
              </a>
            ))}
          </div>
          <div className="sidebar-item">
            <h4>More</h4>
            {SidebarItemsSecond.map((item) => (
              <a
                href={item.href}
                key={item.id}
                className={
                  window.location.href.includes(`${item.href}`) ? "active" : ""
                }
              >
                <i className={item.icon} /> {item.name}
              </a>
            ))}
          </div>
          <div className="credits">
            <h3>
              By:{" "}
              <a onClick={() => window.electronAPI.openWeb()}>
                <i className="fa-brands fa-github" />
                <span>SkylerX</span>
              </a>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
