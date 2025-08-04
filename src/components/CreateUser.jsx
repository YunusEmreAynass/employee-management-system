import Header from './Header'
import Footer from './Footer'
import { useState } from 'react';
import '../css/createUser.css'
import { registerUser } from '../services/api';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../redux/Users';
import { getDepartmentByName } from '../services/api';

function CreateUser() {
    const { t } = useTranslation("global");
    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageError, setMessageError] = useState('');
    const dispatch = useDispatch();
    const departments = useSelector((state) => state.users.departments);
    const departmentsNames = departments.map(department => department.name); // Assuming departments is an array of objects with a 'name' property
    const userSelf = useSelector((state) => state.users.userSelf);
    const userType = useSelector((state) => state.users.userType);
    const roles = ["ADMIN", "MANAGER", "USER"];
    const [firstName, setFirstName] = useState('');
    const [surName, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState(userType === "MANAGER" ? userSelf.departmentName : ''); // Default to user's department if they are a manager. Menejerin departman türünü değiştirme şansı olmadığı için burada departman ismi atanıyor.
    console.log("Department:", department);
    const [role, setRole] = useState(userType==="MANAGER"? "USER": ''); // Default to "USER" if the user is a manager, otherwise leave it empty. Manager altına en fazla user ekleyebiliceği için
    const token = useSelector((state) => state.users.token);
   
    const [departmentId, setDepartmentId] = useState('');
    const roleId = roles.indexOf(role) + 4; // Assuming roles are indexed starting from 1
    
    const getDepartmentId = async (departmentName) => {
        try {
            const department = await getDepartmentByName(departmentName, token);
            console.log("Fetched DepartmentId:", department.id);
            return department.id; // Assuming the API returns an object with an 'id' property
        } catch (error) {
            console.error('Error fetching department ID:', error);
        }
    }
    useEffect(() => {
        if (userType === "ADMIN")
        {
            const selectedDepartment = departments.find(dept => dept.name === department);
            if (selectedDepartment) {
                setDepartmentId(selectedDepartment.id); // Assuming each department has an 'id' property
            } else {
                setDepartmentId(''); // Reset if no department is selected
            }

           }

    },[department]);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const id = departmentId !== '' ? departmentId : await getDepartmentId(department);
        try {
            const response = await registerUser(token, firstName, surName, email, id, roleId);
            dispatch(getAllUsers(token));
            setMessageSuccess(t("createUser.message.success"));
            setMessageError('');
            console.log('User created successfully:', response);
            // Optionally, you can reset the form or show a success message
           
        }
        catch (error) {
            setMessageError(t("createUser.message.error"));
            setMessageSuccess('');
            console.error('Error creating user:', error);
            // Optionally, you can show an error message to the user
        }

        // Here you would typically call an API to create the user
        // For example:
    }

    return (
        <>
            <Header />
            <div className="container">
                <h2 className="mt-4">{t("createUser.title")}</h2>
                <form className='create-user-form'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">{t("createUser.name")}</label>
                        <input type="text" className="form-control" id="name" required
                            value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label">{t("createUser.surname")}</label>
                        <input type="text" className="form-control" id="surname" required
                            value={surName} onChange={(e) => setSurname(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">{t("createUser.email")}</label>
                        <input type="email" className="form-control" id="email" required
                            value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="department" className="form-label">{t("createUser.department")}</label>
                        {userType === "ADMIN" ?
                            <select className="form-select" id="department" value={department} onChange={(e) => setDepartment(e.target.value)}>
                                <option value="">{t("createUser.selectDepartment")}</option>
                                {departmentsNames.map((dept, index) => (
                                    <option key={index} value={dept}>{t(`dashboard.departments.${dept}`, { defaultValue: dept })}</option>
                                ))}
                            </select>
                            :
                            <input type="text" className="form-control" id="department" value={userSelf.departmentName} disabled />

                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">{t("createUser.role")}</label>
                        {userType === "ADMIN" ?
                            <select className="form-select" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">{t("createUser.selectRole")}</option>
                                {roles.map((role, index) => (
                                    <option key={index} value={role}>{t(`dashboard.roles.${role}`)}</option>
                                ))}
                            </select>
                            :
                            <input type="text" className="form-control" id="role" value={t(`dashboard.roles.USER`)} disabled />
                        }
                    </div>
                    {messageSuccess && <div className="success">{messageSuccess}</div>}
                    {messageError && <div className="error">{messageError}</div>}
                    <button  className="btn btn-primary" onClick={(e)=>{handleCreateUser(e)}}>{t("createUser.button")}</button>
                </form>
            </div>
            <Footer />
      </>
    
  )
}

export default CreateUser