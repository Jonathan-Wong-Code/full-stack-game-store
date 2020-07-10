import React, { useState, useRef, useEffect } from 'react';
import { node, string } from 'prop-types';

import { AccordionBody, AccordionButton, AccordionContent } from './css';
const Accordion = ({ children, title }) => {
  const [active, setActive] = useState(false);
  const contentRef = useRef(null);

  return (
    <AccordionBody>
      <AccordionButton
        onClick={() => setActive(prevState => !prevState)}
        active={active}
      >
        {title}
      </AccordionButton>

      <AccordionContent
        style={{ height: active ? `${contentRef.current.scrollHeight}px` : 0 }}
        ref={contentRef}
      >
        {children}
      </AccordionContent>
    </AccordionBody>
  );
};

Accordion.propTypes = {
  children: node.isRequired,
  title: string.isRequired
};

export default Accordion;
