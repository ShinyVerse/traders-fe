# Traders-fe

## Summary

To build a React or React Native frontend that shows the jobs available to be taken by a tradesperson. Assume that the interface will be mobile-first.

It should allow them to quickly evaluate how far away the job is, and what the problem is. Then they can accept the job and tell us they are on their way. When they are looking at the jobs, they should be able to see a map with their current location and a pin showing the destination.

### Requirements

- [x] Use of React
- [x] Simple animations
- [x] Handle state management for an app of this scale
- [x] Demonstration of async / await calls

### User Stories

- [x] As a trader, I can select my location, skill and distance willing to travel, so that my results are suitable for me.
- [x] As a trader, I can see my location and nearby jobs on a map, so that I can quickly access what's available.
- [x] As a trader, I can select a job, in order to see more about it.
- [x] As a trader, I can take a job and remove it from the job pool, so others cannot select it.

## Screenshots

### Desktop

Desktop view with jobs
![Desktop view with jobs](https://github.com/ShinyVerse/traders-fe/blob/master/src/assets/Desktop-jobs.png)

Desktop view with no available jobs
![Desktop view with jobs](https://github.com/ShinyVerse/traders-fe/blob/master/src/assets/Desktop-nojobs.png)

### Mobile

Mobile view with jobs
<img src="https://github.com/ShinyVerse/traders-fe/blob/master/src/assets/Mob-map.png" width=100 height=200>

Mobile view with selected job
![Desktop view with jobs](https://github.com/ShinyVerse/traders-fe/blob/master/src/assets/Mob-jobs.png)
Known bug: requires a way to close the jobpopup with an X in cornet, otherwise cannot click on other jobs available.

Mobile view with no jobs
![Desktop view with jobs](https://github.com/ShinyVerse/traders-fe/blob/master/src/assets/Mob-nojobs.png)

## Prerequisites

A Google API key is required.

If you do not have one please follow instructions [here](https://developers.google.com/maps/documentation/javascript/get-api-key)

You will need to have these API's enabled for your key:

- Maps Javascript API
- Geocoding API

You will need to create a .env file in the root of the project and put this variable:

`REACT_APP_GOOGLE_KEY=YOUR_KEY_HERE`

## Install

This project has used CRA to get going quickly. To get going, once in the project folder, simply run:

`npm install`

## Testing

CRA currently comes with react testing library, for speed I went with using this. Only one file has been tested to demonstrate unit testing, src/Components/DropDown/DropDown.

To run:

`npm test`

Once running you may have to type 'a' in your terminal for it to pick up nested test.

### Further testing plans if there was more time

- Mock axios calls for google maps, ultimately these impure functions would be wrapped in actions or separated from general code to manage side effects easier. An example of this can be found in another of my projects [here](https://github.com/ShinyVerse/Storii/blob/master/src/actions/storii.test.js)

- Cypress introduced to the project to handle testing of the user stories.
  Example of Cypress tests I've written for a different project can be found [here](https://github.com/ShinyVerse/reduxKanban/blob/master/cypress/integration/todo_spec.js)

# Assumptions

I imagined description was the input given by a client of what the problem was, the mock data only had random letters, so I've also used the reported issue to show on the job cards.

Quite more rather than less had the same lat and long for their location, for New York I've adjusted a couple, just to make it a little clearer on the map. Some have the same id, so when you take a job, two may disappear.

# Key take aways from this project

- Except for knowing that google maps api exists and is a handy thing, I hadn't really done much with this API. Very fun and cool to play around with and gain some experience in. I look forward to using it more (definitely with mocking calls and having a development environment though! Some time was probably wasted worrying how much I was getting charged :P)

- I embraced the mistakes and kept moving forward. I should probably have started with redux right from the get go rather than think: oh I can pop that in later. I just ran out of time. Other things were more important. The project has now been promoted to a refactor challenge to add redux in, so there's value in that mistake which I wouldn't have gotten if I'd have just done it from the beginning. For a view of my current knowledge/structuring of redux please go to this [repo](https://github.com/ShinyVerse/Storii/blob/master/src/)

- Having a limited time to build something I would have loved to have at least a month on forced me to make decisions of worth vs time.

- Mostly I'm used to testing with Jest & Enzyme, so it was nice to spend a little more time with React Testing Library.

# Further actions with more time:

- Spend more time on the architecture design.

- Setup a development environment, I must stop hammering the google map API.

- Refactor with redux. This will help with the prop drilling that is surfacing right now.

- Check out the Google Matric API for as accurate distance as possible. Currently it's a local function, which is okay for now, but for clients I'd want to give them results as precise as possible.

- Add more tests, as mentioned in the previous section.

- Build the backend, this would be a great example to practise GraphQL on. For testing/structure example for backend please checkout code [here](https://github.com/Nimzyow/storii_server/blob/master/routes/routesTests)

- Create nicer UI for clients, create wireframes and designs, globalize important styles such as font sizes.

- I could keep going, but maybe let's have a chat.
