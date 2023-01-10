import React from "react";
import { NavLink } from "react-router-dom";
import style from "./LandingPage.module.css";
const LandingPage = () => {
  return (
    <>
      <div className={style.bodyLandingPage}>
        <div className={style.titleContainer}>
          <div className={style.linkContainer}>
            <h1 className={style.titleLandingPage}>Welcome to the Pokedex!</h1>
            <br />
            <p className={style.p}>
              Be careful out there, wild Pokemon live in tall grass, you need
              your own Pokemon for your protection
            </p><br />
            <NavLink className={style.btnLandingPage} to="/home">
              Go to Home
            </NavLink>
          </div>
          <div className={style.imgContainer}>
            <img
              className={style.img}
              src="https://cdn.dribbble.com/users/1771704/screenshots/5891354/shiny-charizard.gif"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default LandingPage;
