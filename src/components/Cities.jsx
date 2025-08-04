
import { useSelector } from 'react-redux';
import Thead from './Table/Thead';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
function Cities() {
const { t } = useTranslation("global");
  const comingData = useSelector((state) => state.users.cities);
  const path = "update-city";//update butonuna tıklandığında yönlendirilecek path için kullanılır
  const singleElements = ["id", "name"];
  const tableData = {
    "title": t("cities.titleCity"),
    "titleRegion": t("cities.titleRegion"),
    "titleTown": t("cities.titleTown"),
    "searchPlaceholder": t("cities.searchPlaceholder"),

    "button": t("cities.button"),
    "buttonTown": t("cities.buttonTown"),
    "buttonRegion": t("cities.buttonRegion"),
    "0": t("cities.headers.no"),
    "1": t("cities.headers.name"),
    "2": t("cities.headers.locations"),
    "3": t("cities.headers.actions")
  };
  const sortingElements = {
    
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
    <>
      <Header />
      <Thead
        comingData={comingData}
        sortingElements={sortingElements}
        singleElements={singleElements}
        tableData={tableData}
        headerPaths={headerPaths}
        path={path}
        type={"cities"}
      />
      <Footer />
    </>
  )
}

export default Cities