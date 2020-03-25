import React from "react";
import {FiLogIn} from 'react-icons/fi'
import {Link} from 'react-router-dom'
import "./styles.css";
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Login() {
  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>

        <form>
          <h1>Faça seu Login</h1>
          <input type="text" placeholder="Sua ID"/>
          <button className="button" type="submit">Entrar</button>

          <Link className="form-link" to="/register"><FiLogIn size={16}
          color="#e02041" ></FiLogIn> Não tenho cadastro</Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}
