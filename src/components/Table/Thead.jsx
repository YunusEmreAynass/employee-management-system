import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../css/users.css'
import { GrChapterPrevious, GrChapterNext } from "react-icons/gr";
import Filters from '../Filters';
import { IoMdSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { getAllCities, setFilteredUsers, setFilterMessage, setFilteredElements, getAllCompanyTypes, getAllDepartmentTypes } from '../../redux/Users';
import { FaSortAmountUpAlt, FaSortAmountDown } from "react-icons/fa";
import { TiArrowUnsorted } from "react-icons/ti";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Trow from './Trow';
import { createCity, updateCity, createDepartmentType, updateDepartmentType, createCompanyType, updateCompanyType } from '../../services/api'; // Assuming you have a service to handle city creation
import { ImCross } from "react-icons/im";
import MyAlert from '../MyAlert';

function Thead({ comingData, sortingElements, singleElements, tableData, headerPaths, path,  type }) {

    const headerNames = Object.keys(headerPaths);
    const { t } = useTranslation("global");
    const userType = useSelector((state) => state.users.userType);
    const selectedLang = useSelector((state) => state.users.selectedLang);
    const filteredElements = useSelector((state) => state.users.filteredElements);//filtrelenmiş elemanları storedan alırım çünkü bunlar filter.jsx dosyasında oluşturulup store'a ekleniyo
    const filterMessage = useSelector((state) => state.users.filterMessage); //bu da filtreleme mesajını tutar store'da
    const data = filteredElements?.length > 0 ? filteredElements : comingData;
    const isAdmin = useSelector((state) => state.users.isAdmin);
    const [numberOfUsers, setNumberOfUsers] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); //her kolon için sıralama yönünü tutar
    const [isElementCreated, setIsElementCreated] = useState(false);
    const [isElementUpdated, setIsElementUpdated] = useState(false);
    const [updatedElementId, setUpdatedElementId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [elementName, setElementName] = useState('');
    const token = useSelector((state) => state.users.token);
    const [message, setMessage] = useState({
        "updated": "",
        "created": "",
        "deleted": "",
        "updatedError": "",
        "createdError": "",
        "deletedError": ""

    });

    const pageCount = Math.ceil(data.length / numberOfUsers);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setFilteredElements([])); // Filtrelenmiş elemanları temizle
        dispatch(setFilterMessage('')); // Filtre mesajını temizle
    }, []);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleSort = (key) => {//artan sıraya göre sıralanmışsa azalan, azalan sıraya göre sıralanmışsa artan yapar direction'ı
        let direction = 'asc';
        let downIcon = document.querySelector(`.down-${key}`);
        let upIcon = document.querySelector(`.up-${key}`);
        let unsortedIcon = document.querySelector(`.unsort-${key}`);
        if (sortConfig.key === key) {
            direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        }
        if (direction === 'asc') {
            downIcon.style.display = 'none';
            upIcon.style.display = 'inline-block';
        } else {
            downIcon.style.display = 'inline-block';
            upIcon.style.display = 'none';
        }
        unsortedIcon.style.display = 'none';

        setSortConfig({ key, direction });
    };

    //todo burda kaldım
    const handleCreateCity = async (e) => {
        e.preventDefault();
        setMessage(prev =>
            ({ ...prev, updated: '', created: '', deleted: '', updatedError: '', createdError: '', deletedError: '' })); // Clear previous messages
        try {
            await createCity(token, elementName);
            setElementName('');
            await dispatch(getAllCities(token)); // Refresh the cities list
            setMessage(prev => ({ ...prev, created: t("createForms.cityCreated") }));
        } catch (error) {
            setMessage(prev => ({ ...prev, createdError: t("createForms.cityCreatedError") }));
            console.error('Error creating city:', error);
        }
    };
    const handleUpdateCity = async (e) => {
        e.preventDefault();
        setMessage(prev =>
            ({ ...prev, updated: '', created: '', deleted: '', updatedError: '', createdError: '', deletedError: '' })); // Clear previous messages
        try {
            await updateCity(token, updatedElementId, elementName);
            setElementName('');
            await dispatch(getAllCities(token)); // Refresh the cities list
            setMessage(prev => ({ ...prev, updated: t("createForms.cityUpdated") }));
        } catch (error) {
            setMessage(prev => ({ ...prev, updatedError: t("createForms.cityUpdatedError") }));
            console.error('Error updating city:', error);
        }
    };

    const handleCreateDepartmentType = async (e) => {
        e.preventDefault();
        setMessage(prev => ({ ...prev, created: '', updated: '', deleted: '', createdError: '', updatedError: '', deletedError: '' })); // Clear previous messages
        try {
            await createDepartmentType(token, elementName);
            await dispatch(getAllDepartmentTypes(token)); // Refresh the department types list
            setElementName('');
            setMessage(prev => ({ ...prev, created: t("departmentTypes.message.successCreate") }));
        } catch (error) {
            setMessage(prev => ({ ...prev, createdError: t("departmentTypes.message.errorCreate") }));
            console.error('Error creating department type:', error);
        }
    };

    const handleCreateCompanyType = async (e) => {
        e.preventDefault();
        setMessage(prev => ({ ...prev, created: '', updated: '', deleted: '', createdError: '', updatedError: '', deletedError: '' })); // Clear previous messages
        try {
            await createCompanyType(token, elementName);
            await dispatch(getAllCompanyTypes(token)); // Refresh the company types list
            setElementName('');
            setMessage(prev => ({ ...prev, created: t("companyTypes.message.successCreate") }));
        } catch (error) {
            setMessage(prev => ({ ...prev, createdError: t("companyTypes.message.errorCreate") }));
            console.error('Error creating company type:', error);
        }
    };

    const handleUpdateCompanyType = async (e) => {
        e.preventDefault();
        setMessage(prev => ({ ...prev, created: '', updated: '', deleted: '', createdError: '', updatedError: '', deletedError: '' })); // Clear previous messages
        try {
            await updateCompanyType(token, updatedElementId, elementName);
            await dispatch(getAllCompanyTypes(token)); // Refresh the company types list
            setElementName('');
            setMessage(prev => ({ ...prev, updated: t("companyTypes.message.successUpdate") }));
        } catch (error) {
            setMessage(prev => ({ ...prev, updatedError: t("companyTypes.message.errorUpdate") }));
            console.error('Error updating company type:', error);
        }
    };

    const handleUpdateDepartmentType = async (e) => {
        e.preventDefault();
        setMessage(prev => ({ ...prev, created: '', updated: '', deleted: '', createdError: '', updatedError: '', deletedError: '' })); // Clear previous messages
        try {
            await updateDepartmentType(token, updatedElementId, elementName);
            await dispatch(getAllDepartmentTypes(token)); // Refresh the department types list
            setElementName('');
            setMessage(prev => ({ ...prev, updated: t("departmentTypes.message.successUpdate") }));
        } catch (error) {
            setMessage(prev => ({ ...prev, updatedError: t("departmentTypes.message.errorUpdate") }));
            console.error('Error updating department type:', error);
        }
    };

    const getForm = () => {
        return (
            <>

                <form className="create-city-form">
                    <div className='close' onClick={() => { setIsElementCreated(false); setMessage(prev => ({ ...prev, created: '', updated: '', deleted: '', createdError: '', updatedError: '', deletedError: '' })); setIsElementUpdated(false); setElementName(''); setUpdatedElementId(null); }}>
                        <ImCross />
                    </div>
                    <div>
                        <label htmlFor="elementName">{t("createForms.elementName") + ":"}</label>
                        <input type="text" id="elementName" name="elementName" placeholder={t("createForms.elementNamePlaceholder")} value={elementName} onChange={(e) => setElementName(e.target.value)} required />
                    </div>
                    {message.created || message.updated ? (
                        <MyAlert message={message.created || message.updated} whichAlert={"success"} />
                    ) : null}
                    {message.createdError || message.updatedError ? (
                        <MyAlert message={message.createdError || message.updatedError} whichAlert={"error"} />
                    ) : null}
                    {
                        isElementUpdated ? (
                            <button onClick={(e) => {
                                if (type === "cities") {
                                    handleUpdateCity(e);
                                } else if (type === "departmentTypes") {
                                    handleUpdateDepartmentType(e);
                                } else if (type === "companyTypes") {
                                    handleUpdateCompanyType(e);
                                }
                            }
                            }>{t("createForms.buttonUpdateElement")}</button>
                        ) : (
                            <button onClick={(e) => {
                                if (type === "cities") {
                                    handleCreateCity(e);
                                } else if (type === "departmentTypes") {
                                    handleCreateDepartmentType(e);
                                } else if (type === "companyTypes") {
                                    handleCreateCompanyType(e);
                                }
                            }
                            }>{t("createForms.buttonElement")}</button>
                        )
                    }
                </form>
            </>
        );
    }
    const sortHelper = (aComponent, bComponent) => {
        if (aComponent < bComponent) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aComponent > bComponent) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    }

    // Sıralanmış kullanıcı verisi oluşturuluyor
    const sortedData = React.useMemo(() => { //use memo useEffect gibidir sadece parametre olarak verilen data değiştiğinde çalışır 
        let sortable = [...data];
        // Sıralama yapıldığında unsorted ikon gizlenir
        // Eğer bir kolon seçildiyse sıralama yapılır
        if (sortConfig && sortConfig.key) {
            /*
              sort fonksiyonu, iki elemanı (a ve b) karşılaştırır: 
              - a[sortConfig.key] < b[sortConfig.key] ise:
                  - Eğer sıralama yönü 'asc' ise -1 döner (a öne geçer)
                  - Eğer sıralama yönü 'desc' ise 1 döner (b öne geçer)
              - a[sortConfig.key] > b[sortConfig.key] ise:
                  - Eğer sıralama yönü 'asc' ise 1 döner (b öne geçer)
                  - Eğer sıralama yönü 'desc' ise -1 döner (a öne geçer)
              - Eşitse 0 döner (sıra değişmez)
              Yani:
              -1: a önce, b sonra
               1: b önce, a sonra
               0: sıralama değişmez
            */
            if (Object.keys(sortingElements).includes(sortConfig.key)) {
                Object.keys(sortingElements).forEach(element => {
                    if (element === sortConfig.key) {
                        let path = sortingElements[element];
                        sortable = sortable.sort((a, b) => {
                            let aValue = a;
                            let bValue = b;
                            path.forEach(key => {
                                aValue = aValue[key];
                                bValue = bValue[key];
                            });
                            return sortHelper(aValue, bValue);
                        });
                    }
                });
            }
            else {
                sortable.sort((a, b) => {
                    return sortHelper(a[sortConfig.key], b[sortConfig.key]); //-1 dönerse a önce gelir, 1 dönerse b önce gelir, 0 dönerse değişmez
                });
            }

        }
        return sortable;
    }, [data, sortConfig]);


    const currentData = (sortedData || []).slice(
        currentPage * numberOfUsers,
        (currentPage + 1) * numberOfUsers
    );

