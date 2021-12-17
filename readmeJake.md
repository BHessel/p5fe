# App Concept

Like Tinder but with Netflix trailers. You add trailers you like to favorites, can match with other users, and then see similar likes, so that next time you're together, you have a list of movies/shows to watch.

# Current State of App

Start up the backend first (rails s) because my URLs are all linked to :3000 on the front end. localhost:3000/users, /favorites, /follows, /videos are your backend views. All video data is seed data right now.

Frontend boots up (npm start) to localhost:3001. This should bring you to a login page. It'll say "still need to log in" at the top, this is just part of my fake login to keep track of things early.

You can either create your own username/password, or use mine (username = ben123, password = password) - this page is `LoginForm.jsx`

There is no CSS yet. Good luck to your eyes.

From logged-in home page (`VideoContainer.jsx`), you can click favorites (I have some later-in-the-project work to do here, e.g. need to filter out duplicates, or better yet make it so it doesn't dup in the database period), you can search for a friend (e.g. shaina123) and follow/unfollow the user (I don't believe I've built unfollow yet). You can also see matches.

On the match page I've done some nice filtering (repeat dup cleanup issue), and just need to add a "return home" button later.

# Progress + Concerns

Now, I need to do REAL log-in (will use the AWS one you mentioned), but I'm worried my fetches/state changes aren't being done well and I'm curious what you think about how it's set up, or if you see any significant changes in general that should be made.

I feel like I should be updating state more, but I also need to hit my CRUD functions.

For example, when I add to favorites (`VideoContainer.jsx`, line 51), for some reason I feel like I should be updating state with the new favorite. But it also doesn't seem like I need to. Instead, I do the POST rqst, and when I then go to Favorites it re-renders everything anyways to get to `/Favorites`, and in `App.js` I already have an `allFavs` (all favorites) state that gets passed in to the `/Favorites` component.

So when /Favorites then loads, it loads with the updated state, but it's reading from the DB.

Does this make sense or am I going crazy? :D


# User Stories
1) User can create an account (complete)
2) User can log in/out (fake login right now)
3) User can see movie trailers (complete)
4) User can add shows to favorites (complete? depends on state scenario described above)
5) User can find and follow others (fundamentally, yes, will smooth it out later)
6) User can see the users they're following (no)
7) Users can see their followers (no)
    *6 and 7 are easy filtering, probably in a sidebar somewhere*
8) User can remove favorites (yes, but this relates to the state vs. database question because then removeFromFavorites doesn't re-render the component, but there's probably a way to force it to re-render at that time if I were to Google for that)
9) User can end a friendship (not yet, but it's another delete rqst to stop following someone, easy. Although the scenario in 8 can apply here too. And I'm not 100% sure how this ties in with AWS login)

# General App Architecture

Starting in `App.Js`, you'll see routes to the `/videocontainer`, `/favorites` and `/matches`.

`VideoContainer.jsx` holds the findfriend feature, which will either show a user that was searched for and found, or return an empty div.

Below all that I map through all videos to produce Video Cards that include the addToFavorites function.

`Favorites.jsx` takes in a list of all favorites and the current user as props.

This allows me to get the current user favorites (line 11), and this is where the delete rqst is that may or may not be complete.

`Matches.jsx` I was able to produce by passing down the current user and allFavs from `App.jsx` (this is obviously another thing that may be affected in ways I don't know yet by adding user login/addressing the state/database issue).

Here I sort favorites for the currentUser (14) and for the person I'm matching with (18), and then run a compare function to produce matches.

Again though, my gut says with better state management that this can be done in a better way? (if there is a better way I'm not grasping yet, is the 'better' way worth it for this project's purposes?)