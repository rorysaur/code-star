# "Code Star"

## Features:

1. Enter two github usernames
2. List each account's repos in order of stars
3. Display total stars for each user
4. Display an average "stars per repo" for each user
5. Declare a winner

## How to Use
1. Clone this repo.
2. `npm install -g webpack` This gives you the `webpack` command to build the project.
3. `cd` into the repo directory and `npm install`.
4. Run `webpack` in the terminal to build the project.
5. `cd` into `public/` and serve the assets (I use `python -m SimpleHTTPServer`), and visit the appropriate URL in your browser. Or just visit the absolute path of `public/index.html`.

## Assumptions
- Repos listed are ones each user is an `owner` of (not `member`).
- Users entered are valid Github users; I didn't implement error handling for users that don't exist.
- Users have at least one repo.
- Users won't have too many repos to display all at once (I didn't implement pagination or infinite scroll).
- Forked and original repos are considered equally.
- Winner is based on total star count.
- Repo names are somewhat short. Github repo names can be up to 100 characters long, but the name length that Code Star can accommodate varies as a function of screen width.
