# Vite React Boilerplate
![](/public/vite-react-boilerplate.png)

Everything you need to kick off your next Vite + React web app!

## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Important Note](#important-note)
- [Testing](#testing)
- [Preparing for Deployment](#preparing-for-deployment)
- [DevTools](#devtools)
- [Installed Packages](#installed-packages)

## Overview

Built with type safety, scalability, and developer experience in mind. A batteries included Vite + React template.

- [pnpm](https://pnpm.io) - A strict and efficient alternative to npm with up to 3x faster performance
- [TypeScript](https://www.typescriptlang.org) - A typed superset of JavaScript designed with large scale applications in mind
- [ESLint](https://eslint.org) - Static code analysis to help find problems within a codebase
- [Prettier](https://prettier.io) - An opinionated code formatter
- [Vite](https://vitejs.dev) - Feature rich and highly optimized frontend tooling with TypeScript support out of the box
- [React](https://react.dev) - A modern front-end JavaScript library for building user interfaces based on components
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework packed with classes to build any web design imaginable
- [Storybook](https://storybook.js.org) - A frontend workshop for building UI components and pages in isolation
- [TanStack Router](https://tanstack.com/router/v1) - Fully typesafe, modern and scalable routing for React applications
- [TanStack Query](https://tanstack.com/query/latest) - Declarative, always-up-to-date auto-managed queries and mutations
- [TanStack Table](https://tanstack.com/table/v8) - Headless UI for building powerful tables & datagrids
- [Zustand](https://zustand-demo.pmnd.rs) - An unopinionated, small, fast and scalable bearbones state-management solution
- [React Hook Form](https://react-hook-form.com) - Performant, flexible and extensible forms with easy-to-use validation
- [Zod](https://zod.dev) - TypeScript-first schema validation with static type inference
- [React Testing Library](https://testing-library.com) - A very light-weight, best practice first, solution for testing React components
- [Vitest](https://vitest.dev) - A blazing fast unit test framework powered by Vite
- [Playwright](https://playwright.dev) - Enables reliable end-to-end testing for modern web apps
- [Nivo](https://nivo.rocks) - A rich set of data visualization components, built on top of D3 and React
- [react-i18next](https://react.i18next.com/) - A powerful internationalization framework for React/React Native based on i18next
- [Faker](https://fakerjs.dev/) - Generate massive amounts of fake (but realistic) data for testing and development
- [Dayjs](https://day.js.org/en/) - A minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers
- [Husky](https://github.com/typicode/husky#readme) + [Commitizen](https://github.com/commitizen/cz-cli#readme) + [Commitlint](https://github.com/conventional-changelog/commitlint#readme) - Git hooks and commit linting to ensure use of descriptive and practical commit messages
- [ts-reset](https://github.com/total-typescript/ts-reset#readme) - Improvements for TypeScripts built-in typings for use in applications
- [Docker](https://www.docker.com) - Containerization tool for deploying your vite-react-boilerplate app

A more detailed list of the included packages can be found in the [Installed Packages](#installed-packages) section. Packages not shown above include Devtools, ui helper libraries, and eslint plugins/configs.


### Structures
```text
src/
── app
│   ├── Auth
│   │   ├── component
│   │   └── container
│   ├── hoc
│   │   ├── AuthContextApi.tsx
│   │   └── AuthContex.tsx
│   ├── Home
│   │   ├── component
│   │   └── container
│   └── index.ts
├── assets
│   ├── font
│   │   └── GothamUltra.otf
│   ├── react.svg
│   └── styles
│       ├── auth
│       ├── extend
│       ├── flip_time
│       ├── footer
│       ├── index.scss
│       ├── loading
│       ├── moda_content
│       ├── note_detail
│       ├── swiper
│       ├── tree
│       └── variable
├── commom
│   └── contants.ts
├── components
│   ├── Advertising.tsx
│   ├── Editors.tsx
│   ├── FlipTimer.tsx
│   ├── Loading.tsx
│   ├── MenuLangs.tsx
│   ├── MenuTypes.tsx
│   ├── Schedules.tsx
│   ├── Search.tsx
│   ├── TexAreas.tsx
│   └── Toast.tsx
├── interface
│   ├── noteDetails.ts
│   ├── notes.ts
│   ├── paging.ts
│   └── users.ts
├── main.tsx
├── router
│   ├── AppRouting.tsx
│   ├── ConnectedApp.tsx
│   ├── lazyRouting.tsx
│   └── loadable.tsx
├── services
│   ├── localStorage.ts
│   └── request.ts
├── store
│   ├── loading
│   │   ├── middleware.ts
│   │   ├── selectors.ts
│   │   └── slice.ts
│   ├── noteDetails
│   │   ├── constants
│   │   ├── service
│   │   └── shared
│   ├── notes
│   │   ├── constants
│   │   ├── service
│   │   └── shared
│   ├── rootReducer.ts
│   ├── rootSaga.ts
│   ├── store.ts
│   └── users
│       ├── constants
│       ├── service
│       └── shared
├── utils
│   ├── config.ts
│   └── helper.ts
```

### Install and running the project

Installing and running the project is as simple as running

```sh
npm install && npm run dev
```

