import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { signIn } from '../services/api';
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers, setToken, getUserSelf, getAllDepartments,getAllCompanies,getAllCities,getAllCompanyTypes,getAllDepartmentTypes } from '../redux/Users'
import { useTranslation } from 'react-i18next';
import MyAlert from './MyAlert';

const SignIn = () => {
    const [t] = useTranslation("global");
    const [email, setEmail] = useState('');
    const [whichAlert, setWhichAlert] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.users.token);
    const userType = useSelector((state) => state.users.userType); // isAdmin durumunu al
  


    useEffect(() => {
       
        console.log("useEffect çalıştı", token, userType);
        if (token && userType) {
            console.log("token ve userType alındı:", token, userType);
            if (userType === 'ADMIN') {
                dispatch(getAllCities(token));//sadece adminin erişebileceği bir işlem olduğu için burada dispatch ediliyor
            } if (userType === 'MANAGER' || userType==='ADMIN') {//hem hem de manager erişebileceği için burada dispatch ediliyor
                dispatch(getAllUsers(token));
                dispatch(getAllDepartments(token));
                dispatch(getAllCompanies(token));
                dispatch(getAllCompanyTypes(token));
                dispatch(getAllDepartmentTypes(token));
                
            }
        }
        
       
    }, [token,userType,dispatch]);

   




    const handleSubmit = async (e) => {
       
        e.preventDefault();
        try {
            
            const tokenValue = await signIn(email, password); //token değerini aldığımızdan emin olmak için await kullanıyoruz çünkü api istekleri asenkron çalışır
            await dispatch(setToken(tokenValue))//burdaki dispatchte asenkron çalışır
            await dispatch(getUserSelf(tokenValue));//daha token değeri set edilmediği için tokenValue kullanıyoruz çünkü bir sonraki renderda token değeri set edilecek ve getUserSelf fonksiyonu çalışacak
            setMessage(t("forms.signIn.message.success"));
            setWhichAlert('success');
            navigate('/');

        } catch (err) {
            setError(err.response?.data?.message || 'Giriş yapılamadı');
            setMessage(t("forms.signIn.message.error"));
            setWhichAlert('error');
        }
    };
    

    



    return (
        <div className="root">
            <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg form-wrapper">

                
                <form onSubmit={handleSubmit} className="form-group">

                    
                    <img src="/delta_logo.png" alt="" />
                    <center><h1>{t("forms.signIn.title")}</h1></center>
                    <div className="input-wrapper">
                        <i className="fa-solid fa-envelope"></i>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border rounded"
                            placeholder= {t("forms.signIn.email")}

                        /></div>
                    <div className="input-wrapper">
                        <i className="fa-solid fa-lock"></i>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border rounded"
                            placeholder={t("forms.signIn.password")}

                        />
                    </div>
                    {message && <MyAlert whichAlert={whichAlert} message={message} />}
                    <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">{t("forms.signIn.button")}</button>
                    <div className=" flex justify-between links " style={{ display: 'flex', width: '100%', justifyContent:'space-evenly' }}>
                        <a href="/activate" className="text-blue-500 ">{t("forms.signIn.activateAccount")}</a>
                        <a href="/forgot-password" className="text-blue-500 ">{t("forms.signIn.forgotPassword")}</a>

                    </div>
                </form>
                
            </div>
        </div>
    );
};

export default SignIn;