import React, { useState, useRef, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Headers from "./components/Little-components/header";
import "./assets/css/main.css";

// 🚀 Chargement dynamique des pages
const Home = lazy(() => import("./components/Home"));
const Connexion = lazy(() => import("./components/Connexion"));
const LazyToastContainer = lazy(() =>
  import("react-toastify").then((module) => ({
    default: module.ToastContainer,
  }))
);

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
      {/* Charge le ToastContainer seulement si un fichier est sélectionné */}
      {selectedFile && (
        <Suspense fallback={null}>
          <LazyToastContainer />
        </Suspense>
      )}

      {/* Sidebar (Header) visible sur toutes les pages */}
      <Headers
        setSelectedFile={(file) => {
          setSelectedFile(file);
          updateFileInputs(file);
        }}
      />

      {/* Gestion des routes avec chargement dynamique */}
      <Suspense fallback={<div>Chargement...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Home selectedFile={selectedFile} fileInputRefs={fileInputRefs} />
            }
          />
          <Route path="/connexion" element={<Connexion />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
