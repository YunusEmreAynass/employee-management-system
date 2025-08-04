import Header from './Header'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import '../css/profile.css'
import { logout } from '../utils/helpers';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//todo bu sayfada kalan şey şu backende istediği bilgileri göndermek

function Profile() {
  const { t } = useTranslation("global");
  const user = useSelector((state) => state.users.userSelf);
  const firstName = user?.name || '';
  const surName = user?.surname || '';
  const email = user?.email || '';
  const role = user?.role?.name || '';
  const departmentName = user?.departmentName || '';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    logout(dispatch, navigate); // Call the logout function from utils/helpers.js
  }

  

  return (
    <>
      <Header />
      <div className='profile-container'>
        <h1>{t("profile.title")}</h1>
        <div className='profile-details'>
          <div>
            <label>{t("profile.name")+":"}</label>
            <input type="text" value={firstName} readOnly  />
          </div>
          <div>
            <label>{t("profile.surname")+":"}</label>
            <input type="text" value={surName} readOnly  />
          </div>
          <div>
            <label>{t("profile.email")+":"}</label>
            <input type="email" value={email} readOnly  />
          </div>
          <div>
            <label>{t("profile.role")+":"}</label>
            <input type="text" value={role} readOnly  />
          </div>
          <div>
            <label>{t("profile.department")+":"}</label>
            <input type="text" value={departmentName} readOnly  />
          </div>
        </div>
        <div className='profile-actions'>
          <button onClick={(e) => {logoutHandler(e) }}>{t("profile.buttonLogout")}</button>
        </div>
      </div>



      <Footer />












    </>
  )
}

export default Profile