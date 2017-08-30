# cobuy

:seedling: :package: :stew: :family: Helping people buy good food at good prices, together.

[![Kanban](https://badge.waffle.io/enspiral-root-systems/cobuy.png?label=ready&title=Ready)](http://waffle.io/enspiral-root-systems/cobuy)

## Table of Contents

- [Setup](#setup)
- [How our stack works](#how-our-stack-works)
- [Stack](#stack)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm run dev](#npm-run-dev)
  - [npm test](#npm-test)
  - [npm run lint](#npm-run-lint)
  - [npm run db](#npm-run-db)
- [Developer Notes](#developer-notes)
- [License](#license)

## Setup

Before we start, please

- [install `node@8` and `npm@5`](https://dogstack.js.org/guides/how-to-install-js.html)
- [install Git LFS](https://git-lfs.github.com/)

```shell
git lfs install
git clone git@github.com:root-systems/cobuy
cd cobuy
npm run burnthemall # TODO npm install
# see 'How to get private development config' section below
npm run db migrate:latest
npm run db seed:run
npm run dev
```

### System Dependencies

- Postgres
- [`git-lfs`](https://git-lfs.github.com/)

## How our stack works

### Technical breakdown and references for/as examples

- Cobuy uses [`dogstack`](https://dogstack.js.org)
- React and JSX for DOM stuff, as per, but also [Hyperscript](https://github.com/mlmorg/react-hyperscript) as an alternative to JSX
- [Recompose](https://github.com/acdlite/recompose) in our React components for purity
  - Files: `app/components/Navigation.js`
  - PRs: https://github.com/root-systems/cobuy/pull/100/files
- [Fela](https://github.com/rofrischmann/fela) to manage styles
  - Files: `<any dumb component and its style file>`
- [Material-UI](http://www.material-ui.com/) for ready-styled components
  - Files: `<any component that has buttons or text fields or sliders>`
- [React-intl](https://github.com/yahoo/react-intl) to manage internationalization
  - Files: `app/locales/en.json`, `<any component with text>`
  - https://github.com/root-systems/cobuy/pull/80
- [Storybook](https://github.com/storybooks/storybook) for developing and testing our dumb components easily
  - Files: `.storybook/config.js`, `agents/stories/index.js`, `agents/stories/Profile.js`
  - PRs: https://github.com/root-systems/cobuy/pull/51/files
- Redux for state management, as per
- [Redux-fp](https://github.com/rvikmanis/redux-fp) for 'updaters' instead of 'reducers'
  - Files: `*/updaters/*`
  - PRs: https://github.com/root-systems/cobuy/pull/103/files
- [Redux-observable](redux-observable.js.org) for managing async operations
  - Files: `ordering/epic.js`, 
  - PRs: https://github.com/root-systems/cobuy/pull/103/files
- [Redux-form](http://redux-form.com/6.8.0/) to connect React forms to state
  - Files: `agents/components/SignIn.js`
  - PRs: https://github.com/root-systems/cobuy/pull/59/files
- [Reselect](https://github.com/reactjs/reselect) for our getters
  - Files: `*/getters/*`
  - PRs: https://github.com/root-systems/cobuy/pull/104/files
- [Ramda](http://ramdajs.com/) as our general utility library with a strongly functional flavour
  - Files: `<almost any>`
- [Feathers](https://feathersjs.com/) for our backend API layer
  - PRs: https://github.com/root-systems/cobuy/pull/116
- [Feathers-reactive](https://github.com/feathersjs/feathers-reactive)
- [Feathers-action-react](https://github.com/ahdinosaur/feathers-action-react)
- [Feathers-action](https://github.com/ahdinosaur/feathers-action) to provide CRUD actions out of the box
  - Files: `*/dux/*`, `*/services/*`, `*/containers/*`, `server.js`, 
  - PRs: https://github.com/root-systems/cobuy/pull/116
- [Knex](http://knexjs.org/) for interfacing with DB
  - Files: `db/migrations/*`
  - PRs: https://github.com/root-systems/cobuy/pull/116/files
- [Dogstack-agents](https://github.com/dogstack/dogstack-agents) to manage users and credentials
  - Files: `agents/containers/Register.js`
  - PRs: https://github.com/root-systems/cobuy/pull/59/files
  
### Basic relationships between things (very roughly and probably slightly incorrectly)

- Dumb components
  - components && style files
  - components && their local state
- Higher-order components (HOC) or containers
  - (container && getters && props && actions) && dumb component/s
- Dataflow within the client
  - from state to components
    - state -> getters -> HOC components (containers) -> dumb components
  - from components to state
    - dumb components -> HOC components (containers) -> actions -> updaters && epics -> state
  - from components to state with redux-form
    - dumb components -> redux-form -> redux-form state
- Dataflow between client and server
  - actions -> services && hooks -> db
  - services && hooks && db tables
  
### Also see the [Captain's Log](https://github.com/root-systems/cobuy/issues/123) for more epistolary notes

## Stack

[`dogstack`](https://dogstack.js.org)! :dog: :dog: :dog:

## Folder Structure

We're following the [dogstack folder structure convention](https://dogstack.js.org/conventions/file-structure.html).

- root
  - actions.js (combines all actions)
  - client.js
  - epic.js (combines all epics)
  - layout.js 
  - package.json
  - root.js
  - routes.js
  - server.js
  - store.js (combines top-level epic and updater)
  - style.js
  - updater.js (combines all updaters)
  - `topic` (e.g. `agents`)
    - containers
    - components
    - helpers
    - getters
    - services
    - dux
    - styles
    - stories
    - util

### Available Scripts

### `npm start`

Starts production server

```shell
npm start
```

### `npm run dev`

Starts development server

```shell
npm run dev
```

### `npm run storybook`

Starts [storybook](https://storybook.js.org) server

```shell
npm run storybook
```

### `npm test`

Runs [`ava`](https://github.com/avajs/ava) tests

Can optionally take a [glob](https://www.npmjs.com/package/glob)

```shell
npm test -- './todos/**/*.test.js'
```

Default glob is `./**/*.test.js` ignoring `node_modules`

### `npm run lint`

Checks for [standard style](http://standardjs.com)

Can optionally take a [glob](https://www.npmjs.com/package/glob)

```shell
npm run lint -- './todos/**/*.js'
```

default glob is `./**/*.js` ignoring `node_modules`

### `npm run db`

Runs [`knex`](http://knexjs.org/#Migrations-CLI) command, with any arguments.

```shell
npm run db migrate:latest
```

```shell
npm run db seed:run
```


## Developer Notes

Anything that a developer working on Cobuy should know about.

TODO organize all the miscy mushy magic

### How to get private development config

Our development config is stored in a private repository:

```shell
cd ../
git clone git@github.com:Enspiral-Pods-Swarm/cobuy-config
cp cobuy-config/*.js cobuy/config
```

### After deploy: migrate on heroku!

```shell
heroku run npm run db migrate:latest --app=cobuy
```

### JSON schema

All models must have an assoicated JSON schema. See [#118](https://github.com/root-systems/cobuy/issues/118) for more info.

We're using [json-schema-faker](https://github.com/json-schema-faker/json-schema-faker/#faking-values) to fake data for tests and storybook.

### How to [storybook](https://storybook.js.org)

So you want to tell a story about dumb React components, ey?

Start storybook with [`npm run storybook`](#npm-run-storybook)

The configuration for storybook lives in `.storybook/`.

The stories are in `${topic}/stories/index.js`. The dumb components are in `${topic}/components/${name}.js`

If you add a ["story"](https://storybook.js.org), please add your topic story to `.storybook/config.js`

Check out [`app/stories/index.js`](./app/stories/index.js) for example stories, which you can copy into a new topic.

NOTE: At the moment, hot-reload does not work when changing messages in `app/locales/*.json`.

### Numbers

All numbers should be represented as strings and manipulated with [`bigmath`](https://github.com/ahdinosaur/bigmath).

### Spelling in the code

Developers should be using British spelling in the codebase

## License

AGPL-3.0

Emoji artwork is provided by [EmojiOne](https://www.emojione.com) and is licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode)
