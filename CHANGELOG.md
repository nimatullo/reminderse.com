# (06/08/22) v2.3
For the longevity of the project and for my own sanity, I've moved the API layer from Flask to FastAPI. FastAPI had a lot of appealing features like automatic documentation, middleware and async support.

## 📨 Changes
- Dashboard entries can now be viewed in list format
- New backend API (v2) after migrating to FastAPI
- Backend API testing implementation, taking a TDD approach

# (02/03/22) v2.2
You can now set your own interval for how frequent entries can be sent out. The settings page now has a field that allows you to change the interval. The default is 3.

## 📨 Changes
- Custom intervals
- Fixed issue where setting date of next email would not work
- Better JWT security

# (01/26/22) v2.1
Added better support for Safari combact tabs. The color should better match the contents of the page.

## 📨 Changes
- Dynamic color changes depending on website page
- Clearer page titles

# (01/22/22) v2.0
I spent all of winter break rewriting the entire frontend with TypeScript. Both the frontend and backend are in a good state so that future changes won't require large overhauls. Using TypeScript lets me better control the API requests because I can let it know what the schema will look like. It takes away the guesswork from making requests. I'm pretty happy with all the changes and it should make it easier to add the features that I want moving forward. Hope you enjoy!

## 📨 Changes
- New homepage!
- More consistent and unique design language
- Added animations for content loads and dropdown click
- Removed side bar. Just a top nav now
