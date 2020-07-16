import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { array } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import useSetState from '../../hooks/useSetState';
import { CarouselContainer, CarouselContent } from './css';
import CarouselPanel from '../CarouselPanel';
import Arrow from './Arrow';
import Dots from './Dots';

const Carousel = ({ slides }) => {
  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const thirdSlide = slides[2];
  const lastSlide = slides[slides.length - 1];
  const secondLastSlide = slides[slides.length - 2];

  const [
    { transition, translate, activePanel, renderedSlides, windowWidth },
    setState
  ] = useSetState({
    renderedSlides: [
      secondLastSlide,
      lastSlide,
      firstSlide,
      secondSlide,
      thirdSlide
    ],

    activePanel: 0,
    transition: 0.45,
    windowWidth: 0
  });

  const contentBoxRef = useRef();
  const transitionRef = useRef();
  const resizeRef = useRef();

  // Utility functions
  const isMobile = () => windowWidth < 576;
  const isFirstSlide = () => activePanel === 0;
  const isLastSlide = () => activePanel === slides.length - 1;

  // Update Refs on every render due to Javascript closures.
  useEffect(() => {
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
  });

  // Initial setup. The 0.7 is used to match the 70vw of the carousel length.
  // This is used throughout to match desktop styles. * 2 is because the middle panel is always 2 panels in from the beginning.

  useEffect(() => {
    setState({
      translate:
        window.innerWidth > 576
          ? window.innerWidth * 0.7 * 2
          : window.innerWidth * 2,
      windowWidth: window.innerWidth
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

    const transitionend = contentBoxRef.current.addEventListener(
      'transitionend',
      smooth
    );
    return () =>
      contentBoxRef.current.removeEventListener('transitionend', transitionend);
  }, []);

  // Resize Listener
  useLayoutEffect(() => {
    const resize = () => {
      resizeRef.current();
    };
    const onResize = window.addEventListener('resize', resize);
    window.removeEventListener('resize', onResize);
  }, []);

  const handleResize = () => {
    setState({
      translate: isMobile()
        ? window.innerWidth * 2
        : window.innerWidth * 0.7 * 2,
      transition: 0,
      windowWidth: window.innerWidth
    });
  };

  const nextSlide = () => {
    setState({
      translate: isMobile()
        ? translate + windowWidth
        : translate + windowWidth * 0.7,
      activePanel: isLastSlide() ? 0 : activePanel + 1
    });
  };

  const prevSlide = () => {
    setState({
      translate: isMobile()
        ? translate - windowWidth
        : translate - windowWidth * 0.7,
      activePanel: isFirstSlide() ? slides.length - 1 : activePanel - 1
    });
  };

  // Set slides on every transition. Assumes at least always 3 slides in the carousel.
  const smoothTransition = () => {
    let _slides = [];
    // Last slide
    if (isLastSlide()) {
      _slides = [
        slides[slides.length - 3],
        slides[slides.length - 2],
        lastSlide,
        firstSlide,
        secondSlide
      ];
    } // first slide
    else if (isFirstSlide()) {
      _slides = [
        slides[slides.length - 2],
        lastSlide,
        firstSlide,
        secondSlide,
        slides[2]
      ];
    } else {
      _slides = [
        slides[activePanel - 2] ? slides[activePanel - 2] : lastSlide,
        slides[activePanel - 1],
        slides[activePanel],
        slides[activePanel + 1],
        slides[activePanel + 2] ? slides[activePanel + 2] : firstSlide
      ];
    }

    // reset to original position
    setState({
      renderedSlides: _slides,
      transition: 0,
      translate: isMobile() ? windowWidth * 2 : windowWidth * 0.7 * 2
    });
  };
  if (!renderedSlides) return null;
  return (
    <>
      <CarouselContainer>
        <Arrow direction="left" handleClick={prevSlide} left="25px" />
        <Arrow direction="right" handleClick={nextSlide} right="45px" />
        <CarouselContent
          translate={translate}
          transition={transition}
          width={
            isMobile()
              ? windowWidth * renderedSlides.length
              : windowWidth * 0.7 * renderedSlides.length
          }
          className="carousel-content"
          ref={contentBoxRef}
        >
          {renderedSlides.map((game, i) => (
            <CarouselPanel
              key={uuidv4()}
              promoText={game.promoText}
              gamePrice={game.price}
              gameDiscount={game.discount}
              gameImage={game.coverImage}
              isAddToCart
              buttonText="Add to Cart"
              hasButton
              textColorLight
              gameTitle={game.title}
              tabIndex={i === 2 ? 0 : -1}
            />
          ))}
        </CarouselContent>
      </CarouselContainer>
      <Dots slides={slides} activeIndex={activePanel} />
    </>
  );
};

Carousel.propTypes = {
  slides: array.isRequired
};

export default Carousel;
