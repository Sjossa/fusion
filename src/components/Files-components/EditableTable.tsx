import React, { useState } from "react";
import { FileRow } from "../../types/FileTypes";

interface EditableTableProps {
  data: FileRow[];
  onDataChange: (newData: FileRow[]) => void;
  columns: string[];
}

const EditableTable: React.FC<EditableTableProps> = ({
  data,
  onDataChange,
  columns,
}) => {
  const [editMode, setEditMode] = useState(false);

  const handleCellChange = (
    rowIndex: number,
    column: string,
    value: string
  ) => {
    const newData = [...data];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [column]: value,
    };
    onDataChange(newData);
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
                {columns.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column) => (
                    <td key={column}>
                      <input
                        type="text"
                        value={row[column]?.toString() ?? ""}
                        onChange={(e) =>
                          handleCellChange(rowIndex, column, e.target.value)
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
