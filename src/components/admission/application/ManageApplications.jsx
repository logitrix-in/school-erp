import { Box, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'

const ManageApplications = () => {
  return (
    <>
      <Box
        mt={3}
        bgcolor={"white"}
        py={2}
        px={2}
        borderRadius={2}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"500"} borderRadius={1}>
          Manage Application
        </Typography>

      </Box>

    </>
  )
}

export default ManageApplications