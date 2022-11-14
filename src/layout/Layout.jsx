import { Outlet, Link } from "react-router-dom";
import React from "react";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <nav class="w3-sidebar w3-bar-block w3-small w3-hide-small w3-center">
      <a href="/" class="w3-bar-item w3-button w3-padding-large w3-black">
        <i class="fa fa-home w3-xxlarge"></i>
        <p>HOME</p>
      </a>
        <span> </span>
        <a href="/chat" class="w3-bar-item w3-button w3-padding-large w3-hover-black">
          <i class="fa fa-envelope w3-xxlarge"></i>
          <p>CHAT</p>
       </a>
        <span> </span>
      </nav>

      <Outlet />
      <Footer />
    </>
  );
}
