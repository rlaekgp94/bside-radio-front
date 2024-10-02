
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 32,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 3,
    '&.Mui-checked': {
      transform: 'translateX(15px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : 'var(--support-success)',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 10,
    height: 10,
    borderRadius: 10,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'var(--button-disabled)',
    boxSizing: 'border-box',
  },
}));

export default function SwitchUi(props) {
  const { checked, handleChange } = props;
  return (
    <AntSwitch
    checked={checked}
    onChange={handleChange}
    inputProps={{ 'aria-label': 'controlled' }} />
  )
}