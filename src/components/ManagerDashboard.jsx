import Header from './Header'
import Footer from './Footer'
import { useSelector } from 'react-redux';
import Thead from './Table/Thead';
import { useTranslation } from 'react-i18next';
function ManagerDashboard() {
  const { t } = useTranslation("global");
  const userSelf= useSelector((state) => state.users.userSelf);
  const allUsers = useSelector((state) => state.users.user);
  const comingData = allUsers.filter(user => user.department?.name === userSelf?.department?.name && user.role.name !== "ADMIN"&& user.role.name !== "MANAGER");// Managerin kendi departmanındaki kullanıcıları listeler o yüzden manager ve admin dışındakileri alıyoruz
  const path = "update-user";
  const sortingElements = {
    "role": ["role", "name"],
  };
  const singleElements = ["id", "name", "surname", "email", "departmentName"];
  const tableData = {
    "title": t("dashboard.title"),
    "searchPlaceholder": t("dashboard.searchPlaceholder"),
    "button": t("dashboard.button"),
    "0": t("dashboard.no"),
    "1": t("dashboard.name"),
    "2": t("dashboard.surname"),
    "3": t("dashboard.email"),
    "4": t("dashboard.role"),
    "5": t("dashboard.actions"),

  };
  const headerPaths = {
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
    "role": {
      "headerPath": ["role", "name"],
      "translator": "dashboard.roles."
    }
  };
  return (
    <>
      <Header />
      <Thead
        comingData={comingData}
        sortingElements={sortingElements}
        singleElements={singleElements}
        tableData={tableData}
        headerPaths={headerPaths}
        path={path}
        showRole={false}
        type={"users"}
      />
      <Footer />

    </>
  )
}

export default ManagerDashboard