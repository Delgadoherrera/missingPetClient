import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../assets/Mascotas.css";
import React, { useState, useEffect, useRef } from "react";
import { DataView } from "primereact/dataview";
import { MascotasService } from "../services/MascotasService";
import MascotaPerdida from "../views/MascotaPerdidaDialog";
import MascotaEncontrada from "../views/MascotaEcontradaDialog";
import DeletePetDialog from "./DeletePetDialog";
import EditPetDialog from "./EditPetDialog";

export default function DataViewLazyDemo(props) {
  const [products, setProducts] = useState(null);
  const [layout, setLayout] = useState("list");
  const [first, setFirst] = useState(0);
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [update, setupdate] = useState(false);
  const [petMenu, setPetMenu] = useState(0);
  const [dialog, setDialog] = useState(false);
  const [editPetDialog, setEditPetDialog] = useState(false);
  const [petSelected, setPetSelected] = useState({});
  const rows = useRef(6);
  const datasource = useRef(null);
  const isMounted = useRef(false);
  const getAllPets = new MascotasService();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  useEffect(() => {
    isMounted.current = true;
    getAllPets.getMascotasByIdHumano(localStorage.id).then((data) => {
      datasource.current = data;

      setProducts(datasource.current.slice(0, rows.current));
    });
  }, [update]);

  useEffect(() => {
    setPetMenu(petMenu);
  }, [products]);

  const onPage = (event) => {
    const startIndex = event.first;
    const endIndex = Math.min(event.first + rows.current);
    const newProducts =
      startIndex === endIndex
        ? datasource.current.slice(startIndex)
        : datasource.current.slice(startIndex, endIndex);

    setFirst(startIndex);
    setProducts(newProducts);
  };

  const updateComponent = (e) => {
    setupdate(!update);
  };
  const deletePet = (e) => {
    setDialog(!dialog);
  };

  const editPet = (e) => {
    setEditPetDialog(!editPetDialog);
  };

  useEffect(() => {
    products !== null && editPetDialog === true ? (
      products.forEach((one) => {
        if (one.idMascota === petMenu) {
          return setPetSelected(one);
        }
      })
    ) : (
      <p></p>
    );
  }, [editPetDialog]);

  const renderListItem = (data) => {
    return (
      <div className="col-12 cardDataMyPets">
        <div className="product-list-item cardsPet">
          <img
            className="imgMascotas"
            src={`data:image/jpeg;base64,${data.fotoMascota}`}
          />
          <div className="mascotasDetailContainer">
            <div className="detalleMascota">
              <div className="product-name">{data.nombre}</div>
              <div className="product-description petDescription">
                {data.descripcion}
              </div>
              <span className="product-category">
                Color principal: {data.colorPrimario}
              </span>
              <br></br>
              <span className="product-category">
                Color principal: {data.colorSecundario}
              </span>
              <br></br>
              <span className="product-category">
                Peso aproximado: {data.pesoAproximado}
              </span>
            </div>
          </div>
          <div className="optionButtonMyPets">
            {data.status === 1 ? (
              <MascotaEncontrada
                idMascotaPerdida={data}
                update={updateComponent}
              />
            ) : (
              <MascotaPerdida
                update={updateComponent}
                idMascotaPerdida={data}
                state={state}
              />
            )}
            <button
              className="deletePetButton"
              onClick={(e) => {
                editPet(e);
                setPetMenu(data.idMascota);
              }}
              value={data.idMascota}
            >
              Editar mascota
            </button>

            <br></br>
            <button
              className="deletePetButton buttonDeletePet"
              onClick={(e) => {
                deletePet(e);
                setPetMenu(data.idMascota);
              }}
              value={data.idMascota}
            >
              Eliminar mascota
            </button>
          </div>

          <div className="divOptionPets buttonEditPet">
            {dialog === true ? (
              <DeletePetDialog
                deletePet={deletePet}
                idMascota={petMenu}
                update={setupdate}
              />
            ) : (
              <p> </p>
            )}
            <br></br>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }
    if (layout === "list") return renderListItem(product);
  };

  const renderHeader = () => {
    let onOptionChange = (e) => {
      setLayout(e.value);
    };
  };

  const header = renderHeader();

  return products ? (
    <div className="mascotasDiv">
      {editPetDialog === true ? (
        <EditPetDialog
          idMascota={petMenu}
          petToEdit={petSelected}
          update={updateComponent}
          killDialog={editPet}
        />
      ) : (
        <p></p>
      )}
      {products.length > 0 ? (
        <div className="dataview-demo">
          <div className="card viewCardMyPets">
            <DataView
              value={products}
              layout={layout}
              header={header}
              itemTemplate={itemTemplate}
              /* lazy paginator */ rows={rows.current}
              first={first}
              onPage={onPage}
            />
          </div>
        </div>
      ) : (
        <div className="emptyPets">
          {" "}
          <p className="textEmptyPets">
            {" "}
            Aun no has cargado ninguna mascota. En la barra de navegacion
            inferior podras encontrar la seccion para cargar el perfil de tus
            mascotas.
          </p>
        </div>
      )}
    </div>
  ) : (
    <p> </p>
  );
}
