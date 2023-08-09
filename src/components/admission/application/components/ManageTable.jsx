import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Switch,
  IconButton,
} from "@mui/material";
import { Check, Clear } from "@mui/icons-material";
import { Icon } from "@iconify/react";
import Bbox from "../../../UiComponents/Bbox";

const ManageTable = () => {
  // Sample data for the table
  const [Application, SetApplication] = useState([
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
      class: "Class IV",
      openingDate: new Date("1/2/2022").toLocaleDateString().toString(),
      closingDate: new Date("10/3/2022").toLocaleDateString().toString(),
      active: false,
    },
  ]);

  const handleActiveChange = (index) => (event) => {
    const updatedApplications = [...Application];
    updatedApplications[index].active = event.target.checked;
    SetApplication(updatedApplications);
  };

  return (
    <Bbox borderRadius={10} >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class</TableCell>
              <TableCell>Opening Date</TableCell>
              <TableCell>Closing Date</TableCell>
              <TableCell>Active</TableCell>
              <TableCell style={{ width: "10%" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Application.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.class}</TableCell>
                <TableCell>{row.openingDate}</TableCell>
                <TableCell>{row.closingDate}</TableCell>
                <TableCell>
                  {/* <Switch
                    checked={row.active}
                    onClick={handleActiveChange(idx)}
                  /> */}
                  {row.active ? "Open" : "Closed" }
                </TableCell>
                <TableCell style={{ width: "5%" }} align="right">
                  <IconButton>
                    <Icon icon="tabler:edit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Bbox>
  );
};

export default ManageTable;
