import React from 'react'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material';


const Light = styled(LightbulbOutlinedIcon)`
    font-size:120px;
    color:#f5f5f5
`;
const Text=styled(Typography)`
    color: #80868b;
    font-size:22px;
`;

const Container= styled(Box)`
    display:flex;
    flex-direction:column;
    align-item:center;
    margin-top:20vh;
    margin-left:63vh;
`;

// -----When empty note------
function EmptyNotes() {

  return (
    <Container style={{}}>
        <Light/>
        <Text>Notes you add appear here</Text>
    </Container>
  )
}

export default EmptyNotes
