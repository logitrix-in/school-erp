import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../../../config/api";

function formatDate(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let daySuffix;
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = "st";
  } else if (day === 2 || day === 22) {
    daySuffix = "nd";
  } else if (day === 3 || day === 23) {
    daySuffix = "rd";
  } else {
    daySuffix = "th";
  }

  return `${day}${daySuffix} ${month}, ${year}`;
}

const columns = [
  { field: "class", headerName: "Class", width: 140 },
  { field: "startingDate", headerName: "application open", width: 180 },
  { field: "closingDate", headerName: "application close", width: 180 },
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
