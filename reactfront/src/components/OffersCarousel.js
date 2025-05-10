import React from 'react';
import { Carousel } from 'react-bootstrap';

const OffersCarousel = () => {
  return (
    <div className="offers-carousel">
      <h2 className="offers-title">Ofertas Destacadas</h2>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src=""
            alt="Producto 1"
          />
          <Carousel.Caption>
            <h3>Taladro DeWalt</h3>
            <p>Precio oferta: $59.990</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x300?text=Producto+2"
            alt="Producto 2"
          />
          <Carousel.Caption>
            <h3>Destornillador Bosch</h3>
            <p>Precio oferta: $29.990</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x300?text=Producto+3"
            alt="Producto 3"
          />
          <Carousel.Caption>
            <h3>Martillo Stanley</h3>
            <p>Precio oferta: $19.990</p>
          </Carousel.Caption>
        </Carousel.Item>
        
      </Carousel>
    </div>
  );
};

export default OffersCarousel;
