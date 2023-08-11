import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";

const AutoResponse = ({ open, close }) => {
  const [value, setValue] = useState(0);
  const [enabled, setEnabled] = useState([true, false, false]);

  const statusChange = (e) => {
    var temp = [...enabled];
    var cur = temp[value];

    temp[value] = !cur;
    setEnabled(temp);
  };

  const editorRef = useRef(null);

  return (
    <Dialog
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: "100%",
        },
      }}
      maxWidth="md"
      open={open}
      onClose={() => close()}
      disableEnforceFocus={true}
    >
      <Box overflow={"hidden"}>
        <Typography
          p={1}
          py={1.5}
          bgcolor={"primary.main"}
          color={"white"}
          fontSize={"1rem"}
          textAlign={"center"}
        >
          Set Auto Response
        </Typography>

        <Box display={"flex"} gap={2} p={2} py={2} alignItems={"center"}>
          <FormControl size="small">
            <Select
              onChange={(e) => {
                setValue(e.target.value);
              }}
              defaultValue={0}
              value={value}
            >
              <MenuItem value={0}>
                Upon Successful Application Submission
              </MenuItem>
              <MenuItem value={1}>Upon clearing system screening</MenuItem>
              <MenuItem value={2}>Upon Rejection</MenuItem>
            </Select>
          </FormControl>
          <ToggleButton
            size="small"
            value="checked"
            selected={enabled[value]}
            onChange={(e) => statusChange(e)}
            sx={{ bgcolor: enabled[value] ? "#adee85 !important" : "inherit" }}
          >
            {enabled[value] ? "Enabled" : "Disabled"}
          </ToggleButton>

          {enabled[value] && (
            <Button sx={{ ml: "auto" }}>Saved Templates</Button>
          )}
        </Box>
        {enabled[value] && (
          <Box p={2} pt={0}>
            <Editor
              apiKey="qpa9e8xcdk75avj9zmz7eawi5rzrhhdllb4kjwr4u4pgpr8f"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue="Welcome!"
              init={{
                branding: false,
                height: 450,
                menubar: false,
                plugins: ["lists", "advlist", "link", "image", "fullscreen"],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | image link | fullscreen |",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px, overflow:scroll}",
              }}
            />
            <Box mt={1} display={"flex"} justifyContent={"flex-end"}>
              <Button variant="contained">Apply</Button>
            </Box>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default AutoResponse;
