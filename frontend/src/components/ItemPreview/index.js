import React from 'react';
import { useDispatch } from 'react-redux';
import { string, number } from 'prop-types';

import { deleteCartItem } from '../../actions/cart';

import {
  CartItemContainer,
  ImgContainer,
  H3,
  Prices,
  OriginalPrice,
  GameTitle,
  RemoveButton
} from './css';
import { formatPricing } from '../../utils/utils';

const ItemPreview = ({ title, price, originalPrice, image, id }) => {
  const dispatch = useDispatch();

  const hasDiscount = price !== originalPrice;
  return (
    <CartItemContainer>
      <ImgContainer className="imgContainer">
        <img src={image} alt={`Thumbnail of ${title}`} />
      </ImgContainer>
      <GameTitle>
        <H3>{title}</H3>
        <RemoveButton onClick={() => dispatch(deleteCartItem(id))}>
          remove
        </RemoveButton>
      </GameTitle>
      <Prices className="prices">
        {hasDiscount && (
          <OriginalPrice data-testid="item-preview-original-price">
            {formatPricing(originalPrice)}
          </OriginalPrice>
        )}
        <p>{formatPricing(price)}</p>
      </Prices>
    </CartItemContainer>
  );
};

ItemPreview.propTypes = {
  title: string.isRequired,
  price: number.isRequired,
  originalPrice: number,
  image: string.isRequired,
  id: string.isRequired
};

ItemPreview.defaultProps = {
  originalPrice: undefined
};

export default ItemPreview;
