// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectModal, closeModal, openModal } from 'store/modules/components';
// // import { user } from 'store/modules/user';
// import Dialog from '@mui/material/Dialog';
// import BaseButton from 'components/ui/button/BaseButton';
// import FormInput from 'components/ui/input/FormInput';
// import { Button } from '@mui/base/Button';
// import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';
// import { useSnackbar } from "notistack";
// import { useTranslation } from 'react-i18next'
// import useAuth from 'hooks/useAuth';

// function validateEmail(value) {
//   if (!value) return;
//   const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//   if (!regex.test(value)) {
//     return "component.modal.register.email.errMsg.invalid" // 이메일 형식이 아닙니다.
//   }
// }
// function validatePassword(password) {
//   if (!password) return;
//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//   if (!passwordRegex.test(password)) {
//     switch (true) {
//       case password?.length < 8:
//         return "component.modal.register.password.errMsg.length"; // 패스워드는 최소 8자 이상이어야 합니다.
//       case !/(?=.*[a-z])/.test(password):
//         return "component.modal.register.password.errMsg.lowercasePresence"; // 소문자가 적어도 하나 이상 포함되어야 합니다.
//       case !/(?=.*[A-Z])/.test(password):
//         return "component.modal.register.password.errMsg.uppercasePresence"; // 대문자가 적어도 하나 이상 포함되어야 합니다.
//       case !/(?=.*\d)/.test(password):
//         return "component.modal.register.password.errMsg.numberPresence"; // 숫자가 적어도 하나 이상 포함되어야 합니다.
//       case !/(?=.*[!@#$%^&*])/.test(password):
//         return "component.modal.register.password.errMsg.specialCharacterPresence"; // 특수문자가 적어도 하나 이상 포함되어야 합니다.
//       default:
//         return "component.modal.register.password.errMsg.default"; // 패스워드가 규칙에 맞지 않습니다.
//     }
//   }
//   return;
// }

// function ForgotPassword({setStep, dispatch, enqueueSnackbar, closeSnackbar}) {
//   const { t } = useTranslation();
//   const [next, setNext] = useState(false);
//   const [email, setEmail] = useState("");
//   const [code, setCode] = useState("");
//   const [newPw, setNewPw] = useState("");
//   const [confirmPw, setConfirmPw] = useState("");

//   const emailInput = {
//     placeholder: 'component.modal.forgotPassword.email.placeholder',
//     label: 'component.modal.forgotPassword.email.label',
//     id: "forgot-password-email",
//     value: email,
//     setValue: setEmail
//   }
//   const codeInput = {
//     label: 'component.modal.forgotPassword.verifyCode.label',
//     id: "forgot-password-code",
//     value: code,
//     setValue: setCode
//   }
//   const newPwInput = {
//     placeholder: 'component.modal.forgotPassword.newPassword.placeholder',
//     label: 'component.modal.forgotPassword.newPassword.label',
//     id: "forgot-password-newPw",
//     value: newPw,
//     setValue: setNewPw,
//     isPassword: true,
//     isError: validatePassword(newPw)
//   }
//   const confirmPwInput = {
//     placeholder: 'component.modal.forgotPassword.confirmPassword.placeholder',
//     label: 'component.modal.forgotPassword.confirmPassword.label',
//     id: "forgot-password-confirmPw",
//     value: confirmPw,
//     setValue: setConfirmPw,
//     isPassword: true,
//     isError: (confirmPw?.length > 3 && newPw !== confirmPw) ? "component.modal.register.password.errMsg.match" : null
//   }

//   const handleResetPassword = async () => {
//     try {
//       const output = await resetPassword({ username: email });
//       handleResetPasswordNextSteps(output);
//       setStep(prevStep => {
//         return { ...prevStep, title: "component.modal.forgotPassword.resetTitle" };
//       });
//     } catch (e) {
//       enqueueSnackbar({ msg: e.message, variant: "error", action: () => {closeSnackbar()} })
//       console.log(e);
//     }
//   }
//   const handleResetPasswordNextSteps = (output) => {
//     const { nextStep } = output;
//     switch (nextStep.resetPasswordStep) {
//       case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
//         const codeDeliveryDetails = nextStep.codeDeliveryDetails;
//         // console.log(`Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`);
//         // 사용자로부터 확인 코드를 수집하고 암호 재설정을 확인하기 위해 전달합니다.
//         setNext(true);
//         break;
//       case 'DONE':
//         console.log('Successfully reset password.');
//         break;
//       default:
//         break;
//     }
//   }
//   const handleConfirmResetPassword = async () => {
//     const data = {
//       username: email,
//       confirmationCode: code,
//       newPassword: confirmPw
//     }
//     await confirmResetPassword(data)
//     .then(() => {
//       enqueueSnackbar({ msg: "component.modal.forgotPassword.success", variant: "success", action: () => {closeSnackbar()} })
//       setStep(stepLayout["signIn"])
//     })
//     .catch(e => {
//       enqueueSnackbar({ msg: e.message, variant: "error", action: () => {closeSnackbar()} })
//       console.log("e", e);
//     })
//   }

