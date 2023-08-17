import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

const columns = [
  { field: "class", headerName: "Class", width: 140 },
  { field: "startingDate", headerName: "application open", width: 160 },
  { field: "closingDate", headerName: "application close", width: 160 },
  {
    field: "applicationStatus",
    headerName: "Status",
  },
];

const rows = [
  {
    id: 1,
    class: "Kg",
    startingDate: "Jon",
    closingDate: "nice",
    applicationStatus: "open",
  },
  {
    id: 2,
    class: "I",
    startingDate: "Cersei",
    closingDate: "nice",
    applicationStatus: "open",
  },
  {
    id: 3,
    class: "II",
    startingDate: "Jaime",
    closingDate: "nice",
    applicationStatus: "open",
  },
  {
    id: 4,
    class: "III",
    startingDate: "Arya",
    closingDate: "nice",
    applicationStatus: "open",
  },
  {
    id: 5,
    class: "IV",
    startingDate: "Daenerys",
    closingDate: "nice",
    applicationStatus: "open",
  },
  {
    id: 6,
    class: "V",
    startingDate: null,
    closingDate: "nice",
    applicationStatus: "open",
  },
  {
    id: 7,
    class: "VI",
    startingDate: "Ferrara",
    closingDate: "nice",
    applicationStatus: "open",
  },
  {
    id: 8,
    class: "VII",
    startingDate: "Rossini",
    closingDate: "nice",
    applicationStatus: "open",
  },
  {
    id: 9,
    class: "VII",
    startingDate: "Harvey",
    closingDate: "nice",
    applicationStatus: "open",
  },
  {
    id: 10,
    class: "IX",
    startingDate: "Harvey",
    closingDate: "nice",
    applicationStatus: "open",
  },
];

export default function DataTable() {
  return (
    <div style={{ width: "100%", height: 370 }}>
      <DataGrid
        density="standard"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[
          Math.round((rows.length * 1) / 4),
          Math.round((rows.length * 2) / 4),
          Math.round((rows.length * 3) / 4),
          rows.length,
        ]}
      />
    </div>
  );
}
