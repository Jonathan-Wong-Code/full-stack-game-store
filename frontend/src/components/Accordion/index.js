import React, { useState, useRef, cloneElement } from 'react';
import { node, string } from 'prop-types';

import { AccordionBody, AccordionButton, AccordionContent } from './css';
const Accordion = ({ children, title }) => {
  const [active, setActive] = useState(false);
  const contentRef = useRef(null);

  const childWithProps = React.Children.map(children, child =>
    cloneElement(child, { active })
  );

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
        {childWithProps}
      </AccordionContent>
    </AccordionBody>
  );
};

Accordion.propTypes = {
  children: node.isRequired,
  title: string.isRequired
};

export default Accordion;
