import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <Box p={2} px={3} display={'flex'} justifyContent={'space-between'} >
        <Typography fontSize={'1.2rem'} color={'secondary.dark'} fontWeight={'500'}>SchoolERP</Typography>
        <ButtonGroup>
            <Button variant='contained' size='medium' LinkComponent={Link} to='/login'>Login</Button>
            <Button variant='contained' size='medium' color='secondary' LinkComponent={Link} to='/register'>Register</Button>
        </ButtonGroup>
    </Box>
  )
}

export default Home