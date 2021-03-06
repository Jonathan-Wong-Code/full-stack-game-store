import React from 'react';
import { useDispatch } from 'react-redux';
import { string, number } from 'prop-types';
import ReactGa from 'react-ga';

import { deleteCartItem } from '../../actions/cart';

import {
  CartItemContainer,
  ImgContainer,
  H3,
  Prices,
  OriginalPrice,
  GameTitle,
  RemoveButton,
  Img
} from './css';
import { formatPricing } from '../../utils/utils';

const ItemPreview = ({ title, price, originalPrice, image, id }) => {
  const dispatch = useDispatch();

  const hasDiscount = price !== originalPrice;

  const onRemoveClick = id => {
    ReactGa.event({
      category: 'Remove from Cart Button',
      action: `Removed ${title} from cart`
    });
    dispatch(deleteCartItem(id));
  };

  return (
    <CartItemContainer>
      <ImgContainer>
        <Img src={image} alt={`Thumbnail of ${title}`} />
      </ImgContainer>
      <GameTitle>
        <H3>{title}</H3>
        <RemoveButton onClick={() => onRemoveClick(id)}>remove</RemoveButton>
      </GameTitle>

      <Prices>
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
