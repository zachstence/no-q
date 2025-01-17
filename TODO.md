# TODO

This document holds planned features, improvements, and random ideas/thoughts for the game

## Achievements

Solve a game with 3/4/5/6/etc consecutive letters in your roll (e.g. ABC, LMN, XYZ)

Discover 1/10/100/1000/etc solves

Discover 1/10/100/1000/etc solutions

Find a solution with a 2x2 of letters

Find a solution with a ring of 8 letters (3x3 with middle missing)

Find a solution with a 2x2 of letters

Streak length

Solve a roll with
- 12 unique letters (all letters different)
- 11 unique letters
- 10
- ...

## Gamemodes
Daily challenge with fastest leaderboard

1v1
- You and an opponent get the same letters and race to solve
- Show opponents progress somehow
    - Sillhouette of their board?
    - X/12 letters used?

Tournaments

### Gameplay
Show word definitions

Shuffle button for bank

Checkpoints: IUseful when you *almost* solve a roll and want to save your spot in order to try another approach, and then return to your saved spot later

Gamemode that allows rerolling dice

### Keybinds

#### Simple
Ctrl+Z = Undo

Ctrl+Y = Redo

Arrow Keys = Move around and highlight letters

Space = Pick up / put down letter

Backspace = Recall letter to bank

### Drag-n-Drop
Maybe instead of having a fixed grid, we dynamically create drop zones only in spots next to existing letters, and we zoom out as you place more?
- Not the best, because players would probably like to move things around in the board without having just one contiguous crossword

Instead of fixed grid, snap to existing letters
- Wouldn't be able to use DOM nodes easily

#### Advanced
Type a letter in your bank and then highlight possible locations it could go (next to existing letters). Each possible location has a number and if you type that number, we move that letter there. Type multiple letters before typing a number and we highlight where that whole word can go. Could be abused by button mashing to find spots.

Keybind for recalling letters to your bank

## Themes / Customization
Site theme (light/dark/?)

Dice themes
- Font
- Text color
- Background color
- Pattern

Background customization

## 3D
3D dice / table
Rolling animation with physics
Body collision

## Data
Determine the difficulty of a roll based on how many solutions there are

Which words are used most often in solutions?

What is the average word length in solutions?

### Metrics
- Fastest solve
- Most difficult solve
- Total solves
- Solve streak

Show metrics on profile

Leaderboards (filterable by time: daily, all time, custom filter)

## Inspiration from MonkeyType
Heatmap showing number of games completed on each day like GitHub commits

Games started

Games completed

Total time playing games

XP leveling system?

Current version and changelog
