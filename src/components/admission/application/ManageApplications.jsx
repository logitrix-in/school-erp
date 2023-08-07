import { Box, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import ManageTable from './components/ManageTable'

const ManageApplications = () => {
  return (
    <>
      <Box
        my={2}
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

      <ManageTable/>

    </>
  )
}

export default ManageApplications