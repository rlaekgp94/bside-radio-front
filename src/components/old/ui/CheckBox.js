import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next'

export default function Checkboxes(props) {
  const { t } = useTranslation();
  const { label, isRequired, isDisabled, checked, setChecked } = props;
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <FormGroup className="checkbox-custom-root">
      <FormControlLabel
        checked={checked}
        onChange={handleChange}
        required={isRequired}
        disabled={isDisabled}
        control={<Checkbox size="small" />}
        label={t(label)} />
    </FormGroup>
  );
}