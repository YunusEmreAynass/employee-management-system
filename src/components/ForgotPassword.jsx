import { useState } from 'react';
import { sendResetMail } from '../services/api';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import MyAlert from './MyAlert';

const ForgotPassword = () => {
    const [t] = useTranslation("global");
    const [email, setEmail] = useState('');
    const [whichAlert, setWhichAlert] = useState('');
    const [message, setMessage] = useState('');

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendResetMail(email);
            setMessage('Reset link sent. Please check your email.');
            setWhichAlert('success');
        } catch {
            setMessage('Error sending reset email.');
            setWhichAlert('error');
        }
    };

    return (
        <div className="root">
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg form-wrapper">

            <form onSubmit={handleSubmit} className="form-group">
                <img src="/delta_logo.png" alt="" />
                    <center><h1>{t("forms.forgotPassword.title")}</h1></center>
                <div className="input-wrapper">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                        type="email"
                        placeholder={t("forms.forgotPassword.email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    className="w-full p-2 border rounded"
                />
                    </div>
                    {message && <MyAlert whichAlert={whichAlert} message={message} />}
                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">{t("forms.forgotPassword.button")}</button>
                <a href="/signin">{t("forms.forgotPassword.back")}</a>
            </form>
            </div>
        </div>
    );
};

export default ForgotPassword;