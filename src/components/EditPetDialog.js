import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../assets/DeletePetDialog.css";
import "../assets/EditPetDialog.css";

import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import PetEdit from "../components/PetEdit";

export default function DialogDemo({
  deletePet,
  idMascota,
  update,
  petToEdit,
  killDialog,
}) {
  const [displayBasic, setDisplayBasic] = useState(true);
  const [displayBasic2, setDisplayBasic2] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayMaximizable, setDisplayMaximizable] = useState(false);
  const [displayPosition, setDisplayPosition] = useState(false);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState("center");

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
    displayBasic2: setDisplayBasic2,
    displayModal: setDisplayModal,
    displayMaximizable: setDisplayMaximizable,
    displayPosition: setDisplayPosition,
    displayResponsive: setDisplayResponsive,
  };

  const fetchDelete = (e) => {
    fetch(
      `https://backend.missingpets.art/mascotas/borrarMascota/${idMascota}`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then(() => {
        update();
        deletePet();
      });
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const renderHeader = (e) => {
    return (
      <PetEdit petToEdit={petToEdit} update={update} killDialog={killDialog} />
    );
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="deletePetButtons"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={(e) => fetchDelete(e)}
          autoFocus
          className="deletePetButtons"
        />
      </div>
    );
  };

  return (
    <Dialog
      closable={false}
      header={renderHeader}
      headerClassName="headerDialogEditPet"
      position="top"
      visible={displayBasic}
      onHide={() => onHide("displayBasic")}
      className="editPetDialog"
      contentClassName="contentEditPetDialog"
    ></Dialog>
  );
}
