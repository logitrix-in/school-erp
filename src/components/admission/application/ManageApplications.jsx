import { Box, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import ManageTable from './components/ManageTable'
import Bbox from '../../UiComponents/Bbox'

const ManageApplications = () => {
  return (
    <>
      <Bbox
        mt={3}
        mb={1}
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

      </Bbox>

      <ManageTable/>

    </>
  )
}

export default ManageApplications