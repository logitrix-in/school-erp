import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";


const data = [
  {
    class: "KG",
    openingDate: new Date().toLocaleDateString().toString(),
    closingDate: new Date().toLocaleDateString().toString(),
    active: true,
  },
  {
    class: "Class I",
    openingDate: new Date().toLocaleDateString().toString(),
    closingDate: new Date().toLocaleDateString().toString(),
    active: true,
  },
  {
    class: "Class II",
    openingDate: new Date().toLocaleDateString().toString(),
    closingDate: new Date().toLocaleDateString().toString(),
    active: true,
  },
  {
    class: "Class III",
    openingDate: new Date().toLocaleDateString().toString(),
    closingDate: new Date().toLocaleDateString().toString(),
    active: true,
  },

  {
    class: "Class IV",
    openingDate: new Date("1/2/2022").toLocaleDateString().toString(),
    closingDate: new Date("10/3/2022").toLocaleDateString().toString(),
    active: false,
  },
  {
    class: "Class V",
    openingDate: new Date("1/2/2022").toLocaleDateString().toString(),
    closingDate: new Date("10/3/2022").toLocaleDateString().toString(),
    active: false,
  },
  {
    class: "Class VI",
    openingDate: new Date("1/2/2022").toLocaleDateString().toString(),
    closingDate: new Date("10/3/2022").toLocaleDateString().toString(),
    active: false,
  },
  {
    class: "Class VII",
    openingDate: new Date("1/2/2022").toLocaleDateString().toString(),
    closingDate: new Date("10/3/2022").toLocaleDateString().toString(),
    active: false,
  },
  {
    class: "Class VIII",
    openingDate: new Date("1/2/2022").toLocaleDateString().toString(),
    closingDate: new Date("10/3/2022").toLocaleDateString().toString(),
    active: false,
  },
  {
    class: "Class IX",
    openingDate: new Date("1/2/2022").toLocaleDateString().toString(),
    closingDate: new Date("10/3/2022").toLocaleDateString().toString(),
    active: false,
  },
  {
    class: "Class X",
    openingDate: new Date("1/2/2022").toLocaleDateString().toString(),
    closingDate: new Date("10/3/2022").toLocaleDateString().toString(),
    active: false,
  },
  {
    class: "Class XI",
    openingDate: new Date("1/2/2022").toLocaleDateString().toString(),
    closingDate: new Date("10/3/2022").toLocaleDateString().toString(),
    active: false,
  },
  {
    class: "Class XII - Science",
    openingDate: new Date("1/2/2022").toLocaleDateString().toString(),
    closingDate: new Date("10/3/2022").toLocaleDateString().toString(),
    active: false,
  },
  {
    class: "Class XII - Commerce",
    openingDate: new Date("1/2/2022").toLocaleDateString().toString(),
    closingDate: new Date("10/3/2022").toLocaleDateString().toString(),
    active: false,
  },
  {
    class: "Class XII - Arts",
    openingDate: new Date("1/2/2022").toLocaleDateString().toString(),
    closingDate: new Date("10/3/2022").toLocaleDateString().toString(),
    active: false,
  },
];

const ManageTable = () => {
  // Sample data for the table
  const [Application, SetApplication] = useState(data);

  return (
    <Box>
      <TableContainer >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Class</TableCell>
              <TableCell>Opening Date</TableCell>
              <TableCell>Closing Date</TableCell>
              <TableCell align="right">Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ p: 0 }}>
            {Application.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 }, "&:nth-of-type(2n)": {background: '#e0e0e05d'} }}
              >
                <TableCell>{row.class}</TableCell>
                <TableCell>{row.openingDate}</TableCell>
                <TableCell>{row.closingDate}</TableCell>
                <TableCell align="right">
                  {row.active ? "Open" : "Closed"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageTable;
