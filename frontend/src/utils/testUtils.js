import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../theme/themes';
import { configureStore } from '../store';
import { ReviewProvider } from '../containers/gamePage/Reviews/context';
const store = configureStore();

export const renderTheme = ui => {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
};

export const renderAllProviders = (ui, contextState) => {
  return render(
    <ThemeProvider theme={defaultTheme}>
      <ReviewProvider initialState={contextState}>
        <Provider store={store}>{ui}</Provider>
      </ReviewProvider>
    </ThemeProvider>
  );
};
