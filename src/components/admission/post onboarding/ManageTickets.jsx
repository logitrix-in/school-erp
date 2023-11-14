import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import useClasses from "../../../hooks/useClasses";

const ManageTickets = () => {
  const columns = [
    { field: "ticket_id", headerName: "Ticket ID", flex: 1 },
    { field: "category", headerName: "Ticket Category", flex: 1 },
    { field: "type", headerName: "Type", wiwdth: 90 },
    { field: "class", headerName: "Class", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "ageing", headerName: "Ageing (days)", flex: 1 },
  ];
  const rows = [];

  const [open, setOpen] = useState(false);

  const { classes } = useClasses();

  return (
    <Box>
      <Box py={1.5} px={2} bgcolor={"#eeeeee"} borderRadius={1}>
        <Typography fontWeight={500} fontSize={"1rem"}>
          Open Tickets
        </Typography>
      </Box>
      <Box mt={2}>
        <Box
          display={"flex"}
          gap={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontWeight={600}>Filters</Typography>
          <ButtonGroup variant="outlined" size="small" sx={{ mr: "auto" }}>
            <Button>All (558) </Button>
            <Button>New (377)</Button>
            <Button>High Ageing (45) </Button>
          </ButtonGroup>

          <TextField label="Find By Category" sx={{ width: "23rem" }} />
        </Box>
        <Box display={"flex"} gap={2} mt={1} justifyContent={"space-between"}>
          <Box />
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpen(true)}
          >
            + Create New Ticket
          </Button>
        </Box>
      </Box>

      <Box height={"20rem"} mt={2}>
        <DataGrid columns={columns} rows={rows} />
      </Box>

      <Dialog
        maxWidth="md"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box>
          <Typography
            fontWeight={500}
            fontSize={"1rem"}
            color={"white"}
            p={2}
            bgcolor={"primary.main"}
          >
            Create a New Ticket
          </Typography>
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Ticket Category</InputLabel>
                  <Select label="Ticket Category" onChange={() => {}}>
                    {["Uniform", "School Application", "Exit Request"].map(
                      (val, idx) => (
                        <MenuItem key={idx} value={val}>
                          {val}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <InputLabel>Class</InputLabel>
                  <Select label="Class" onChange={() => {}}>
                    {classes.map((val, idx) => (
                      <MenuItem key={idx} value={val}>
                        {val}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Subject" />
              </Grid>
              <Grid item xs={12}>
                <TextField multiline fullWidth rows={10} label="Description" />
              </Grid>
              <Grid item xs={3}>
                <Button fullWidth variant="contained">Add Ticket</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ManageTickets;
