import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import '../css/updateUser.css';
import { updateUser, updateUserRole, getDepartmentByName } from '../services/api';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../redux/Users';


function Tab({ activeTab, user, t }) {
    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageError, setMessageError] = useState('');
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false); // Profil düzenleme durumu
    const isAdmin = useSelector((state) => state.users.isAdmin); // isAdmin durumunu al
    const userType = useSelector((state) => state.users.userType);
    const AllDepartments = useSelector((state) => state.users.departments);
    const userDepartment = AllDepartments.find(department => department.name === user?.departmentName);
    const companyDepartments = AllDepartments.filter(department => department.company.id === userDepartment?.company.id);

    const [department, setDepartment] = useState(user?.departmentName || '');
    const token = useSelector((state) => state.users.token);
    const roles = ["ADMIN", "MANAGER", "USER"];
    const [email, setEmail] = useState(user?.email || '');
    const [firstName, setFirstName] = useState(user?.name || '');
    const [surName, setSurName] = useState(user?.surname || '');
    const [departmentId, setDepartmentId] = useState(userDepartment?.id || '');
    const [role, setRole] = useState(user?.role?.name || '');


    useEffect(() => {
        setMessageSuccess('');
        setMessageError('');
        const selectedDepartment = AllDepartments.find(dept => dept.name === department);
        setDepartmentId(selectedDepartment ? selectedDepartment.id : '');
    }, [department])

    




    const handleUpdate = async (e) => {
        setMessageError('');
        setMessageSuccess('');
        e.preventDefault();
        console.log("Department ID:", departmentId);
        if (e.target.innerText === t("updateUser.button_edit")) {
            setIsEditing(true);
            e.target.innerText = t("updateUser.button_update");
        }
        else if (e.target.innerText === t("updateUser.button_update")) {
            try {

                await updateUser(token, user.id, firstName, surName, email, departmentId)
                if(userType === "ADMIN") {
                    await updateUserRole(token, user.id, role);
                }

                setIsEditing(false);
                setMessageError('');
                setMessageSuccess(t("updateUser.message.success"));
                dispatch(getAllUsers(token));
                e.target.innerText = t("updateUser.button_edit");
            } catch (error) {
                setMessageSuccess('');
                setMessageError(t("updateUser.message.error"));
                console.error("Error updating user:", error);
            }


        }
    }
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            {activeTab === 'personal' && (
                <>
                    <div className='inputs'>
                        <div>
                            <label htmlFor="firstName">{t("updateUser.tabs.personal.firstname")}</label>
                            <input type="text" id="firstName" name="firstName" className='entry' value={firstName} onChange={(e) => setFirstName(e.target.value)} readOnly={!isEditing} />
                        </div>
                        <div >
                            <label htmlFor="surName">{t("updateUser.tabs.personal.surname")}</label>
                            <input type="text" id="surName" name="surName" className='entry' value={surName} onChange={(e) => setSurName(e.target.value)} readOnly={!isEditing} />
                        </div>

                        <div >
                            <label htmlFor="email">{t("updateUser.tabs.personal.email")}</label>
                            <input type="email" id="email" name="email" className='entry' value={email} onChange={(e) => setEmail(e.target.value)} readOnly={!isEditing} />
                        </div>



                    </div >

                </>

            )}

            {activeTab === 'work' && isAdmin && (
                <>
                    <div className='inputs'>
                        <div >
                            <label htmlFor="department">{t("updateUser.tabs.work.department")}</label>
                            {isEditing ?
                                <select id="department" name="department" className='entry' value={department} onChange={(e) => { setDepartment(e.target.value); }}>
                                    {companyDepartments.map((dept) => (
                                        <option key={dept.id} value={dept.name}>{t("dashboard.departments." + dept.name,{defaultValue: dept.name})}</option>
                                    ))}
                                </select>
                                :
                                <input type="text" id="department" name="department" className='entry' value={t("dashboard.departments." + department,{defaultValue: department})} readOnly />
                            }
                        </div>
                        <div >
                            <label htmlFor="role">{t("updateUser.tabs.work.role")}</label>
                            {isEditing ?
                                <select id="role" name="role" className='entry' value={role} onChange={(e) => setRole(e.target.value)}>
                                    {roles.map((role, index) => (
                                        <option key={index} value={role}>{t(`dashboard.roles.${role}`)}</option>
                                    ))}
                                </select>

                                :
                                <input type="text" id="role" name="role" className='entry' value={t("dashboard.roles." + role)} readOnly />
                            }
                        </div>
                    </div>

                </>
            )}

            {activeTab === 'company' && isAdmin && (
                <>
                    <div className='inputs'>
                        <div >
                            <label htmlFor="companyName">{t("updateUser.tabs.company.name")}</label>
                            <input type="text" id="companyName" name="companyName" className='entry' value={userDepartment.company.name} readOnly style={{cursor: 'not-allowed'}} />
                        </div>
                        <div >
                            <label htmlFor="companyType">{t("updateUser.tabs.company.shortName")}</label>
                            <input type="text" id="companyType" name="companyType" className='entry' value={userDepartment.company.shortName} readOnly style={{cursor: 'not-allowed'}} />
                        </div>
                        <div >
                            <label htmlFor="companyTown">{t("updateUser.tabs.company.town")}</label>
                            <input type="text" id="companyTown" name="companyTown" className='entry' value={userDepartment.company.town?.name} readOnly style={{cursor: 'not-allowed'}} />
                        </div>
                        <div>
                            <label htmlFor="companyName">{t("updateUser.tabs.company.region")}</label>
                            <input type="text" id="companyRegion" name="companyRegion" className='entry' value={userDepartment.company.town?.region?.name} readOnly style={{cursor: 'not-allowed'}} />

                        </div>
                        <div>
                            <label htmlFor="companyName">{t("updateUser.tabs.company.city")}</label>
                            <input type="text" id="companyCity" name="companyCity" className='entry' value={userDepartment.company.town?.city?.name} readOnly style={{cursor: 'not-allowed'}} />
                        </div>

                    </div>

                </>
            )}
            {messageSuccess && <div className="success">{messageSuccess}</div>}
            {messageError && <div className="error">{messageError}</div>}
            <button onClick={(e) => { handleUpdate(e); }}>{t("updateUser.button_edit")}</button>
        </div>
    )
}

export default Tab