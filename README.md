# Clean Architecture and More ...

This repo implements the clean architecture from Robert C. Martin (the Legendary “Uncle Bob”) Practical Software Architecture Solutions book and many coding standards/conventions.

## Table of Contents
- [Get started](#get-started)
- [References](#references)

## Get started

<details>
<summary>Requirements</summary>

- Install nvm
- Install node:
    - Run `nvm install <major.minor.patch>` E.g.: `nvm install 16.14.0`
    - Run `nvm use <major.minor.patch>` E.g.: `nvm use 16.14.01`
- For more details:
    - [Releases](https://nodejs.org/en/about/releases/)

</details>

<details>
<summary>Create a new project/package</summary>

- Create a source folder for your package:
    - all the characters in the package name must be lowercase
    - hyphens are allowed
    - package name length cannot exceed 214
    - See package naming rules [here](https://github.com/npm/validate-npm-package-name/#naming-rules)
- Run `npm init` in your project root folder (see package naming rules below)    
    ```
        package name: (clean-architecture-node) 
        version: (1.0.0)
        description: < your package description >
        entry point: (index.js) app.ts
        test command: test:unit
        git repository: (https://github.com/hamidgasmi/clean-architecture-node.git)
        keywords: nodejs clean-architecture conventions
        author: < your name >
        license: (ISC) MIT
    ```
    - or just: `npm init -y`
- Install dependencies:
    - Projet dependencies: `npm i <package-name> -s` or `npm i <package-name> --save-prod`
    - Dev dependencies: `npm i <package name> --save-dev`
    - Peer dependencies: manual
- More details:
    - [Package naming rules](https://github.com/npm/validate-npm-package-name/#naming-rules)
    - [Incrementing semantic versions in published packages](https://docs.npmjs.com/about-semantic-versioning#incrementing-semantic-versions-in-published-packages)
    - [Using semantic versioning to specify update types your package can accept](https://docs.npmjs.com/about-semantic-versioning#using-semantic-versioning-to-specify-update-types-your-package-can-accept)
    - [Difference between dependencies, devDependencies and peerDependencies](https://www.geeksforgeeks.org/difference-between-dependencies-devdependencies-and-peerdependencies)
    - [More about difference between dependencies, devDependencies and peerDependencies](https://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies?answertab=scoredesc#tab-top)

</details>


    






## References

<details>
<summary>Whitepapers & Books</summary>

</details>

<details>
<summary>Talks & Courses</summary>

</details>

<details>
<summary>Articles</summary>

</details>