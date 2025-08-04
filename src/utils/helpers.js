import { persistor } from '../redux/Store'; // persistGate'i kullanabilmek için
import { logOut } from '../redux/Users';
export const logout = (dispatch,navigate) => {
    // Clear the Redux state and localStorage
    dispatch(logOut()); // kendi slice'ındaki logout action
    persistor.purge();  // localStorage'daki persist edilen veriyi siler
    navigate('/'); // Redirect to home page after logout
};
    