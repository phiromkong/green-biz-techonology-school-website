import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

const Courselist = ({ courses, onCourseSelect, activeProgram }) => {
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
            marginTop: '4%',
        }}
      >
        {programs.map((program) => (
          <React.Fragment key={program}>
            <ListItem 
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                color: program === activeProgram ? 'red' : 'inherit',
              }}
            >
              <Typography inset= "gutter"  level="body-xs" mb={2} onClick={() => onCourseSelect(program)}>
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