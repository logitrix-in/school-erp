import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../config/api";
import { DataGrid } from "@mui/x-data-grid";

const ApplicationView = () => {
  const [applications, setApplication] = useState(null);

  useEffect(() => {
    api
      .get("/admission/application/")
      .then((res) => {
        const data = res.data;
        console.log(data);
        const values = data.map((user, idx) => {
          return {
            id: idx + 1,
            app_id: user.application_id,
            primary_contact: user.candidate_details.contact_number,
            applied_for: user.application_details.applying_for,
            name:
              user.candidate_details.first_name +
              " " +
              user.candidate_details.last_name,
            avatarUrl: user.candidate_details.profile_photo,
            email: user.candidate_details.email,
            created_at: new Date(user.created_at).toLocaleDateString(),
            screening_status: user.status,
          };
        });
        console.log(values);
        setApplication(values);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log(applications);
  }, [applications]);

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    {
      field: "avatar",
      headerName: "Avatar",
      headerClassName: "center-header",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row.avatarUrl} // Replace with the field containing the image URL
          alt={params.row.name} // Provide an alt text for accessibility
          style={{ height: "100%", aspectRatio: 1, objectFit: "contain" }}
        />
      ),
    },
    { field: "app_id", headerName: "Application Id", width: 130 },
    { field: "name", headerName: "Name", width: 140 },
    {
      field: "primary_contact",
      headerName: "Primary Contact Number",
      width: 180,
    },
    {
      field: "applied_for",
      headerName: "Applied For",
      width: 100,
    },
    
    { field: "created_at", headerName: "Applied On", width: 120 },
    { field: "screening_status", headerName: "Screening Status", width: 180 },
    {
      field: "action",
      disableSelectionOnClick: true,
      headerName: "Action",
      width: 100,
      renderCell: (params) => <Button>View</Button>,
    },
  ];

  const rows = applications;

  const boldCell = (params) => {
    return params.field === "app_id" ? "bold-column" : "";
  };

  return (
    <div className="application-view">
      {applications ? (
        <div style={{ width: "100%" }}>
          <DataGrid
            density="standard"
            rowHeight={120}
            getCellClassName={boldCell}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 7 },
              },
            }}
            pageSizeOptions={[
              Math.round((rows.length * 1) / 4),
              Math.round((rows.length * 2) / 4),
              Math.round((rows.length * 3) / 4),
              rows.length,
            ]}
          />
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default ApplicationView;
