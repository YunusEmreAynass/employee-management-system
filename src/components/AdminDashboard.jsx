
import Header from './Header'
import '../css/dashboard.css'
import { useTranslation } from 'react-i18next'
import Footer from './Footer'
import { useSelector } from 'react-redux';
import Thead from './Table/Thead';

function AdminDashboard() {
  const { t } = useTranslation("global");
  const users = useSelector((state) => state.users.user);
  const comingData=users.filter(user => user.role.name !== "ADMIN");//admin olan kullanıcıyı listede gösterme çünkü admin kendisi kullanıcıları listeliyor ztn.
  const path = "update-user";
  const sortingElements = {//sort edilcek headerlardan hiyerarşiye sahip olanlar
    "role": ["role", "name"],

  }
  const singleElements = ["id", "name", "surname", "email", "departmentName"];//sort edilip hiyerarşiye sahip olmayanlar
  const tableData = {//dinamik yapı için her bir veri türü(company, department, user) için farklı verileri gönderiyoruz burdakiler table'ın header'larını oluşturmak için kullanılıyor
    "title": t("dashboard.title"),
    "searchPlaceholder": t("dashboard.searchPlaceholder"),
    "button": t("dashboard.button"),
    "0": t("dashboard.no"),
    "1": t("dashboard.name"),
    "2": t("dashboard.surname"),
    "3": t("dashboard.email"),
    "4": t("dashboard.department"),
    "5": t("dashboard.role"),
    "6": t("dashboard.actions")

  };

  const headerPaths = {//table'ın verilerine erişim için bunu kullanıyoruz nested olanlarda headerpath bir yola sahip ve translatoru olan da translator değerine sahip
    "id": {
      "headerPath": "id",
      "translator": ""
    },
    "name": {
      "headerPath": "name",
      "translator": ""
    },
    "surname": {
      "headerPath": "surname",
      "translator": ""
    },
    "email": {
      "headerPath": "email",
      "translator": ""
    },
    "departmentName": {
      "headerPath": "departmentName",
      "translator": "dashboard.departments."
    },
    "role": {
      "headerPath": ["role", "name"],
      "translator": "dashboard.roles."
    }
  }

  return (
    <div>
      <Header />
      <Thead
        comingData={comingData}//tabloda gösterilicek veriler
        sortingElements={sortingElements}
        singleElements={singleElements}
        tableData={tableData}
        headerPaths={headerPaths}
        path={path}
        type={"users"}
      />
      <Footer />


    </div>
  )
}

export default AdminDashboard