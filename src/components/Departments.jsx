import { useSelector } from 'react-redux';
import Thead from './Table/Thead';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';

function Departments() {

  const { t } = useTranslation("global");
  const comingData = useSelector((state) => state.users.departments);
  const path = "update-department";
  const sortingElements = {
    "company": ["company", "name"],
    "town": ["town", "name"],
    "city": ["town", "city", "name"],
    "region": ["town", "region", "name"],
  }
  const singleElements = ["name", "addressDetail", "active", "id"];
  const tableData = {
    "title": t("departments.title"),
    "searchPlaceholder": t("departments.searchPlaceholder"),
    "0": t("departments.headers.no"),
    "1": t("departments.headers.name"),
    "2": t("departments.headers.company"),
    "3": t("departments.headers.town"),
    "4": t("departments.headers.city"),
    "5": t("departments.headers.region"),
    "6": t("departments.headers.address"),
    "7": t("departments.headers.activation"),
    "8": t("departments.headers.actions"),
    "button": t("departments.button")
  }
  const headerPaths = {
    "id": {
      "headerPath": "id",
      "translator": ""
    },
    "name": {
      "headerPath": "name",
      "translator": "departments.types."
    },
    "company": {
      "headerPath": ["company", "name"],
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
      "headerPath": "active",
      "translator": ""
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
        type={"departments"}
      />
      <Footer />
    </>
  )
}

export default Departments


// const a = {
//   "id": 0,
//   "name": "string",
//   "company": {
//     "id": 0,
//     "name": "string",
//     "shortName": "string",
//     "active": true,
//     "town": {
//       "id": 0,
//       "name": "string",
//       "region": {
//         "id": 0,
//         "name": "string"
//       },
//       "city": {
//         "id": 0,
//         "name": "string"
//       },
//       "companyIds": [
//         0
//       ],
//       "departmentIds": [
//         0
//       ]
//     },
//     "companyType": {
//       "id": 0,
//       "name": "string",
//       "active": true
//     },
//     "addressDetail": "string",
//     "createdAt": "2025-07-27T17:35:43.985Z"
//   },
//   "departmentType": {
//     "id": 0,
//     "name": "string",
//     "active": true
//   },
//   "town": {
//     "id": 0,
//     "name": "string",
//     "region": {
//       "id": 0,
//       "name": "string"
//     },
//     "city": {
//       "id": 0,
//       "name": "string"
//     },
//     "companyIds": [
//       0
//     ],
//     "departmentIds": [
//       0
//     ]
//   },
//   "addressDetail": "string",
//   "active": true
// }