import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'userName',
    headerName: 'userName',
    width: 130,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', userName: 'Snow', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', userName: 'Snow', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', userName: 'Snow', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', userName: 'Snow', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', userName: 'Snow', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, userName: 'Snow', age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', userName: 'Snow', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', userName: 'Snow', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', userName: 'Snow', age: 65 },
];

export default function Dashboard() {
  return (
    <div style={{ height: 400, width: '80%', margin: 'auto' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
