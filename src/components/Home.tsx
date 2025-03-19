import React, { useRef } from "react";

interface HomeProps {
  selectedFile: File | null;
}

const Home: React.FC<HomeProps> = ({ selectedFile }) => {
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <main>
      <div className="first_ligne flex-rows">
        <h2 className="titre_page">Home</h2>

        <h2 className="utulisateur_page">Bienvenue, utilisateur</h2>
      </div>

      {/* Menu de la page */}
      <div className="menu_page flex-column">
        {selectedFile && (
          <h2 className="Name_fichier">
            Fichier enregistré : {selectedFile.name}
          </h2>
        )}

        {/* Formulaire de visualisation */}
        <form action="Lecture" method="post" encType="multipart/form-data">
          <label htmlFor="file-visualisation">Lecture du fichier</label>
          <input
            id="file-visualisation"
            type="file"
            name="file"
            ref={(el) => {
              if (fileInputRefs.current) fileInputRefs.current[0] = el;
            }}
            style={{ display: "none" }}
          />
          <button type="submit">Lecture</button>
        </form>

        {/* Formulaire de correction */}
        <form action="/Connexion" method="post" encType="multipart/form-data">
          <label htmlFor="file-correction">Correction du fichier</label>
          <input
            id="file-correction"
            type="file"
            name="file"
            ref={(el) => {
              if (fileInputRefs.current) fileInputRefs.current[1] = el;
            }}
            style={{ display: "none" }}
          />
          <button type="submit">Correction</button>
        </form>

        {/* Formulaire d'exportation */}
        <form action="/Connexion" method="post" encType="multipart/form-data">
          <label htmlFor="file-export">Exporter le fichier corrigé</label>
          <input
            id="file-export"
            type="file"
            name="file"
            ref={(el) => {
              if (fileInputRefs.current) fileInputRefs.current[2] = el;
            }}
            style={{ display: "none" }}
          />
          <button type="submit" disabled>
            Exporter
          </button>
        </form>
      </div>
    </main>
  );
};

export default Home;
