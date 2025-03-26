import React, { useState, useRef, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Headers from "./components/Little-components/Header.tsx";
import "./assets/css/main.css";
import Donnée from "./components/Lecture";
import Historique from "./components/historique.tsx";

// Chargement paresseux des composants
const Home = lazy(() => import("./components/Home"));
const LazyToastContainer = lazy(() =>
  import("react-toastify").then((module) => ({
    default: module.ToastContainer,
  }))
);

const App: React.FC = () => {
  // Gestion du fichier sélectionné
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Met à jour les champs de saisie de fichiers
  const updateFileInputs = (file: File | null) => {
    fileInputRefs.current.forEach((input) => {
      if (input && file) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
      } else if (input) {
        input.value = "";
      }
    });
  };

  return (
    <Router>
      {/* ToastContainer affiché conditionnellement si un fichier est sélectionné */}
      {selectedFile && (
        <Suspense fallback={null}>
          <LazyToastContainer />
        </Suspense>
      )}

      {/* En-tête visible sur toutes les pages */}
      <Headers
        setSelectedFile={(file) => {
          setSelectedFile(file); // Met à jour le fichier sélectionné
          updateFileInputs(file); // Met à jour les inputs de fichier
        }}
      />

      {/* Routes avec des imports dynamiques */}
      <Suspense fallback={<div>Chargement...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Home selectedFile={selectedFile} fileInputRefs={fileInputRefs} />
            }
          />
          <Route
            path="/Historique"
            element={
              <Historique />
            }
          />
        </Routes>
        <Routes>
          <Route path="/a" element={<Donnée />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
