import React, { useEffect, useState } from "react"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';

const CustomStyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  backgroundColor: '#64b267', // Default background for unselected
  color: '#fff', // Default text color
  width: '90px', // Fixed width for all buttons
  height: '44px', // Fixed height for all buttons
  borderRadius: '8px', // Rounded corners
  //boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)', // Smooth, deeper shadow
  boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
  //transition: 'box-shadow 0.3s ease-in-out', // Smooth transition for shadow changes
  textTransform: 'none',
  '&.Mui-selected': {
    backgroundColor: '#1c427c', // Background for selected button
    color: '#fff', // Text color for selected button
    '&:hover': {
      backgroundColor: '#163760', // Hover effect for selected button
    },
  },
  '&:hover': {
    backgroundColor: '#519d52', // Hover effect for unselected button
    //boxShadow: '0px 12px 20px rgba(0, 0, 0, 0.3)', // More shadow on hover
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
  },
  '&:active': {
    //boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.4)', // Shadow on click (pressed effect)
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
  },
}));

export default function CustomToggleButton({ onLanguageChange }) {
  const [alignment, setAlignment] = useState('hindi');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    if (newAlignment === 'english') {
      onLanguageChange('en');
    } else if (newAlignment === 'hindi') {
      onLanguageChange('hi');
    }
  };

  useEffect(() => {
    onLanguageChange('hi');
  }, []);

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <CustomStyledToggleButton value="hindi">
        हिन्दी
      </CustomStyledToggleButton>
      <CustomStyledToggleButton value="english">
        English
      </CustomStyledToggleButton>
    </ToggleButtonGroup>
  );
}
