import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import {
  Attachments,
  Dashboard,
  Favourites,
  Login,
  Passwords,
  Register,
  Settings,
  Setup,
} from "./routes/exports";
import { checkTokenValidity } from "./utils/api";

// POLAR MOVIE

export default function App() {
  const [authorized, setAuthorized] = React.useState<boolean>(false);

  React.useEffect(() => {
    const Token = window.localStorage.getItem("token");
    if (Token === null || Token === undefined) {
      return setAuthorized(false);
    }
    checkTokenValidity(`${Token}`)
      .then((res: any) => {
        if (res.data.success === true) {
          setAuthorized(true);
        }
      })
      .catch((err) => {
        console.log(err);
        window.location.replace("/login");
        window.localStorage.removeItem("token");
        return setAuthorized(false);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            authorized ? (
              <>
                <Sidebar />
                <Dashboard />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/passwords"
          element={
            <>
              <Sidebar />
              <Passwords />
            </>
          }
        />
        <Route
          path="/attachments"
          element={
            <>
              <Sidebar />
              <Attachments />
            </>
          }
        />
        <Route
          path="/favourites"
          element={
            <>
              <Sidebar />
              <Favourites />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <Sidebar />
              <Settings />
            </>
          }
        />
        <Route
          path="/login"
          element={authorized ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={authorized ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
