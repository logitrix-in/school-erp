import React, { useEffect, useState } from "react";
import Bbox from "../../../../UiComponents/Bbox";
import { FileUploader } from "react-drag-drop-files";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import * as XLSX from "xlsx";
import { DataGrid } from "@mui/x-data-grid";

const UploadOfflineScore = () => {
  const [json, setJson] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [loadingJSON, setLoadingJSON] = useState(false);

  const convertTOJson = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonResult = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        resolve(jsonResult);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const fileTypes = ["xlsx", "xls"];

  useEffect(() => {
    console.log(json);
  }, [json]);

  const columns = [
    { field: "id", headerName: "Application Id", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "marks", headerName: "Marks", width: 200 },
  ];

  const rows = json
    ? json.slice(1).map((row, index) => {
        return { id: row[0], name: row[1], marks: row[2] };
      })
    : [];

  return (
    <Bbox p={2} borderRadius={1}>
      {json == null ? (
        loadingJSON ? (
          <Box
            height={"20rem"}
            display={'flex'}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            gap={1}
          >
            <LinearProgress sx={{ width: "50%" }} />
            <Typography>Loading Data</Typography>
          </Box>
        ) : (
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
                    ? "Drag and Drop Offline Report Excel Here"
                    : "Drop Here"}
                </Typography>
              </Box>
            }
            handleChange={(file) => {
              setLoadingJSON(true);
              convertTOJson(file).then((f) => {
                setJson(f);
                setLoadingJSON(false);
              });
            }}
            name="file"
            types={fileTypes}
          />
        )
      ) : (
        <Box>
          <Box height="20rem">
            <DataGrid
              rows={rows}
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

export default UploadOfflineScore;
