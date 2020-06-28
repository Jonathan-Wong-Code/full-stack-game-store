import React, { useRef, useEffect } from 'react';
import { array } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import useSetState from '../../hooks/useSetState';
import useWindowWidth from '../../hooks/useWindowWidth';
import { CarouselContainer, CarouselContent } from './css';
import CarouselPanel from '../CarouselPanel';
import Arrow from './Arrow';
import Dots from './Dots';
const Carousel = ({ slides }) => {
  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const lastSlide = slides[slides.length - 1];

  const [
    { transition, translate, activePanel, renderedSlides },
    setState
  ] = useSetState({});

  const transitionRef = useRef();

  // Update Refs on every render
  useEffect(() => {
    transitionRef.current = smoothTransition;
  });

  const { windowWidth } = useWindowWidth();
  // Initial setup
  useEffect(() => {
    setState({
      translate: window.innerWidth,
      renderedSlides: [lastSlide, firstSlide, secondSlide],
      activePanel: 0,
      transition: 0.45
    });
  }, []);

  // Reset transition
  useEffect(() => {
    if (transition === 0) setState({ transition: 0.45 });
  }, [transition]);

  // Set up transitionend listener
  useEffect(() => {
    const smooth = e => {
      if (e.target.className.includes('carousel-content')) {
        transitionRef.current();
      }
    };
    const transitionend = window.addEventListener('transitionend', smooth);
    return () => window.removeEventListener('transitionend', transitionend);
  }, []);

  const nextSlide = () => {
    setState({
      translate: translate + windowWidth,
      activePanel: activePanel === slides.length - 1 ? 0 : activePanel + 1
    });
  };

  const prevSlide = () => {
    setState({
      translate: 0,
      activePanel: activePanel === 0 ? slides.length - 1 : activePanel - 1
    });
  };

  const smoothTransition = () => {
    let _slides = [];
    // Last slide
    if (activePanel === slides.length - 1) {
      _slides = [slides[slides.length - 2], lastSlide, firstSlide];
    } // first slide
    else if (activePanel === 0) {
      _slides = [lastSlide, firstSlide, secondSlide];
    } else {
      _slides = slides.slice(activePanel - 1, activePanel + 2);
    }

    // reset to original position
    setState({
      renderedSlides: _slides,
      transition: 0,
      translate: windowWidth
    });
  };

  if (!renderedSlides) return null;
  return (
    <CarouselContainer>
      <CarouselContent
        translate={translate}
        transition={transition}
        width={windowWidth * renderedSlides.length}
        className="carousel-content"
      >
        {renderedSlides.map(game => (
          <CarouselPanel
            key={uuidv4()}
            promoText="Now available"
            offerDescription={`${game.title}`}
            gamePrice={game.price}
            gameDiscount={game.discount}
            gameImage={game.coverImage}
            isAddToCart
            buttonText="Add to Cart"
            hasButton
            textColorLight
            gameTitle={game.title}
          />
        ))}
      </CarouselContent>
      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />
      <Dots slides={slides} activeIndex={activePanel} />
    </CarouselContainer>
  );
};

Carousel.propTypes = {
  slides: array.isRequired
};

export default Carousel;
