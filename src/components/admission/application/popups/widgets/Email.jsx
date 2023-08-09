import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useRef, useState } from "react";

import { Editor } from "@tinymce/tinymce-react";

const Email = () => {
  const [recipentTo, setRecipentTo] = useState("all");

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <Box >
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>Recipent</InputLabel>
            <Select label="Recipent" onChange={() => {}} defaultValue={30}>
              <MenuItem value={10}>Nill</MenuItem>
              <MenuItem value={20}>parent</MenuItem>
              <MenuItem value={30}>Candidates</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item mr={"auto"}>
          <ToggleButtonGroup
            color="secondary"
            value={recipentTo}
            exclusive
            onChange={(e, val) => val != null && setRecipentTo(val)}
          >
            <ToggleButton value="all">{"all(491)"}</ToggleButton>
            <ToggleButton value="custom">custom</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>CC</InputLabel>
            <Select label="CC" onChange={() => {}} defaultValue={20}>
              <MenuItem value={10}>Nill</MenuItem>
              <MenuItem value={20}>parent</MenuItem>
              <MenuItem value={30}>Candidates</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel>BCC</InputLabel>
            <Select label="BCC" onChange={() => {}} defaultValue={10}>
              <MenuItem value={10}>Nill</MenuItem>
              <MenuItem value={20}>parent</MenuItem>
              <MenuItem value={30}>Candidates</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box height={20} />
      <TextField placeholder="Subject" fullWidth size="small" sx={{ mb: 2 }} />
      <Box>
        <Editor
          apiKey="qpa9e8xcdk75avj9zmz7eawi5rzrhhdllb4kjwr4u4pgpr8f"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="Welcome!"
          init={{
            branding: false,
            height: 350,
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
      </Box>
    </Box>
  );
};

export default Email;
