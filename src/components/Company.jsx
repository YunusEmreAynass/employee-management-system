import  { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import '../css/company-department.css';
import Info from './Info';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { getCompanyTypes, updateCompany, getRegionsByCity, getTownsByRegion } from '../services/api';
import { getAllCompanies } from '../redux/Users';
import { useDispatch } from 'react-redux';






function Company() {
  const { t } = useTranslation("global");
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageError, setMessageError] = useState("");
  const companies = useSelector((state) => state.users.companies);
  const selectedCompany = companies.find(company => company.id === Number(id));
  const [name, setName] = useState(selectedCompany?.name);
  const [shortName, setShortName] = useState(selectedCompany?.shortName);
  const [town, setTown] = useState(selectedCompany?.town.name);
  const [region, setRegion] = useState(selectedCompany?.town.region?.name);
  const [city, setCity] = useState(selectedCompany?.town.city?.name);
  const [address, setAddress] = useState(selectedCompany?.addressDetail);
  const [activation, setActivation] = useState(selectedCompany?.active ? "Active" : "Inactive");
  const [activations, setActivations] = useState(["Active", "Inactive"]);
  const [type, setType] = useState(selectedCompany?.companyType.name);
  const token = useSelector((state) => state.users.token);
  const [isEditing, setIsEditing] = useState(false);
  const [towns, setTowns] = useState([]);//seçilen region'a göre veri geliceği için başta boş
  const townsNames = towns.map(town => town.name).filter((value) => value !== null && value !== undefined).filter((value, index, self) => self.indexOf(value) === index); // Unique towns
  const [regions, setRegions] = useState([]); //seçilen city'e göre veri geliceği için başta boş
  const regionsNames = regions.map(region => region.name).filter((value) => value !== null && value !== undefined).filter((value, index, self) => self.indexOf(value) === index); // Unique regions
  
  const cities = useSelector((state) => state.users.cities);
  const citiesNames = cities.map(city => city.name).filter((value) => value !== null && value !== undefined).filter((value, index, self) => self.indexOf(value) === index); // Unique cities
  const cityId = cities.find(c => c.name === city)?.id;
  const [companyTypes, setCompanyTypes] = useState([]); 
  const companyTypeNames = companyTypes?.map(type => type.name).filter((value) => value !== null && value !== undefined);
  // Unique company types
  const townId = towns.find(t => t.name === town)?.id;
  const typeId = companyTypes.find(companyType => companyType.name === type)?.id;
  const active = activation === "Active" ? true : false;
  console.log("townId", townId);
  useEffect(() => {
    const fetchCompanyTypes = async () => {
      const types = await getCompanyTypes(token);
      setCompanyTypes(types);
    };
    fetchCompanyTypes();
  }, []);

  useEffect(() => {//regionları çekeriz
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
    if (towns.length === 0) {
      setTown("");
    }
    setTowns(towns);
  };

  useEffect(() => {//townları çekeriz
    fetchTowns();
  }, [city,region]);



  const hundleSubmit = async (e) => {
    setMessageSuccess("");
    setMessageError("");
    fetchTowns();// bunun bir daha çağırmamın sebebi edit company'e tıklandığında townlar gözükmüyo gözüksün diye bir daha çağırdım
    e.preventDefault();
    if (e.target.innerText === t("company.editCompany")) {
      setIsEditing(true);
      e.target.innerText = t("company.updateCompany");
    }
    else {
      try {
        await updateCompany(token, id, name, shortName, townId, address, typeId,active)//bunu bekletmemizin nedeni company update edilmeden tüm companyleri çekmek istemememiz ve mesajları göstermek istememiz
        setIsEditing(false);
        setMessageSuccess(t("company.message.successUpdate"));
        setMessageError("");
        dispatch(getAllCompanies(token));
        e.target.innerText = t("company.editCompany");

      } catch (error) {
        setMessageSuccess("");
        setMessageError(t("company.message.errorUpdate"));
        console.error("Error updating company:", error);
      }
    }
  }
  return (
    <>
      <Header />
      <div className='info-container' >
        <h1>{t("company.title")}</h1>
        <div className="infos">
          <Info label={t("company.name")} value={name} isEditing={isEditing} set={setName} isEdited={isEditing} />
          <Info label={t("company.shortName")} value={shortName} isEditing={isEditing} set={setShortName} isEdited={isEditing} />{/** isEditing eğer edit ediliyosa inputların readonly modundan çıkması için isEdited ise eğer ki edit ediliyorsa selecte select x option'ı ekler(select town gibi) isCreated ise created ediliyosa select x option'ı ekler  create'te başta hemen gözükmesi gerektiği için true göndeririz ama update te edit butonuna tıklandıktan gözükmesi gerektiği için ayrı bir isEdited değişkeni daha kullandık*/}
          <Info label={t("company.city")} value={city} isEditing={isEditing} set={setCity} types={citiesNames} isEdited={isEditing} />
          <Info label={t("company.region")} value={region} isEditing={isEditing} set={setRegion} types={regionsNames} isEdited={isEditing} />
          <Info label={t("company.town")} value={town} isEditing={isEditing} set={setTown} types={townsNames} isEdited={isEditing} />
          <Info label={t("company.type")} value={type} isEditing={isEditing} set={setType} types={companyTypeNames} isEdited={isEditing} />
          <Info label={t("company.activation")} value={activation} isEditing={isEditing} set={setActivation} types={activations} isEdited={isEditing} />
          <Info label={t("company.address")} value={address} isEditing={isEditing} set={setAddress} isEdited={isEditing} />
          {messageSuccess && <p className='success'>{messageSuccess}</p>}
          {messageError && <p className='error'>{messageError}</p>}
          <button className='update-button' onClick={(e) => { hundleSubmit(e); }}>
            {t("company.editCompany")}
          </button>

        </div>
      </div>












      <Footer />
    </>




  )
}

export default Company

