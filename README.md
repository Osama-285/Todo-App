# Todo-App

Todo App using MEAN Stack

# Instructions To Run The Project

Prerequisites:
Ensure you have Node.js and npm installed on your machine. If not, download and install them from Node.js website.

Step 1: Clone the Repository

Clone the repository to your local machine using the following command:
git clone https://github.com/Osama-285/Todo-App.git

Step 2: Install Dependencies

Server Dependencies:
Navigate to the server folder and install server-side dependencies:
cd Todo-App/server
npm install

Client Dependencies:
Navigate to the client folder and install client-side dependencies:
cd Todo-App/client
npm install

Step 3: Set Up Environment Variables

Server Environment Variables:
Create a .env file in the server folder and add the following content:
PORT = 8085
MONGOOSEURL = 'your-mongodb-connection-string'
SECRET_Key = 'JCVNSLDVOSS45SDF84W4R23'

Step 4: Set Up environment.ts file

Client Environment Variables:
Create a environment.ts file in the server folder and add the following content:
export const environment = {
production: false,
apiUrl: 'http://localhost:8085/auth', //Server URL
};

Step 5: Launch the Application:

In the server folder, Run
npm start

In the client folder, Run
ng serve

Step 6: Open the Application
Visit http://localhost:4200 in your web browser to access the MEAN stack todo application.
