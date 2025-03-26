import React, { useState, useEffect } from "react";
import { FileRow, ColumnMapping } from "../../types/FileTypes";

interface EditableTableProps {
  data: FileRow[];
  onDataChange: (newData: FileRow[]) => void;
  columns: ColumnMapping[];
  tableName: string;
}

const EditableTable: React.FC<EditableTableProps> = ({
  data,
  onDataChange,
  columns,
  tableName,
}) => {
  const [editMode, setEditMode] = useState(false);

  // Synchroniser les données avec le stockage local par onglet
  useEffect(() => {
    const storedData = localStorage.getItem(tableName); // On récupère les données pour cet onglet spécifique
    if (storedData) {
      onDataChange(JSON.parse(storedData)); 
    }
  }, [tableName, onDataChange]);

  const handleCellChange = (
    rowIndex: number,
    columnId: string,
    value: string
  ) => {
    const newData = [...data];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [columnId]: value,
    };
    onDataChange(newData);

    localStorage.setItem(tableName, JSON.stringify(newData));
  };

  return (
    <div>
      <button className="edit-button" onClick={() => setEditMode(!editMode)}>
        {editMode ? "Save Changes" : "Edit Table"}
      </button>
      {editMode && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.id}>{column.displayName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={row.id || rowIndex}>
                  {columns.map((column) => (
                    <td key={`${row.id}-${column.id}`}>
                      <input
                        type="text"
                        value={row[column.id]?.toString() ?? ""}
                        onChange={(e) =>
                          handleCellChange(rowIndex, column.id, e.target.value)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EditableTable;
