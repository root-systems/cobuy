/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure } from '@storybook/react';

function loadStories() {
  // add any topic stories here!
  require('../app/stories')
}

configure(loadStories, module);
