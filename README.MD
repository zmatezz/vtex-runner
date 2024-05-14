<div align="center">
  <img
    src="https://res.cloudinary.com/dgeeyohmv/image/upload/v1715624181/rvsubes9ylpzicfuvw1r.png"
    alt="Logo do VTEX Runner"
    width="121"
    height="47"
  />

  <h3>VTEX Runner</h3>

  <p>Tool to perform mass actions using VTEX endpoints.</p>
  <a
    href="https://github.com/zmatezz/runner/issues/new?labels=bug&template=bug-report---.md"
    >Report Bug</a
  >
  ·
  <a
    href="https://github.com/zmatezz/runner/issues/new?labels=enhancement&template=feature-request---.md"
    >Request Feature</a
  >
</div>

## Features
* Automates mass actions on VTEX (using [VTEX endpoints](https://developers.vtex.com/docs/api-reference))
* Manage workspace: installing, uninstalling, creation, and deletion
* Dockerized application
* Spreadsheet reading logic, facilitating data reception from a mkt team

> [!IMPORTANT]
> This project requires Node.js 16 or higher and npm.
> ```$ npm -v && node -v```

## How to use
### Run it on a GitHub Codespaces
* To run the project on codespaces follow the instructions bellow:


1. Create codespace on main
   - Wait for codespace to identify the Node.js version and run npm i automatically


2. Start the server:
    ```
    npm run dev
    ```

3. Rename the file `.env.example` to `.env` and update environment variables with yours values.

4. Check routes in /docs and and the example of expected spreadsheets in assets/spreadsheets/example and after filling them out, pass them to asseets/spreadsheets/app


### Run it locally,
* To download the project follow the instructions bellow:


1. Clone the repo
   ```
   git clone https://github.com/zmatezz/vtex-runner
   ```
   ```
   cd vtex-runner
   ``` 

2. Install the dependencies and start the server:
   ```
   npm i
   ```
   ```
   npm run dev
   ```
   or 
   ```
   yarn install
   ```
   ```
   yarn dev
   ```

3. Rename the file `.env.example` to `.env` and update environment variables with yours values.


4. Check routes docs and the example of expected spreadsheets in assets/spreadsheets/example and after filling them out, pass them to asseets/spreadsheets/app


    or

- I recommend use [Docker](https://www.docker.com) to run the project, but it's your preference, to do this
    
1. To run the project with Docker, perform all the previous steps, except 2 and, execute the command:
    ```
    docker-compose up --build
    ```

## Contributing
You can contribute to the project in several different ways:

- Creating a fork of the project and sending PR with new features or bug fixes
- <a href="https://github.com/zmatezz/runner/issues/new?labels=enhancement&template=feature-request---.md">Requesting new features</a>  for the application
- <a href="https://github.com/zmatezz/runner/issues/new?labels=bug&template=bug-report---.md">Reporting Bugs</a> or improvements to the project

## License
This project is licensed under Creative Commons Attribution-NonCommercial (CC BY-NC). You are free to use it, as long as it is for non-commercial purposes and credit is given to the creator.

<p align="center">made by <a href="https://github.com/zmatezz">zmatezz</a></p>