import { useSelector } from 'react-redux';
import { selectModal } from 'store/modules/components';

import WriteModal from 'components/modal/Write';
import ReadModal from 'components/modal/Read';
import LoginPromptModal from 'components/modal/LoginPrompt';

const MODAL_TYPES = {
  Write: "Write",
  Read: "Read",
  LoginPrompt: "LoginPrompt",
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.Write,
    component: <WriteModal />
  },
  {
    type: MODAL_TYPES.Read,
    component: <ReadModal />
  },
  {
    type: MODAL_TYPES.LoginPrompt,
    component: <LoginPromptModal />
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