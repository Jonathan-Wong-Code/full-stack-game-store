import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderAllProviders } from '../../../utils/testUtils';
import ItemPreview from '..';
import { deleteCartItem } from '../../../actions/cart';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch
}));

afterEach(jest.clearAllMocks);

describe('<ItemPreview />', () => {
  it('renders', () => {
    renderAllProviders(
      <ItemPreview
        originalPrice={80}
        title="Fallout 3"
        price={50}
        image="https://www.retromags.com/applications/core/interface/imageproxy/imageproxy.php?img=https://www.slowdown.vg/images/Fallout-3.jpg&key=1f48366a2299af9586a93bd371e404ea4e92f88496b5252d821ea2ab171a6261"
        id="test123"
      />
    );
  });

  it('should dispatch the deleteCartItem action when the remove button is clicked', () => {
    renderAllProviders(
      <ItemPreview
        originalPrice={80}
        title="Fallout 3"
        price={50}
        image="https://www.retromags.com/applications/core/interface/imageproxy/imageproxy.php?img=https://www.slowdown.vg/images/Fallout-3.jpg&key=1f48366a2299af9586a93bd371e404ea4e92f88496b5252d821ea2ab171a6261"
        id="test123"
      />
    );

    const removeButton = screen.getByText('remove');
    fireEvent.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: deleteCartItem().type,
      payload: 'test123'
    });
  });

  it('should show the original price if there is a discount', () => {
    renderAllProviders(
      <ItemPreview
        originalPrice={80}
        title="Fallout 3"
        price={50}
        image="https://www.retromags.com/applications/core/interface/imageproxy/imageproxy.php?img=https://www.slowdown.vg/images/Fallout-3.jpg&key=1f48366a2299af9586a93bd371e404ea4e92f88496b5252d821ea2ab171a6261"
        id="test123"
      />
    );

    expect(screen.getByText('$80.00')).toBeDefined();
    expect(screen.getByText('$50.00')).toBeDefined();
  });

  it('should show one price if there is no discount.', () => {
    renderAllProviders(
      <ItemPreview
        originalPrice={80}
        title="Fallout 3"
        price={80}
        image="https://www.retromags.com/applications/core/interface/imageproxy/imageproxy.php?img=https://www.slowdown.vg/images/Fallout-3.jpg&key=1f48366a2299af9586a93bd371e404ea4e92f88496b5252d821ea2ab171a6261"
        id="test123"
      />
    );

    expect(screen.getByText('$80.00')).toBeDefined();
    expect(screen.queryByTestId('item-preview-original-price')).toBeNull();
  });
});
