![Reminderse](https://user-images.githubusercontent.com/35201693/150656708-d0bdfb98-e0c7-433e-8ab5-e03904c434d5.png)

---
💭 What is Reminderse?
-----
Reminderse reminds you about the links, articles and other media that you’ve consumed surfing the internet. Simply make an entry and get reminded about it in intervals.

## 😁 Sign up today by clicking [here](https://reminderse.com/register).


# (01/22/22) v2.0
I spent all of winter break rewriting the entire frontend with TypeScript. Both the frontend and backend are in a good state so that future changes won't require large overhauls. Using TypeScript lets me better control the API requests because I can let it know what the schema will look like. It takes away the guesswork from making requests. I'm pretty happy with all the changes and it should make it easier to add the features that I want moving forward. Hope you enjoy!

## 📨 Changelog
- New homepage!
- More consistent and unique design language
- Added animations for content loads and dropdown click
- Removed side bar. Just a top nav now

# (01/26/22) v2.1
Added better support for Safari combact tabs. The color should better match the contents of the page.

## 📨 Changelog
- Dynamic color changes depending on website page
- Clearer page titles

# (02/03/22) v2.2
You can now set your own interval for how frequent entries can be sent out. The settings page now has a field that allows you to change the interval. The default is 3.

## 📨 Changelog
- Custom intervals
- Fixed issue where setting date of next email would not work
- Better JWT security

---
# Todo List
- [ ] 🌑 Dark mode
- [x] 🔙 Some backend logic is faulty, especially interacting with the database
- [x] ➕ Add page breaks on phone width
- [x] 📆 Update add entry endpoints to accept next email date
- [x] 🛣 Custom email intervals
