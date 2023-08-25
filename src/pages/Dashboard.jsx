import {
  Box,
  Button,
  ButtonBase,
  ButtonGroup,
  Typography,
} from "@mui/material";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {

  const user = useAuth();

  return <Box>
    {user?.first_name} {user?.last_name}
  </Box>;
};

export default Dashboard;
