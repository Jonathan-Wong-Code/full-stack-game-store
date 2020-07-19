import React, { useState, useRef, cloneElement, createContext } from 'react';
import { node, string } from 'prop-types';

import { AccordionBody, AccordionButton, AccordionContent } from './css';

export const AccordionContext = createContext();

const Accordion = ({ children, title }) => {
  const [active, setActive] = useState();
  const contentRef = useRef(null);

  const childWithProps = React.Children.map(children, child =>
    cloneElement(child, { active, setActive })
  );

  return (
    <AccordionBody>
      <AccordionButton
        onClick={() => setActive(prevState => !prevState)}
        active={active}
      >
        {title}
      </AccordionButton>
      <AccordionContext.Provider value={{ active, setActive }}>
        <AccordionContent
          style={{
            height: active ? `${contentRef.current.scrollHeight}px` : 0
          }}
          ref={contentRef}
        >
          {childWithProps}
        </AccordionContent>
      </AccordionContext.Provider>
    </AccordionBody>
  );
};

Accordion.propTypes = {
  children: node.isRequired,
  title: string.isRequired
};

export default Accordion;
