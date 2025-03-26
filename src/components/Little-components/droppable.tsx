import { useState } from "react";
import { ErrorMessage } from "./error"; // ✅ Import du composant

interface DroppableProps {
  onFileDrop: (file: File) => void;
}

export const Droppable: React.FC<DroppableProps> = ({ onFileDrop }) => {
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (!file) return;

    const allowedExtensions = [".csv", ".xlsx"];
    const fileExtension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      setError("Format non supporté. Veuillez déposer un fichier CSV ou XLSX.");
      return;
    }

    setError(null);
    onFileDrop(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="full-ecran"
    >
      <p>Déposez votre fichier ici</p>
      <ErrorMessage message={error} />{""}
    </div>
  );
};