//todo burda kaldım
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        // Redux action to filter users based on search term
        // dispatch(filterUsers(searchTerm));
        if (searchTerm === '') {
            dispatch(setFilteredElements([])); // Arama kutusu boşsa filtrelenmiş kullanıcıları temizle
            dispatch(setFilterMessage('')); // Filtre mesajını temizle
            return;
        }
        const searchedData = data.filter(element => {
            /*
            some fonksiyonu:
            - Bir dizideki elemanlardan en az biri verilen koşulu sağlıyorsa true döner.
            - Koşul sağlanırsa döngüyü hemen bitirir ve dıştaki fonksiyona true döndürür.
            - Hiçbiri sağlamazsa false döner.
            - Örnek: [1,2,3].some(x => x > 2) // true

            Neden forEach kullanılamaz?
            - forEach sadece her eleman için işlem yapar, bir değer döndürmez.
            - Döngüyü erken bitiremez, return true yazsan bile dıştaki fonksiyona etki etmez.
            - filter gibi bir fonksiyonun içinde, koşul sağlanınca hemen true döndürmek için some kullanılır.
            - forEach ile return true yazarsan, sadece o döngüdeki fonksiyonu bitirir, filter'a etki etmez.
            */
            // Tekli alanlar için
            if (singleElements.some(key =>
                element[key] && element[key].toString().toLowerCase().includes(searchTerm)
            ))//if kuşulu
            {
                return true;// if bloğu
            }
            // Çoklu (nested) alanlar için
            return Object.values(sortingElements).some(keyArr => {
                let searchedValue = element;
                keyArr.forEach(subKey => {
                    if (searchedValue && searchedValue[subKey]) {
                        searchedValue = searchedValue[subKey];
                    } else {
                        searchedValue = undefined;
                    }
                });
                return searchedValue && searchedValue.toString().toLowerCase().includes(searchTerm);
            });
        });


        if (searchedData.length > 0) {
            dispatch(setFilteredElements(searchedData));
            setCurrentPage(0); // Arama yapıldığında sayfayı sıfırla
            dispatch(setFilterMessage('')); // Filtre mesajını temizle
        }
        else {
            dispatch(setFilteredElements([])); // Eğer arama sonucu boşsa, filtrelenmiş kullanıcıları temizle
            dispatch(setFilterMessage('No users found with the search term.')); // Filtre mesajını ayarla
        }



    }












    return (
        <div className={(type === "cities" || type === "departmentTypes" || type === "companyTypes" ? 'cities-container' : 'users-container')}>
            {type !== "cities" && type !== "departmentTypes" && type !== "companyTypes" &&
                <Filters type={type} elements={comingData} />}
            <div className="table-title" >
                <h1>{tableData["title"]}</h1>
                <div className="search-bar">
                    <IoMdSearch />
                    <input
                        id="searchInput"
                        type="text"
                        placeholder={tableData["searchPlaceholder"]}
                        onChange={(e) => {
                            handleSearch(e);
                            // Redux action to filter users based on search term
                            // dispatch(filterUsers(searchTerm));
                        }}
                    />
                    <RxCross2 onClick={() => { document.querySelector("#searchInput").value = ""; dispatch(setFilteredElements([])) }} />


                </div>
            </div>
            <div className='table-scroll'>
                <table >
                    <thead>
                        <tr>
                            {Object.values(tableData).map((header, index) => {
                                let boundIndex = 0;//gönderilen tableDatadaki ilk kaç elemanın tutulucağını gösterir 
                                if (isAdmin) {
                                    if (type == "users") {
                                        boundIndex = 6; // Adjusted to match the header count
                                    }
                                    else if (type == "companies" || type == "departments") {
                                        boundIndex = 8; // Adjusted to match the header count
                                    }
                                }
                                if (userType === 'MANAGER') {
                                    if (type === 'users') {
                                        boundIndex = 5; // Adjusted to match the header count
                                    }
                                    else if (type === 'departments' || type === 'companies') {
                                        boundIndex = 8; // Adjusted to match the header count
                                    }
                                }
                                if (type === "cities" || type === 'departmentTypes' || type === 'companyTypes') {
                                    boundIndex = 2; // Adjusted to match the header count
                                }

                                return (
                                    (index <= boundIndex) ? ( // Adjusted to match the header count
                                        <th key={index} onClick={() => handleSort(headerNames[index])} >
                                            <div className='header' style={{
                                                width:
                                                    type === 'users' && '210px' || (type === 'departments' || type === 'companies') && '158px'
                                            }}>{header}
                                                {header !== t("dashboard.actions") &&
                                                    <>
                                                        <FaSortAmountDown className={`down-${headerNames[index]}`} style={{ display: 'none' }} />
                                                        <FaSortAmountUpAlt className={`up-${headerNames[index]}`} style={{ display: 'none' }} />
                                                        <TiArrowUnsorted className={`unsort-${headerNames[index]}`} /></>}
                                            </div>
                                        </th>
                                    ) : null
                                );
                            })}
                            {type === "cities" &&//cities te locations kolonu var onu almak için
                                <th style={{ width: '15px' }}>
                                    <div className='header'  >{tableData["3"]}</div>
                                </th>

                            }

                        </tr>
                    </thead>
                    {filterMessage &&
                        <tbody>
                            <tr>
                                <td colSpan={isAdmin ? 8 : 6} style={{ textAlign: 'center', width: '100%' }}>
                                    <p className='filter-message'>{filterMessage}</p>
                                </td>
                                <td style={{ width: 0, float: 'right' }}></td>
                            </tr>
                        </tbody>
                    }
                    {filterMessage === '' &&
                        <tbody>
                            {currentData.map((item, index) => (
                                <React.Fragment key={index}>
                                    <Trow key={index} element={item} t={t} headers={headerPaths} path={path} type={type} tableData={tableData} handleSort={handleSort} headerNames={headerNames} setIsElementUpdated={setIsElementUpdated} setElementName={setElementName} setUpdatedElementId={setUpdatedElementId} setIsElementCreated={setIsElementCreated} setMessage={setMessage} />
                                    {isElementUpdated && (type === "cities" || type === "departmentTypes" || type === "companyTypes") && updatedElementId === item.id &&
                                        <tr style={{ background: "linear-gradient(45deg, black, #000085)" }}>
                                            <td colSpan={4}>
                                                {getForm()}
                                            </td>
                                            <td style={{ display: 'none' }}></td>
                                        </tr>
                                    }
                                </React.Fragment>

                            ))}
                            {(message.deleted || message.deletedError) && <tr>
                                <td colSpan={9} className='message'>
                                    {message.deleted ?
                                        <MyAlert message={message.deleted} whichAlert={"success"} /> :
                                        <MyAlert message={message.deletedError} whichAlert={"error"} />}
                                </td>
                                <td style={{ display: 'none' }}></td>
                            </tr>}
                            <tr className='table-footer'>
                                {selectedLang === 'En' ?//dile göre kelime sıralaması değişceği için burda ternary operatör kullanıldı
                                    <td colSpan={type === "cities" ? 2 : 3 ||
                                        type === "departmentTypes" ? 2 : 3 || type === "companyTypes" ? 2 : 3
                                    } style={{ padding: 0 }} ><p style={{ margin: 0, wordSpacing: '5px' }}>{t("dashboard.show.first")}{<b>{numberOfUsers}</b>} {t("dashboard.show.second")} {<b>{data.length}</b>} {t("dashboard.show.third")}</p></td>
                                    :
                                    <td colSpan={type === "cities" ? 2 : 3
                                        || type === "departmentTypes" ? 2 : 3 || type === "companyTypes" ? 2 : 3
                                    } style={{ padding: 0 }} ><p style={{ margin: 0, wordSpacing: '5px' }}>{t("dashboard.show.first")}{<b>{data.length}</b>} {t("dashboard.show.second")} {<b>{numberOfUsers}</b>} {t("dashboard.show.third")}</p></td>
                                }

                                <td colSpan={(isAdmin ? 6 : 4)} style={{ textAlign: 'right' }} className='number-of-items'>
                                    <label htmlFor="numberOfItems">{t("dashboard.numData")}</label>
                                    <input type="number" id="numberOfItems" min={1} value={numberOfUsers} onChange={(e) => setNumberOfUsers(Number(e.target.value))} />
                                </td>


                                <td style={{ display: 'none' }} >

                                </td>


                            </tr>
                        </tbody>
                    }
                </table>
                {isElementCreated && getForm()}
                {(isAdmin || (userType === 'MANAGER' && type === 'users')) &&
                    <div className='add-user-button'>
                        <button onClick={(e) => {
                            e.preventDefault();
                            if (type === "cities" || type === "departmentTypes" || type === "companyTypes") {
                                setIsElementCreated(true);
                                setIsElementUpdated(false);
                                setElementName('');
                                setMessage(prev => ({ ...prev, created: '', updated: '', deleted: '', createdError: '', updatedError: '', deletedError: '' }));
                                setUpdatedElementId(null);
                            }
                            else if (type === "users") {
                                navigate("/add-user");
                            }
                            else if (type === "departments") {
                                navigate("/add-department");
                            }
                            else if (type === "companies") {
                                navigate("/add-company");
                            }



                        }}>{tableData["button"]}</button>
                    </div>}
                <ReactPaginate
                    previousLabel={<GrChapterPrevious />}
                    nextLabel={<GrChapterNext />}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName="pagination"
                    activeClassName="active"
                    className='pagination'
                />


            </div>
        </div>
    )
}

export default Thead