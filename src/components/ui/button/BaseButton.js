// import { Button } from '@mui/base/Button';
import { CircularProgress } from '@mui/material';

export default function BaseButton(props) {
  const { color, label, onClick, size, type, isDisabled, isLoading, subLabel } = props;
  return (
    <button type={type} onClick={onClick} disabled={isDisabled || false}
    className={`base-btn ${color ? color : ''} ${size ? size : ''} ${type ? type : ''}`}>
      {label ? <p className={`${isLoading ? "hidden" : ""}`}>{label}</p> :
      <p className={`${isLoading ? "hidden" : ""}`}>{subLabel}</p>}
      {isLoading && <div className="loading-wrap"><CircularProgress size={20} color="inherit" /></div>}
    </button>
  )
}