import React, { useState, useEffect, useRef } from "react";

// PRIME REACT IMPORTS
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const baseApiUrl = "https://rickandmortyapi.com/api/";

function LocationsList() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [residents, setResidents] = useState(null);

  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dimensionFilter, setDimensionFilter] = useState("");

  const dt = useRef(null);

  //URL COMPLETA DA API COM OS FILTROS
  let fullApiUrl = `${baseApiUrl}location/?&name=${searchName}&type=${typeFilter}&dimension=${dimensionFilter}`;

  //Fetch Json Data
  useEffect(() => {
    (async function () {
      setLoading(true);
      let data = await fetch(fullApiUrl).then((res) => res.json());
      setLocations(data.results);

      setLoading(false);
    })();
  }, [fullApiUrl]);

  //FUNÇÃO PARA CARREGAS OS RESIDENTES DA LOCALIZAÇÃO
  const loadResidents = async (data) => {
    let a = await Promise.all(
      data.residents.map((x) => {
        return fetch(x).then((res) => res.json());
      })
    );
    setResidents(a);
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Procurar</h5>

      {/* FILTROS */}
      <InputText
        type="text"
        onInput={(e) => {
          setSearchName(e.target.value);
        }}
        placeholder="Nome"
      />

      <InputText
        type="text"
        onInput={(e) => {
          setTypeFilter(e.target.value);
        }}
        placeholder="Tipo"
      />

      <InputText
        type="text"
        onInput={(e) => {
          setDimensionFilter(e.target.value);
        }}
        placeholder="Dimensão"
      />
      <Dropdown
        value={selectedLocation}
        options={locations}
        optionLabel="name"
        placeholder="Selecione a localização"
        onChange={(e) => {
          setSelectedLocation(e.value);
          loadResidents(e.value);
        }}
      />
    </div>
  );
  const imageBodyTemplate = (rowData) => {
    return <img src={rowData.image} alt={rowData.name} style={{ width: "200px" }} />;
  };

  return (
    <div className="locations">
      {selectedLocation ? (
        <div>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", textAlign: "center", margin: "2rem 0" }}>
            Localização: {selectedLocation.name}
          </h1>
          <h2>Dimensão: {selectedLocation.dimension}</h2>
          <h3>Tipo: {selectedLocation.type}</h3>
        </div>
      ) : (
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", textAlign: "center", margin: "2rem 0" }}>Localizações</h1>
      )}

      {locations && (
        <DataTable
          ref={dt}
          value={residents}
          dataKey="id"
          responsiveLayout="scroll"
          header={header}
          resizableColumns
          columnResizeMode="fit"
          emptyMessage="Nenhuma Localização encontrada!"
          loading={loading}
        >
          <Column header="Imagem" body={imageBodyTemplate}></Column>
          <Column field="name" header="Nome" sortable></Column>
          <Column field="status" header="Status" sortable></Column>
          <Column field="location.name" header="Ultima Localização" sortable></Column>
        </DataTable>
      )}
    </div>
  );
}

export default LocationsList;
