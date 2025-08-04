import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {resetPassword } from '../services/api';
import { useTranslation } from 'react-i18next';
import  MyAlert  from './MyAlert';


const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!\-+]).{8,32}$/;

const ResetPassword = () => {
    const [t] = useTranslation("global");
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [whichAlert, setWhichAlert] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleReset = async (e) => {
        debugger;
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            setWhichAlert('error');
            return;
        }
        if (!passwordPattern.test(password)) {
            setMessage('Password does not meet requirements.');
            setWhichAlert('error');
            return;
        }
        if (!token) {
            setMessage('Token not found in URL.');
            setWhichAlert('error');
            return;
        }
        try {
            await resetPassword(token, password, confirmPassword);
            setMessage('Password reset successful!');
            setWhichAlert('success');
        } catch {
            setMessage('Reset failed. Token may be expired or invalid.');
            setWhichAlert('error');
        }
    };

    return (
        <div className="root">
            <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg  form-wrapper">
                <form action="" className='form-group'>
                    <img src="/delta_logo.png" alt="" />
                    <center><h1 className="text-xl font-bold mb-4">{t("forms.resetPassword.title")}</h1></center>
                    
                    <div className='input-wrapper'>
                        <i className="fa-solid fa-lock"></i>
                        <input
                            type="password"
                            placeholder={t("forms.resetPassword.newPassword")}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded"
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
                    <button onClick={handleReset} className="w-full p-2 bg-green-600 text-white rounded">{t("forms.resetPassword.button")}</button>
                    {message.includes('successful') && <Link to="/signin" className="block text-blue-500 mt-4">{t("forms.resetPassword.back")}</Link>}
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;