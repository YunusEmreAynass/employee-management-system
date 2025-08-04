import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { GiCompanionCube } from 'react-icons/gi'

const initialState = {
    user: [], 
    token: null, 
    userSelf: {},  
    loading: false, 
    departments: [],
    userType: null, 
    isAdmin: false, 
    filteredUsers: [],
    filterMessage: '',
    selectedLang: 'En', 
    roles: ['ADMIN', 'MANAGER', 'USER'], // Örnek roller, gerçek uygulamada API'den alınabilir
    companies: [], 
    filteredElements: [], 
    cities: [], 
    departmentTypes: [],
    companyTypes: [],
 
    /**
     * loading özelliği, fetchUserById asenkron isteğinin şu anda devam edip etmediğini belirtir.
     * true olduğunda, veriler çekiliyor (yükleniyor) anlamına gelir.
     * false olduğunda, istek tamamlanmış (başarılı veya başarısız) demektir.
     * Bu özellik, kullanıcı arayüzünde yükleme durumunu göstermek için kullanılabilir.
     * Örneğin, veriler yüklenirken bir yükleme animasyonu göstermek için kullanılabilir.
     */
}
export const getAllUsers = createAsyncThunk(
    
    'users',
    async (token) => {
        try {

            const response = await axios.get('https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/user/get-users-of-detailed',
                

                {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${token}`

                    },
                }
            );

            console.log('Users fetched successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Kimlik doğrulama başarısız:', error.response?.data || error.message);
            throw error;
        }

    },
)
export const getAllDepartments = createAsyncThunk(
    'departments',
    async (token) => {
        try {
            const response = await axios.get(
                'https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/departments',
                {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );

            console.log('Departments fetched successfully:', response.data);
            return response.data; // Assuming the departments are returned in the response
        } catch (error) {
            console.error('Error fetching departments:', error.response?.data || error.message);
            throw error;
        }
    }
);
export const getAllCompanies = createAsyncThunk(
    'companies',
    async (token) => {
        try {
            const response = await axios.get(
                'https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/companies',
                {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );

            console.log('Companies fetched successfully:', response.data);
            return response.data; // Assuming the companies are returned in the response
        } catch (error) {
            console.error('Error fetching companies:', error.response?.data || error.message);
            throw error;
        }
    }
);

export const getUserSelf= createAsyncThunk(
    'users/getUserSelf',
    async (token) => {
        try {
            const response = await axios.get(
                'https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/user/get-self',
                {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );

            console.log('User data fetched successfully:', response.data);
            return response.data; // Assuming the user data is returned in the response
           
        } catch (error) {
            console.error('Error fetching user role:', error.response?.data || error.message);
            throw error;
        }
    }
);

export const getAllCities= createAsyncThunk(
    'cities',
    async (token) => {
        try {
            const response = await axios.get(
                'https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/location/city',
                {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );

            console.log('Cities fetched successfully:', response.data);
            return response.data; // Assuming the cities are returned in the response
        } catch (error) {
            console.error('Error fetching cities:', error.response?.data || error.message);
            throw error;
        }
    }
);

export const getAllDepartmentTypes = createAsyncThunk(
    'departmentTypes',
    async (token) => {
        try {
            const response = await axios.get(
                'https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/department-types',
                {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );

            console.log('Department types fetched successfully:', response.data);
            return response.data; // Assuming the department types are returned in the response
        } catch (error) {
            console.error('Error fetching department types:', error.response?.data || error.message);
            throw error;
        }
    }
);

export const getAllCompanyTypes = createAsyncThunk(
    'companyTypes',
    async (token) => {
        try {
            const response = await axios.get(
                'https://organizationbackendenv-env-2.eba-ye3jwmbt.us-east-1.elasticbeanstalk.com/api/company-types',
                {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );

            console.log('Company types fetched successfully:', response.data);
            return response.data; // Assuming the company types are returned in the response
        } catch (error) {
            console.error('Error fetching company types:', error.response?.data || error.message);
            throw error;
        }
    }
);


export const userSlice = createSlice({
    
    name: 'users', //slice'ımızın ismi
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            
        },
        logOut: (state) => {
            state.token = '';
            state.userSelf = {};
            state.user = [];
            state.userType = '';
            state.isAdmin = false;
            state.departments = [];
            state.loading = false;
            state.filteredUsers = [];
            state.filterMessage = '';
            state.selectedLang = 'En'; // Reset selected language on logout
            state.roles = ['Admin', 'Manager', 'User']; // Reset roles to default
            state.filteredElements = []; // Reset filtered elements
            state.companies = []; // Reset companies
            state.cities = []; // Reset cities
            state.departmentTypes = []; // Reset department types
            state.companyTypes = []; // Reset company types


            // Eğer persistor kullanıyorsanız, burada persistor.purge() çağrısı yapabilirsiniz
            // persistor.purge(); // localStorage'daki persist edilen veriyi siler
        },
        setFilteredUsers: (state, action) => {
            state.filteredUsers = action.payload; // Filtrelenmiş kullanıcıları state'e kaydet
        },
        setFilterMessage: (state, action) => {
            state.filterMessage = action.payload; // Filtre mesajını state'e kaydet
        },
        setLang: (state, action) => {
            state.selectedLang = action.payload; // Dil seçimini state'e kaydet
        },
        setFilteredElements: (state, action) => {
            state.filteredElements = action.payload; // Filtrelenmiş elemanları state'e kaydet
        },
        resetRegions: (state) => {
            state.regions = []; // Reset regions to an empty array
        },
        resetTowns: (state) => {
            state.towns = []; // Reset towns to an empty array
        }



        

    },
    extraReducers: (builder) => {
        
        builder
            .addCase(getAllUsers.pending, (state) => { // İstek gönderildiğinde
                state.loading = true; // Loading state when the request is pending

            })
            .addCase(getAllUsers.fulfilled, (state, action) => { //başarılı bir şekilde veriler alındığında
                state.loading = false; // Loading state when the request is fulfilled
                state.user = action.payload; // Store the fetched users in the state
                // Store the roles in the state
                console.log('Fetched users:', action.payload); // Log the fetched users
            })
            .addCase(getAllUsers.rejected, (state) => { // İstek reddedildiğinde
                state.loading = false; // Loading state when the request is rejected
            })
            .addCase(getUserSelf.pending, (state) => { // İstek gönderildiğinde
                state.loading = true; // Loading state when the request is pending
            })
            .addCase(getUserSelf.fulfilled, (state, action) => { //başarılı bir şekilde veriler alındığında
                state.loading = false; // Loading state when the request is fulfilled
                state.userSelf = action.payload; // Store the fetched user self in the state
                state.userType = action.payload.role.name; // Store the user type in the state
                state.isAdmin = action.payload.role.name === 'ADMIN'; // Set isAdmin based on user type
                console.log('User type set:', state.userType); // Log the user type
                console.log('Fetched user self:', action.payload); // Log the fetched user self
            })
            .addCase(getUserSelf.rejected, (state) => { // İstek reddedildiğinde
                state.loading = false; // Loading state when the request is rejected
            })
            .addCase(getAllDepartments.pending, (state) => { // İstek gönderildiğinde
                state.loading = true; // Loading state when the request is pending
            })
            .addCase(getAllDepartments.fulfilled, (state, action) => { //başarılı bir şekilde veriler alındığında
                state.loading = false; // Loading state when the request is fulfilled
                state.departments = action.payload; // Store the fetched departments in the state
                console.log('Fetched departments:', action.payload); // Log the fetched departments
            })
            .addCase(getAllDepartments.rejected, (state) => { // İstek reddedildiğinde
                state.loading = false; // Loading state when the request is rejected
            })
            .addCase(getAllCompanies.pending, (state) => { // İstek gönderildiğinde
                state.loading = true; // Loading state when the request is pending
            })
            .addCase(getAllCompanies.fulfilled, (state, action) => { //başarılı bir şekilde veriler alındığında
                state.loading = false; // Loading state when the request is fulfilled
                state.companies = action.payload; // Store the fetched companies in the state
                console.log('Fetched companies:', action.payload); // Log the fetched companies
            })
            .addCase(getAllCompanies.rejected, (state) => { // İstek reddedildiğinde
                state.loading = false; // Loading state when the request is rejected
            })
            .addCase(getAllCities.pending, (state) => { // İstek gönderildiğinde
                state.loading = true; // Loading state when the request is pending
            })
            .addCase(getAllCities.fulfilled, (state, action) => { //başarılı bir şekilde veriler alındığında
                state.loading = false; // Loading state when the request is fulfilled
                state.cities = action.payload; // Store the fetched cities in the state
                console.log('Fetched cities:', action.payload); // Log the fetched cities
            })
            .addCase(getAllCities.rejected, (state) => { // İstek reddedildiğinde
                state.loading = false; // Loading state when the request is rejected
            })
            .addCase(getAllDepartmentTypes.pending, (state) => { // İstek gönderildiğinde
                state.loading = true; // Loading state when the request is pending
            })
            .addCase(getAllDepartmentTypes.fulfilled, (state, action) => { //başarılı bir şekilde veriler alındığında
                state.loading = false; // Loading state when the request is fulfilled
                state.departmentTypes = action.payload; // Store the fetched department types in the state
                console.log('Fetched department types:', action.payload); // Log the fetched department types
            })
            .addCase(getAllDepartmentTypes.rejected, (state) => { // İstek reddedildiğinde
                state.loading = false; // Loading state when the request is rejected    
            })
            .addCase(getAllCompanyTypes.pending, (state) => { // İstek gönderildiğinde
                state.loading = true; // Loading state when the request is pending
            })
            .addCase(getAllCompanyTypes.fulfilled, (state, action) => { //başarılı bir şekilde veriler alındığında
                state.loading = false; // Loading state when the request is fulfilled
                state.companyTypes = action.payload; // Store the fetched company types in the state
                console.log('Fetched company types:', action.payload); // Log the fetched company types
            })
            .addCase(getAllCompanyTypes.rejected, (state) => { // İstek reddedildiğinde
                state.loading = false; // Loading state when the request is rejected
            });
    }
})

// Action creators are generated for each case reducer function
export const {setToken,logOut,setFilteredUsers,setFilterMessage,setLang,setFilteredElements} = userSlice.actions

export default userSlice.reducer