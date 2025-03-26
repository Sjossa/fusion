import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  selectedFile: File | null;
  fileInputRefs: React.RefObject<(HTMLInputElement | null)[]>;
}

const Home: React.FC<HomeProps> = ({ selectedFile }) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (selectedFile) {
      if (fileInputRefs.current[0]) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(selectedFile);
        fileInputRefs.current[0]!.files = dataTransfer.files;
      }
    }
  }, [selectedFile]);

  const handleFormSubmit = (event: React.FormEvent, fileType: string) => {
    event.preventDefault();

    const file = fileInputRefs.current[0]?.files?.[0];

    if (!file) {
      setError("Veuillez sélectionner un fichier.");
      return;
    }


    navigate("/a", {
      state: { file, fileType },
    });
  };

  return (
    <main>
      <div className="first_ligne flex-rows">
        <h2 className="titre_page">Home</h2>
        <h2 className="utulisateur_page">Bienvenue, utilisateur</h2>
      </div>

      <div className="menu_page flex-column">
        {selectedFile && (
          <h2 className="Name_fichier">
            Fichier enregistré : {selectedFile.name}
          </h2>
        )}

        <form onSubmit={(e) => handleFormSubmit(e, "lecture")}>
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

        <form onSubmit={(e) => handleFormSubmit(e, "correction")}>
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

        <form onSubmit={(e) => handleFormSubmit(e, "export")}>
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

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </main>
  );
};

export default Home;
