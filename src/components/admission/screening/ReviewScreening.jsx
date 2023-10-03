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
import axios from "axios";

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

        const fn = [
          "Arnab",
          "Rownak",
          "Arindom",
          "Abhisekh",
          "Rahul",
          "Arka",
          "Priyanshu",
        ];
        const ln = ["chatterjee", "mazumder", "Ghose", "Biswas", "Roy"];
        const lg = ["random", "kiu", "dom", "mizi", "zab"];
        const yy = [2002, 2003, 2005, 2010, 2001, 2006];

        function randomChoice(arr) {
          return arr[Math.floor(arr.length * Math.random())];
        }

        const l = Array(20)
          .fill()
          .map((_, idx) => {
            let f_name = randomChoice(fn);
            return {
              id: idx,
              candidate_details: {
                profile_photo:
                  "https://xsgames.co/randomusers/avatar.php?g=male",
                first_name: f_name,
                last_name: randomChoice(ln),
                email: `${f_name}.${randomChoice(lg)}@gmail.com`,
                dob: `01-01-${randomChoice(yy)}`,
              },
            };
          });

        setLeft(l.filter((l) => l.id >= 5));
        setRight(l.filter((l) => l.id < 5));

        // setLeft(res.data.not_qualified);
        // setRight(res.data.qualified);
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

  const [filter, setFilter] = useState("");

  const customList = (items) => (
    <Paper sx={{ overflow: "auto", height: "60vh" }}>
      <List dense component="div" role="list">
        {items
          .filter((it) => {
            const data = it.candidate_details;

            const age = (
              new Date().getFullYear() - new Date(data.dob).getFullYear()
            ).toString();

            const searchString =
              `${data.first_name} ${data.last_name} ${data.email} ${age}`.toLowerCase();
            return searchString.includes(filter.toLowerCase());
          })
          .map((value) => {
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
                      fontWeight: 500,
                    },
                  }}
                >{`${value.candidate_details.first_name} ${value.candidate_details.last_name} `}</Typography>
              </ListItem>
            );
          })}
      </List>
    </Paper>
  );

  return (
    <Box>
      <Box display={"flex"} gap={1} alignItems={"stretch"} overflow={"hidden"}>
        <Box flex={1}>
          <Box display={"flex"} alignItems={"center"} gap={1} mb={1}>
            <Typography fontSize={17} fontWeight={500}>Review Screening</Typography>
            <TextField
              size="small"
              sx={{ ml: "auto" }}
              placeholder="Search"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            />
            <Button
              variant="contained"
              onClick={() => {
                console.log(left);
                console.log(right);
              }}
            >
              Apply Screening
            </Button>
          </Box>

          <Box
            borderRadius={1}
            display={"flex"}
            alignItems={"stretch"}
            gap={1}
            p={2}
            bgcolor={"primary.light"}
          >
            <Bbox flex={1} borderRadius={1}>
              <Box display={"flex"}>
                <Typography fontWeight={500} p={2}>
                  Not Qualified candidates ({left.length})
                </Typography>
              </Box>
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
              bgcolor={"primary.darker"}
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
                Qualified candidates ({right.length})
              </Typography>
              <Divider />
              {customList(right)}
            </Bbox>
          </Box>
        </Box>

        {/* right */}
        <Bbox
          width={"25rem"}
          p={2}
          overflow={"auto"}
          borderRadius={1}
          // bgcolor={"#272727"}
          bgcolor={"primary.darker"}
          color={"whitesmoke"}
        >
          {selected != null ? (
            <Box>
              <Typography
                fontSize={18}
                fontWeight={500}
                color={"primary.light"}
              >
                Detailed View
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display={"flex"} gap={2} mt={2}>
                <img
                  height={120}
                  src={selected.candidate_details.profile_photo}
                  alt=""
                />
                <Box>
                  <Typography fontSize={"1.2rem"}>
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
              </Box>
            </Box>
          ) : (
            <Typography>Select a candidate to view details</Typography>
          )}
        </Bbox>
      </Box>
    </Box>
  );
}
