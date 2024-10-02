import { useSelector } from 'react-redux';
import { selectModal } from 'store/modules/components';

import SignInModal from 'components/modal/SignIn';

const MODAL_TYPES = {
  SignIn: "SignIn",
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.SignIn,
    component: <SignInModal />
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
      {/* {twoFactorModal && <TwoFactorModal />} */}
    </>
  );
}