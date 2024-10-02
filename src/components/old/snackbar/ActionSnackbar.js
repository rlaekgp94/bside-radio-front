import { useSnackbar } from "notistack";

export default function ActionSnackbar({title, msg, variant}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  /*
    ~variant~
    default
    success
    error
    warning
    info
    enqueueSnackbar({ msg: "", variant: "success", action: () => {closeSnackbar()} })
  */
  return enqueueSnackbar({ title, msg, variant, action: () => {closeSnackbar()} })
}