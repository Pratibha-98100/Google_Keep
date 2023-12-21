import { List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import React from 'react'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


function LeftNav() {

  // -------- obj of left navbar-----------
    const navList=[
        {id:1, name:'Notes', icon: <LightbulbOutlinedIcon/>},
        {id:2, name:"Reminders", icon: <NotificationsNoneOutlinedIcon/>},
        {id:3, name:"Trash", icon: <DeleteOutlinedIcon/>}
    ]

    
  return (
    <>
    <List>
          {
            navList.map(list => (
              <ListItem key={list.id}>
                <ListItemButton>
                  <ListItemIcon style={{ alignItems: 'center'}}>
                     {list.icon}
                  </ListItemIcon>
                  <ListItemText primary={list.name} />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
    </>
  )
}

export default LeftNav;
