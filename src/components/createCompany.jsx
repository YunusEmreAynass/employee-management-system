import '../css/company-department.css';
import Header from './Header';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Info from './Info';
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCompanies } from '../redux/Users';
import { getRegionsByCity, getTownsByRegion, getCompanyTypes, createCompany } from '../services/api';
import { useEffect } from 'react';

function CreateCompany() {
  const { t } = useTranslation("global");
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [town, setTown] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [shortName, setShortName] = useState("");
  const [type, setType] = useState("");
  const [activation, setActivation] = useState("");
  const [activations, setActivations] = useState(["Active", "Inactive"]);
  const token = useSelector((state) => state.users.token);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageError, setMessageError] = useState("");
  const [towns, setTowns] = useState([]);
  const townsNames = towns.map(town => town.name).filter((value) => value !== null && value !== undefined).filter((value, index, self) => self.indexOf(value) === index); // Unique towns
  const [regions, setRegions] = useState([]);
  const regionsNames = regions.map(region => region.name).filter((value) => value !== null && value !== undefined).filter((value, index, self) => self.indexOf(value) === index); // Unique regions
  const cities = useSelector((state) => state.users.cities);
  const citiesNames = cities.map(city => city.name).filter((value) => value !== null && value !== undefined).filter((value, index, self) => self.indexOf(value) === index); // Unique cities
  const cityId = cities.find(c => c.name === city)?.id;
  const [companyTypes, setCompanyTypes] = useState([]);
  const companyTypeNames = companyTypes?.map(type => type.name).filter((value) => value !== null && value !== undefined);
  const townId = towns.find(t => t.name === town)?.id;
  const typeId = companyTypes.find(companyType => companyType.name === type)?.id;
  const active = activation === "Active" ? true : false;
  console.log("townId", townId);
  console.log("typeId", typeId);
  useEffect(() => {
    const fetchCompanyTypes = async () => {
      const types = await getCompanyTypes(token);
      setCompanyTypes(types);
    };
    fetchCompanyTypes();
  }, []);

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
      await createCompany(token, name, shortName, townId, address, typeId,active);
      dispatch(getAllCompanies(token));
      setMessageError("");

      setMessageSuccess(t("company.message.successCreate"));
    } catch (error) {
      setMessageError(t("company.message.errorCreate"));
      setMessageSuccess("");
      console.error("Error creating company:", error);
    }
  };
  return (
    <>
      <Header />
      <div className="info-container" >
        <h1>{t("company.titleCreate")}</h1>
        <div className="infos">
          <Info label={t("company.name")} value={name} isEditing={true} set={setName} isCreating={true} />
          <Info label={t("company.shortName")} value={shortName} isEditing={true} set={setShortName} isCreating={true} />
          <Info label={t("company.type")} value={type} isEditing={true} set={setType} types={companyTypeNames} isCreating={true} />
          <Info label={t("company.city")} value={city} isEditing={true} set={setCity} types={citiesNames} isCreating={true} />
          <Info label={t("company.region")} value={region} isEditing={true} set={setRegion} types={regionsNames} isCreating={true} />
          <Info label={t("company.town")} value={town} isEditing={true} set={setTown} types={townsNames} isCreating={true} />
          <Info label={t("company.activation")} value={activation} isEditing={true} set={setActivation} types={activations} isCreating={true} />
          <Info label={t("company.address")} value={address} isEditing={true} set={setAddress} isCreating={true} />

        </div>
        {messageSuccess && <p className='success'>{messageSuccess}</p>}
        {messageError && <p className='error'>{messageError}</p>}
        <button className='create-button' onClick={(e) => { handleSubmit(e); }}>
          {t("company.createCompany")}
        </button>
      </div>
      <Footer />
    </>
  )
}

export default CreateCompany