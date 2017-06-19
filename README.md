# cobuy

:seedling: :package: :stew: :family: Helping people buy good food at good prices, together.

[![Kanban](https://badge.waffle.io/enspiral-root-systems/cobuy.png?label=ready&title=Ready)](http://waffle.io/enspiral-root-systems/cobuy)

## Table of Contents

- [Setup](#setup)
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

Before we start, please [install `node@8` and `npm@5`](https://dogstack.js.org/guides/how-to-install-js.html).

```shell
git clone git@github.com:root-systems/cobuy
cd cobuy
npm install
npm run db migrate:latest
npm run dev
```

### System Dependencies

- Postgres
- [`git-lfs`](https://git-lfs.github.com/)

## Folder Structure

We're following the [dogstack folder structure convention](https://dogstack.js.org/conventions/file-structure.html).

Topics:

- app

TODO

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

### After deploy: migrate on heroku!

```shell
heroku run npm run db migrate:latest --app=cobuy
```

### Numbers

All numbers should be represented as strings and manipulated with [`bigmath`](https://github.com/ahdinosaur/bigmath).

## License

AGPL-3.0

Emoji artwork is provided by [EmojiOne](https://www.emojione.com) and is licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode)
