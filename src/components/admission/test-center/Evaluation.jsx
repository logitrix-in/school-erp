import {
  Box,
  Button,
  Dialog,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Icon } from "@iconify/react";

const Evaluation = () => {
  const [resultOpen, setResultOpen] = useState(false);

  const columns = [
    { field: "id", headerName: "Application Id", width: 150 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "test_marks", headerName: "Test Marks", width: 100 },
    { field: "interview_marks", headerName: "Interview Marks", width: 130 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "caste", headerName: "Caste", width: 90 },
    { field: "total", headerName: "Total Marks", width: 90 },
  ];
  return (
    <>
      <RevealCard>
        <Bbox borderRadius={2} bgcolor={"white"}>
          <Box
            py={2}
            px={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
              Evaluation
            </Typography>
          </Box>

          <Divider />
          <Box
            borderRadius={2}
            p={2}
            display={"flex"}
            gap={2}
            justifyContent={"center"}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              LinkComponent={Link}
              to="upload-offline-test-score/"
            >
              Upload Offline Test Score
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              LinkComponent={Link}
              to="upload-interview-score/"
            >
              Upload Interview Score
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => setResultOpen(true)}
            >
              Results
            </Button>
            <Dialog
              maxWidth="md"
              fullWidth
              open={resultOpen}
              onClose={() => setResultOpen(false)}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                p={1}
                px={2}
                bgcolor={'primary.main'}
              >
                <Typography fontSize={"1rem"} fontWeight={500} color={'white'}>
                  View Results
                </Typography>
                <IconButton onClick={() => setResultOpen(false)}>
                  <Icon icon={"ion:close"} color="white"/>
                </IconButton>
              </Box>
              <Box p={2} className="col" gap={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Class</InputLabel>
                  <Select label="Class">
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={10}>I</MenuItem>
                    <MenuItem value={20}>II</MenuItem>
                    <MenuItem value={30}>III</MenuItem>
                  </Select>
                </FormControl>
                <Box height="55vh">
                  <DataGrid
                    rows={[]}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                  />
                </Box>
              </Box>
            </Dialog>
          </Box>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default Evaluation;
