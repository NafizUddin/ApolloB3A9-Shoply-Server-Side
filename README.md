# :ledger: Project: E-Commerce Application

**Project Name:** E-Commerce Platform Backend

**Project Task:** Building the backend for an E-Commerce platform.

**Project Motive:** Developing a scalable, high-performance backend system for an e-commerce platform that supports multiple user roles (admins, vendors, and customers), advanced product management, seamless shopping experiences, and secure transactions.

## :computer: Server Live Link

Click here to see the Server Side Live Link: [https://shoplyserverapollob3a9.vercel.app](https://shoplyserverapollob3a9.vercel.app)

## :sparkle: Project Features

### Admin Features

1. **Platform Management:**

- Manage users (vendors and customers) with the ability to suspend or delete accounts.

- Blacklist vendor shops to restrict operations.

- Dynamically manage product categories (add, edit, delete categories).

2. **Monitoring and Moderation:**

- Track platform activities, including user actions and vendor performance.

- Monitor transactions for security and policy compliance.

### Vendor Features

1. **Shop Management:**

- Create and manage shop profiles with details like name, logo, and description.

- Manage product inventory, including adding, editing, duplicating, or deleting products.

2. **Order and Review Management:**

- View order history specific to the shop.

- Respond to customer reviews and ratings.

### Customer Features

1. **Product Browsing:**

- Browse products across multiple vendors with filtering and sorting options (price, category, etc.).

- Compare products within the same category based on attributes like price, ratings, and details.

2. **Shopping and Checkout:**

- Add products to a cart and purchase them with coupon codes.

- Integrate with payment systems like Aamarpay for secure transactions.

3. **Order History and Feedback:**

- Access order history to review past purchases.

- Leave reviews and ratings for purchased products.

## :keyboard: Technologies

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT-based user authentication
- **File Storage:** Cloudinary integration for product images
- **Payment Gateway:** Aamarpay
- **Code Quality:** Eslint, Prettier

## :link: How to run the application locally

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

### :arrow_forward: Step 5: Generate Prisma Client

After setting up the `.env` file, generate the Prisma client based on our Prisma schema by running:

```node
npx prisma generate
```

This command creates a Prisma client that our application can use to interact with the database.

### :arrow_forward: Step 6: Run Database Migrations

To ensure the database structure is aligned with our Prisma schema, run the following migration command:

```node
npx prisma migrate dev
```

This will create the tables and relationships defined in our Prisma schema.

### :arrow_forward: Step 7: Start the Server

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

### :arrow_forward: Step 8: Access the Application

Once the server is running, we can access the application by navigating to `http://localhost:<port>` in web browser. We have to replace the `<port>` with the port number specified in the .env file.

---

So, these are the steps to run an expressJs application locally.
