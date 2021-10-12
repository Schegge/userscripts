# BLOCK YOUTUBE USERS
![BYU Menu](https://i.imgur.com/AHyoeAX.png)

- it **hides** videos of blacklisted users/channels from home, search, related, and comments
   - also from the playlists, but it doesn't prevent them from playing if the playlist is in autoplay
- put a **\*** in front of a word for **wildcard** (only in the *blacklist*), it will find the word no matter its position in the username
   - when you use it, but you want a channel that has that word in the name, you can put it in the *whitelist*
   - example:

      > blacklist: \*news
      >
      > whitelist: euronews (in english)

- it is not case-sensitive
- remember to **save** after any changes in the menu

## Options

- **pause**: you can temporarily pause the blacklist (to reactivate it, just re-click on it or reload the page)
- **separator**: you can choose the symbol to split the usernames (default is a *comma*, \* and " aren't allowed, min-max 1 character)
- **timer**: you can choose the duration of the *time interval* in which the script checks for new elements on the page (default is 1000 milliseconds, min 500, reload the page after saving to set the new interval)
- **comments**: you can hide comments (after saving you have to reload the page)
- **pause video**: from a direct link to youtube, it pauses the video if it's blacklisted
- **right click add**: you can blacklist channels by *right clicking* on **\[x\]** before the usernames

   > in any case, the \[x\] buttons are automatically shown when the "B" menu is open

### Known bugs and issues

- It doesn't block channels that have the separator symbol in their names, either use a wildcard or change the separator symbol.
