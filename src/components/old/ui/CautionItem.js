
import { useTranslation } from 'react-i18next'
export default function CautionItem({desc, styled}) {
  const { t } = useTranslation();
  return (
    <div className={`caution-wrapper ${styled ? styled : ''}`}>
      <p className="caution-title">{t('component.modal.caution')}</p>
      <p className="caution-inner">{t(desc)}</p>
    </div>
  )
}