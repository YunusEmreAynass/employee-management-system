
import '../css/header.css'
import { useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { useSelector,useDispatch } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/helpers'; // logout helper function
import { useTranslation } from 'react-i18next';
import { setLang } from '../redux/Users'; // Import the action to set selected language



function Header() {
    const [t] = useTranslation("global");
    const navigate = useNavigate();
    const isAdmin =useSelector((state) => state.users.isAdmin); // isAdmin durumunu al
    const userType = useSelector((state) => state.users.userType); // isAdmin durumunu al
// Kullanıcının departman ID'sini al
    const [showMenu, setShowMenu] = useState(); // Menü durumunu kontrol etmek için state
    const departments = useSelector((state) => state.users.departments);
    const dropDownMargin = String(departments.length * 30) + "px"; // Dropdown menüsünün margin değerini hesapla
    const selectedLang = useSelector((state) => state.users.selectedLang); // Default language selection
    const token = useSelector((state) => state.users.token);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        logout(dispatch,navigate); // Call the logout function from utils/helpers.js
    }
   

    const getLangs = () => {//language seçeneklerini gösterir
        const langs = document.getElementsByClassName('langs')[0];
        langs.style.display = langs.style.display === 'block' ? 'none' : 'block';
    }

    useEffect(() => {
        const langs = document.getElementsByClassName('langs')[0];
        langs.style.display = 'none'; // Hide the language options by default
    }, [selectedLang]);//selectedLang değiştiğinde dil seçeneklerinin olduğu dropdown menüsünü kapatır

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            
        }

        window.addEventListener('resize', handleResize);//window objesine bir event listener ekler, window boyutu değiştiğinde handleResize fonksiyonunu çağırır

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    useEffect(() => { 
        if (windowWidth > 545)
        {
            setShowMenu(); //DOM elementlerinin yüklenmesi geç olduğu için onları çekip style özelliklerini değiştirmek sıkıntılı oluyo reactta o yüzden state kullanıp onların display değerlerini değiştirdik
        }


    }, [windowWidth]);

    return (
        <div>
            <header >
                <div className='header-container'>
                    <ul className='header-links'>
                        <div>
                            <li>
                                <div className="logo">
                                    <a href="/"><img className='logo-img' src="/delta_logo.png" alt="" /></a>
                                    <a href="/"><h1>DELTA</h1></a>
                                </div>
                            </li>
                        </div>
                        <div className='header-links-right' style={{ display: showMenu === true && 'flex' || showMenu === false && 'none' }}>
                            <li>
                                <NavLink to="/" className={({ isActive }) => isActive ? 'is-active' : ''} >{t('header.home')}</NavLink>
                            </li>
                            {userType === 'ADMIN' || userType === 'MANAGER' ?
                                <li>
                                    {userType === 'ADMIN' && <NavLink className={({ isActive }) => isActive ? 'is-active' : ''} to="/admin-dashboard">{t("header.adminDashboard")}</NavLink>}
                                    {userType === 'MANAGER' && <NavLink className={({ isActive }) => isActive ? 'is-active' : ''} to="/manager-dashboard">{t("header.managerDashboard")}</NavLink>
                                    }
                                   
                                    
                                
                                </li>
                                :
                                <>
                                <li>
                                    <NavLink className={({ isActive }) => isActive ? 'is-active' : ''} to="/about">{t("header.about")}</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => isActive ? 'is-active' : ''} to="/contact">{t("header.contact")}</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) => isActive ? 'is-active' : ''} to="/blog">{t("header.blog")}</NavLink>
                                    </li>
                                    
                                </>
}

                                {(isAdmin || userType==='MANAGER' )&&
                                

                                <li>
                                    <div className='drop-down'><NavLink className={({ isActive }) => isActive ? 'is-active' : ''} to="/departments">
                                        {t("header.departments")}</NavLink> <IoIosArrowDown className='drop-down-icon' />
                                        <div className="drop-down-elements" style={{ marginTop: dropDownMargin }}>
                                            {departments.map((department, index) => (
                                                <NavLink key={index} to={`/update-department?id=${department.id}`} className={location.pathname === '/update-department' && location.search === `?id=${department.id}` ? 'is-active' : ''}>
                                                    {t("header." + department.name, { defaultValue: department.name })}
                                                </NavLink>/*burdaki classname i bu şekilde tanımlamamızın sebebi şu hepsinin pathnamei aynı olduğu için hepsini is-active yapıyo o yüzden bir de id koşulu ekledik */
                                            ))}
                                        </div>



                                    </div>
                                       </li>
                                    
                                    
                                    
                                    
                                    
                                    
                                }
                                


                            {(userType === 'ADMIN' || userType === 'MANAGER') &&
                                
                                    <li>
                                        <div className='drop-down'>
                                            {t("header.types")}
                                            <IoIosArrowDown className='drop-down-icon' />
                                            <div className="drop-down-elements" style={{ marginTop: '90px' }}>
                                                <NavLink to="/department-types" className={({ isActive }) => isActive ? 'is-active' : ''}>
                                                    {t("header.type.departmentTypes")}
                                                </NavLink>
                                                <NavLink to="/company-types" className={({ isActive }) => isActive ? 'is-active' : ''}>
                                                    {t("header.type.companyTypes")}
                                                </NavLink>
                                            </div>
                                        </div>
                                    </li>
                                }
                        </div>

                    </ul>
                    <div className='header-profile' style={{ display: showMenu === true && 'flex' || showMenu === false && 'none' }}>
                        {token ?
                            <div className='drop-down-profile'>
                                <NavLink className={({ isActive }) => isActive ? 'is-active' : ''} to="/user-profile">
                                    <CgProfile className='profile-icon' />
                                </NavLink>
                                <div className="profile-drop-down">
                                    <button
                                        onClick={() => { logoutHandler() }}
                                        style={{ display: 'block', width: '100%' }}
                                        className='profile-link-2'
                                    >
                                        {t("header.signOut")}
                                    </button>
                                </div>
                            </div>

                            :
                            <div>
                                <NavLink className={({ isActive }) => (isActive ? 'is-active' : '') + "profile-link-1"} to="/signin">{t("header.signIn")}</NavLink>
                            </div>
                        }
                        <div className='lang-select'>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                {selectedLang === 'En' ? <span>{t("header.firstLang")}</span> : <span>{t("header.secondLang")}</span>}
                                <IoIosArrowDropdown className='lang-icon' onClick={() => { getLangs() }} />
                            </div>

                            <div className="lang-options">

                                <div className="langs" >
                                    {selectedLang === 'En' ? <div onClick={() => dispatch(setLang("Tr"))}>{t("header.secondLang")}</div> :
                                        <div onClick={() => dispatch(setLang("En"))}>{t("header.firstLang")}</div>
                                    }


                                </div>
                            </div>


                        </div>

                    </div>
                    <IoMenu className='io-menu' onClick={() => {setShowMenu(true); }} style={{display: showMenu===true &&'none' || showMenu===false && 'block'}}  />
                    <MdCancel className='cancel' onClick={() => {setShowMenu(false); }} style={{display: showMenu === true &&'block' || showMenu === false && 'none'}}  />
                </div>
            </header>
        </div>
    )
}

export default Header