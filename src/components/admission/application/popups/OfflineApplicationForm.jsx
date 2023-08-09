import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box, Grid, TextField } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OfflineApplicationForm({ open, close }) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={close}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={close}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} fontSize={"1rem"}>
            Offline Application
          </Typography>
          <Button autoFocus color="inherit" onClick={close}>
            Submit
          </Button>
        </Toolbar>
      </AppBar>
      <Box display={"flex"} p={3}>
        <Grid container px={4} spacing={1} flex={2}>
          <Grid item xs={12}>
            <Typography
              fontSize={"1rem"}
              p={1}
              px={1}
              bgcolor={"#ececec"}
              borderRadius={1}
              color={"black"}
              fontWeight={500}
              mb={1}
            >
              Personal Details
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={600}>Candidate's Image</Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <input type="file" />
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={600}>Candidate's Name</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="First" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Middle" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Last" />
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={600} mt={2}>
              Contact Details
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <TextField fullWidth label="Contact Number" />
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth label="Email" />
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={600} mt={2}>
              Other Details
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Nationality" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Religion" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Category" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Date of Birth" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="Gender" />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Critical Medical
Ailment(if any)"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              fontSize={"1rem"}
              p={1}
              px={1}
              bgcolor={"#ececec"}
              borderRadius={1}
              color={"black"}
              fontWeight={500}
              mb={1}
              mt={2}
            >
              Application Details
            </Typography>
          </Grid>
        </Grid>
        <Box bgcolor={"grey.300"} width={"1px"}></Box>
        <Grid container px={4} spacing={1} flex={2}>
          <Grid item xs={12}>
            <Typography
              fontSize={"1rem"}
              p={1}
              px={1}
              bgcolor={"#ececec"}
              borderRadius={1}
              color={"black"}
              fontWeight={500}
              mb={1}
            >
              Address
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              fontSize={"1rem"}
              p={1}
              px={1}
              bgcolor={"#ececec"}
              borderRadius={1}
              color={"black"}
              fontWeight={500}
              mb={1}
            >
              Parent / Guardian Details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              fontSize={"1rem"}
              p={1}
              px={1}
              bgcolor={"#ececec"}
              borderRadius={1}
              color={"black"}
              fontWeight={500}
              mb={1}
            >
              Fee Payment Details
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

export default OfflineApplicationForm;
