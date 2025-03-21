import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ErrorMessage } from "./error";

interface HeadersProps {
  setSelectedFile: (file: File | null) => void;
}

const Headers: React.FC<HeadersProps> = ({ setSelectedFile }) => {
  const [error, setError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const allowedExtensions = ["csv", "xlsx"];

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      setError(
        "Format non supporté. Veuillez sélectionner un fichier CSV ou XLSX."
      );
      setSelectedFile(null);
      setSelectedFileName(null);
      return;
    }

    setError(null);
    setSelectedFile(file);
    setSelectedFileName(file.name);
  };

  return (
    <header className="sidebar flex-column">
      {/* Message d'erreur lisible par les lecteurs d'écran */}
      {error && <ErrorMessage message={error} aria-live="assertive" />}

      <nav>
        <ul>
          <li>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileUpload}
              accept=".csv, .xlsx"
              className="hidden"
              aria-describedby="file-upload-info"
            />
            <label
              htmlFor="fileInput"
              className="button-file"
              tabIndex={0}
              role="button"
              aria-label="Sélectionner un fichier au format CSV ou XLSX"
            >
              📂 Ajouter un fichier
            </label>
          </li>

          <li>
            <Link to="/Historique" className="nav-link" tabIndex={0}>
              📜 Historique
            </Link>
          </li>

          <li>
            <Link to="/a" className="nav-link" tabIndex={0}>
              📜 a
            </Link>
          </li>

          <li>
            <Link to="/" className="nav-link" tabIndex={0}>
              🔙 Accueil
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Headers;
