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
      field: "appId",
      headerName: "Application Id",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
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
            alert(params.row.appId);
          }}
        >
          Review
        </Button>
      ),
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
            setCurMode("candidates");
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
    setCurMode("class");
  }, []);

  return (
    <div style={{ width: "50%" }}>
      <div style={{ height: 370 }}>
        <DataGrid
          rowSelection={false}
          density="standard"
          rows={rows}
          columns={columns}
        />
      </div>
      {curMode != "class" && (
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
      )}
    </div>
  );
}
