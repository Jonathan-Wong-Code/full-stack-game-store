import { addParameters, addDecorator } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import { context } from './context';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { GlobalStyle } from '../theme/Global';
import { ProviderWrapper } from '../src/utils/utils';
import { storiesOf } from '@storybook/react';

addParameters({
  backgrounds: [
    {
      name: 'Default Theme',
      value: '#ffffff',
      default: true
    }
  ]
});

addDecorator(withContexts(context));
addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(s => (
  <>
    <GlobalStyle />
    {s()}
  </>
));

// ACTS LIKE A WRAPPER FOR YOUR COMPONENTS.
addDecorator(story => <ProviderWrapper story={story()} />);

// Modal

addDecorator(s => (
  <>
    <div id="header" />
    <div id="root-page" />
    {s()}
  </>
));
