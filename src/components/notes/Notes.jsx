import { Box, Button, Grid, InputAdornment, Paper, Popover, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Card, CardActions, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from "react";
import EmptyNotes from "./EmptyNotes";
import { v4 as uuid } from "uuid";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';


const StyledCard=styled(Card)`
    width:240px;
    margin:8px;
    box-shadow:none;
    border:1px solid #e0e0e0;
    border-radius:8px;
`;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 600px;
  box-shadow: 0 1px 2px 0 rgb(60 64 67/ 30%), 0 2px 6px rgb(60 64 67/ 15%);
  padding: 10px 15px;
  border-radius: 8px;
  border-color: #e0e0e0;
  margin: auto;
  min-height: 30px;
`;

const note = {
  id: "",
  heading: "",
  text: "",
};

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));


function Notes() {
  const [notes, setNotes] = useState([]);
  const [showTextField, setShowTextField] = useState(false);
  const [addNote, setAddNote] = useState({ ...note, id: uuid() });
  const [editNote, setEditNote] = useState(null);
  const [colorPickerAnchor, setColorPickerAnchor] = useState(null);
  const [isGridView, setIsGridView] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  
// -------for getting notes from local storage------
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  

  // -------for setting notes in local storage------
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);



  // --------Adding notes-----------
  const handleSubmit = () => {
    setShowTextField(false);
    if (addNote.heading || addNote.text) {
        if (editNote) {
          setNotes((prevNotes) =>
            prevNotes.map((n) => (n.id === editNote.id ? addNote : n))
          );
          setEditNote(null);
        } else {
          setNotes((prevNotes) => [...prevNotes, addNote]);
        }
      }

    setAddNote({ ...note, id: uuid() });
  };


  // ------
  const onTextAreaClick = () => {
    setShowTextField(true);
  };


  const onTextChange = (e) => {
    let changedNote = { ...addNote, [e.target.name]: e.target.value };
    setAddNote(changedNote);
  };



// -------editing note----------
  const handleEdit = (note) => {
    setShowTextField(true);
    setEditNote(note);
    setAddNote({ ...note });
  };



// -------deleting note----------
  const handleDelete = (id) => {
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
  };


  // --------colour selecting----------
  const handleColorPickerClick = (event) => {
    setColorPickerAnchor(event.currentTarget);
  };

  const handleColorSelect = (color) => {
    setAddNote({ ...addNote, color });
    setColorPickerAnchor(null);
  };

  const handleCloseColorPicker = () => {
    setColorPickerAnchor(null);
  };


  // --------grid view----------
  const handleViewChange = (event, view) => {
    setIsGridView(view === 'grid');
  };


  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };



  // ---------------search bar-------------------------
  const filteredNotes = notes.filter((note) =>
    note.heading.toLowerCase().includes(searchInput.toLowerCase()) ||
    note.text.toLowerCase().includes(searchInput.toLowerCase())
  );


  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      
        <Box sx={{ p: 3, width: "100%" }}>
        
          <DrawerHeader />
          <Container sx={{display:"flex", flexDirection:"row",marginBottom:"20px"}}>

   {/*------------------------search bar------------------------------  */}
          <TextField placeholder="Search..." variant="standard"  fullWidth
              InputProps={{
                startAdornment: 
                  <InputAdornment position="start">
                    🔍
                  </InputAdornment>
                ,
              }}
              onChange={handleSearchChange}
              value={searchInput}
              style={{ marginBottom: '16px' }}
            />

 
   {/* -------------------grid and list view------------------ */}
          <ToggleButtonGroup sx={{marginLeft:"20px"}} 
              value={isGridView ? 'grid' : 'list'}
              exclusive
              onChange={handleViewChange}
              style={{ marginTop: 16 }}
            >
              <ToggleButton value="grid">Grid</ToggleButton>
              <ToggleButton value="list">List</ToggleButton>
          </ToggleButtonGroup>

          </Container>


          <Container>
          
            {
              showTextField 
                  && 
              <TextField placeholder="Title" variant="standard" InputProps={{ disableUnderline: true }}
                style={{ marginBottom: 10 }} onChange={(e) => onTextChange(e)} name="heading"  value={addNote.heading}
              />
            
            }


   {/*--------------------------note area-------------------------  */}
            <TextField
              placeholder="Take a note..." multiline maxRows={Infinity}  variant="standard"
              InputProps={{ disableUnderline: true }}
              onClick={onTextAreaClick}
              onChange={(e) => onTextChange(e)}
              name="text"
              value={addNote.text}
            />

            <Box marginLeft="auto">
                <ColorLensOutlinedIcon onClick={handleColorPickerClick} style={{ marginLeft: "auto", cursor: "pointer" }} />
                <Button onClick={handleSubmit} >Add Note</Button>
            </Box>


{/* -------------------colour selecting----------------------------- */}
            <Popover open={Boolean(colorPickerAnchor)}  anchorEl={colorPickerAnchor}  onClose={handleCloseColorPicker} >
                <Paper>
                  <Typography></Typography>
                  <Button onClick={() => handleColorSelect("#ffffff")} style={{ backgroundColor: "#ffffff" }}>
                    White
                  </Button>
                  <Button onClick={() => handleColorSelect("#ffcccb")} style={{ backgroundColor: "#ffcccb" }}>
                    Salmon
                  </Button>
                  <Button onClick={() => handleColorSelect("blue")} style={{ backgroundColor: "blue" }}>
                    Blue
                  </Button>
                  <Button onClick={() => handleColorSelect("red")} style={{ backgroundColor: "red" }}>
                    Red
                  </Button>
                  <Button onClick={() => handleColorSelect("yellow")} style={{ backgroundColor: "yellow" }}>
                    Yellow 
                  </Button>
                  <Button onClick={() => handleColorSelect("green")} style={{ backgroundColor: "green" }}>
                    Green
                  </Button>
                  <Button onClick={() => handleColorSelect("lightgreen")} style={{ backgroundColor: "lightgreen" }}>
                  LightGreen
                  </Button>
                  <Button onClick={() => handleColorSelect("purple")} style={{ backgroundColor: "purple" }}>
                    Purple
                  </Button>
                  <Button onClick={() => handleColorSelect("orange")} style={{ backgroundColor: "orange" }}>
                    Orange
                  </Button>
                  <Button onClick={() => handleColorSelect("lightyellow")} style={{ backgroundColor: "lightyellow" }}>
                  LightYellow
                  </Button>
                  <Button onClick={() => handleColorSelect("black")} style={{ backgroundColor: "black" }}>
                    Black
                  </Button>
                </Paper>
              </Popover>
                
          </Container>



{/* --------------------if note is empty then empty component will be shown else check the grid or list view------------------------------------- */}
          {
            filteredNotes.length > 0 
                  ? 
                isGridView 
                  ?
              <Grid container style={{ marginTop: 16 }}>
                {
                  filteredNotes.map((note, index) => (
                    <Grid item key={index}>
                      <StyledCard style={{ backgroundColor: note.color }}>
                        <CardContent>
                          <Typography>{note.heading}</Typography>
                          <Typography>{note.text}</Typography>
                        </CardContent>

                        <CardActions>
                          <EditOutlinedIcon fontSize="small" style={{ marginLeft: "auto", cursor: "pointer" }} onClick={() => handleEdit(note)}/>
                          <DeleteOutlinedIcon  fontSize="small" style={{ cursor: "pointer" }} onClick={() => handleDelete(note.id)} />
                        </CardActions>
                      </StyledCard>
                    </Grid>
                  ))
                }
              </Grid>
                  : 
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {
                    filteredNotes.map((note, index) => (
                      <li key={index} style={{ marginBottom: 16 }}>
                        <Paper elevation={3} style={{ padding: 16 }}>
                          <Typography variant="h6">{note.heading}</Typography>
                          <Typography>{note.text}</Typography>

                          <CardActions>
                            <EditOutlinedIcon fontSize="small" style={{ marginLeft: "auto", cursor: "pointer" }} onClick={() => handleEdit(note)}/>
                            <DeleteOutlinedIcon fontSize="small" style={{ cursor: "pointer" }} onClick={() => handleDelete(note.id)}  />
                          </CardActions>
                        </Paper>
                      </li>
                    ))
                  }
                </ul>
                  : 
              <EmptyNotes />
          }
        </Box>

    </Box>
  );
}

export default Notes;
