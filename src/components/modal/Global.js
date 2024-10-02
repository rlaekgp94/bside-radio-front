import { useSelector } from 'react-redux';
import { selectModal } from 'store/modules/components';

import WriteModal from 'components/modal/Write';

const MODAL_TYPES = {
  Write: "Write",
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.Write,
    component: <WriteModal />
  },
];

export default function GlobalModal() {
  const { modalType, isOpen, twoFactorModal } = useSelector(selectModal);
  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });

  const renderModal = () => {
    return findModal.component;
  };
  return (
    <>
      {renderModal()}
    </>
  );
}