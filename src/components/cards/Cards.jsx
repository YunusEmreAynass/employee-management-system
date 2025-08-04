import React from 'react'
import Card from './Card'
import '../../css/cards.css' // Assuming you have a CSS file for styling the cards
import { useTranslation } from 'react-i18next';

function Cards() {
    const { t } = useTranslation("global");
    return (
        <div className='cards'>
            <Card img={'/company.png'} title={t("home.cards.1.title")} description={t("home.cards.1.description")} t={t} id={1} />
            <Card img={'/department.png'} title={t("home.cards.2.title")} description={t("home.cards.2.description")} t={t} id={2} />
            <Card img={'/user.png'} title={t("home.cards.3.title")} description={t("home.cards.3.description")} t={t} id={3} />
        </div>
    )
}

export default Cards