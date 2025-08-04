import axios from 'axios';
import { CiYoutube } from 'react-icons/ci';

export const signIn = async (email, password) => {
    try {
        const response = await axios.post('https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/auth/login',

            {
                email: email,
                password: password,
            },
            {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Kimlik doğrulama başarılı:', response.data.accessToken);
        return response.data.accessToken;
    } catch (error) {
        console.error('Kimlik doğrulama başarısız:', error.response?.data || error.message);
        throw error;
    }

}


export const sendActivationMail = async (email) => {

    try {
        const response = await axios.post("https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/auth/resend-activation",
            {
                email: email,
            },
            {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Activation mail sent successfully:', response.data);
        return response.data.token; // Assuming the token is returned in the response
    }
    catch (error) {
        console.error('Error sending activation mail:', error.response?.data || error.message);
        throw error;
    }
}


export const activateAccount = async (token, password, confirmPassword) => {
    debugger;
    try {
        const response = await axios.post(
            'https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/auth/activate-with-password',
            {
                token: token,
                newPassword: password,
                confirmPassword: confirmPassword
            },
            {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Account activated successfully:', response);
        return response.data;
    } catch (error) {
        console.error('Account activation failed:', error.response?.data || error.message);
        throw error;
    }

}


export const sendResetMail = async (email) => {
    debugger;
    try {
        console.log('Gönderilen email:', email);
        const response = await axios.post("https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/auth/forgot-password",
            {
                email: email,
            },
            {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Reset mail sent successfully:', response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error sending reset mail:', error.response?.data || error.message);
        if (error.response) {
            console.log('Backend hata mesajı:', error.response.data);
        }
        throw error;
    }
}

export const deleteUser = async (token, userId) => {

    try {
        const response = await axios.delete(`https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/user/delete-user/${userId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                },
            }
        );
        console.log('User deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error.response?.data || error.message);
        if (error.response) {
            console.log('Backend hata mesajı:', error.response.data);
        }
    }


}










export const resetPassword = async (token, password, confirmPassword) => {
    debugger;
    try {
        const response = await axios.post("https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/auth/reset-password",
            {
                token: token,
                newPassword: password,
                confirmPassword: confirmPassword
            },
            {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
            }
        )
        console.log('Password reset successful:', response.data);
        return response.data;

    }
    catch (error) {
        console.error('Password reset failed:', error.response?.data || error.message);
        throw error;


    }
}

export const getDepartmentByName = async (name, token) => {
    console.log("Fetching department by name:", name, token);
    try {
        const response = await axios.get(`https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/departments/search?name=${name}`,
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                },
            });
        console.log('Department fetched successfully:', response.data[0]);
        return response.data[0];
    } catch (error) {
        console.error('Error fetching department:', error.response?.data || error.message);
        throw error;
    }
}

export const registerUser = async (token, firstName, surName, email, departmentId, roleId) => {

    try {
        console.log("user", token, firstName, surName, email, departmentId, roleId);
        const response = await axios.post(
            'https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/user/create-user',
            {
                name: firstName,
                surname: surName,
                email: email,
                departmentId: departmentId,
                roleId: roleId,
            }
            ,
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }
        );
        console.log('User registration successful:', response.data);
        return response.data;
    }
    catch (error) {
        console.error('User registration failed:', error.response?.data || error.message);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

export const createCity = async (token, cityName) => {//todo biraz sıkıntılı çünkü id istiyo ve regionsı obje olarak istiyo
    try {
        const response = await axios.post(
            'https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/location/city',
            {
                name: cityName,
            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('City created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('City creation failed:', error.response?.data || error.message);
        throw error;
    }
}

export const createRegion = async (token, cityId, regionName) => {
    try {
        const response = await axios.post(
            'https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/location/region',
            {
                name: regionName,
                cityId: cityId,
            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Region created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Region creation failed:', error.response?.data || error.message);
        throw error;
    }
}

export const createTown = async (token, townName, regionId) => {
    try {
        const response = await axios.post(
            'https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/location/town',
            {
                name: townName,
                regionId: regionId,
            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Town created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Town creation failed:', error.response?.data || error.message);
        throw error;
    }
}

export const updateTown = async (token, townId, townName, regionId) => {
    try {
        console.log("inside updateTown", token, townId, townName, regionId);
        const response = await axios.put(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/location/town/${townId}`,
            {
                name: townName,
                regionId: regionId,
            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('City updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('City update failed:', error.response?.data || error.message);
        throw error;
    }
}

export const updateRegion = async (token, regionName, cityId, regionId) => {
    try {
        console.log("inside updateRegion", token, regionName, cityId, regionId);
        const response = await axios.put(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/location/region/${regionId}`,
            {
                name: regionName,
                cityId: cityId,
            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Region updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Region update failed:', error.response?.data || error.message);
        throw error;
    }
}

export const updateCity = async (token, cityId, cityName) => {//todo bukette henüz yok
    try {
        console.log("inside updateCity", token, cityId, cityName);
        const response = await axios.put(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/location/city/${cityId}`,
            {

                name: cityName,

            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('City updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('City update failed:', error.response?.data || error.message);
        throw error;
    }
}

export const deleteCity = async (token, cityId) => {
    try {
        const response = await axios.delete(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/location/city/${cityId}`,
            {

                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        console.log('City deleted successfully:', response.data);
        return response.data;
        /*
Axios ile veri gönderirken:

POST, PUT, PATCH gibi isteklerde:
axios.post(url, body, config);
body (JSON) doğrudan 2. parametre olarak gönderilir.

Örnek:
axios.post('/api/update', { id: 1, name: 'Test' }, { headers: { ... } });

DELETE isteğinde:
axios.delete(url, { data: body, headers: { ... } });
body (JSON) 'data' anahtarı altında gönderilir, headers da aynı nesne içinde olmalı.

Örnek:
axios.delete('/api/delete', { data: { id: 1 }, headers: { ... } });

Neden böyle?
- HTTPs DELETE metodunda, axios doğrudan body parametresi almaz, bu yüzden 'data' anahtarı ile göndermek gerekir.
- POST/PUT/PATCH isteklerinde ise body doğrudan 2. parametredir.

Kısacası:
- POST/PUT: axios.post(url, body, config)
- DELETE: axios.delete(url, { data: body, headers: { ... } })
*/
    } catch (error) {
        console.error('City deletion failed:', error.response?.data || error.message);
        throw error;
    }
}

export const deleteRegion = async (token, regionId) => {
    try {
        console.log("inside deleteRegion", token, regionId);
        const response = await axios.delete(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/location/region/${regionId}`,
            {
                
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        console.log('Region deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Region deletion failed:', error.response?.data || error.message);
        throw error;
    }
}

export const deleteTown = async (token, townId) => {
    try {
        const response = await axios.delete(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/location/town/${townId}`,
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        console.log('Town deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Town deletion failed:', error.response?.data || error.message);
        throw error;
    }
}

export const updateUser = async (token, userId, firstName, surname, email, departmentId) => {
    try {
        console.log("inside updateUser", token, userId, firstName, surname, email, departmentId);
        const response = await axios.put(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/user/update-user`,
            {
                id: userId,
                name: firstName,
                surname: surname,
                email: email,
                departmentId: departmentId
            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('User updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('User update failed:', error.response?.data || error.message);
        throw error;
    }
}

export const updateUserRole = async (token, userId, role) => {
    try {
        console.log("inside updateUserRole", token, userId, role);
        const response = await axios.put(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/user/update-user-role`,
            {
                userId: userId,
                newRole: role,

            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('User role updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('User role update failed:', error.response?.data || error.message);
        throw error;
    }
}

export const updateUserDepartment = async (token, userId, departmentId) => {
    try {
        const response = await axios.put(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/user/update-user-department`,
            {
                userId: userId,
                newDepartmentId: departmentId,
            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('User department updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('User department update failed:', error.response?.data || error.message);
        throw error;
    }
}


//? YENİ EKLENENLER
export const updateCompany = async (token, companyId, name, shortName, townId, address, typeId, active) => {
    try {
        console.log("inside updateCompany", token, companyId, name, shortName, townId, address, typeId, active);
        const response = await axios.put(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/companies`,
            {
                id: companyId,
                name: name,
                shortName: shortName,
                townId: townId,
                addressDetail: address,
                companyTypeId: typeId,
                active: active
            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Company updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Company update failed:', error.response?.data || error.message);
        throw error;
    }
}

export const createCompany = async (token, name, shortName, townId, address, typeId, active) => {
    try {
        const response = await axios.post(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/companies`,
            {
                name: name,
                shortName: shortName,
                townId: townId,
                addressDetail: address,
                companyTypeId: typeId,
                active: active
            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Company created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Company creation failed:', error.response?.data || error.message);
        throw error;
    }
}

export const deleteCompany = async (token, companyId) => {
    try {
        const response = await axios.delete(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/companies/soft/${companyId}`,
            {

                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        console.log('Company deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Company deletion failed:', error.response?.data || error.message);
        throw error;
    }
}

export const updateDepartment = async (token, departmentId, companyId, name, typeId, townId, address) => {
    try {
        console.log("inside updateDepartment", token, departmentId, companyId, name, typeId, townId, address);
        const response = await axios.put(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/departments`,
            {
                id: departmentId,
                name: name,
                companyId: companyId,
                departmentTypeId: typeId,
                townId: townId,
                addressDetail: address

            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Department updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Department update failed:', error.response?.data || error.message);
        throw error;
    }
}

export const createDepartment = async (token, name, typeId, townId, address, companyId) => {
    try {
        console.log("inside createDepartment", token, name, typeId, townId, address, companyId);
        const response = await axios.post(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/departments`,
            {
                name: name,
                departmentTypeId: typeId,
                townId: townId,
                addressDetail: address,
                companyId: companyId
            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Department created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Department creation failed:', error.response?.data || error.message);
        throw error;
    }
}

export const deleteDepartment = async (token, departmentId) => {
    try {
        const response = await axios.delete(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/departments/soft/${departmentId}`,
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        console.log('Department deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Department deletion failed:', error.response?.data || error.message);
        throw error;
    }
}



export const getRegionsByCity = async (cityId, token) => {
    try {
        const response = await axios.get(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/location/region/by-city/${cityId}`,
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        console.log('Regions fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching regions:', error.response?.data || error.message);
        throw error;
    }
}

export const getTownsByRegion = async (regionId, token) => {
    try {
        const response = await axios.get(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/location/town/by-region/${regionId}`,
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        console.log('Towns fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching towns:', error.response?.data || error.message);
        throw error;
    }
}

export const getDepartmentTypes = async (token) => {
    try {
        const response = await axios.get(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/department-types`,
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        console.log('Department types fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching department types:', error.response?.data || error.message);
        throw error;
    }
}

export const updateDepartmentType = async (token, departmentTypeId, name) => {
    try {
        const response = await axios.put(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/department-types`,
            {
                id: departmentTypeId,
                name: name,
            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Department type updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Department type update failed:', error.response?.data || error.message);
        throw error;
    }
}

export const createDepartmentType = async (token, name) => {
    try {
        const response = await axios.post(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/department-types`,
            {
                name: name,
            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Department type created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Department type creation failed:', error.response?.data || error.message);
        throw error;
    }
}

export const deleteDepartmentType = async (token, departmentTypeId) => {
    try {
        const response = await axios.delete(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/department-types/${departmentTypeId}`,
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        console.log('Department type deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Department type deletion failed:', error.response?.data || error.message);
        throw error;
    }
}


export const getCompanyTypes = async (token) => {
    try {
        const response = await axios.get(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/company-types`,
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,

                },
            }
        );
        console.log('Company types fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching company types:', error.response?.data || error.message);
        throw error;
    }
}


export const updateCompanyType = async (token, companyTypeId, name) => {
    try {
        const response = await axios.put(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/company-types`,
            {
                id: companyTypeId,
                name: name,
            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Company type updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Company type update failed:', error.response?.data || error.message);
        throw error;
    }
}


export const createCompanyType = async (token, name) => {
    try {
        const response = await axios.post(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/company-types`,
            {
                name: name,
            },
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Company type created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Company type creation failed:', error.response?.data || error.message);
        throw error;
    }
}


export const deleteCompanyType = async (token, companyTypeId) => {
    try {
        const response = await axios.delete(
            `https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/company-types/${companyTypeId}`,
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        console.log('Company type deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Company type deletion failed:', error.response?.data || error.message);
        throw error;
    }
}

