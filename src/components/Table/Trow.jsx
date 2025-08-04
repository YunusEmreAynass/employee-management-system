 import { CiEdit } from "react-icons/ci";
import '../../css/users.css';
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useDispatch } from "react-redux";
import {  getAllCities, getAllUsers, getAllCompanies, getAllDepartments,getAllCompanyTypes,getAllDepartmentTypes } from "../../redux/Users";
import {  useState } from 'react';
import { ImCross } from "react-icons/im";
import { createRegion, createTown, updateRegion, updateTown, deleteCity, deleteTown, deleteRegion, deleteUser, deleteCompany, deleteDepartment, getRegionsByCity, getTownsByRegion,deleteCompanyType,deleteDepartmentType} from "../../services/api";
import MyAlert from "../MyAlert";


function Trow({ element, t, headers, path, type, tableData,setIsElementUpdated,setElementName,setUpdatedElementId,setIsElementCreated ,setMessage}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.users.token);
    const userType = useSelector((state) => state.users.userType);
    const [regionElements, setRegionElements] = useState({});
    const [townElements, setTownElements] = useState({});
    const [messageTown, setMessageTown] = useState({
        "deleted": "",
        "created": "",
        "updated": "",
        "deletedFailed": "",
        "createdFailed": "",
        "updatedFailed": ""
    });
    const [messageRegion, setMessageRegion] = useState({
        "deleted": "",
        "created": "",
        "updated": "",
        "deletedFailed": "",
        "createdFailed": "",
        "updatedFailed": ""
    });
    const [regionName, setRegionName] = useState('');
    const [townName, setTownName] = useState('');
    const [updatedRegionId, setUpdatedRegionId] = useState(null);
    const [updatedTownId, setUpdatedTownId] = useState(null);
    const [isRegionCreated, setIsRegionCreated] = useState(false);
    const [isTownCreated, setIsTownCreated] = useState(false);
    const [isRegionUpdated, setIsRegionUpdated] = useState(false);
    const [isTownUpdated, setIsTownUpdated] = useState(false);
  



    function getNestedValue(obj, keys) {
        const value = keys.reduce((acc, key) => acc && acc[key], obj);
        return value;
    }
    const handleDeleteDepartment = async (departmentId) => {
        try {
            await deleteDepartment(token, departmentId);
            await dispatch(getAllDepartments(token)); // Refresh the departments list
            setMessage(prev => ({ ...prev, deleted: t("department.message.successDelete") }));
        } catch (error) {
            setMessage(prev => ({ ...prev, deletedError: t("department.message.errorDelete") }));
            console.error('Error deleting department:', error);
        }
    };






    const handleDeleteCity = async (cityId) => {
        try {
            await deleteCity(token, cityId);
            await dispatch(getAllCities(token)); // Refresh the cities list
            setMessage(prev => ({ ...prev, deleted: t("createForms.cityDeleted") }));
        } catch (error) {
            setMessage(prev => ({ ...prev, deletedError: t("createForms.cityDeletionFailed") }));
            console.error('Error deleting city:', error);
        }
    };
    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(token, userId);
            await dispatch(getAllUsers(token)); // Refresh the users list
            setMessage(prev => ({ ...prev, deleted: t("dashboard.message.user.deleteSuccess") }));

        } catch (error) {
            setMessage(prev => ({ ...prev, deletedError: t("dashboard.message.user.deleteError") }));
            console.error('Error deleting user:', error);
        }
    };


    const handleDeleteCompany = async (companyId) => {
        try {
            await deleteCompany(token, companyId);
            await dispatch(getAllCompanies(token)); // Refresh the companies list
            setMessage(prev => ({ ...prev, deleted: t("dashboard.message.company.success") }));

        } catch (error) {
            setMessage(prev => ({ ...prev, deletedError: t("dashboard.message.company.error") }));
            console.error('Error deleting company:', error);
        }
    };

    const handleDeleteRegion = async (regionId) => {
        try {
            await deleteRegion(token, regionId);
            const regions = await getRegionsByCity(element.id, token);//güncel region listesini alıp objede güncelleme yapıyoruz bekletmemizin sebebi çektiğimizden emin olduktan sonra objeye eklemek
            setRegionElements(prev => ({
                ...prev,
                [element.id]: { show: true, regions: [...regions] }
            }));
            setMessageRegion(prev => ({
                ...prev,
                deleted: t("createForms.regionDeleted")
            }));
        } catch (error) {
            setMessageRegion(prev => ({
                ...prev,
                deletedFailed: t("createForms.regionDeletionFailed")
            }));
            console.error('Error deleting region:', error);
        }
    };

    const handleDeleteTown = async (townId, regionId) => {
        try {
            await deleteTown(token, townId);
            const towns = await getTownsByRegion(regionId,  token);
            setTownElements(prev => ({
                ...prev,
                [regionId]: { show: true, towns: [...towns] }
            }));
            setMessageTown(prev => ({
                ...prev,
                deleted: t("createForms.townDeleted"),
            }));
        } catch (error) {
            setMessageTown(prev => ({
                ...prev,
                deletedFailed: t("createForms.townDeletionFailed"),
            }));
            console.error('Error deleting town:', error);
        }
    };

    const handleDeleteDepartmentType = async (departmentTypeId) => {
        try {
            await deleteDepartmentType(token, departmentTypeId);//bekletmemizin sebebi silindiğinden emin olduktan sonra güncel listeyi çekmek
            await dispatch(getAllDepartmentTypes(token)); // Refresh the department types list
            setMessage(prev => ({ ...prev, deleted: t("departmentTypes.message.successDelete") }));
        } catch (error) {
            setMessage(prev => ({ ...prev, deletedError: t("departmentTypes.message.errorDelete") }));
            console.error('Error deleting department type:', error);
        }
    };

    const handleDeleteCompanyType = async (companyTypeId) => {
        try {
            await deleteCompanyType(token, companyTypeId);
            await dispatch(getAllCompanyTypes(token)); // Refresh the company types list
            setMessage(prev => ({ ...prev, deleted: t("companyTypes.message.successDelete") }));
        } catch (error) {
            setMessage(prev => ({ ...prev, deletedError: t("companyTypes.message.errorDelete") }));
            console.error('Error deleting company type:', error);
        }
    };

    const handleCreateRegion = async (e) => {
        e.preventDefault();
        setMessageRegion(prev => ({
            ...prev,
            created: "",
            deleted: "",
            updated: "",
            createdFailed: "",
            deletedFailed: "",
            updatedFailed: ""
        })); // Clear any previous messages

        try {
            await createRegion(token, element.id, regionName);
            setRegionName(''); // Clear the input field
            const cityId = element.id;
            const regions = await getRegionsByCity(cityId, token);
            setRegionElements(prev => ({
                ...prev,
                [cityId]: { show: true, regions: [...regions] }
            }));
            setMessageRegion(prev => ({
                ...prev,
                created: t("createForms.regionCreated")
            }));
        } catch (error) {
            console.error('Region creation failed:', error);
            setMessageRegion(prev => ({
                ...prev,
                createdFailed: t("createForms.regionCreationFailed")
            }));
        }
    }

    const handleCreateTown = async (e, regionId) => {
        e.preventDefault(); 
        setMessageTown(prev => ({
            ...prev,
            created: "",
            deleted: "",
            updated: "",
            createdFailed: "",
            deletedFailed: "",
            updatedFailed: ""
        })); // Clear any previous messages
        try {
            await createTown(token, townName, regionId);
            setTownName(''); // Clear the input field
            const towns = await getTownsByRegion(regionId, token);
            setTownElements(prev => ({
                ...prev,
                [regionId]: { show: true, towns: [...towns] }
            }));
            setMessageTown(prev => ({
                ...prev,
                created: t("createForms.townCreated")
            })); // Clear any previous messages
        } catch (error) {
            console.error('Town creation failed:', error);
            setMessageTown(prev => ({
                ...prev,
                createdFailed: t("createForms.townCreationFailed")
            }));
        }
    }

    const handleUpdateRegion = async (e) => {
        e.preventDefault();
        setMessageRegion(prev => ({
            ...prev,
            updated: "",
            updatedFailed: "",
            created: "",
            createdFailed: "",
            deleted: "",
            deletedFailed: ""
        })); // Clear any previous messages
        try {
            await updateRegion(token, regionName, element.id, updatedRegionId);
            setRegionName(''); // Clear the input field
            const cityId = element.id;
            const regions = await getRegionsByCity(cityId, token);
            setRegionElements(prev => ({
                ...prev,
                [cityId]: { show: true, regions: [...regions] }
            }));
            setMessageRegion(prev => ({
                ...prev,
                updated: t("createForms.regionUpdated")
            })); // Clear any previous messages
        } catch (error) {
            setMessageRegion(prev => ({
                ...prev,
                updatedFailed: t("createForms.regionUpdateFailed")
            }));
            console.error('Region update failed:', error);
            
        }
    }

    const handleUpdateTown = async (e, regionId) => {
        e.preventDefault();
        setMessageTown(prev => ({
            ...prev,
            updated: "",
            updatedFailed: "",
            created: "",
            createdFailed: "",
            deleted: "",
            deletedFailed: ""
        })); // Clear any previous messages
        try {
            await updateTown(token, updatedTownId, townName, regionId);
            setTownName(''); // Clear the input field
            const towns = await getTownsByRegion(regionId,  token);
            setTownElements(prev => ({
                ...prev,
                [regionId]: { show: true, towns: [...towns] }
            }));
            setMessageTown(prev => ({
                ...prev,
                updated: t("createForms.townUpdated")
            })); // Clear any previous messages
        } catch (error) {
            console.error('Town update failed:', error);
            setMessageTown(prev => ({
                ...prev,
                updatedFailed: t("createForms.townUpdateFailed")
            }));
        }
    }

    const getRegionForm = () => {
        
        return (
            <>

                <form >
                    <div className='close' onClick={() => { setIsRegionCreated(false); setMessageRegion(prev => ({ ...prev, created: "", createdFailed: "", updated: "", updatedFailed: "", deleted: "", deletedFailed: "" })); setRegionName(''); setIsRegionUpdated(false); setUpdatedRegionId(null); }}>
                        <ImCross />
                    </div>
                    <div>
                        <label htmlFor="regionName">{t("createForms.regionName") + ":"}</label>
                        <input type="text" id="regionName" name="regionName" placeholder={t("createForms.regionNamePlaceholder")} value={regionName} onChange={(e) => setRegionName(e.target.value)} required />
                    </div>
                    {(messageRegion.updated || messageRegion.created) &&
                        <MyAlert message={messageRegion.updated || messageRegion.created} whichAlert={"success"} />
                    }
                    {(messageRegion.updatedFailed || messageRegion.createdFailed) && (
                        <MyAlert message={messageRegion.updatedFailed || messageRegion.createdFailed} whichAlert={"danger"} />
                    )}
                    {isRegionUpdated ? 
                        <button onClick={(e) => handleUpdateRegion(e)}>{t("createForms.buttonUpdateRegion")}</button> :
                        <button onClick={(e) => handleCreateRegion(e)}>{t("createForms.buttonRegion")}</button>}
                </form>
            </>
        );
    }

    const getTownForm = (regionId) => {
        
        return (
            <>

                <form >
                    <div className='close' onClick={() => { setIsTownCreated(false); setMessageTown(prev => ({ ...prev, created: "", createdFailed: "", updated: "", updatedFailed: "", deleted: "", deletedFailed: "" })); setTownName(''); setIsTownUpdated(false); setUpdatedTownId(null); }}>
                        <ImCross />
                    </div>
                    <div>
                        <label htmlFor="townName">{t("createForms.townName") + ":"}</label>
                        <input type="text" id="townName" name="townName" placeholder={t("createForms.townNamePlaceholder")} value={townName} onChange={(e) => setTownName(e.target.value)} required />
                    </div>
                    {(messageTown.updated || messageTown.created) &&
                        <MyAlert message={messageTown.updated || messageTown.created} whichAlert={"success"} />
                    }
                    {(messageTown.updatedFailed || messageTown.createdFailed) && (
                        <MyAlert message={messageTown.updatedFailed || messageTown.createdFailed} whichAlert={"danger"} />
                    )}
                    {isTownUpdated ?
                        <button onClick={(e) => handleUpdateTown(e, regionId)}>{t("createForms.buttonUpdateTown")}</button> :
                        <button onClick={(e) => handleCreateTown(e, regionId)}>{t   ("createForms.buttonTown")}</button>}
                </form>
            </>
        );
    }

    

    const getTableHeader = (type) => {//regions ve towns için tableheader döndürür
        return (
            <thead className={type === "regions" ? "regions-thead" : "towns-thead"}>
                <tr>
                    {Object.values(tableData).map((header, index) => {
                        let boundIndex = 3;
                        return (
                            (index <= boundIndex) ? ( // Adjusted to match the header count

                                (index == 2 && type === "towns") ? null ://towns tableında locations kolonu olmadığı için ternary operatör ile null döndürüyoruz
                                    <th key={index} >
                                        <div className='header' >
                                            {header}
                                        </div>
                                    </th>
                            ) : null
                        );
                    })}



                </tr>
            </thead>
        )
    }

    const getTownsLayout = (towns, regionId) => {

        if (towns.length > 0) {

            return (
                <>
                    <tr>
                        <td className="towns" colSpan={4}>
                            <div className="town-title">
                                <h1>{tableData["titleTown"]}</h1>
                            </div>
                            <table className="towns-table">
                                {getTableHeader("towns")}
                                <tbody>
                                    {towns.length > 0 && towns.map((town) => (
                                        <>
                                        <tr key={town.id}>
                                            <td>{town.id}</td>
                                            <td>{town.name}</td>
                                            <td>
                                                    <button onClick={(e) => { 
                                                        e.preventDefault(); setIsTownUpdated(true); setTownName(town.name); setUpdatedTownId(town.id); setMessage(''); setIsRegionCreated(false); setIsTownCreated(false); setIsRegionUpdated(false); setMessageRegion(prev => ({ ...prev, created: "", createdFailed: "", updated: "", updatedFailed: "", deleted: "", deletedFailed: "" })); setMessageTown(prev => ({ ...prev, created: "", createdFailed: "", updated: "", updatedFailed: "", deleted: "", deletedFailed: "" }));
                                                         isTownCreated(false);
                                                 }}><CiEdit /></button>
                                                <button onClick={() => { handleDeleteTown(town.id, regionId); }}><AiOutlineDelete /></button>
                                            </td>
                                        </tr>
                                        {isTownUpdated && town.id === updatedTownId && (
                                            <tr>
                                                <td colSpan={4} className='add-town-form'>
                                                    {getTownForm(regionId)}
                                                </td>
                                                <td style={{ display: 'none' }}></td>
                                            </tr>
                                            )}
                                        </>
                                    ))}
                                    {messageTown.deleted &&
                                        <tr>
                                            <td colSpan={4} className='message'><MyAlert message={messageTown.deleted} whichAlert={"success"} /></td>
                                            <td style={{ display: 'none' }}></td>
                                        </tr>
                                    }
                                    {messageTown.deletedFailed &&
                                        <tr>
                                            <td colSpan={4} className='message'><MyAlert message={messageTown.deletedFailed} whichAlert={"danger"} /></td>
                                            <td style={{ display: 'none' }}></td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </td>
                        <td style={{ display: 'none' }}></td>
                    </tr>
                   
                    {isTownCreated && <tr>
                        <td colSpan={4} className='add-town-form'>
                            {getTownForm(regionId)}
                        </td>
                        <td style={{ display: 'none' }}></td>
                    </tr>}
                    <tr>
                        <td colSpan={4} className='add-town-button'>
                            <div >
                                <button onClick={() => 
                                { setIsTownCreated(true); setMessage(''); setIsRegionCreated(false); setIsRegionUpdated(false); setTownName(''); setUpdatedTownId(null); setMessageRegion(prev => ({ ...prev, created: "", createdFailed: "", updated: "", updatedFailed: "", deleted: "", deletedFailed: "" })); setMessageTown(prev => ({ ...prev, created: "", createdFailed: "", updated: "", updatedFailed: "", deleted: "", deletedFailed: "" })); setElementName(''); setUpdatedElementId(null); setIsTownUpdated(false);  }
                                }>{tableData["buttonTown"]}</button>
                            </div>
                        </td>
                        <td style={{ display: 'none' }}></td>
                    </tr>
                </>
            )
        }
        else{//hiç town yoksa ekleme butonunu gösteriyoruz
            return (
                <>
                    {isTownCreated && <tr>
                        <td colSpan={4} className='add-town-form'>
                            {getTownForm(regionId)}
                        </td>
                        <td style={{ display: 'none' }}></td>
                    </tr>}
                    <tr>
                        <td colSpan={4} className='add-town-button'>
                            <div >
                                <button onClick={() => { setIsTownCreated(true); setMessage(''); setIsRegionCreated(false); setIsRegionUpdated(false); setTownName(''); setUpdatedTownId(null); setMessageRegion(prev => ({ ...prev, created: "", createdFailed: "", updated: "", updatedFailed: "", deleted: "", deletedFailed: "" })); setMessageTown(prev => ({ ...prev, created: "", createdFailed: "", updated: "", updatedFailed: "", deleted: "", deletedFailed: "" })); }}>{tableData["buttonTown"]}</button>
                            </div>
                        </td>
                        <td style={{ display: 'none' }}></td>
                    </tr>

                </>
            );
        }
    }

    const getRegionLayout = (regions) => {
        if (regions.length > 0) {
            return (
                <>
                    <tr>
                        <td colSpan={4} className="regions">
                            <div className="region-title">
                                <h1>{tableData["titleRegion"]}</h1>
                            </div>
                            <table className="regions-table">
                                {getTableHeader("regions")}
                                <tbody>

                                    {regions.map((region) => (
                                        <>
                                            <tr key={region.id}>
                                                <td>{region.id}</td>
                                                <td>{region.name}</td>



                                                <td>
                                                    <button onClick={e => {
                                                        getTowns(e, region.id); 
                                                        setMessageRegion(prev => ({ ...prev, created: "", createdFailed: "", updated: "", updatedFailed: "", deleted: "", deletedFailed: "" }));
                                                        setMessageTown(prev => ({ ...prev, created: "", createdFailed: "", updated: "", updatedFailed: "", deleted: "", deletedFailed: "" }));
                                                    }} className="location">
                                                        {t("cities.locations.town")} {townElements[region.id]?.show ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                                                    </button>
                                                </td>

                                                <td>
                                                    <button onClick={(e) => { e.preventDefault(); setIsRegionUpdated(true); setRegionName(region.name); setUpdatedRegionId(region.id); setMessage(''); setIsRegionCreated(false); setIsTownCreated(false); setIsTownUpdated(false); setMessageRegion(prev => ({ ...prev, created: "", createdFailed: "", updated: "", updatedFailed: "", deleted: "", deletedFailed: "" })); setMessageTown(prev => ({ ...prev, created: "", createdFailed: "", updated: "", updatedFailed: "", deleted: "", deletedFailed: "" })); setIsRegionCreated(false); }} ><CiEdit /></button>
                                                    <button onClick={() => { handleDeleteRegion(region.id);setMessageRegion(prev => ({ ...prev, created: "", createdFailed: "", updated: "", updatedFailed: "", deleted: "", deletedFailed: "" })); setMessageTown(prev => ({ ...prev, created: "", createdFailed: "", updated: "", updatedFailed: "", deleted: "", deletedFailed: "" })); }}><AiOutlineDelete /></button>
                                                </td>

                                            </tr>
                                            {isRegionUpdated && region.id === updatedRegionId && 
                                                <tr>
                                                    <td colSpan={4} className='add-region-form'>
                                                        {getRegionForm()}
                                                    </td>
                                                    <td style={{ display: 'none' }}></td>
                                                </tr>
                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                            }
                                            {townElements[region.id]?.show &&
                                            getTownsLayout(townElements[region.id]?.towns, region.id)}





                                        </>
                                    ))}
                                    {messageRegion.deleted &&
                                        <tr>
                                            <td colSpan={4} className='message'><MyAlert message={messageRegion.deleted} whichAlert={"success"} /></td>
                                            <td style={{ display: 'none' }}></td>
                                        </tr>}
                                    {messageRegion.deletedFailed &&
                                        <tr>
                                            <td colSpan={4} className='message'><MyAlert message={messageRegion.deletedFailed} whichAlert={"danger"} /></td>
                                            <td style={{ display: 'none' }}></td>
                                        </tr>}
                                    <tr>
                                        <td colSpan={4} className='add-region-button'>
                                            <div >
                                                <button onClick={(e) => {
                                                    e.preventDefault(); setIsRegionCreated(true); setIsRegionUpdated(false);
                                                    setRegionName(''); setUpdatedRegionId(null); setMessage('');
                                                    setIsTownCreated(false); setIsTownUpdated(false); 
                                                }}>{tableData["buttonRegion"]}</button>
                                            </div>
                                        </td>
                                        <td style={{ display: 'none' }}></td>
                                    </tr>

                                </tbody>

                            </table>
                        </td>
                        <td style={{ display: 'none' }}></td>
                    </tr>
                   



                    {isRegionCreated && <tr>
                        <td colSpan={4} className='add-region-form'>
                            {getRegionForm()}
                        </td>
                        <td style={{ display: 'none' }}></td>
                    </tr>}
                    
                </>
            )
        }
        else {//eğer hiç region yoksa ekleme butonunu gösteriyoruz
            return (
            <>
                { isRegionCreated && <tr>
                    <td colSpan={4} className='add-region-form'>
                        {getRegionForm()}
                    </td>
                    <td style={{ display: 'none' }}></td>
                </tr>}
                <tr>
                    <td colSpan={4} className='add-region-button'>
                        <div >
                            <button onClick={(e) => {
                                e.preventDefault(); setIsRegionCreated(true); setIsRegionUpdated(false);
                                setRegionName(''); setUpdatedRegionId(null); setMessage('');
                                setIsTownCreated(false); setIsTownUpdated(false);
                            }}>{tableData["buttonRegion"]}</button>
                        </div>
                    </td>
                    <td style={{ display: 'none' }}></td>
                </tr>
                </>
            )
        }

    }


    const getRegions = async (e) => {
        e.preventDefault();
        const cityId = element.id;
        if (regionElements[cityId]?.show) {//eğer regionlar gösteriliyorsa ve butona tıklanırsa, regionları gizle
            setRegionElements(prev => ({ ...prev, [cityId]: { ...prev[cityId], show: false } }));
        } else {// eğer regionlar gizleniyorsa ve butona tıklanırsa, regionları çek ve regionları göster
            const regions = await getRegionsByCity(cityId, token);
            setRegionElements(prev => ({
                ...prev,
                [cityId]: { show: true, regions: [...regions] }
            }));
        }

    }


    const getTowns = async (e, regionId) => {
        e.preventDefault();
        if (townElements[regionId]?.show) {
            setTownElements(prev => ({ ...prev, [regionId]: { ...prev[regionId], show: false } }));
        } else {
            const towns = await getTownsByRegion(regionId, token);
            setTownElements(prev => ({
                ...prev,
                [regionId]: { show: true, towns: [...towns] }
            }));
        }
    }








    return (
        <>
            <tr className={(type==="users"||type==="companies"||type==="departments")&& element.deletedAt ? 'deleted' : ''}>

                {Object.keys(headers).map((key, index) => {
                    const { headerPath, translator } = headers[key];
                    if (headerPath === 'active')
                        // Eğer
                        return (
                            <td key={index}>
                                {element.active ? t("dashboard.activations.active") : t("dashboard.activations.inactive")}
                            </td>
                        );
                    return (
                        <td key={index}>
                            {Array.isArray(headerPath)//eğer headerPath bir dizi ise iç içe bir yapı olduğu için reduce ile değerini alıyoruz
                                ? (translator ? t(translator + getNestedValue(element, headerPath),{defaultValue:getNestedValue(element,headerPath)}) : getNestedValue(element, headerPath))
                                : (translator ? t(translator + element[headerPath],{defaultValue:element[headerPath]}) : element[headerPath])}{/* eğer translator'ı varsa ona göre değerini çek ve burda default değeri de kullandık çünkü eğerki dil dosyalarına eklenmemişse direk o değeri alsın*/}
                        </td>
                    );
                })}
                {type === "cities" &&//type'ı cities ise locations butonunu göster

                    <td>
                        <button onClick={e => { getRegions(e); setMessage(''); setMessageRegion(prev => ({ ...prev, created: "", createdFailed: "", updated: "", updatedFailed: "", deleted: "", deletedFailed: "" })); setMessageTown(prev => ({ ...prev, created: "", createdFailed: "", updated: "", updatedFailed: "", deleted: "", deletedFailed: "" })); }} className="location">
                            {t("cities.locations.region")} {regionElements[element.id]?.show ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                        </button>
                    </td>


                }



                <td>
                    <button onClick={(e) => {
                        e.preventDefault(); 
                        if (type === "cities" || type==="departmentTypes"|| type==="companyTypes")//türü bunlardan biri ise farklı bir sayfaya yönlendirmiyoruz çünkü formları aynı sayfada açılıyor ztn
                        {
                            setIsElementUpdated(true); setElementName(element.name); setUpdatedElementId(element.id); setMessage(''); setIsElementCreated(false); 
                        }
                        else {
                            navigate("/"+path + '?id=' + element.id);//değilse ayrı bir sayfaya yönlendiriyoruz
                        }


                    }} disabled={element.deletedAt ? true : false || ((type === 'departments' || type === 'companies' || type === 'departmentTypes' || type === 'companyTypes') && userType === 'MANAGER')} ><CiEdit /></button>{/* eğer element silinmişse butonları devre dışı bırakıyoruz ve manager ise butonları devre dışı bırakıyoruz  çünkü managerın bunları düzenlemesine izin vermiyoruz */}
                    <button onClick={() => {
                        if (type === "cities") {
                            handleDeleteCity(element.id);
                        }
                        else if (type === "companies") {
                            handleDeleteCompany(element.id);    
                            
                        }
                        else if (type === "departments") {
                            handleDeleteDepartment(element.id);
                        }
                        else if (type === "users") {
                            handleDeleteUser(element.id);
                        }
                        else if (type === "departmentTypes") {
                            handleDeleteDepartmentType(element.id);
                        }
                        else if (type === "companyTypes") {
                            handleDeleteCompanyType(element.id);
                        }

                    }} disabled={element.deletedAt ? true : false || ((type === 'departments' || type === 'companies' || type === 'departmentTypes' || type === 'companyTypes') && userType === 'MANAGER')}><AiOutlineDelete /></button>
                </td>
            </tr>
            
            {regionElements[element.id]?.show && getRegionLayout(regionElements[element.id]?.regions)}{/* regionElements objesinde o elementin id'si varsa ve show true ise getRegionLayout fonksiyonunu çağırıyoruz ki regionları ekranda gösterelim*/}
        </>
    )
}

export default Trow