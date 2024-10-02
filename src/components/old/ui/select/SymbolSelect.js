import { MenuItem, Select, styled as MUIStyled } from "@mui/material";
import SelectCheckImage from 'assets/Icon/select-check.svg';
import { toNumberFormat } from 'utils/toNumberFormat';
import SymbolImg from 'components/item/SymbolImg';

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
  padding: '10px 40px 10px 16px',
  minHeight: '40px',
  display: 'grid',
  gridTemplateColumns: '20px auto',
  gap: '12px',
  '.symbol-image': {
    width: '20px',
    height: '20px',
  },
  '.symbol-inner': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '5px',
    width: '100%',
    overflow: 'hidden',
    '.symbol-name': {
      wordBreak: 'break-all',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      wordWrap: 'normal',
      textOverflow: 'ellipsis',
    }
  },
  '@media only screen and (max-width: 768px)': {
    minHeight: '32px',
    padding: '7.5px 40px 7.5px 16px',
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
      backgroundColor: 'rgba(51, 51, 51, 1)',
    },
    '&::after': {
      position: 'absolute',
      transform: 'translateY(-50%)',
      top: '50%',
      right: '16px',
      width: '20px',
      height: '20px',
      content: '""',
      display: 'block',
      background: `url(${SelectCheckImage}) no-repeat center/contain`,
      '@media only screen and (max-width: 768px)': {
        width: '16px',
        height: '16px',
        right: '16px',
      },
    }
  }
});


function SymbolBalanceSelect(props) { // balance & symbol name select
  const { select, setSelect, selectList, id, notation } = props;
  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  return (
    <Select
    id={id}
    className="base-select symbol-balance-select"
    value={select}
    onChange={handleChange}
    >
    {selectList.map((item, index) => {
    return <SymbolMenucomponent key={index} value={item}>
      <SymbolImg symbol={item?.symbol} className="symbol-image" />
      <div className="symbol-inner">
        {notation === "balance" ? <p>{item?.balance ? toNumberFormat(item?.balance, 8) : '0.00000000'}</p> :
        !notation ? <p>{item?.total ? toNumberFormat(item?.total, 8) : '0.00000000'}</p> : <p>0.00000000</p>}
        <p className="symbol-name">{item?.symbol}</p>
      </div>
    </SymbolMenucomponent>
    })}
    </Select>
  );
}


export default function SymbolSelect(props) {
  return (
    <SymbolBalanceSelect {...props} />
  );
}