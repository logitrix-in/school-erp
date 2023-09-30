import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ManageTable from "./components/ManageTable";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import api from "../../../config/api";
import { LoadingButton } from "@mui/lab";
import EditManageApplication from "./popups/EditManageApplication";

const ManageApplications = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  function fetchData() {
    api
      .get("/admission/application/manage-application/")
      .then((res) => {
        const data = res.data;
        console.log(data);
        setRows(
          data.map((d) => {
            return {
              id: d.id,
              startingDate: d.application_open,
              closingDate: d.application_close,
              class: d.class_name,
              applicationStatus: d.is_active ? "Open" : "Close",
            };
          })
        );
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <RevealCard>
        <Bbox mt={3} borderRadius={2} bgcolor={"white"}>
          <Box
            py={2}
            px={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={1}
          >
            <Typography
              fontWeight={"700"}
              borderRadius={1}
              fontSize={"1.1rem"}
              mr={"auto"}
            >
              Manage Application
            </Typography>
          </Box>
          <Divider />

          <Box
            p={3}
            display={"flex"}
            alignItems={"center"}
            flexDirection={{ xs: "column", lg: "row" }}
            gap={2}
          >
            <Box
              flex={1}
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              alignItems={{ xs: "stretch", lg: "center" }}
              gap={2}
            >
              <LoadingButton
                loading={loading}
                sx={{ px: 5 }}
                variant="contained"
                color="primary"
                onClick={() => {
                  setLoading(true);
                  api
                    .post("/admission/application/manage-application/", {
                      type: "all",
                      action: true,
                    })
                    .then((res) => {
                      console.log("opend all registration");
                      fetchData();
                    });
                }}
              >
                Open All
              </LoadingButton>
              <LoadingButton
                loading={loading}
                sx={{ px: 5 }}
                variant="contained"
                color="primary"
                onClick={() => {
                  setLoading(true);
                  api
                    .post("/admission/application/manage-application/", {
                      type: "all",
                      action: false,
                    })
                    .then((res) => {
                      console.log("closed all registration");
                      fetchData();
                    });
                }}
              >
                Close All
              </LoadingButton>
            </Box>
            <Bbox borderRadius={1} flex={2} width={"100%"}>
              <ManageTable rows={rows} />
              <EditManageApplication
                open={showDialog}
                close={() => setShowDialog(false)}
              />
            </Bbox>

            <Box
              flex={1}
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              alignItems={{ xs: "stretch", lg: "center" }}
              gap={2}
            >
              <Button
                sx={{ px: 5 }}
                variant="contained"
                color="secondary"
                onClick={() => setShowDialog(true)}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default ManageApplications;
