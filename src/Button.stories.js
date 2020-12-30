import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from './Button';
import { withScreenshot } from 'storybook-chrome-screenshot';

storiesOf('Button', module)
	.addDecorator(withScreenshot())
  .add('with default style', () => <Button>Default</Button>)
  .add('with primary style', () => <Button primary>Primary</Button>);