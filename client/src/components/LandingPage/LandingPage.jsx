import React from "react";
import { NavLink } from "react-router-dom";
import style from "./LandingPage.module.css";
const LandingPage = () => {
  return (
    <>
      <div className={style.bodyLandingPage}>
        <div className={style.titleContainer}>
          <div className={style.linkContainer}>
            <h1 className={style.titleLandingPage}>Bienvenido a tu Pokedex!</h1>
            <br />
            <p className={style.p}>
              Ten cuidado ahi afuera, pokemons salvajes viven ahi afuera,
              necesitas uno para tu propia protecccion
            </p>
            <br />
            <NavLink className={style.btnLandingPage} to="/home">
              ir a Home
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
