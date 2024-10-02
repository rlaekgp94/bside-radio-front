import React, { useState, useEffect } from 'react';
import { MenuItem, Select, styled as MUIStyled } from "@mui/material";
import SelectCheckImage from 'assets/Icon/select-check.svg';
import SymbolImg from 'components/item/SymbolImg';

const SymbolMenucomponent = MUIStyled(MenuItem)({
  backgroundColor: 'var(--layer-01)',
  boxShadow: 'none',
  height: 'auto',
  fontSize: '14px',
  lineHeight: '14px',
  letterSpacing: '0.16px',
  fontWeigth: '400',
  textAlign: 'left',
  color: 'var(--text-primary)',
  fontFamily: 'Pretendard',
  padding: '10px 7px 10px 10px',
  minHeight: '32px',
  display: 'grid',
  gridTemplateColumns: '15px auto',
  gap: '8px',
  '.symbol-image': {
    width: '15px',
    height: '15px',
  },
  '.symbol-inner': {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    // @include flex(flex-start, center, row),
    gap: '5px',
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
      width: 'calc(100% - 12px)',
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
      position: 'absolute',
      transform: 'translateY(-50%)',
      top: '50%',
      right: '6px',
      width: '15px',
      height: '15px',
      content: '""',
      display: 'block',
      background: `url(${SelectCheckImage}) no-repeat center/contain`,
    }
  }
});


function CurrencySelect(props) { // balance & symbol name select
  const { select, setSelect, selectList, id, color } = props;
  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  return (
    <Select
    id={id}
    className={`base-select currency-select ${color}`}
    value={select}
    onChange={handleChange}
    >
    {selectList.map((item, index) => {
    return <SymbolMenucomponent key={index} value={item}>
      <SymbolImg symbol={item?.symbol} className="symbol-image" />
      <div className="symbol-inner">
        <p className="symbol-name">{item?.symbol}</p>
      </div>
    </SymbolMenucomponent>
    })}
    </Select>
  );
}


export default function SymbolSelect(props) {
  return (
    <CurrencySelect {...props} />
  );
}