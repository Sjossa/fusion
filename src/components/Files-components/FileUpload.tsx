import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FileRow } from "../../types/FileTypes";

interface FileUploadProps {
  onFileLoaded?: (data: FileRow[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileLoaded }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const location = useLocation();
  const file = location.state?.file;

  const validateFile = (file: File): boolean => {
    const validTypes = [
      ".csv",
      ".xlsx",
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (
        !validTypes.some(
            (type) => file.name.toLowerCase().endsWith(type) || file.type === type
        )
    ) {
      setError("Please upload a CSV or XLSX file");
      return false;
    }
    return true;
  };

  const processFile = (file: File) => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        if (text) {
          const rows = text.split("\n");
          const headers = rows[0].split(",");
          const json: FileRow[] = rows.slice(1).map((row: string, index: number) => {
            const values = row.split(",");
            const rowData: FileRow = {
              id: `row-${index}`, // Add unique id for each row
            };
            headers.forEach((header, index) => {
              rowData[header.trim()] = values[index] || "";
            });
            return rowData;
          });
          setError("");
          onFileLoaded?.(json);
        }
      } catch {
        setError("Error processing file");
      }
    };
    reader.onerror = () => setError("Error reading file");
    reader.readAsText(file);
  };

  useEffect(() => {
    if (file) {
      processFile(file);
    }
  }, [file]);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  return (
      <div
          className={`file-upload-area ${dragActive ? "drag-active" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
      >
        <input
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
            className="file-input"
        />
        {error && <div className="error-message">{error}</div>}
        <div className="upload-message">
          Drag and drop a file here or click to select
        </div>
      </div>
  );
};

export default FileUpload;