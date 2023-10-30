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
import axios from "axios";
import api from "../../../../config/api";
import { LoadingButton } from "@mui/lab";

const AutoResponse = ({ open, close }) => {
  const n = 3;

  const [value, setValue] = useState(0);
  const [enabled, setEnabled] = useState(new Array(n).fill(false));
  const [content, setContent] = useState(new Array(n).fill(""));
  const [loading, setLoading] = useState(false);
  const ref1 = useRef(null);

  function fetchdata() {
    api
      .get("/admission/application/smart-management/auto-response/")
      .then((res) => {
        const data = res.data.map((app) => app.content);
        setEnabled(res.data.map((app) => app.status));
        setContent(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const pair = {
    0: "Upon Successful Application Submission",
    1: "Upon clearing system screening",
    2: "Upon Rejection",
  };

  function saveResponse() {
    console.log({
      send_when: pair[value],
      content: ref1.current.getContent(),
      status: enabled[value] ? 1 : 0,
      value: value,
    });
    setLoading(true);

    api
      .post("/admission/application/smart-management/auto-response/", {
        send_when: pair[value],
        content: ref1.current.getContent(),
        status: enabled[value] ? 1 : 0,
        value: value,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchdata();
  }, []);


  const statusChange = (e) => {
    var temp = [...enabled];
    var cur = temp[value];
    temp[value] = !cur;
    setEnabled(temp);
  };

  const changeFunc = (e) => {
    console.log(ref1.current.getContent());
  };

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
                setContent((prev) => {
                  const temp = [...prev];
                  temp[value] = ref1.current.getContent();
                  return temp;
                });
                console.log(value);
                console.log(ref1.current.getContent());
                setValue(e.target.value);
                ref1.current.setContent([...content][e.target.value]);
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
        <Box p={2} pt={0}>
          {content && (
            <Editor
              disabled={!enabled[value]}
              apiKey="qpa9e8xcdk75avj9zmz7eawi5rzrhhdllb4kjwr4u4pgpr8f"
              onInit={(evt, editor) => {
                ref1.current = editor;
              }}
              initialValue={content[value]}
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
              onChange={changeFunc}
            />
          )}
          <Box mt={1} display={"flex"} gap={2} justifyContent={"flex-end"}>
            <LoadingButton variant="outlined">Save as template</LoadingButton>
            <LoadingButton
              variant="contained"
              onClick={() => saveResponse()}
              loading={loading}
            >
              Apply
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AutoResponse;
