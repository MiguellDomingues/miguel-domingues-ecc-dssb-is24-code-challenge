# Submission For miguel-domingues-ecc-dssb-is24 Coding Challenge

Dev/Testing Enviroment: 
- Windows 10 Home 64-bit
- Node 18.3
- Chrome Version 116.0.5845.188 (Official Build) (64-bit)

## Installation Instructions

- clone the repo
  - `git clone https://github.com/MiguellDomingues/miguel-domingues-ecc-dssb-is24-code-challenge.git`
- navigate into the project folder
  - `cd miguel-domingues-ecc-dssb-is24-code-challenge`
- install dependencies:
  - `npm install`
  
- to run the client:
  - in the project root directory:
    - `npm start`
- to run the server:
  - open another terminal window
  - navigate to project root
  - in the /server directory:
    - `node main.js`
    
### Potential Issues:
- the swagger docs may not render in some browser enviroments (wrapped in an <iframe>)
- if there are issues running the server or client simultaneously, it could be the script not re-assigning the port properly (by default the buildtool deploys the app to localhost://3000)
- to fix, go to package.json and find:
  - `"start": "set PORT=3006 && react-scripts start"`
    - On Linux/MacOS enviroment: 
      - change it to `"PORT=3006 react-scripts start"`

- or alternatively:
  - change `set PORT=3006 && react-scripts start"` to `"react-scripts start"` (this defaults the front-end to port 3000)
    - change the port for the backend:
      - navigate to src/api.js:
        - change `const PORT = 3000` to `const PORT = (any open port)`
      - navigate to server/main.js
        - change `const port = 3000` to  `const port = (same as above)`
 


