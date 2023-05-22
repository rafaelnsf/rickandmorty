import React, { useState, useEffect, useRef } from "react";
import Pagination from "../components/Pagination/Pagination";

// PRIME REACT IMPORTS
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";

const baseApiUrl = "https://rickandmortyapi.com/api/";

const statusItems = [
  { label: "Vivo", value: "alive" },
  { label: "Morto", value: "dead" },
  { label: "Desconhecido", value: "unknown" },
];

const speciesItems = [
  { label: "Humano", value: "human" },
  { label: "Humanoide", value: "humanoid" },
  { label: "Poopybutthole", value: "poopybutthole" },
  { label: "Mitologico", value: "mythological" },
  { label: "Desconhecido", value: "unknown" },
  { label: "Animal", value: "animal" },
  { label: "Robo", value: "robot" },
  { label: "Cronenberg", value: "cronenberg" },
  { label: "Planeta", value: "planet" },
  { label: "Alienigena", value: "alien" },
  { label: "Disease", value: "disease" },
];

const genderItems = [
  { label: "Feminino", value: "female" },
  { label: "Masculino", value: "male" },
  { label: "Sem Gênero", value: "genderless" },
  { label: "Desconhecido", value: "unknown" },
];

function CharactersList() {
  const [characters, setCharacters] = useState([]);

  let { info } = characters;
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [statusFilter, setStatusFilter] = useState("dead");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState();
  const [detailsDialog, setDetailsDialog] = useState(false);

  const dt = useRef(null);

  //URL COMPLETA DA API COM OS FILTROS
  let fullApiUrl = `${baseApiUrl}character/?page=${pageNumber}&name=${searchName}&status=${statusFilter}&gender=${genderFilter}&species=${speciesFilter}&type=${typeFilter}`;

  //Fetch Json Data
  useEffect(() => {
    (async function () {
      setLoading(true);
      let data = await fetch(fullApiUrl).then((res) => res.json());
      let charactersWithEpisodes = data.results.map((character) => {
        let primeiroEpisodio = character.episode[0];
        return { ...character, primeiroEpisodio };
      });
      setCharacters(charactersWithEpisodes);
      setLoading(false);
    })();
  }, [fullApiUrl]);

  //FUNÇÃO PARA ABRIR O MODAL
  const openDetails = (e) => {
    console.log("evet", e);
    setSelectedRow(e);
    setDetailsDialog(true);
  };

  // FUNÇÃO PARA FECHAR O MODAL
  const hideDetailsDialog = () => {
    setDetailsDialog(false);
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Procurar</h5>

      {/* //FILTROS */}
      <InputText
        type="text"
        onInput={(e) => {
          setSearchName(e.target.value);
          setPageNumber(1);
        }}
        placeholder="Nome"
      />

      <InputText
        type="text"
        onInput={(e) => {
          {
            setTypeFilter(e.target.value);
            setPageNumber(1);
          }
        }}
        placeholder="Tipo"
      />

      <Dropdown
        value={statusFilter}
        options={statusItems}
        onChange={(e) => {
          setStatusFilter(e.value);
          setPageNumber(1);
        }}
        placeholder="Status"
      />

      <Dropdown
        value={speciesFilter}
        options={speciesItems}
        onChange={(e) => {
          setSpeciesFilter(e.value);
          setPageNumber(1);
        }}
        placeholder="Especie"
      />

      <Dropdown
        value={genderFilter}
        options={genderItems}
        onChange={(e) => {
          setGenderFilter(e.value);
          setPageNumber(1);
        }}
        placeholder="Gênero"
      />
    </div>
  );
  const footer = (
    <div className="table-footer">
      <Pagination info={info} pageNumber={pageNumber} setPageNumber={setPageNumber} />
    </div>
  );
  const imageBodyTemplate = (rowData) => {
    return <img src={rowData.image} alt={rowData.image} style={{ width: "100px" }} />;
  };

  return (
    <div className="characters">
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", textAlign: "center", margin: "2rem 0" }}>Personagens</h1>
      <p>Obs: clique na tabela para abrir os detalhes</p>
      <DataTable
        ref={dt}
        value={characters}
        dataKey="id"
        responsiveLayout="scroll"
        header={header}
        footer={footer}
        resizableColumns
        columnResizeMode="fit"
        emptyMessage="Nenhum Personagem encontrado!"
        loading={loading}
        selectionMode="single"
        selection={selectedRow}
        onSelectionChange={(e) => openDetails(e.value)}
      >
        <Column header="Imagem" body={imageBodyTemplate}></Column>
        <Column field="name" header="Nome" sortable></Column>
        <Column field="status" header="Status" sortable></Column>
        <Column field="species" header="Espécie" sortable></Column>
        <Column field="type" header="Tipo" sortable></Column>
        <Column field="location.name" header="Ultima Localização" sortable></Column>
        <Column field="primeiroEpisodio" header="Primeiro avistamento" sortable></Column>
      </DataTable>

      {/* Modal que abre os personagens */}
      <Dialog visible={detailsDialog} style={{ width: "700px" }} header="Detalhes" modal onHide={hideDetailsDialog}>
        <Card>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "1rem" }}>
              <img src={selectedRow?.image} alt={selectedRow?.name} />
            </div>
            <div>
              <h2>{selectedRow?.name}</h2>
              <p>Gênero: {selectedRow?.gender}</p>
              <p>Espécie: {selectedRow?.species}</p>
              <p>Tipo: {selectedRow?.type || "Inexistente"}</p>
              <p>Ultima localização conhecida: {selectedRow?.location.name}</p>
              <p>Primeiro Avistamento: {selectedRow?.primeiroEpisodio}</p>
              <span
                style={{
                  fontWeight: "bold",
                  color: selectedRow?.status === "Alive" ? "green" : selectedRow?.status === "Dead" ? "red" : "gray",
                }}
              >
                {selectedRow?.status === "Alive" ? "Alive" : selectedRow?.status === "Dead" ? "Dead" : "Unknown"}
              </span>
            </div>
          </div>
        </Card>
      </Dialog>
    </div>
  );
}

export default CharactersList;
