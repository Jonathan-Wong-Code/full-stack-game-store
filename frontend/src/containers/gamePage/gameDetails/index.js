import React from 'react';
import { string, arrayOf } from 'prop-types';

import { renderArrayText } from '../../../utils/utils';
import {
  DescriptionDetailsSection,
  DescriptionContainer,
  DetailList,
  Detail,
  GameDetailsContainer
} from './css';

import { SubHeading } from '../index.css';

const GameDetails = ({
  description,
  genre,
  releaseDate,
  company,
  operatingSystems
}) => {
  return (
    <DescriptionDetailsSection>
      <DescriptionContainer>
        <SubHeading>Description</SubHeading>
        <p>{description}</p>
      </DescriptionContainer>
      <GameDetailsContainer>
        <SubHeading>Game details</SubHeading>
        <DetailList>
          {genre && (
            <Detail>
              Genre:
              <span>{renderArrayText(genre)} </span>
            </Detail>
          )}
          <Detail>
            Release date:
            <span>{new Date(releaseDate).toDateString()}</span>
          </Detail>
          {company && (
            <Detail>
              Company: <span>{company}</span>
            </Detail>
          )}
          <Detail>
            Operating Systems:
            <span>{renderArrayText(operatingSystems)}</span>
          </Detail>
        </DetailList>
      </GameDetailsContainer>
    </DescriptionDetailsSection>
  );
};

GameDetails.propTypes = {
  description: string.isRequired,
  genre: arrayOf(string),
  releaseDate: string.isRequired,
  company: string,
  operatingSystems: arrayOf(string).isRequired
};

GameDetails.defaultProps = {
  genre: null,
  company: null
};

export default GameDetails;
