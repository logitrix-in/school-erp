import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {
  Autocomplete,
  Box,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import Bbox from "../../UiComponents/Bbox";
import { useState } from "react";
import api from "../../../config/api";
import { array } from "prop-types";
import dayjs from "dayjs";

function not(a, b) {
  return a.filter((objA) => !b.some((objB) => objB.id === objA.id));
}

function intersection(a, b) {
  return a.filter((objA) => b.some((objB) => objB.id === objA.id));
}

export default function ReviewScreening() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);

  useEffect(() => {
    api
      .post("/admission/screening/set/", {
        type: "screen",
      })
      .then((res) => {
        // console.log(res.data);

        const l = Array(12)
          .fill()
          .map((_, i) => {
            return {
              id: i + 1,
              candidate_details: {
                first_name: "test",
                last_name: "user",
              },
            };
          });

        // console.log(l.filter((l) => l.id <= 5));
        // setLeft(l.filter((l) => l.id <= 5));
        // setRight(l.filter((l) => l.id > 5));

        setLeft(res.data.not_qualified);
        setRight(res.data.qualified);
      });
  }, []);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const [selected, setSelected] = useState(null);

  // useEffect(() => console.log(checked, left, right), [checked]);
  // useEffect(() => console.log(leftChecked), [leftChecked]);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    console.log("checked left");
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ overflow: "auto", height: "60vh" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value.id}-label`;

          return (
            <ListItem key={value.id} role="listitem">
              <Checkbox
                checked={checked.indexOf(value) !== -1}
                onClick={() => {
                  handleToggle(value);
                }}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": labelId,
                }}
              />
              <Typography
                onClick={() => {
                  setSelected(value);
                }}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.dark",
                    fontWeight:500
                  },
                }}
              >{`${value.candidate_details.first_name} ${value.candidate_details.last_name}`}</Typography>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Box>
      <Box
        display={"flex"}
        gap={1}
        alignItems={"stretch"}
        height={"70vh"}
        overflow={"hidden"}
      >
        <Box display={"flex"} flex={1} gap={1}>
          <Bbox flex={1} borderRadius={1}>
            <Typography fontWeight={500} p={2}>
              Not Qualified candidates
            </Typography>
            <Divider />
            {customList(left)}
          </Bbox>
          <Bbox
            display={"flex"}
            borderRadius={1}
            flexDirection={"column"}
            justifyContent={"center"}
            gap={1}
            alignItems={"center"}
            width={"fit-content"}
            p={2}
            bgcolor={"#272727"}
          >
            <Button
              sx={{ my: 0.5 }}
              variant="contained"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="contained"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Bbox>
          <Bbox flex={1} borderRadius={1}>
            <Typography fontWeight={500} p={2}>
              Qualified candidates
            </Typography>
            <Divider />
            {customList(right)}
          </Bbox>
        </Box>
        <Box width={"1px"} bgcolor={"rgba(0,0,0,0.1)"} />

        {/* right */}
        <Bbox width={"30rem"} p={2} overflow={"auto"}>
          {selected != null ? (
            <Box>
              <img
                width={300}
                src={selected.candidate_details.profile_photo}
                alt=""
              />
              <Typography fontSize={"1.2rem"} mt={1}>
                {selected.candidate_details.first_name}{" "}
                {selected.candidate_details.last_name}
              </Typography>
              <Typography fontSize={"0.9rem"}>
                {selected.candidate_details.email}
              </Typography>
              <Typography fontSize={"0.9rem"}>
                Age:
                {(
                  new Date().getFullYear() -
                  new Date(selected.candidate_details.dob).getFullYear()
                ).toString()}
              </Typography>
            </Box>
          ) : (
            <Typography>Select a candidate to view details</Typography>
          )}
        </Bbox>
      </Box>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => {
          console.log(left);
          console.log(right);
        }}
      >
        Apply
      </Button>
    </Box>
  );
}
