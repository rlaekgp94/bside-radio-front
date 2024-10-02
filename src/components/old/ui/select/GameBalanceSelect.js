import { MenuItem, Select, styled as MUIStyled } from "@mui/material";
import SelectCheckImage from 'assets/Icon/select-check.svg';
import { toNumberFormat } from 'utils/toNumberFormat';
import SymbolImg from 'components/item/SymbolImg';
import FormControl from '@mui/material/FormControl';

const SymbolMenucomponent = MUIStyled(MenuItem)({
  backgroundColor: 'var(--layer-02)',
  boxShadow: 'none',
  height: '50px',
  fontSize: '14px',
  lineHeight: '14px',
  letterSpacing: '0.16px',
  fontWeigth: '400',
  textAlign: 'left',
  color: 'var(--text-primary)',
  fontFamily: 'Pretendard',
  padding: '10px 16px',
  minHeight: '40px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '12px',
  '.symbol-image': {
    width: '20px',
    height: '20px',
  },
  '@media only screen and (max-width: 768px)': {
    minHeight: '32px',
    padding: '7.5px 16px',
  },
  '.no-value': {
    opacity: 0.3,
  },
  "&:not(:last-of-type)": {
    "&::before": {
      content: '""',
      width: 'calc(100% - 32px)',
      height: '100%',
      display: 'block',
      borderBottom: '1px solid var(--border-subtle-02)',
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
  '&:hover': {
    'backgroundColor': 'var(--layer-hover-01)',
  },
  '&.Mui-selected': {
    // justifyContent: 'space-between',
    posisiton: 'relative',
    background: 'rgba(51, 51, 51, 1)',
    '&:hover': {
      backgroundColor: 'var(--layer-selected-hover-01)',
    },
    '&::after': {
      // position: 'absolute',
      // transform: 'translateY(-50%)',
      // top: '50%',
      // right: '16px',
      width: '20px',
      height: '20px',
      content: '""',
      display: 'block',
      background: `url(${SelectCheckImage}) no-repeat center/contain`,
    }
  }
});

export default function GameBalanceSelect(props) {
  const { select, setSelect, selectList, id, isDisabled } = props;
  const handleChange = (event) => {
    setSelect(event.target.value);
  };
  const none = {
    balance: 0,
    bonus: 0,
    total: 0,
    symbol: "NONE",
    chain_name: "NONE"
  }
  return (
    <FormControl disabled={isDisabled}>
      <Select
      id={id}
      className="base-select game-balance-select"
      value={select || none}
      onChange={handleChange}
      >
      {selectList.map((item, index) => {
      return <SymbolMenucomponent key={index} value={item}>
        <p>{item.total ? toNumberFormat(item.total, 8) : '0.00000000'}</p>
        <SymbolImg className="symbol-image" symbol={item.symbol} />
      </SymbolMenucomponent>
      })}
      </Select>
    </FormControl>
  );
}