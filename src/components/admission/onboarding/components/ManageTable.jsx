import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";

const columns = [
  {
    field: "class",
    headerName: "Class",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "pending",
    headerName: "Pending",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: () => (
      <Button variant="contained" size="small">
        Review
      </Button>
    ),
  },
];

export default function DataTable({
  rows = [{ id: 1, class: "I", pending: 32, action: "button" },{ id: 2, class: "II", pending: 50, action: "button" }],
}) {
  return (
    <div style={{ width: "50%", height: 370 }}>
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
