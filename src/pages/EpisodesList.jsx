import React, { useState, useEffect, useRef } from "react";

// PRIME REACT IMPORTS
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const baseApiUrl = "https://rickandmortyapi.com/api/";

function EpisodeList() {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const [characters, setCharacters] = useState(null);

  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [episodeFilter, setEpisodeFilter] = useState("");

  const dt = useRef(null);

  // URL COMPLETA DA API COM OS FILTROS
  let fullApiUrl = `${baseApiUrl}episode/?&name=${searchName}&episode=${episodeFilter}`;

  //Fetch Json Data
  useEffect(() => {
    (async function () {
      setLoading(true);
      let data = await fetch(fullApiUrl).then((res) => res.json());
      setEpisodes(data.results);

      setLoading(false);
    })();
  }, [fullApiUrl]);

  //CARREGA OS PERSONAGENS DO EPISODIO
  const loadCharacters = async (data) => {
    let character = await Promise.all(
      data.characters.map((url) => {
        return fetch(url).then((res) => res.json());
      })
    );
    setCharacters(character);
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Procurar</h5>
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
          setEpisodeFilter(e.target.value);
        }}
        placeholder="Episodio"
      />

      <Dropdown
        value={selectedEpisode}
        options={episodes}
        optionLabel="name"
        placeholder="Selecione a localização"
        onChange={(e) => {
          setSelectedEpisode(e.value);
          loadCharacters(e.value);
        }}
      />
    </div>
  );
  const imageBodyTemplate = (rowData) => {
    return <img src={rowData.image} alt={rowData.name} style={{ width: "200px" }} />;
  };

  return (
    <div className="episodes">
      {selectedEpisode ? (
        <div>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", textAlign: "center", margin: "2rem 0" }}>
            Localização: {selectedEpisode.name}
          </h1>
          <h2 style={{ fontSize: "3rem", fontWeight: "bold", textAlign: "center", margin: "2rem 0" }}>
            Ao Ar: {selectedEpisode.air_date}
          </h2>
        </div>
      ) : (
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", textAlign: "center", margin: "2rem 0" }}>Episódios</h1>
      )}

      {episodes && (
        <DataTable
          ref={dt}
          value={characters}
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
          <Column field="episode.name" header="Ultima Localização" sortable></Column>
        </DataTable>
      )}
    </div>
  );
}

export default EpisodeList;
