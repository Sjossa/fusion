import React from "react";
import { FileRow } from "../../types/FileTypes";

interface FileExportProps {
  mapping: Record<string, string>;
  data: FileRow[];
}

const FileExport: React.FC<FileExportProps> = ({ mapping, data }) => {
  const handleExport = () => {
    const mappedData = data.map((row) => {
      const mappedRow: Record<string, string> = {};
      Object.entries(mapping).forEach(([target, source]) => {
        const value = row[source];
        mappedRow[target] = value?.toString() ?? "";
      });
      return mappedRow;
    });

    const csvContent = convertToCSV(mappedData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "exported_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const convertToCSV = (data: Record<string, string>[]) => {
    if (data.length === 0) return "";
    const headers = Object.keys(data[0]);
    const rows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];

            return `${value.replace(/"/g, '')}`;

            return `${value.replace(/"/g, '')}`;

          })
          .join(",")
      ),
    ];
    return rows.join("\n");
  };

  return (
    <div className="file-export">
      <button onClick={handleExport}>Export Mapped Data</button>
    </div>
  );
};

export default FileExport;
