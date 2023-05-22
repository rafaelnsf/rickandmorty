import React from "react";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";

function NavbarMenu() {
  const navigate = useNavigate();
  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Personagens",
      icon: "pi pi-fw pi-id-card",
      command: () => {
        navigate("/characters");
      },
    },
    {
      label: "Localizações",
      icon: "pi pi-fw pi-map-marker",
      command: () => {
        navigate("/locations");
      },
    },
    {
      label: "Episódios",
      icon: "pi pi-fw pi-video",
      command: () => {
        navigate("/episodes");
      },
    },
  ];

  const start = <img alt="logo" src="/logo.png" height="40" className="mr-2"></img>;

  return (
    <div className="menu">
      <div className="card">
        <Menubar model={items} start={start} />
      </div>
    </div>
  );
}

export default NavbarMenu;
