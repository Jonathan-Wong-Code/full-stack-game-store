import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';

import axios from 'axios';

import { renderAllProviders } from '../../../utils/testUtils';

import Header from '..';

jest.mock('axios');

describe('<Header />', () => {
  it('renders with a logged in user', async () => {
    axios.mockImplementationOnce(() => Promise.resolve());

    renderAllProviders(<Header />, null, {
      auth: {
        user: {
          name: 'test',
          photo: 'test',
          id: 'id123'
        }
      }
    });

    expect(screen.getByText('Logout')).toBeDefined();
    expect(screen.getByText('Profile')).toBeDefined();

    expect(screen.queryByText('Login')).toBeNull();
    expect(screen.queryByText('Signup')).toBeNull();

    fireEvent.click(screen.getByText('Logout'));
    await waitFor(() => expect(axios).toHaveBeenCalledTimes(1));
    expect(axios).toHaveBeenCalledWith({
      method: 'GET',
      url: 'http://localhost:5000/api/v1/users/logout',
      withCredentials: true
    });
  });

  it('renders with no logged in user', () => {
    renderAllProviders(<Header />, null, {
      auth: {
        user: null
      }
    });

    expect(screen.queryByText('Logout')).toBeNull();
    expect(screen.queryByText('Profile')).toBeNull();

    expect(screen.getByText('Login')).toBeDefined();
    expect(screen.getByText('Signup')).toBeDefined();
  });
});
