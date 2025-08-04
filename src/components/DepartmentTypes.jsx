import Thead from './Table/Thead';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import { useSelector } from 'react-redux';

function DepartmentTypes() {
    const { t } = useTranslation("global");
    const comingData = useSelector((state) => state.users.departmentTypes);
    const path = "update-department-type";
    const singleElements = ["id", "name"];
    const tableData = {
        "title": t("departmentTypes.title"),
        "searchPlaceholder": t("departmentTypes.searchPlaceholder"),
        "button": t("departmentTypes.button"),
        "0": t("departmentTypes.headers.no"),
        "1": t("departmentTypes.headers.name"),
        "2": t("departmentTypes.headers.actions")
    };
    const sortingElements = {};
    const headerPaths = {
        "id": {
            "headerPath": "id",
            "translator": ""
        },
        "name": {
            "headerPath": "name",
            "translator": ""
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
        type={"departmentTypes"}
      />
      <Footer />
    </>
  )
}

export default DepartmentTypes