//   return (
//     <div className="base-dialog-body">
//     {!next ?
//       <div className="confirm-form-wrapper">
//         <FormInput {...emailInput} />
//         <BaseButton isDisabled={!email} onClick={handleResetPassword} color="primary" label="component.modal.forgotPassword.sendCodeBtn" />
//       </div> :
//       <div className="resetPassword-form-inner">
//         <FormInput {...codeInput} />
//         <div className="password-wrapper">
//           <div className="password-inner">
//             <FormInput {...newPwInput} />
//             <span className="form-input-msg">{t('component.modal.forgotPassword.newPassword.infoMsg')}</span>
//           </div>
//           <FormInput {...confirmPwInput} />
//         </div>
//         <BaseButton isDisabled={!code || !newPw || !confirmPw} onClick={handleConfirmResetPassword} color="primary" label="component.modal.forgotPassword.resetBtn" />
//       </div>}
//       <div className="signin-guide-wrapper">
//         <p>{t('component.modal.register.accountInfo')}</p>
//         <Button onClick={() => setStep(stepLayout["signIn"])} className="text-btn primary">{t('component.modal.register.signNow')}</Button>
//       </div>
//     </div>
//   )
// }

// function SignIn({setStep, handleClose, dispatch, enqueueSnackbar, closeSnackbar, confirm, setConfirm}) {
//   const { login, snsLogin, confirmLogin, resendCode } = useAuth();
//   const { t } = useTranslation();
//   const isManagedRegisterData = useSelector(state => { return state?.user.managedRegisterData; });
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmCode, setConfirmCode] = useState("");
//   const [emailError, setEmailError] = useState(null);
//   const [isDisabled, setIsDisabled] = useState(false);
//   const [countdown, setCountdown] = useState(59);

//   useEffect(() => {
//     if (isManagedRegisterData?.email) {
//       setEmail(isManagedRegisterData.email)
//     }
//   }, []);

//   useEffect(() => {
//     let timer;
//     if (isDisabled) {
//       timer = setInterval(() => {
//         setCountdown((prevCountdown) => {
//           if (prevCountdown === 1) {
//             clearInterval(timer);
//             setIsDisabled(false);
//             return 59;
//           }
//           return prevCountdown - 1;
//         });
//       }, 1000);
//     }

//     return () => {
//       clearInterval(timer);
//     };
//   }, [isDisabled]);


//   const registerModalOpen = () => {
//     dispatch(openModal({modalType: "Register"}));
//   };

//   const confirmInput = {
//     id: 'signin-code',
//     label: 'component.modal.signIn.verifyCode.label',
//     value: confirmCode,
//     setValue: setConfirmCode
//   }
//   const nameInput = {
//     id: 'signin-email',
//     placeholder: 'component.modal.signIn.name.placeholder',
//     label: 'component.modal.signIn.name.label',
//     value: email,
//     setValue: setEmail,
//     isError: emailError ?? (email?.length > 3 && validateEmail(email)),
//     handleFocus: () => {
//       setEmailError(null);
//     },
//   }
//   const passwordInput = {
//     id: 'signin-password',
//     placeholder: 'component.modal.signIn.password.placeholder',
//     label: 'component.modal.signIn.password.label',
//     msg: 'component.modal.signIn.password.infoMsg',
//     value: password,
//     setValue: setPassword,
//     isPassword: true,
//     isFunction: () => userLogin()
//   }

//   const userLogin = async () => {
//     const data = { username: email, password: password }
//     login(data, setLoading, setConfirm, handleClose)
//   }

