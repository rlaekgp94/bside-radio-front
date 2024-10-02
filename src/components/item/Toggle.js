import { useState } from 'react';
import styled from 'styled-components';
import Switch from '@mui/material/Switch';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 51,
  height: 31,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    width: 27,
    height: 27,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12"><path fill="${encodeURIComponent('#0066FF')}" d="M0.515625 2.625V0.6875H9.78125V2.625H6.3125V12H3.98438V2.625H0.515625Z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        backgroundColor: '#06F',
        opacity: 1,
        border: 0,
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#aab4be'
        },
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: '#fff',
      width: 27,
      height: 27,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="9" height="12" viewBox="0 0 9 12"><path fill="${encodeURIComponent('#FF737D')}" d="M0.953125 12V0.6875H8.40625V2.625H3.29688V5.375H7.92188V7.3125H3.29688V12H0.953125Z" /></svg>')`,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: 'red',
      border: '6px solid #fff',
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
    },
  },
  '& .MuiSwitch-thumb': {
    // boxSizing: 'content-box',
    width: 27,
    height: 27,
    boxShadow: 'none'
  },
  '& .MuiSwitch-track': {
    borderRadius: 31 / 2,
    backgroundColor: '#FF737D',
    opacity: 1,
    // transition: theme.transitions.create(['background-color'], {
    //   duration: 500,
    // }),
    // ...theme.applyStyles('dark', {
    //   backgroundColor: '#39393D',
    // }),
  },
}));

export default function Toggle({ active, setActive }) {
   // active: false는 F true는 T
   console.log("active ", active )
   
  return (
    <IOSSwitch
          checked={active}
          onChange={() => setActive(!active)} />
  )
};
