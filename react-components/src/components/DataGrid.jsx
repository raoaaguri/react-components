import React, { useState, useMemo } from 'react';
import './DataGrid.css';

const DataGrid = ({
  columns,
  data,
  fixedHeader = false,
  fixedColumns = 0,
  sortable = false,
  searchable = false,
  expandable = false,
  itemsPerPageOptions = [10, 25, 50, 100]
}) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      return (sortDirection === 'asc' ? 1 : -1) * (aVal > bVal ? 1 : -1);
    });
  }, [data, sortColumn, sortDirection]);

  const filteredData = useMemo(() => {
    if (!searchTerm) return sortedData;
    return sortedData.filter(row =>
      columns.some(col => String(row[col.key]).toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [sortedData, searchTerm, columns]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleSort = (key) => {
    if (sortColumn === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(key);
      setSortDirection('asc');
    }
  };

  const toggleExpandRow = (index) => {
    setExpandedRows(prev => {
      const newExpanded = new Set(prev);
      newExpanded.has(index) ? newExpanded.delete(index) : newExpanded.add(index);
      return newExpanded;
    });
  };

  const handlePageChange = (direction) => {
    setCurrentPage(prev => prev + direction);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="data-grid">
      {searchable && (
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}

      <div className="pagination-controls">
        <label>
          Items per page:
          <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            {itemsPerPageOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <button onClick={() => handlePageChange(-1)} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(1)} disabled={currentPage === totalPages}>Next</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {columns.map((col, colIndex) => (
                <th
                  key={col.key}
                  className={col.fixed ? 'fixed-column' : ''}
                  onClick={() => sortable && col.sortable ? handleSort(col.key) : undefined}
                >
                  {col.label}
                  {sortable && col.sortable && (sortColumn === col.key) && (
                    <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <tr onClick={() => expandable && toggleExpandRow(rowIndex)}>
                  {columns.map((col, colIndex) => (
                    <td key={col.key} className={col.fixed ? 'fixed-column' : ''}>
                      {String(row[col.key])}
                    </td>
                  ))}
                </tr>
                {expandable && expandedRows.has(rowIndex) && (
                  <tr className="expanded-row">
                    <td colSpan={columns.length}>
                      <div>Expanded Content for Row {rowIndex + 1}</div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataGrid;
