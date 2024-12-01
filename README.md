## :link: How to setup the SQL backend setup locally

### :arrow_forward: Step 1: Clone the Repository

Firstly, we have to clone the repository to our local machine using Git.

```node
git clone <repository-url>
```

### :arrow_forward: Step 2: Navigate to the Project Directory

We need to navigate to the cloned repository directory.

```node
cd <repository-name>
```

### :arrow_forward: Step 3: Install Dependencies

Then we have to install the project's dependencies using yarn.

```node
yarn install
```

This command reads the package.json file and installs all necessary packages. This will create a node_modules folder with all dependencies.

### :arrow_forward: Step 4: Set up the `.env` File

Next, we will create a .env file in the root directory of our project. This file will hold the environment variables. `.env` file will look like this:

```node
PORT = 5000;
DATABASE_URL =
  'postgresql://username:password@localhost:5432/mydatabase?schema=public';
```

We need to ensure that these variables are correctly referenced in our application, typically in a configuration file which is under `./src/config` folder named as `index.ts`.

### :arrow_forward: Step 5: Start the Server

To run our Express.js application, we will use the following command:

```node
npm run start:dev
```

In our package.json file, we have a script defined as `npm run start:dev` to run the server.

```node
"scripts": {
    "start:dev": "ts-node-dev --respawn --transpile-only ./src/server.ts",
    "start:prod": "node ./dist/server.js",
    //...more scripts
  }
```

### :arrow_forward: Step 6: Access the Application

Once the server is running, we can access the application by navigating to `http://localhost:<port>` in web browser. We have to replace the `<port>` with the port number specified in the .env file.

---

So, these are the steps to setup an expressJs backend setup locally.
