import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { TbMenuOrder } from "react-icons/tb";
import { useState } from 'react';
import '../css/users.css';
import { useDispatch } from 'react-redux';
import { setFilteredElements} from '../redux/Users';
import { setFilterMessage } from '../redux/Users';
import { useTranslation } from 'react-i18next';
import { getRegionsByCity, getTownsByRegion, getDepartmentByName } from '../services/api';

function Filters({ elements, type }) {
  const showRole = type === "users" ? true : false;
  const { t } = useTranslation("global");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const [role, setRole] = useState('');
  const [activity, setActivity] = useState('');
  const [company, setCompany] = useState('');
  const [town, setTown] = useState('');
  const [department, setDepartment] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const isAdmin = useSelector((state) => state.users.isAdmin);
  const [companies, setCompanies] = useState(useSelector((state) => state.users.companies));
  const [filteredCompanies, setFilteredCompanies] = useState(companies);//eğer hiç companyler filtrelenmemişse tüm companyler gösterilecek
  const companiesNames = filteredCompanies.map(company => company.name).filter((value, index, self) => self.indexOf(value) === index); // Unique companies
  const [departments, setDepartments] = useState(useSelector((state) => state.users.departments));
  const [filteredDepartments, setFilteredDepartments] = useState(departments);
  const departmentsNames = filteredDepartments.map(department => department.name).filter((value, index, self) => self.indexOf(value) === index); // Unique departments
  const [cities, setCities] = useState(useSelector((state) => state.users.cities));
  const [filteredCities, setFilteredCities] = useState(cities);
  const citiesNames = filteredCities.map(city => city.name).filter((value, index, self) => self.indexOf(value) === index); // Unique cities
  const cityId = cities.find(c => c.name === city)?.id;
  const [towns, setTowns] = useState([]);
  const [filteredTowns, setFilteredTowns] = useState(towns);
  const townsNames = filteredTowns.map(town => town.name).filter((value) => value !== null && value !== undefined).filter((value, index, self) => self.indexOf(value) === index); // Unique towns
  const [regions, setRegions] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState(regions);
  const regionsNames = filteredRegions.map(region => region.name).filter((value) => value !== null && value !== undefined).filter((value, index, self) => self.indexOf(value) === index); // Unique regions

  const filters = document.querySelector('.filters');



  useEffect(() => {
    if (filters) {
      if (showFilters) {
        filters.style.display = 'flex';
      } else {
        filters.style.display = 'none';
      }
    }
  }, [showFilters, filters]);

  useEffect(() => {
    const fetchRegions = async () => {
      if (!cityId) return; // Eğer cityId bulunamazsa, fonksiyonu sonlandır
      const regions = await getRegionsByCity(cityId, token);
      if (regions.length === 0) {
        setRegion("");
        setTown("");
      }
      setRegions(regions);
      setFilteredRegions(regions);
    };
    fetchRegions();
  }, [city]);

  useEffect(() => {
    const fetchTowns = async () => {
      const regionId = regions.find(r => r.name === region)?.id;
      if (!regionId) return; // Eğer regionId bulunamazsa, fonksiyonu sonlandır
      if (!cityId) return; // Eğer cityId bulunamazsa, fonksiyonu sonlandır
      const towns = await getTownsByRegion(regionId, token);
      if (towns.length === 0) {
        setTown("");
      }
      setTowns(towns);
      setFilteredTowns(towns);
    };
    fetchTowns();
  }, [city, region]);


  useEffect(() => {// her bir select değiştiğinde o değere göre tüm selectlerde değerleri filtrele

    const filteredForDepartments = departments.filter(d =>
      company === '' || d.company.name === company)//filtre değeri boşsa ztn hepsini filtreler
      .filter(d => city === '' || d.town.city.name === city)
      .filter(d => region === '' || d.town.region.name === region)
      .filter(d => town === '' || d.town.name === town);


    setFilteredDepartments(filteredForDepartments);
    const filteredForCompanies = companies.filter(c =>
      department === '' || departments.filter(d => d.company.name === c.name).some(d => d.name === department))//eğerki departmanın company'sinin name'i ile company'nin name'i aynı ise bu demek oluyo ki o departman o company de yani şunu yapıyoruz aslında company'nin içindeki departmanları buluyoruz önce sonra da şuna bakıyoruz seçilen departman company'nin içinde mi içindeyse o company'yi göster
      .filter(c => city === '' || c.town.city.name === city)
      .filter(c => region === '' || c.town.region.name === region)
      .filter(c => town === '' || c.town.name === town);

    setFilteredCompanies(filteredForCompanies);
    const filteredForCities = cities.filter(c =>
      company === '' || companies.filter(comp => comp.town.city.name === c.name).some(comp => comp.name === company)
    )//city'nin içindeki company'leri buluyoruz ve eğerki seçilen company city'nin içinde ise o city'yi göster
      .filter(c => department === '' || departments.filter(d => d.town.city.name === c.name).some(d => d.name === department))//city'nin içindeki department'leri buluyoruz ve eğerki seçilen department o city'nin içinde ise o city'yi göster


    setFilteredCities(filteredForCities);


  }, [company, department, town, region, city]);
  useEffect(() => { }, []);



  const handleReset = (e) => {
    e.preventDefault();
    setCompanies(companies);
    setDepartments(departments);
    setCities(cities);
    setTowns(towns);
    setRegions(regions);
    const filter_inputs = document.querySelectorAll('.filter-inputs select');
    filter_inputs.forEach(input => {
      input.value = '';
    })
    setRole('');
    setActivity('');
    setCompany('');
    setDepartment('');
    setRegion('');
    setCity('');
    setTown('');
    dispatch(setFilteredElements([])); // Filtreleri sıfırla ve store'daki filtrelenmiş kullanıcıları boş bir dizi olarak ayarla
    dispatch(setFilterMessage('')); // Filtre mesajını temizle

  }

  const handleSearch = async (e) => {
    e.preventDefault();
    let filteredElements = [];
    if (type === 'users') {
      // Promise.all, birden fazla asenkron işlemi (Promise) aynı anda başlatıp, hepsi tamamlandığında devam etmemizi sağlar.
      // Yani, tüm getDepartmentByName çağrılarını paralel başlatır ve hepsinin sonucunu tek seferde bekler.
      const departmentPromises = elements.map(element => getDepartmentByName(element.departmentName, token));
      const departments = await Promise.all(departmentPromises);
      filteredElements = elements.filter((element, i) => {
        const userDepartment = departments[i];//user da company, department, town, region ve city bilgileri olmadığı için departmanını çekip ordan erişiyoruz
        return (
          (company === '' || userDepartment?.company?.name === company) &&
          (department === '' || userDepartment?.name === department) &&
          (region === '' || userDepartment?.town?.region.name === region) &&
          (city === '' || userDepartment?.town?.city.name === city) &&
          (role === '' || element.role?.name === role)
        );
      });
    } else if (type === 'departments') {
      filteredElements = elements.filter(element =>
        (company === '' || element.company?.name === company) &&
        (department === '' || element.name === department) &&
        (region === '' || element.town?.region.name === region) &&
        (city === '' || element.town?.city.name === city) &&
        (town === '' || element.town?.name === town) &&
        (activity === '' || (activity === 'Active' ? element.active : !element.active))
      );
    } else if (type === 'companies') {
      filteredElements = elements.filter(element =>
        (company === '' || element.name === company) &&
        (region === '' || element.town?.region.name === region) &&
        (city === '' || element.town?.city.name === city) &&
        (town === '' || element.town?.name === town) &&
        (activity === '' || (activity === 'Active' ? element.active : !element.active))
      );
    }

    if (filteredElements.length === 0) {
      dispatch(setFilteredElements([]));
      dispatch(setFilterMessage(`no ${type.slice(0, -1)} found with the selected filters.`));
    } else {
      dispatch(setFilteredElements(filteredElements));
      dispatch(setFilterMessage(''));
    }
  }



  return (
    <div className='filters-container'>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} onClick={() => {
        setShowFilters(!showFilters)
      }}>
        <TbMenuOrder className='filter-icon' />
      </div>
      <div className='filters'>
        {isAdmin &&
          <div className='filter-inputs'>
            <select name="company" id="" onChange={(e) => { setCompany(e.target.value); }}>
              <option value="" >{t("dashboard.filter.company")}</option>
              {companiesNames.map((company, index) => (
                <option key={index} value={company}>{company}</option>
              ))}
            </select>

            <select name="department" id="" onChange={(e) => { setDepartment(e.target.value); }} style={{ display: type !== "companies" ? "block" : "none" }}>
              <option value="">{t("dashboard.filter.department")}</option>
              {departmentsNames.map((department, index) => (
                <option key={index} value={department}>{t("dashboard.departments." + department, { defaultValue: department })}</option>
              ))}
            </select>

          </div>


        }
        <div className='filter-inputs'>
          {showRole ?
            <select name="role" id="" value={role} onChange={(e) => { setRole(e.target.value) }}>
              <option value="">{t("dashboard.filter.role")}</option>
              <option value="ADMIN">{t("dashboard.roles.ADMIN")}</option>
              <option value="MANAGER">{t("dashboard.roles.MANAGER")}</option>
              <option value="USER">{t("dashboard.roles.USER")}</option>
            </select>
            :
            <select name="town" id="" onChange={(e) => { setTown(e.target.value); }}>
              <option value="">{t("dashboard.filter.town")}</option>
              {townsNames.map((town, index) => (
                <option key={index} value={town}>{town}</option>
              ))}
            </select>
          }
          {type !== "users" &&
            <select name="activity" id="" value={activity} onChange={(e) => { setActivity(e.target.value) }}>
              <option value="">{t("dashboard.filter.activity")}</option>
              <option value="Active">{t("dashboard.activations.active")}</option>
              <option value="Nonactive">{t("dashboard.activations.inactive")}</option>
            </select>}
        </div>
        {isAdmin &&
          <div className='filter-inputs'>
            <select name="region" id="" onChange={(e) => { setRegion(e.target.value); }}>
              <option value="">{t("dashboard.filter.region")}</option>
              {regionsNames.map((region, index) => (
                <option key={index} value={region}>{region}</option>
              ))}
            </select>
            <select name="city" id="" onChange={(e) => { setCity(e.target.value); }}>
              <option value="">{t("dashboard.filter.city")}</option>
              {citiesNames.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
        }
        <div className='filter-inputs'>
          <button onClick={(e) => { handleReset(e) }}>{t("dashboard.filter.buttonReset")}</button>
          <button onClick={(e) => { handleSearch(e) }}>{t("dashboard.filter.buttonApply")}</button>

        </div>


      </div>
    </div>
  )
}


export default Filters