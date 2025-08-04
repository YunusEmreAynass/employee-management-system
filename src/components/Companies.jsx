
import React from 'react';
import { useSelector } from 'react-redux';
import Thead from './Table/Thead';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
function Companies() {
  const { t } = useTranslation("global");
  const comingData = useSelector((state) => state.users.companies);
  const path = "update-company";
  const sortingElements = {
    "town": ["town", "name"],
    "city": ["town", "city", "name"],
    "region": ["town", "region", "name"],
  }
  const singleElements = ["name", "addressDetail", "active", "id","shortName"];

  const tableData = {
    "title": t("companies.title"),
    "searchPlaceholder": t("companies.searchPlaceholder"),
    "0": t("companies.headers.no"),
    "1": t("companies.headers.name"),
    "2": t("companies.headers.shortName"),
    "3": t("companies.headers.town"),
    "4": t("companies.headers.city"),
    "5": t("companies.headers.region"),
    "6": t("companies.headers.address"),
    "7": t("companies.headers.activation"),
    "8": t("companies.headers.actions"),
    "button": t("companies.button")
  }
  const headerPaths = {
    "id": {
      "headerPath": "id",
      "translator": ""
    },
    "name": {
      "headerPath": "name",
      "translator": ""
    },
    "shortName": {
      "headerPath": "shortName",
      "translator": ""
    },
    "town": {
      "headerPath": ["town", "name"],
      "translator": ""
    },
    "city": {
      "headerPath": ["town", "city", "name"],
      "translator": ""
    },
    "region": {
      "headerPath": ["town", "region", "name"],
      "translator": ""
    },
    "addressDetail": {
      "headerPath": "addressDetail",
      "translator": ""
    },
    "active": {
      "headerPath": 'active',
      "translator": ''
    }
  }








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
        type="companies"
      
      />
      <Footer />
    </>
  )
}

export default Companies




