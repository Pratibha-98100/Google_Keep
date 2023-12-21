import React from 'react'
import Notes from './notes/Notes'
import { Box } from '@mui/material'
import TheDrawer from './TheDrawer'

function Home() {
  return (
    <Box style={{display:'flex',width:"100%"}}>
      <TheDrawer/>
      <Notes/>
    </Box>
  )
}

export default Home
