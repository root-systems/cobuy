# cobuy

:seedling: :package: :stew: :family: Helping people buy good food at good prices, together.

[![Stories in Ready](https://badge.waffle.io/enspiral-root-systems/cobuy.png?label=ready&title=Ready)](http://waffle.io/enspiral-root-systems/cobuy)


## how to use

```shell
git clone git@github.com:enspiral-root-systems/cobuy
cd cobuy
npm install
npm run db migrate:latest
npm run dev
```

## developer notes

### how to migrate database

```shell
npm run db migrate:latest
```

### after deploy: migrate on heroku!

```shell
heroku run npm run db migrate:latest --app=cobuy
```

## developer notes

### numbers

all numbers should be represented as strings and manipulated with [`bigmath`](https://github.com/ahdinosaur/bigmath)

### dependencies

- [`git-lfs`](https://git-lfs.github.com/)

## user stories

TODO

-> make topic called agent
-> agent is an id that links to other foreign objects
-> agent might have a type person group or bot
agent has many accounts
account is a way of logging in
agent has one profile
agent has and belongs to many relationships

## license

Emoji artwork is provided by [EmojiOne](https://www.emojione.com) and is licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode)
