import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import FileUpload from "./Files-components/FileUpload";
import FileMapping from "./Files-components/FileMapping";
import FileExport from "./Files-components/FileExport";
import EditableTable from "./Files-components/EditableTable";
import { FileRow } from "../types/FileTypes";


interface TableConfig {
  name: string;
  columns: string[];
}

const Donnée = () => {
  const location = useLocation();
  const [uploadedData, setUploadedData] = useState<FileRow[]>([]);
  const [activeConfig, setActiveConfig] = useState<TableConfig | null>(null);

  // Gérer le changement de mapping
  const handleMappingChange = (newMapping: { tableConfig?: TableConfig }) => {
    if (newMapping.tableConfig) {
      setActiveConfig(newMapping.tableConfig);
    }
  };

  // Récupérer un objet de mapping basé sur la configuration
  const getMappingObject = (
    config: TableConfig | null
  ): Record<string, string> => {
    if (!config) return {};
    return config.columns.reduce((acc, column) => {
      acc[column] = column;
      return acc;
    }, {} as Record<string, string>);
  };

  useEffect(() => {
    if (location.state?.file) {
      setUploadedData([]);
    }
  }, [location.state]);

  return (
    <main className="donne">
      <FileUpload onFileLoaded={setUploadedData} />
      {uploadedData.length > 0 && (
        <>
          <FileMapping
            data={uploadedData}
            onMappingChange={handleMappingChange}
          />

          <EditableTable
            data={uploadedData}
            onDataChange={setUploadedData}
            columns={activeConfig?.columns || []}
          />
          <FileExport
            data={uploadedData}
            mapping={getMappingObject(activeConfig)}
          />
        </>
      )}
    </main>
  );
};

export default Donnée;
