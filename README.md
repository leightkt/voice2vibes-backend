# README

# VOICE2VIBES Technical Documentation
Created by: Kat Leight

VOICE2VIBES is a full stack application that allows a user to login interact via voice command with a bluetooth wearable vibrator called the Moxie by We-Vibe. 
 

## SUMMARY
This App is built for the Moxie by We-Vibe. The Moxie is a bluetooth connectable wearable vibrator for people with vulvas.   
This app uses the Web Bluetooth API technology to connect to your vibrator from your browser and the Web Speech API to allow you to send commands via your voice. 
Click "LISTEN MODE" to enter continous listen mode. The App will pick up your commands as you speak so you and your partner can go truly hands free.  

APP FEATURES

This app allows a user to login with a username and password.  
A new user can create an account (username must be unique and password must be between 6 and 12 characters).  
A user can connect a Moxie vibrator via bluetooth.  
The user is alerted when the device disconnects.   
The app shows when a device is connected/ not connected.   
A user can view all available commands.  
A new user is given default commands.  
A user can send a voice command by clicking the "start" button.  
A user can view a transcript of their voicecommand.  
A user can clear the voice command transcript by clicking "clear".  
A user's speech is not censored.  
A user can enter "continous listen mode" by clicking "LISTEN MODE" where the app will continously listen to a user's speech.  
A user can stop "continous listen mode" by clicking "STOP".    
A user can start the vibrator by clicking "ON".  
A user can stop the vibrator by clicking "OFF".  
A user can set a custom voice command by clicking a command card, clicking "start", speaking a command, then clicking, "save".  
User's account information and commands are stored in a postgresQL database, so the information is stored from session to session.   

## API
The backend of this app is set up as a Node.js/Express API to fetch users and commands. 

## RESPSONSIVE STYLING

Currently, this app is responsively styled for a web browser. This app is not meant to be used on native devices because of the differences in bluetooth technology.  

## BACKGROUND INFORMATION
MOXIE BY WE-VIBE

This App is built for the Moxie by We-Vibe.  
The Moxie is a bluetooth connectable wearable vibrator for people with vulvas.  
We-Vibe makes an app for your phone that connects to the vibrator and allows a user to interact with the vibrator via touch settings.  
You can also connect to a partner remotely and allow them to interact with the vibrator over WiFi.  
  
When the device connects, a list of commands will open. You can call any command via voice by clicking the "start" button. Or, click a command card to set your own custom voice command for each action.  
Click "LISTEN MODE" to enter continous listen mode. The App will pick up your commands as you speak so you and your partner can go truly hands free.
SET UP YOUR PARTY

BLUETOOTH LOW ENERGY

Bluetooth Low Energy (BLE) is moder bluetooth technology that uses lower power consumption. This allows applications to run on a small battery.  
BLE remains in sleep mode constantly except for when a connection is initiation.  
Connections are short and data transfer is fast.  
Most of our modern devices use BLE.  

WEB BLUETOOTH API  

This app uses the Web Bluetooth API technology to connect to your vibrator from your browser.  
When you log in (or sign up) click the "connect" button which will open up a dialogue box.  
Make sure your vibrator is on (press and hold the power button for 5 seconds until it flashes and buzzes twice) and click the option that says, "Moxie."  
In order to use the Web Bluetooth API, you must enable experimental-web-platform-features (set to enabled) in Google Chrome by visiting chrome://flags.  
The Web Bluetooth API allows the app to connect to a device, read/write characteristics using JavaScript asynchronous functions. 

WEB SPEECH API  
 
The Web Speech API to allow you to send commands via your voice.  
This API provides speech recognition and speech synthesis (text to speech aka tts).  
The app reads your speech, and then writes to a bluetooth characteristic via a callback function.  

UNCENSORING

Some Web Browsers (including Chrome) use a server-based speech recognition engine, which means your audio is sent to a web service for recognition processing.  
This also includes a default censor.
Because this application is built for use with sex-technology (sex-tech), an algorithm is built in to uncensor language.  
The goal is that users should not feel shamed for the language they choose to use with this application.  

BROWSER SUPPORT

Google Chrome has the best browser support for both the Web Speech API and the Web Bluetooth API. 

INCLUSIVE TECHNOLOGY

Technology, including sex tech, should be made as inclusive as posssible.  
This app may allow a user with limited motor fuction to better interact with their vibrator.  
This app may also be a great edition to those in long distance relationships or unable to see each other during COVID and connecting via video chat.  
This app uses inclusive language by refraining from using unnecessarily gendered language.  

## TECHNOLOGY
This app was created using Node.js, Express, Knex, Objection, Bcrypt, JWT, ActiveRecord, React, React Router, Web Speech API, Web Bluetooth API, Javascript, HTML, CSS, and postgresQL. 

## DEPLOYMENT
Backend repo: https://github.com/leightkt/voice2vibes-frontend 

To use this app, download the backend files from the repo, cd into the backend folder, and run npm install, createdb voice2vibes_development, knex migrate:latest, knex seed:run. 

Download the frontend, run npm install, and then npm start.  

Enable experimental web platform features preferenes (set to enabled) by visiting chrome://flags (for Web Bluetooth API).


## DEMONSTRATION
A demostration of the app can be viewed here: