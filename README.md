# Clean Architecture and More ...

This repo implements the clean architecture from Robert C. Martin (the Legendary “Uncle Bob”) Practical Software Architecture Solutions book and many coding standards/conventions.

## Table of Contents
- [Get started](#get-started)
- [Domain](#domain)
- [References](#references)

## Get started

<details>
<summary>Requirements</summary>

- Install nvm
- Install node:
    - Run `nvm install <major.minor.patch>` E.g.: `nvm install 16.14.0`
    - Run `nvm use <major.minor.patch>` E.g.: `nvm use 16.14.0`
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

<details>
<summary>Create a new postgres db</summary>

- Docker: `docker run -p 5432:5432 --name postgres-db -e POSTGRES_PASSWORD=password -d postgres`
- Install the `db-migrate` package:
    ```
        npm i db-migrate --save-dev
        npm i db-migrate-pg --save-dev
        npm i db-migrate-plugin-typescript --save-dev
    ```
- Create a `database.json` file with the content below:
    ```json
        {
            "dev": {
                "driver": "pg",
                "user": "postgres",
                "password": "password",
                "host": "localhost",
                "database": "postgres"
            }
        }
    ```

</details>

<details>
<summary>Useful packages</summary>

- shx: 
- husky:
- eslint:
- license-checker:
- nyc:
- sinon:

</details>

<details>
<summary>Useful VS Code extensions</summary>

- Better Comments:

</details>

## Domain

<details>
<summary>Business Requirements</summary>

- 2 main entities: 
    - Student and Course
    - They can exist on their own and have their own life cycle
- Student entity:
    - It can enroll in one or several courses
    - It keeps track of the courses it's enrolled in
- Course entity:
    - It keeps track of the number of students enrolled in it
- Application:
    - It allows the creation and editing of a new `Course` or a new `Student` independently of each other
    - It allows a `Student` to enroll in a `Course` if and only if the student has successfully registered their enrollment in the course
    - It updates its entities accordingly when a `Student` successfully enroll to a `Course`

</details>

*These example and requirements are taken from [here](https://medium.com/@gushakov/clean-domain-driven-design-2236f5430a05)

## Application

<details>
<summary>Database Entity Relationship Diagram</summary>

![database entity relationship diagram](./docs/bdd.drawio.svg)

</details>

## Good practices:

<details>
<summary>Rest API</summary>

- Use unique identifier headers: `x-request-id`, `x-trace-id` or `x-correlation-id`
    - [Correlation IDs for microservices architectures](https://hilton.org.uk/blog/microservices-correlation-id)
- Return resource only when requested: use header `x-return-resource`

</details>

<details>
<summary>Clean Code: Functions</summary>

- It shouldn't accept more than 3 parameters: use a data-structure as a parameter instead of lot of parameters
- It should be small => Should do exactly One Thing (Single responsability principle)
- Same level of abstractions: should contain same level of abstraction (high or low level)
    ```
        // Bad example
        function saveUser(name, email) {
            if !isValid(name) { // high abstraction level
                return false
            }
            if !email.include('@) { // Low abstraction level
                return false
            }
        }
    ```
- Should do work that's one level of abstraction below their name
    ```
        // Good example
        function isValidEmail(email) {
            return email.include('@) ? true : false
        }
    ```
    ```
        // Bad example
        function saveUser(name, email) {
            if (!name.length === 0) { // too low abstraction level
                return false
            }
            if !email.include('@) { // too Low abstraction level
                return false
            }
            //...
        }
    ```
- Public methods: fail fast by using guards 1st. (defensive programming)
- Apply Functional programming principles:
    - Avoid mutation (keep objects immutable): save you from concurrency issues, temporal coupling, etc.
    - Use Pure functions (honest signatures):
        - Avoid side effects (throwing an exception is a side effect)
        - Avoid dihonest signatures (throwing an exception makes the function dishonest)
        - Avoid shared states (pass parameters instead of using global variables)
        - Catch recoverable exceptions (system and user exceptions)
    - Use Function Composition
    - Use Declarative code instead of Imperative code
- CQS principle
    - Tester-Doer pattern: if we want to allow users of our api to avoid dealing with exceptions, then provide a tester property.

</details>

<details>
<summary>Clean Code: Classes</summary>

- Write high cohesive class:
    - Class cohesion: how much are your class methods using the class properties
    - Maximum Cohesion: all methods each use all properties (highly cohesive object). Properties could be private
    - No Cohesion: all methods don't use any class properties. Properties are managed outside of the class (properties are public).
- Law of Demeter: 
    - Code in a method may only access direct internals (properties and methods) of:
        - The object it belongs to
        - Objects that are stored in properties of that object
        - Objects which are received as method parameters
        - Objects which are created in the method
    - E.g. avoid accessing object of object: `this.customer.lastPurshase.date`
- Tell, don't ask:
    - Have other classes to do the job for you (instead of asking for data to do the job)
- Apply Functional programming principles:
    - Avoid mutation (keep objects immutable)
- Follow SOLID:
    - S (SRP: the Single-Responsibility principle): classes should have a single responsibility, it shouldn't change for more than one reason.
    - O (OCP: the Open-Close principle): a class should be open for extension but closed for modification (Polymorphism, composition)
    - L (LSP: the Liskov Substitution principle): objects should be replaceable with instances of their subclasses without altering the behavior.
    - I (ISP: the Interface Segregation principle): many client-specific interfaces are better than one general purpose interface.
    - D (DIP: the Dependency Inversion principle): you should depend upon abstractions, not concretions

## References

<details>
<summary>Whitepapers & Books</summary>

- [Clean Architecture: A Craftsman's Guide to Software Structure and Design](https://www.goodreads.com/book/show/18043011-clean-architecture)

</details>

<details>
<summary>Talks & Courses</summary>

- The Clean Architecture:
    - [Robert C Martin - Clean Architecture](https://youtu.be/Nltqi7ODZTM)

</details>

<details>
<summary>Articles</summary>

- The Clean Architecture:
    - [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) by Robert C. Martin (2012)
    - [OOP Business Applications: Entity, Boundary, Interactor](https://beberlei.de/2012/08/13/oop_business_applications_entity_boundary_interactor.html) by Benjamin Eberlei (2012)
    - [A couple of thoughts on Clean Architecture](https://blog.sourced-bvba.be/article/2017/02/14/thoughts-on-clean-architecture/) by Lieven Doclo (2017)
    - [Clean Architecture Is Screaming](https://dzone.com/articles/clean-architecture-is-screaming) by Java Zone (2017)
    - [Clean Architecture: Standing on the shoulders of giants](https://herbertograca.com/2017/09/28/clean-architecture-standing-on-the-shoulders-of-giants/) by Herberto Graça (2017)
- Domain-Driven Design:
    - [The Clean Domain-Driven Design](https://medium.com/@gushakov/clean-domain-driven-design-2236f5430a05)

</details>
