import {CopyToClipboard} from "react-copy-to-clipboard/src";
import { useSnackbar } from "notistack";
import { useTranslation } from 'react-i18next'

export default function CopyItem({address, styled}) {
  const { t } = useTranslation()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <CopyToClipboard className={`copy-item-wrapper ${styled ? styled : ''}`} text={address}
    onCopy={() => enqueueSnackbar({ title: t('commonMsg.copyCompleted'), msg: address, variant: "info", action: () => {closeSnackbar()} })}>
      <div>
        <p>{address}</p>
        <div className="copy-icon"></div>
      </div>
    </CopyToClipboard>
  )
}