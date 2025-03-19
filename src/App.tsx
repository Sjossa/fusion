import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import FileMapping from './components/FileMapping';
import FileExport from './components/FileExport';
import EditableTable from './components/EditableTable';
import { FileRow } from './types/FileTypes';
import './App.css';

interface TableConfig {
    name: string;
    columns: string[];
}

const App: React.FC = () => {
    const [uploadedData, setUploadedData] = useState<FileRow[]>([]);
    const [activeConfig, setActiveConfig] = useState<TableConfig | null>(null);

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
        <div className="App">
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
        </div>
    );
};

export default App;