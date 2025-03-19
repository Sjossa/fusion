import React, { useState, useRef, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Headers from "./components/Little-components/header";
import FileUpload from "./components/FileUpload";
import FileMapping from "./components/FileMapping";
import FileExport from "./components/FileExport";
import EditableTable from "./components/EditableTable";
import { FileRow } from "./types/FileTypes";
import "./assets/css/main.css";

// 🚀 Chargement dynamique des pages
const Home = lazy(() => import("./components/Home"));
const Connexion = lazy(() => import("./components/Connexion"));
const LazyToastContainer = lazy(() =>
  import("react-toastify").then((module) => ({
    default: module.ToastContainer,
  }))
);

interface TableConfig {
  name: string;
  columns: string[];
}

const App: React.FC = () => {
  // Gestion des fichiers sélectionnés
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Gestion des fichiers uploadés et mapping
  const [uploadedData, setUploadedData] = useState<FileRow[]>([]);
  const [activeConfig, setActiveConfig] = useState<TableConfig | null>(null);

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

  const handleMappingChange = (newMapping: { tableConfig?: TableConfig }) => {
    if (newMapping.tableConfig) {
      setActiveConfig(newMapping.tableConfig);
    }
  };

  const getMappingObject = (config: TableConfig | null): Record<string, string> => {
    if (!config) return {};
    return config.columns.reduce((acc, column) => {
      acc[column] = column;
      return acc;
    }, {} as Record<string, string>);
  };

  return (
    <Router>
      {/* ToastContainer conditionnel */}
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
            element={<Home selectedFile={selectedFile} fileInputRefs={fileInputRefs} />}
          />
          <Route path="/connexion" element={<Connexion />} />
        </Routes>
      </Suspense>

      {/* Composants liés à la gestion des fichiers */}
      <div className="App">
        <FileUpload onFileLoaded={setUploadedData} />
        {uploadedData.length > 0 && (
          <>
            <FileMapping data={uploadedData} onMappingChange={handleMappingChange} />
            <EditableTable data={uploadedData} onDataChange={setUploadedData} columns={activeConfig?.columns || []} />
            <FileExport data={uploadedData} mapping={getMappingObject(activeConfig)} />
