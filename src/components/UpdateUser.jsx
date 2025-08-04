import React, { useEffect } from 'react'
import Tab from './Tab';
import '../css/updateUser.css';
import Header from './Header';
import Footer from './Footer';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';




function UpdateUser() {
    const { t } = useTranslation("global");
    const [message, setMessage] = React.useState('');
    const [activeTab, setActiveTab] = React.useState('personal');
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('id');
    const user = useSelector((state) => state.users.user.find(user => user.id === parseInt(userId)));
    const isAdmin = useSelector((state) => state.users.isAdmin); // isAdmin durumunu al
    useEffect(() => {
        if (!user) {
            setMessage('User not found.');
        }
    }, [user]);

    return (
    <>
      <Header />
      <div className='update-user mt-4'>
          
          <div className="actions">
                    <button onClick={() => setActiveTab("personal")} className={activeTab === "personal" ? "active" : ''}>{t("updateUser.actions.1") }</button>{/*firstname,surname,username,email */}
                    
                    {isAdmin &&
                <>
                        <button onClick={() => setActiveTab("work")} className={activeTab === "work" ? "active": ''}>{t("updateUser.actions.2") }</button>{/*department,company,role */}
                        <button onClick={() => setActiveTab("company")} className={activeTab === "company" ? "active" : ''}>{t("updateUser.actions.3") }</button>{/*company,company type,company town */}
                </>
        }
                    
              
          </div>
          <form action="" style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:20}}>
                    <Tab activeTab={activeTab} user={user} t={t} />
                    {message && <p className='error-message'>{message}</p>}
                


              

          </form>
          


            </div>
            <Footer />
        </>
  )
}

export default UpdateUser

