
import Thead from './Table/Thead';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import { useSelector } from 'react-redux';
function CompanyTypes() {
    const { t } = useTranslation("global");
    const comingData = useSelector((state) => state.users.companyTypes);
    const path = "update-company-type";
    const singleElements = ["id", "name"];
    const sortingElements = {};
    const tableData = {
        "title": t("companyTypes.title"),
        "searchPlaceholder": t("companyTypes.searchPlaceholder"),
        "button": t("companyTypes.button"),
        "0": t("companyTypes.headers.no"),
        "1": t("companyTypes.headers.name"),
        "2": t("companyTypes.headers.actions")
    };
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
        <div>
            <Header />
            <Thead
                comingData={comingData}
                sortingElements={sortingElements}
                singleElements={singleElements}
                tableData={tableData}
                headerPaths={headerPaths}
                path={path}
                type="companyTypes"
            />
            <Footer />
        </div>
    )
}

export default CompanyTypes