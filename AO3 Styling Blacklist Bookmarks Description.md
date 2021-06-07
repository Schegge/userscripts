# AO3: Fic's Style, Blacklist, Bookmarks

## Features
![Features](https://i.imgur.com/6RYzF0q.png)

- **Styling**
- **Bookmarks / Full Screen**
- **Blacklist**
- **Words per minute**

   ![Words](https://i.imgur.com/LR7aTNM.png)
   - The *estimated reading time* for the entire fanfiction and each chapter is calculated based on the number you set for it (default is 250; put 0 (zero) to disable it).
 
- Disabling the features *doesn't* erase the values saved previously


### Styling
![Styling](https://i.imgur.com/R9c53Al.png)

- Empty paragraphs and multiple line breaks are hidden.
- You can change different options of the **styling** of the text:
   - Font
   - Background (and text color)
   - (Text) Alignment
   - Text Size
   - Page Margins
   - Lines Spacing
 
- The menu where you can change the values only appear on the fanfiction page at the bottom right of the window (as &#9776;, click on it to open). Your preferences will be applied on all fanfictions.


### Bookmarks / Full Screen
![Bookmarks](https://i.imgur.com/qOKKLxC.png)
![Full Screen](https://i.imgur.com/lWckT7K.png)

- You can save the **reading position** for later.
- To create a new bookmark, you first have to open the Full Screen.
- To continue reading from a bookmark, click on the fanfiction's title in the Bookmarks menu on top, then on "Go to Bookmark".
- **Symbols** (in Full Screen):
   - \+ : set new bookmark
   - x : delete bookmark
 
- *Important*: The bookmarks are the position of the scrollbar when you click the "+" on the bottom left. They are saved in percent so if you change the styling they won't be totally wrong. But if you set a bookmark on the "entire work" of a still ongoing fanfiction, it's going to be saved in pixels, because if a new chapter is added the percent is going to be totally wrong, but the bookmark is going to be wrong in pixels if you change the styling. so, **advice**: save the bookmark on chapters not on the entire work of a ongoing fanfiction.
- In Full Screen summaries and notes are hidden, to read them just hover on them with the mouse.


### Blacklist
![Blacklist](https://i.imgur.com/1yuSXJv.png)

- The Blacklist appears only on pages that contain a list of fanfictions.
- You can completely hide blacklisted works or show the reasons why they're blacklisted.
- You can pause the blacklist.
- When searching you can hide works that contain certain **tags** (ratings, warnings, categories, completion status, relationships, characters, fandoms, freeforms, bookmarker's tags), words or phrases in the **title** and in the **summary**, and **authors** that match your **rules** (they aren't case-sensitive).
- Use a **comma** to separate the different rules.
   - Example in the Tags area: drabble, gun violence, explicit, work in progress
 
- Use **\*** for wildcards.
   - Example in the Tags area:
   - \*fluff\* (tags containing 'fluff')
   - \*fluff (tags ending with 'fluff')
   - fluff\* (tags starting with 'fluff')
   - \*magic\* au (tags starting with whatever, containing 'magic' in the middle and ending with a white space plus 'au')
   - and every other combination
 
- Use **&&** to hide works that contains a pair of words, it will match any text that contains at least the pair.
   - Example in the Tags area: potter&&tom riddle, original\*character&&/, child&&abuse
   - (it can be used only once in the same rule, one&&two&&three or more won't work)
 
- Use **&!** to hide works with romantic relationships that include only one person of your favourite ship (it can only be used in the Tags area).
   - Example: harry potter&!draco malfoy
   - (it hides all works that contain these two characters in other romantic relationships)
 
- *Note:* Tags and Authors areas will hide works that exactly matched a tag or an author with one of your rule, unless you use wildcards or the other symbols above. Instead, Titles, Summaries area will hide works that contains specified words or phrases.
   - In Titles, Summaries area it's for example unnecessary to write \*lorem ipsum\*, you can just write lorem ipsum
 
- You can hide works that aren't in your specified **languages**. To disable the option leave it empty.
- You can hide works that have too many **relationships** and **fandoms**, or that have too few or too many **words** (in *thousands*, so if you put "5" it refers to 5k words) and **chapters**, or **incompleted** works that have been last updated *some months* ago. To disable the options put 0 (zero) or leave them empty.

---

*Please report bugs*. Script tested on the last version of Chrome and Firefox (with Violentmonkey, Tampermonkey and Greasemonkey)