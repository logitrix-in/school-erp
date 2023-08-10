import React from "react";
import Sms from "./widgets/Sms";
import Email from "./widgets/Email";
import Whatsapp from "./widgets/Whatsapp";
import { Box, Dialog, Divider, Tab, Tabs, Typography } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{ height: "100%", overflow: "hidden" }}
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box p={3} sx={{height:'70vh',overflowY:'scroll'}}>{children}</Box>}
    </Box>
  );
}

const Notify = ({ open, close }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const widgets = [];

  return (
    <Dialog
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: "100%",
        },
      }}
      maxWidth="lg"
      open={open}
      onClose={() => close()}
      disableEnforceFocus={true}
    >
      <Box overflow={'hidden'}>
        <Typography
          p={1}
          py={2}
          bgcolor={"primary.main"}
          color={"white"}
          fontSize={"1.1rem"}
          textAlign={"center"}
        >
          Manage Notification
        </Typography>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Email" />
          <Tab label="SMS" />
          <Tab label="Whatsapp" />
        </Tabs>
        <Divider />
        <Box>
          <CustomTabPanel value={value} index={0}>
            <Email />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Sms />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Whatsapp />
          </CustomTabPanel>
        </Box>
      </Box>
    </Dialog>
  );
};

export default Notify;
