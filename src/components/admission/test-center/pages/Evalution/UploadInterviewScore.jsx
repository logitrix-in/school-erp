import React, { useEffect, useState } from "react";
import Bbox from "../../../../UiComponents/Bbox";
import { FileUploader } from "react-drag-drop-files";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../../../../config/api";

const UploadInterviewScore = () => {
  const [json, setJson] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [loadingJSON, setLoadingJSON] = useState(false);

  const fileTypes = ["csv"];

  const csvToJson = (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      // Send formData to the server using fetch or axios
      api
        .post(
          "/admission/test-center/evaluation/upload-offline-test-result/",
          formData
        )
        .then((res) => {
          console.log(res.data);
          setJson(res.data.data);
          setLoadingJSON(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("No file selected");
    }
  };

  useEffect(() => {
    console.log(json);
  }, [json]);

  const columns = [
    { field: "id", headerName: "Application Id", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "marks", headerName: "Marks", width: 200 },
  ];

  return (
    <Bbox p={2} borderRadius={1}>
      {json == null ? (
        loadingJSON ? (
          <Box
            height={"20rem"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={1}
          >
            <LinearProgress sx={{ width: "50%" }} />
            <Typography>Loading Data</Typography>
          </Box>
        ) : (
          <Box>
            <FileUploader
              onDraggingStateChange={(dragging) => setDragging(dragging)}
              hoverTitle=" "
              children={
                <Box
                  border={"2px dashed black"}
                  borderColor={"primary.main"}
                  borderRadius={2}
                  p={1}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={"20rem"}
                  bgcolor={dragging ? "primary.lighter" : "white"}
                >
                  <Typography fontSize={"1.4rem"} color={"grey"}>
                    {!dragging
                      ? "Drag and Drop Interview Score Excel Here"
                      : "Drop Here"}
                  </Typography>
                </Box>
              }
              handleChange={(file) => {
                setLoadingJSON(true);
                csvToJson(file);
              }}
              name="file"
              types={fileTypes}
            />
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => {}}>
              Download Template
            </Button>
          </Box>
        )
      ) : (
        <Box>
          <Box height="55vh">
            <DataGrid
              rows={json}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
            />
          </Box>
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            onClick={() => setJson(null)}
          >
            Reupload
          </Button>
        </Box>
      )}
    </Bbox>
  );
};

export default UploadInterviewScore;
