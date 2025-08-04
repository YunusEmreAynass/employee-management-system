import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useSelector } from 'react-redux';
import '../css/company-department.css';
import Info from './Info';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { getAllDepartments } from '../redux/Users';
import { useDispatch } from 'react-redux';
import { getRegionsByCity, getTownsByRegion,updateDepartment } from '../services/api';
import { getDepartmentTypes } from '../services/api';
function Department() {
  const { t } = useTranslation("global");
  const dispatch = useDispatch();
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageError, setMessageError] = useState("");
  const [searchParams] = useSearchParams();
  const departmentId = Number(searchParams.get('id'));
  const departments = useSelector((state) => state.users.departments);
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const departmentTypesNames = departmentTypes.map(departmentType => departmentType.name);
  const [selectedDepartment, setSelectedDepartment] = useState(departments.find(department => department.id === departmentId));
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(t("dashboard.departments." + selectedDepartment?.name,{defaultValue: selectedDepartment?.name}));
  const [town, setTown] = useState(selectedDepartment?.town.name);
  const [region, setRegion] = useState(selectedDepartment?.town.region?.name);
  const [city, setCity] = useState(selectedDepartment?.town.city?.name);
  const [address, setAddress] = useState(selectedDepartment?.addressDetail);
  const [type, setType] = useState(selectedDepartment?.departmentType?.name ? selectedDepartment?.departmentType.name : "");
  const [company, setCompany] = useState(selectedDepartment?.company.name);
  const token = useSelector((state) => state.users.token);
  const userType = useSelector((state) => state.users.userType);
  const companies = useSelector((state) => state.users.companies);
  const companiesNames = companies.map(company => company.name).
    filter((value) => value !== null && value !== undefined).filter((value, index, self) => self.indexOf(value) === index); // Unique companies
  const [towns, setTowns] = useState([]);
  const townsNames = towns.map(town => town.name).filter((value) => value !== null && value !== undefined).filter((value, index, self) => self.indexOf(value) === index);
  const [regions, setRegions] = useState([]);
  const regionsNames = regions.map(region => region.name).filter((value) => value !== null && value !== undefined).filter((value, index, self) => self.indexOf(value) === index); // Unique regions

  const cities = useSelector((state) => state.users.cities);
  const citiesNames = cities.map(city => city.name).filter((value) => value !== null && value !== undefined).filter((value, index, self) => self.indexOf(value) === index); // Unique cities
  const cityId = cities.find(c => c.name === city)?.id;
  const companyId = companies.find(c => c.name === company)?.id;
  const typeId = departmentTypes.find(department => department.name === type)?.id;
  const townId = towns.find(t => t.name === town)?.id;

  useEffect(() => {
    const fetchDepartmentTypes = async () => {
      const departmentTypes = await getDepartmentTypes(token);
      setDepartmentTypes(departmentTypes);
    };
    fetchDepartmentTypes();
  }, [token]);

  useEffect(() => {
    const fetchRegions = async () => {
      if (!cityId) return; // Eğer cityId bulunamazsa, fonksiyonu sonlandır
      const regions = await getRegionsByCity(cityId, token);
      if (regions.length === 0) {
        setRegion("");
        setTown("");
      }
      setRegions(regions);
    };
    fetchRegions();
  }, [city]);

  const fetchTowns = async () => {
    const regionId = regions.find(r => r.name === region)?.id;
    if (!regionId) return; // Eğer regionId bulunamazsa, fonksiyonu sonlandır
    const towns = await getTownsByRegion(regionId, token);
    console.log("towns", towns);
    if (towns.length === 0) {
      setTown("");
    }
    setTowns(towns);
  };
  useEffect(() => {
    fetchTowns();
  }, [city, region]);

  useEffect(() => {//drop-down menüden seçilen departman değiştiğinde bilgileri güncellemek için bu useEffect kullanılıyor
    const newSelected = departments.find(department => department.id === departmentId);
    setSelectedDepartment(newSelected);
    setName(t("dashboard.departments." + newSelected?.name, { defaultValue: newSelected?.name }));
    setTown(newSelected?.town.name);
    setRegion(newSelected?.town.region?.name);
    setCity(newSelected?.town.city?.name);
    setAddress(newSelected?.addressDetail);
    setType(newSelected?.departmentType?.name ? newSelected?.departmentType.name : "");
    setCompany(newSelected?.company.name);
  }, [departmentId, departments, t]);

  const handleSubmit = async (e) => {
    setMessageSuccess("");
    setMessageError("");
    fetchTowns();
    
    e.preventDefault();
    if (e.target.innerText === t("department.editButton")) {
      setIsEditing(true);
      e.target.innerText = t("department.updateButton");
    }
    else {
      try {
        await updateDepartment(token, departmentId, companyId, name, typeId, townId, address);
        setIsEditing(false);
        setMessageSuccess(t("department.message.successUpdate"));
        setMessageError("");
        dispatch(getAllDepartments(token));
        e.target.innerText = t("department.editButton");
      } catch (error) {
        setMessageSuccess("");
        setMessageError(t("department.message.errorUpdate"));
        console.error("Error updating department:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className='info-container' >
        <h1>{t("department.title")}</h1>
        <div className="infos">
          <Info label={t("department.name")} value={name} isEditing={isEditing} set={setName} isCreating={false} isEdited={isEditing} />
          <Info label={t("department.city")} value={city} isEditing={isEditing} set={setCity} types={citiesNames} isCreating={false} isEdited={isEditing} />
          <Info label={t("department.region")} value={region} isEditing={isEditing} set={setRegion} types={regionsNames} isCreating={false} isEdited={isEditing} />
          <Info label={t("department.town")} value={town} isEditing={isEditing} set={setTown} types={townsNames} isCreating={false} isEdited={isEditing} />
          <Info label={t("department.company")} value={company} isEditing={isEditing} set={setCompany} types={companiesNames} isCreating={false} isEdited={isEditing} />
          <Info label={t("department.type")} value={type} isEditing={isEditing} set={setType} types={departmentTypesNames} isCreating={false} isEdited={isEditing} />

          <Info label={t("department.address")} value={address} isEditing={isEditing} set={setAddress} isCreating={false} isEdited={isEditing} />

          {messageSuccess && <p className='success'>{messageSuccess}</p>}
          {messageError && <p className='error'>{messageError}</p>}
          {userType === "ADMIN" && 
            <button className='update-button' onClick={(e) => { handleSubmit(e); }}>
              {t("department.editButton")}
            </button>}

        </div>
      </div>












      <Footer />
    </>
  )
}

export default Department