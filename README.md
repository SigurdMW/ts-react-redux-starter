# ts-react-redux-starter
A complete project starter kit for a TypeScript React/Redux application with full support for code splitting and no hidden configs.

## Get started
```
git clone https://github.com/rudfoss/ts-react-redux-starter.git [your project name]
cd [your project name]
git remote set-url [your project repository url]
npm i
npm run dev
```
Running these commmands clones the starter to a new folder on your maching, replaces the endpoint so that you can start committing code, installs all dependencies and finally starts the dev server.

## Features
- No global dependencies (everything in one package)
- TypeScript with full type checks
- Browser compatibility through .browserslistrc and automatic polyfills with `babel`
- VSCode configurations for
  - Auto linting
  - Using local version of TypeScript
  - Code snippets
- TSLint with recommended rules
- React
- Redux
  - Redux Sagas
  - Duck pattern with code splitting on ducks
- SASS support for awesome stylesheets
- CSS Modules and global css (via `*.global.css`)
- Source maps in dev and production (for debugging)
- Import aliases based on `tsconfig.json` paths
- Routing
  - Code splitting pattern
  - Error handling
- Webpack bundling
  - Production bundle `yarn build`
  - Development server bundle `yarn dev`
  - Analysis bundle `yarn build:analyze`
  - Chunking
  - Minification
  - Development server disk output for SPA with server side code
- Testing with Jest

## Guided tour
This section explains every aspect of the starter kit in detail.

### Folder structure
**`.vscode`**

This folder contains settings specific to VSCode. For now it only specifies that we should use the local version of TypeScript and that we should autofix linting issues on save.

**`src`**

This is where you will build your application. It contains a set of additional folders for structuring your application. See the [Application Structure](#application-structure) section of the guided tour for details.

**`webpack`**

This folder contains webpack configurations for development, production and analysis. It also contains a small `tsconfig.json` file used by `ts-node` and `webpack` to parse the configuration files as they are also written in TypeScript

**`dist`**

This folder will be created once you build your application and will contain the entire bundled and packaged source.

**`dist-dev`**

This folder contains the output when you run the development server. If you are processing the `index.html` file through some server side code and updating its content (such as with server side rendering or passing initial redux state) you can read the file from here and get full use of hot-reloading from your server. See [Advanced Scenarios](#advanced-scenarios) for a more detailed explanation.

### Application Structure
The application code is dividide into several foldes with a distinct purpose. This is not to say that this is the only structure you can use, but it is recommended based on several large projects as well as experience. Note that some of these paths are also aliases for import statements so if you change them you should also update the `paths` entry in `tsconfig.json`. Webpack and Jest aliases are created from that so don't worry about updating those.

- `features` - The features folder is inteded to hold sub folders for distinct functionality in your application. The granularity of these features are up to you to define, but it is generally recommended to create several smaller features as opposed to one large one. Features are allowed to reference other features when required, though you do it sparingly.
- `interfaces` - This folder contains some useful interfaces for describing useful objects that may be used throughout your application. Usually you would define your own interfaces within the feature they relate to.
- `routes` - This is where the root `Routes` component lives. It is also the first point where code splitting is performed. Features may also define their own sub-routes with code splitting as needed, but this is the global route handler. Notice that you should not need to create additional files in this folder, simply append to the files already there and follow the pattern.
- `store` - This is a standalone folder for getting the store manager. Any piece of code may access the store by importing from this folder `import { storeManager } from "store"`.
- `utils` - The utils folder contains generic utils that may be used in any code. Utils should be independent of all other code as much as possible to encourage testing and clean code.

#### Code splitting
This project attempts to, as far as possible, hide the intricacies of code splitting from features. A feature may simply return its API and the `StoreManager` and helper code will inject it as needed. This greatly simplifies building features as they do not need to know whether they are async or not.

#### DemoLogin feature
The DemoLogin feature is an example meant for you to remove once you clone the project. It shows a simple implementation of:
- Dynamically loaded components
- Dynamically loaded ducks (with sagas)
- Sub-routing within a feature

#### Ducks
Duck files are collections of action, action creators, reducers and selectors. They are meant to encompass a complete feature in the application in one (or more) files. This project follows the duck pattern described here: [https://github.com/erikras/ducks-modular-redux](https://github.com/erikras/ducks-modular-redux) with a few additions:

- Ducks MUST export a "duck" object matching the IDuckExport interface.


#### Serve dist
This project also has the ability to serve your SPA application directly from dist for testing. Simply run `npm run serve` to start this server.

## Advanced Scenarios

### Server side state
Many projects want or need to inject code into the index page to populate the redux state of the application upon startup. These scenarios can be complex to set up for development environments as they will need to inject things into the `index.html` file. By default `webpack-dev-server` will not expose this file and will also alter script references so that it can do hot-reloading of changes. This project is set up to dump the final `index.html` file to disk during development so that a server can pick it up as a template, inject code and serve the page as it would any other page.

```
    index.html
        |
        |
        \/
server appends data
        |
        |
        \/
  output to client
```

To set up your dev server to support hot-reloading AND server injection simply point your server to read the `index.html` file outputted to the folder `dist-dev/`. You should also pick a different port for your server than the one used by `webpack-dev-server` (3010). Here is an example of a server setup you might use:

- your server @ port 3000 -> Serves all regular requests. Point your browser here to use your application.
- webpack-dev-server @ port 3010 -> Serves hot-reloading scripts and other client side assets.

With this setup you get both client-side hot-reloading as well as server-side injections.

## Notes

### SASS dependency version locked
The `sass` (dart-sass) dependency has been version locked due to a pre-release version being deployed without proper tagging. The pre-release version does not work correctly yet is automatically installed if you simply install the latest `sass`.