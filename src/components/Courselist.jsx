import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

const Courselist = ({ courses, onCourseSelect, activeProgram }) => {
  console.log('Active Program:', activeProgram);

  // Create a list of unique programs
  const programs = [...new Set(courses.map(course => course.program))];

  return (
    <Box>
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
            <ListItem 
              sx={{
                cursor: 'pointer',
                width: 'auto',
                backgroundColor: program === activeProgram ? '#F0C52D' : 'inherit',
              }}
            >
              <Typography fontSize={'15px'} fontWeight={'bold'} inset= "gutter"  level="body-lg" mb={2} onClick={() => onCourseSelect(program)}>
                {program}
              </Typography>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Courselist;