import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [auth, setauth] = useState(false);

  const handlelogout = async () => {
    try {
      const res = await axios.get("http://localhost:8800/logout");
      if (res.data.status === "token deleted succesfully")
        window.location.reload();
      // alert("Logged out")
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    const verifylogin = async () => {
      try {
        const res = await axios.get("http://localhost:8800/");
        if (res.data.status === "success") {
          // console.log("inside home if");
          setauth(true);
          // console.log("auth", res.data.name);
        } else {
          setauth(false);
        }
      } catch (err) {
        return err;
      }
    };
    verifylogin();
  }, []);
  return auth ? (
    <>
      <div className="form-wrapper">
        <form>
          <h3>you are authorised user</h3>
          <button
            id="register-button"
            className="button-click"
            onClick={handlelogout}
          >
            Logout
          </button>
        </form>
      </div>
    </>
  ) : (
    <>
      <div className="form-wrapper">
        <form>
          <h3>You are not Logged In</h3>
          <button id="login-button" className="button-click">
            <Link to="/login" className="links">
              Login
            </Link>
          </button>
        </form>
      </div>
    </>
  );
};

export default Home;
