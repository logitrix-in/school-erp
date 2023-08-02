import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Box p={2} display={'flex'} justifyContent={'space-between'} >
        <Typography fontSize={'1rem'}>SchoolErp</Typography>
        <ButtonGroup>
            <Button variant='contained' size='medium' LinkComponent={Link} to='/login' sx={{mr:1}}>Login</Button>
            <Button variant='contained' size='medium'>Register</Button>
        </ButtonGroup>
    </Box>
  )
}

export default Home