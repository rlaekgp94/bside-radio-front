import { useSelector } from 'react-redux';
import { selectModal } from 'store/modules/components';

import ReadModal from 'components/modal/Read';
import LoginPromptModal from 'components/modal/LoginPrompt';
import ComingModal from 'components/modal/Coming';
import OnBoardingModal from 'components/modal/OnBoarding';

const MODAL_TYPES = {
  Read: "Read",
  LoginPrompt: "LoginPrompt",
  Coming: "Coming",
  OnBoarding: "OnBoarding",
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.Read,
    component: <ReadModal />
  },
  {
    type: MODAL_TYPES.LoginPrompt,
    component: <LoginPromptModal />
  },
  {
    type: MODAL_TYPES.Coming,
    component: <ComingModal />
  },
  {
    type: MODAL_TYPES.OnBoarding,
    component: <OnBoardingModal />
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