import '../css/company-department.css';
import Header from './Header';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Info from './Info';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { createDepartment, getRegionsByCity, getTownsByRegion } from '../services/api';
import { useDispatch } from 'react-redux';
import { getAllDepartments } from '../redux/Users';
import { useEffect } from 'react';
import { getDepartmentTypes } from '../services/api';

function CreateDepartment() {
  const { t } = useTranslation("global");
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [town, setTown] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageError, setMessageError] = useState("");
  const token = useSelector((state) => state.users.token);
  const companies = useSelector((state) => state.users.companies);
  const companiesNames = companies.map(company => company.name).
    filter((value) => value !== null && value !== undefined).filter((value, index, self) => self.indexOf(value) === index); // Unique companies
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const departmentTypesNames = departmentTypes.map(departmentType => departmentType.name);
  const [towns, setTowns] = useState([]);
  const townsNames = towns.map(town => town.name).filter((value) => value !== null && value !== undefined).filter((value, index, self) => self.indexOf(value) === index); // Unique towns
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

  useEffect(() => {
    const fetchTowns = async () => {
      const regionId = regions.find(r => r.name === region)?.id;
      if (!regionId) return; // Eğer regionId bulunamazsa, fonksiyonu sonlandır
      const towns = await getTownsByRegion(regionId, token);
      if (towns.length === 0) {
        setTown("");
      }
      setTowns(towns);
    };
    fetchTowns();
  }, [city, region]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDepartment(token, name, typeId, townId, address, companyId);
      dispatch(getAllDepartments(token));
      setMessageError("");
      setMessageSuccess(t("department.message.successCreate"));
    } catch (error) {
      setMessageError(t("department.message.errorCreate"));
      setMessageSuccess("");
      console.error("Error creating department:", error);
    }

  };











  return (
    <>
      <Header />
      <div className="info-container" >
        <h1>{t("department.titleCreate")}</h1>
        <div className="infos">
          <Info label={t("department.name")} value={name} isEditing={true} set={setName} isCreating={true} />
          <Info label={t("department.company")} value={company} isEditing={true} set={setCompany} types={companiesNames} isCreating={true} />
          <Info label={t("department.type")} value={type} isEditing={true} set={setType} types={departmentTypesNames} isCreating={true} />
          <Info label={t("department.city")} value={city} isEditing={true} set={setCity} types={citiesNames} isCreating={true} />
          <Info label={t("department.region")} value={region} isEditing={true} set={setRegion} types={regionsNames} isCreating={true} />
          <Info label={t("department.town")} value={town} isEditing={true} set={setTown} types={townsNames} isCreating={true} />
          <Info label={t("department.address")} value={address} isEditing={true} set={setAddress} isCreating={true} />
        </div>
        {messageSuccess && <p className='success'>{messageSuccess}</p>}
        {messageError && <p className='error'>{messageError}</p>}
        <button className='create-button' onClick={(e) => { handleSubmit(e); }}>
          {t("department.createButton")}
        </button>






















      </div>











      <Footer />


    </>
  )
}

export default CreateDepartment