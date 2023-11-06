import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [columns, setColumn] = useState([]);

  const [curMode, setCurMode] = useState("class");

  const candidateColumn = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "appId",
      headerName: "Application Id",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];

  const classColumn = [
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
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            setRows([
              { id: 1, name: "Arnab Chatterjee", appId: "ACS10003032" },
            ]);
            setColumn(candidateColumn);
          }}
        >
          Review
        </Button>
      ),
    },
  ];

  const classRows = [
    { id: 1, class: "I", pending: 32, action: "button" },
    { id: 2, class: "II", pending: 50, action: "button" },
  ];

  useEffect(() => {
    setColumn(classColumn);
    setRows(classRows);
  }, []);

  return (
    <div style={{ width: "50%" }}>
      <div style={{ height: 370 }}>
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
      <Button
        variant="contained"
        sx={{ mt: 1 }}
        size="small"
        onClick={() => {
          setCurMode("class");
          setColumn(classColumn);
          setRows(classRows);
        }}
      >
        Back
      </Button>
    </div>
  );
}
