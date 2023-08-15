import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { Delete } from "@mui/icons-material";

const Engage = ({ close, open }) => {
  const lineups = [
    {
      subject: "Know our school",
      days: 3,
    },
    {
      subject: "Our records and prizes",
      days: 7,
    },
  ];

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
          Engage
        </Typography>

        <Box
          p={2}
          height={"80vh"}
          position={"relative"}
          sx={{ overflowY: "scroll" }}
        >
          <Typography fontWeight={600} bgcolor={"primary.light"} p={1}>
            Current Lineups
          </Typography>

          <Box>
            {lineups.map((lineup, i) => (
              <Box key={i}>
              <Box display={"flex"} width={'100%'} p={1} alignItems={'center'}>
                <Typography flex={1}>{lineup.subject}</Typography>
                <Typography variant="caption">Day {lineup.days}</Typography>
                
                <IconButton size="small" sx={{ml:2}}>
                  <Delete sx={{fontSize:20}} />
                </IconButton>
              </Box>
              <Divider/>
              </Box>
            ))}
          </Box>

          <Typography
            fontWeight={600}
            mt={2}
            mb={2}
            bgcolor={"primary.light"}
            p={1}
          >
            Set Up
          </Typography>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Typography>Schedule after </Typography>
            <TextField
              type="number"
              size="small"
              defaultValue={3}
              sx={{ width: "3rem" }}
              variant="standard"
            />
            <Typography>days from application</Typography>
          </Box>
          <TextField label="subject" size="small" fullWidth sx={{ mt: 2 }}>
            Subject
          </TextField>
          <Box mt={2}>
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
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button sx={{ mt: 1 }} variant="contained">
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default Engage;