//   const userConfirmLogin = async () => {
//     const data = { username: email, confirmationCode: confirmCode?.replace(/\s/gi, "") };
//     const loginData = { username: email, password: password };
//     confirmLogin(data, setLoading, handleClose, loginData, setConfirm)
//   }

//   const userResendCode = async () => {
//     const data = { username: email };
//     resendCode(data, setIsDisabled)
//   }
//   return (
//     <div className="base-dialog-body">
//       {confirm ?
//       <div className="verify-confirm">
//         <p className="verify-confirm__title" dangerouslySetInnerHTML={{ __html: t('component.modal.verify.subTitle', {email}) }}></p>
//         <div className="confirm-form-wrapper">
//           <FormInput {...confirmInput} />
//           <div className="confirm-form-wrapper__inner">
//             <BaseButton isLoading={loading} isDisabled={confirmCode.length < 6} onClick={userConfirmLogin} color="primary" label="component.modal.verify.verifyBtn" />
//             <BaseButton onClick={userResendCode} isDisabled={isDisabled} color="primary" subLabel={`${isDisabled ? `00:${countdown}` : ""}`} label={`${!isDisabled ? "component.modal.verify.resendBtn" : ""}`}/>
//           </div>
//         </div>
//       </div> :
//       <div className="signin-form-wrapper">
//         <div className="signin-form-inner">
//           <FormInput {...nameInput} />
//           <FormInput {...passwordInput} />
//         </div>
//         <div className="signin-form-submit">
//           <Button onClick={() => {setStep(stepLayout["forgotPassword"])}} className="text-btn primary"><p>{t('component.modal.forgotPassword.title')}</p></Button>
//           <BaseButton isDisabled={!email || !password || emailError !== null || (email?.length > 3 && !!validateEmail(email)) || email?.length <= 3} isLoading={loading} onClick={userLogin} color="primary" label="component.modal.signIn.btn" />
//         </div>
//       </div>}
//       <div className="signin-sns-wrapper">
//         <div className="or-border"><p>{t('component.modal.signIn.or')}</p></div>
//         <div className="signin-sns-inner">
//           {/* <button onClick={()=>snsLogin("Facebook")} className="sns-sign-in facebook"><p>Facebook</p></button> */}
//           <button onClick={()=>snsLogin("Google")} className="sns-sign-in google"><p>Google</p></button>
//           {/* <button className="sns-sign-in whatsapp"><p>Whatsapp</p></button> */}
//         </div>
//       </div>
//       <div className="register-guide-wrapper">
//         <p>{t('component.modal.signIn.accountInfo')}</p>
//         <Button className="text-btn primary" onClick={registerModalOpen}>{t('component.modal.signIn.registerNow')}</Button>
//       </div>
//     </div>
//   )
// }

// const stepLayout = {
//   signIn: {
//     id: "signIn",
//     title: "component.modal.signIn.title",
//     component: SignIn
//   },
//   forgotPassword: {
//     id: "forgotPassword",
//     title: "component.modal.forgotPassword.title",
//     component: ForgotPassword,
//   },
// }

export default function SignInModal() {
  // const { t } = useTranslation();
  // const { modalType, isOpen } = useSelector(selectModal);
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const [step, setStep] = useState(null)
  // const [confirm, setConfirm] = useState(false);
  // const dispatch = useDispatch();

  // const handleClose = () => {
  //   dispatch(closeModal());
  // };

  // useEffect(() => {
  //   setStep(stepLayout["signIn"])
  // }, [])

  // const StepComponent = step?.component;
  // const componentData = { step, setStep, handleClose, dispatch, enqueueSnackbar, closeSnackbar, confirm, setConfirm }

  // return (
  //   <Dialog
  //     open={modalType === "SignIn" && isOpen}
  //     onClose={handleClose}
  //     className="base-dialog-wrapper small"
  //   >
  //     <div className="base-dialog-banner-wrapper signin">
  //       <div className="base-dialog-inner">
  //         <div className="base-dialog-header">
  //           <p className="base-dialog-header__title">{confirm ? t("component.modal.verify.title") : t(step?.title)}</p>
  //           <button onClick={handleClose} className="close-btn"></button>
  //         </div>
  //         {StepComponent && <StepComponent {...componentData} />}
  //       </div>
  //     </div>
  //   </Dialog>
  // );
  return (
    <div>test</div>
  )
}