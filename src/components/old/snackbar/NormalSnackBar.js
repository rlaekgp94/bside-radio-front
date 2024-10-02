import { memo, forwardRef } from "react";
import { SnackbarContent } from "notistack";
import { useTranslation } from 'react-i18next'

function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1)
}

const NormalSnackBar = memo(forwardRef((props, forwardedRef) => {
  const { title, msg, variant, action } = props;
  const { t } = useTranslation();
  return (
    <SnackbarContent className={`noraml-snackbar-wrapper ${variant}`} ref={forwardedRef}>
      <div className="snackbar-inner">
        {variant !== "default" && <img className="snackbar-inner__icon" src={require(`assets/Icon/snack-${variant}.svg`)} alt={`${variant} icon`} />}
        <div className="snackbar-inner__desc">
          {title ? <p className="title">{capitalize(title)}</p> : <p className="title">{t(`snackbarTitle.${variant}`)}</p> }
          {msg ? <p className="msg">{t(msg)}</p> : null}
        </div>
      </div>
      <button onClick={() => action()} className="close-btn"></button>
    </SnackbarContent>
  );
}));

export default NormalSnackBar;

// import { useSnackbar } from "notistack";
// const { enqueueSnackbar, closeSnackbar } = useSnackbar();
// enqueueSnackbar({ title, msg, variant, action: () => {closeSnackbar()} })
