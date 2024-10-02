import React, { useState, useEffect } from 'react';
import { MenuItem, Select, InputLabel, FormControl, styled as MUIStyled } from "@mui/material";
import SelectCheckImage from 'assets/Icon/select-check.svg';
import { useTranslation } from 'react-i18next'

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
  padding: '10px 16px',
  minHeight: '40px',
  '.value': {
    width: '100%',
    wordBreak: 'break-all',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    wordWrap: 'normal',
    textOverflow: 'ellipsis',
  },
  '@media only screen and (max-width: 768px)': {
    minHeight: '32px',
    padding: '7.5px 16px',
  },
  '.no-value': {
    opacity: 0.3,
  },
  '&:hover': {
    'backgroundColor': 'var(--layer-hover-01)',
  },
  '&.disabled': {
    color: 'var(--text-disabled)',
    cursor: 'default',
    pointerEvents: 'none'
  },
  '&.Mui-selected': {
    justifyContent: 'space-between',
    posisiton: 'relative',
    background: 'rgba(51, 51, 51, 1)',
    '&:hover': {
      backgroundColor: 'var(--layer-selected-hover-01)',
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

function EmptySelect(props) { // 기본값이 없는 select
  const { t } = useTranslation();
  const { list, id, label, setState, state } = props;
  const [value, setValue] = useState('')

  const getState = async () => {
    setState(value)
  }

  useEffect(() => {
    getState()
  }, [value])

  const handleChange = (event) => {
    if (event.target.value === label) {
      return;
    }
    setValue(event.target.value)
  };

  return (
    <FormControl className="base-select-wrapper">
      {!value && <InputLabel id={id} htmlFor={id}>{t(label)}</InputLabel>}
      <Select id={id}
        label={t(label)}
        defaultValue=""
        className="base-select modal-select"
        value={value || ''}
        onChange={handleChange}
      >
        <SymbolMenucomponent value={label}>
          <span className="no-value">{t(label)}</span>
        </SymbolMenucomponent>
        {list?.map((item, index) => {
          return <SymbolMenucomponent key={index} value={item}><p className="value">{item}</p></SymbolMenucomponent>
        })}
      </Select>
    </FormControl>
  );
}

function DefaultSelect(props) { // 기본값이 설정되어 있는 select
  const { t } = useTranslation();
  const { selectList, id, select, setSelect, isFunction, data, color } = props;

  const handleChange = (event) => {
    if (isFunction) {
      isFunction(event.target.value)
    } else {
      setSelect(event.target.value);
    }
  };

  return (
    <Select
      id={id}
      className={`base-select ${color}`}
      value={select}
      onChange={handleChange}
    >
    {selectList.map((item, index) => {

      return <SymbolMenucomponent className={`${item.noListDisabled && !data?.length ? 'disabled' : ''}`} key={index} value={item}>{typeof select === 'object' ? t(item.title) : item}</SymbolMenucomponent>
    })}
    </Select>
  );
}


export default function BasicSelect(props) {
  const { select } = props;

  return (
    <>
      {select ?
      <DefaultSelect {...props} />
      :
      <EmptySelect {...props} />}
    </>
  );
}