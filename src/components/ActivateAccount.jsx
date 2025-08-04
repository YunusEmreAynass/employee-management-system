import { useState } from 'react';
import { sendActivationMail, activateAccount } from '../services/api';
import { useSearchParams } from 'react-router-dom';
import MyAlert from './MyAlert';
import { useTranslation } from 'react-i18next';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!\-+]).{8,32}$/;

const ActivateAccount = () => {
    const [t] = useTranslation("global");

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [searchParams] = useSearchParams();
    const [whichAlert, setWhichAlert] = useState('');
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');


    const requestActivation = async (e) => {
        e.preventDefault();
        try {

            await sendActivationMail(email);


            setMessage('Activation link sent. Please check your email.');
            setWhichAlert('success');
        } catch {
            setMessage('Error sending activation email.');
            setWhichAlert('danger');
        }
    };

    const handleActivate = async (e) => {
        debugger;
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            setWhichAlert('error');
            setStep(2);
            return;
        }
        if (!passwordPattern.test(password)) {
            setMessage('Password does not meet requirements.');
            setWhichAlert('danger');
            setStep(2);
            return;


        }
        if (!token) {
            setMessage('Token not found in URL.');
            setWhichAlert('danger');
            return;
        }
        else {
            try {
                await activateAccount(token, password, confirmPassword);
                console.log('Account activated successfully');
                setStep(3);
                setMessage('Account activated successfully! You can now sign in.');
                setWhichAlert('success');
            } catch {
                setMessage('Activation failed. Token may be expired or invalid.');
                setWhichAlert('danger');
                console.log('Activation failed:', error);
            }
        }
    };

    return (
        <div className="root">
            <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg form-wrapper ">
                <form className="form-group">
                    <img src="/delta_logo.png" alt="" />
                    <center><h1>{t("forms.activateAccount.title")}</h1></center>

                    {(step === 1 && !token) && (
                        <>
                            <div className="input-wrapper">
                                <i className="fa-solid fa-envelope"></i>
                                <input
                                    type="email"
                                    placeholder={t("forms.activateAccount.email")}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            {message && <MyAlert whichAlert={whichAlert} message={message} />}
                            <button onClick={(e) => { requestActivation(e) }} className="w-full p-2 bg-blue-600 text-white rounded">{t("forms.activateAccount.buttonMail")}</button>
                        </>
                    )}
                    {token && step !== 3 && (
                        <>
                            <div className="input-wrapper">
                                <i className="fa-solid fa-lock"></i>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded"
                                    placeholder={t("forms.activateAccount.password")}

                                />
                            </div>
                            <div className='input-wrapper'>
                                <i className="fa-solid fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder={t("forms.resetPassword.confirmPassword")}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            {message && <MyAlert whichAlert={whichAlert} message={message} />}
                            <button onClick={(e) => { handleActivate(e) }} className="w-full p-2 bg-green-600 text-white rounded">{t("forms.activateAccount.buttonPassword")}</button>
                        </>
                    )}
                    {step === 3 && message && <MyAlert whichAlert={whichAlert} message={message} />}
                    {step === 3 &&
                        <a href="/signin">{t("forms.activateAccount.back")}</a>
                    }
                </form>
            </div>
        </div>
    );
};

export default ActivateAccount;