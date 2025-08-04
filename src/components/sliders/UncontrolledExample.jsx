import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function UncontrolledExample() {
    const [t, i18n] = useTranslation("global");
  
    return (
        <div style={{padding:'10px'}}>
        <Carousel className='mt-3 slider'>
            <Carousel.Item>
                <ExampleCarouselImage image="/ofis-1.jpg"/>
                <Carousel.Caption>
                    <h3>{t("home.sliders.1.title")}</h3>
                    <p>{t("home.sliders.1.description")}</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <ExampleCarouselImage text="Second slide" image="/ofis-2.jpg" />
                <Carousel.Caption>
                    <h3>{t("home.sliders.2.title")}</h3>
                    <p>{t("home.sliders.2.description")}</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <ExampleCarouselImage text="Third slide" image="/ofis-3.jpg" />
                <Carousel.Caption>
                    <h3>{t("home.sliders.3.title")}</h3>
                    <p>{t("home.sliders.3.description")}</p>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default UncontrolledExample;