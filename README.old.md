# Movie Forum Capstone

My Lego® Inventory was created by Teresa Bacigalupi (a Lego® Technic fan) using the following tools:

## Working Prototype
You can access a working prototype of the app here: https://legoinventory.herokuapp.com/ and

## User Stories
This app is for two types of users; a visitor, and a logged-in user

#### Landing Page
* as a visitor
* I want to understand what I can do with this app (or sign up, or log in)
* so I can decide if I want to use it

#### Sign Up
* as a visitor
* I want to register to use this app
* so I can create a personal Lego® inventory

### Wireframe
Landing/Login Page |
:-------------------------:|
![Landing/Login Page](/github-images/wireframes/Landing-Page.png)  |

## Screenshots
Landing/Login Page |
:-------------------------:|
![Landing Page](/github-images/login-page.png)  | 

## Functionality
The app's functionality includes:
Search feature looks for user's number (XXXXX) and possible Rebrickable number (XXXXX-1)

* Every User has the ability to create an account that stores information unique to them
* User can Add Entries, Update Entries, and Delete Entries
* User can sort entries by: Date & Type (Read, Seen, Performed)

## Business Objects (database structure)
* User (collection)
    * Username
    * Password

## Technology
* Front-End: HTML5, CSS3, JavaScript ES6, jQuery
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, MongoDB, Mongoose
* Development Environment: Heroku, mLab, Robo 3T

## Responsive
App is built to be usable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
* Wishlist (from the inventory page part details);
        (1) see how many parts there are in the Wishlist
