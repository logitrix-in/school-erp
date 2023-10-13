import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";

const columns = [
  { field: "class", headerName: "Class", width: 140 },
  { field: "startingDate", headerName: "Opening date", width: 180 },
  { field: "closingDate", headerName: "Closing date", width: 180 },
  {
    field: "applicationStatus",
    headerName: "Status",
  },
];

export default function DataTable({ rows = [] }) {
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
