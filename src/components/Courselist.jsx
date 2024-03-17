import * as React from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'; // Ensure this path correctly points to your Firebase configuration
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation


const Courselist = ({ courses, onCourseSelect, activeProgram }) => {
 const [programs, setPrograms] = useState([]);
 const { t, i18n } = useTranslation();

 useEffect(() => {
  const fetchPrograms = async () => {
     const programIds = [...new Set(courses.map(course => course.programId))];
     const programPromises = programIds.map(async (programId) => {
       console.log("Program ID:", programId); // Debugging line
       const programDocRef = doc(db, "program", programId); // Ensure "program" is the correct collection name
       const programDocSnap = await getDoc(programDocRef);
       return programDocSnap.exists() ? { id: programId, ...programDocSnap.data() } : null;
     });
     const programData = await Promise.all(programPromises);
     setPrograms(programData.filter(program => program !== null));
     console.log("Program data: " + JSON.stringify(programData));
  };
 
  fetchPrograms();
 }, [courses]);
 

 return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        gap: 2,
        flexWrap: "wrap",
        "& > *": { minWidth: 0, flexBasis: 200 },
      }}
    >
      <List
        variant="outlined"
        sx={{
            display: 'flex',
            minWidth: 240,
            borderRadius: 'md',
            flexDirection: 'column',
            padding: 0,
            margin: 0,
        }}
      >
        {programs.map((program) => (
          <React.Fragment key={program.id}>
            <ListItem>
              <ListItemButton
                sx={{
                 cursor: 'pointer',
                 width: 'auto',
                 backgroundColor: program.id === activeProgram ? '#F0C52D' : 'inherit',
                 transition: 'background-color 0.3s ease', 
                }}
                onClick={() => onCourseSelect(program.id)}
              >
                <Typography fontSize={'20px'} fontWeight={'bold'} level="body-xs" sx={{fontFamily: "Kantumruy Pro"}} mb={2}>
                {i18n.language === 'Khmer' ? program.khTitle : program.enTitle} 
                </Typography>
              </ListItemButton>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Box>
 );
};

export default Courselist;
