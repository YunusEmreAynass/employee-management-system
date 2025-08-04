import React from 'react'
import { FaInstagram } from "react-icons/fa"
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import '../css/footer.css'
function Footer() {
  const { t } = useTranslation("global");
  return (
      <div>
      <footer>
        <h2>Delta</h2>
        <div className='footer-links'>
          <ul className='page-links'>
            <li>
              <a href="/">{t("footer.home")}</a>
            </li>
            <li>
              <a href="/about">{t("footer.about")}</a>
            </li>
            <li>
              <a href="/contact">{t("footer.contact")}</a>
            </li>
            <li>
              <a href="/privacy">{t("footer.privacy")}</a>
            </li>
          </ul>
          <h3 style={{wordSpacing:"10px",letterSpacing:"3px"}}>{t("footer.title")}</h3>
          <ul className='social-links'>
            <li>
              <a href=""><FaInstagram /></a>
            </li>
            <li>
              <a href=""><FaFacebook /></a>
            </li>
            <li>
              <a href=""><FaXTwitter /></a>
            </li>
            <li>
              <a href=""><FaTiktok /></a>
            </li>
            </ul>
        </div>
        <p style={{color:'lightgray',margin:'10px',letterSpacing:'2px',wordSpacing:'7px'}}>{t("footer.reserved")}</p>


          </footer>
    </div>
  )
}

export default Footer