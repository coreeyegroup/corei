// src/components/Workspace/views/panels/TablePanel.tsx
import React from 'react';

interface TableColumn {
  key: string;
  label: string;
}

interface TablePanelProps {
  title?: string;
  columns: TableColumn[];
  data: Record<string, any>[];
  renderRow?: (row: Record<string, any>, index: number) => React.ReactNode;
}

const TablePanel: React.FC<TablePanelProps> = ({ title, columns, data, renderRow }) => {
  return (
    <div className="panel table-panel">
      {title && <span className="panel-title">{title}</span>}
      <table className="panel-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            renderRow ? renderRow(row, idx) : (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePanel;
