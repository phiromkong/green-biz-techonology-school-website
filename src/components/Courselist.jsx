import * as React from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";

const Courselist = ({ courses, onCourseSelect, activeProgram }) => {
  console.log('Active Program:', activeProgram);

  // Create a list of unique programs
  const programs = [...new Set(courses.map(course => course.program))];

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
            flexDirection:  'column',


        }}
      >
        {programs.map((program) => (
          <React.Fragment key={program}>
            <ListItem>
              <ListItemButton
                sx={{
                  cursor: 'pointer',
                  width: 'auto',
                  backgroundColor: program === activeProgram ? '#F0C52D' : 'inherit',
                  transition: 'background-color 0.3s ease', 
                }}
                onClick={() => onCourseSelect(program)}
              >
                <Typography fontSize={'20px'} fontWeight={'bold'} level="body-xs" mb={2}>
                  {program}
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