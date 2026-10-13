# ♻️ Waste Warriors

A fun browser game that teaches waste segregation. Waste falls from the sky, and you must drop each item into the correct bin before it hits the ground.

Built with **HTML, CSS and JavaScript** only. No installation or libraries needed.

---

## The Story

Appu is a little boy who keeps putting waste in the wrong places: a banana peel on the sofa, a bottle in the garden. His mother (Amma) teaches him which bin each kind of waste belongs in, and turns him into a **Waste Warrior**. The game begins with this story, acted out by two cartoon characters.

---

## Features

- Welcome window and animated story scene (cartoon mother and child)
- 28 kinds of waste across 5 bins
- Speed increases as time passes (new level every 20 seconds)
- Negative points for missed or wrongly sorted waste
- 5 lives (hearts)
- 3 lifelines: Slow time, Extra life, Hint
- Keyboard controls (keys 1 to 5)
- Game over window with a rank

---

## Project Structure

```
waste-warriors/
├── index.html   -> page structure (welcome, story, game, game over)
├── style.css    -> colors, layout, animations
├── script.js    -> story, falling waste, scoring, lifelines
└── README.md    -> this file
```

---

## How to Run

**Option 1: Double-click**
1. Keep all three files in the same folder.
2. Double-click `index.html`. It opens in your browser.

**Option 2: VS Code (Live Server)**
1. Open the folder in VS Code (File -> Open Folder).
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **Open with Live Server**.

---

## How to Play

1. Click **Play** and watch the story (or click **Skip story**).
2. When waste falls, click the correct bin, or press keys **1 to 5**.
3. Read the name shown under the item if the picture is unclear.
4. Use lifelines when the game gets difficult.

### Bins

| Key | Bin | Examples |
|---|---|---|
| 1 | Organic | Banana peel, apple core, egg shell, leaves |
| 2 | Plastic | Plastic cup, bag, shampoo bottle, toothbrush |
| 3 | Paper | Newspaper, cardboard box, old book, envelope |
| 4 | Glass & Metal | Glass bottle, tin can, old key, steel spoon |
| 5 | Hazardous | Battery, used bulb, old phone, medicine, chemicals |

### Scoring

| Action | Points | Lives |
|---|---|---|
| Correct bin | +10 | no change |
| Wrong bin | -2 | -1 |
| Waste hits the ground | -5 | -1 |

### Lifelines (once per game each)

- **Slow time:** waste falls at half speed for 8 seconds
- **Extra life:** adds one heart
- **Hint:** the correct bin glows

### Ranks

| Score | Rank |
|---|---|
| 150+ | Eco Hero |
| 80+ | Waste Warrior |
| 30+ | Green Learner |
| Below 30 | Keep practising |

---

## Customize the Game

All settings are in `script.js`.

| To change | Edit |
|---|---|
| Starting speed and how fast it grows | `1.6 + seconds() * 0.04` in `speed()` |
| Maximum speed | the `7` in `Math.min(..., 7)` |
| Number of lives | `lives = 5` in `startGame()` |
| Points for correct, wrong, missed | `score += 10`, `loseLife(-2, ...)`, `loseLife(-5, ...)` |
| Level length | `20` in `level()` |
| Waste items | the `WASTE` list |
| Story dialogue | the `STORY` list (`"m"` = mother, `"c"` = child) |

---

## Troubleshooting

- **Blank page or Play button does nothing:** `script.js` is missing or misnamed.
- **No colors:** `style.css` is missing or misnamed.
- **File names end with `.txt`:** turn on "File name extensions" in File Explorer and rename them.
- Press **F12** in the browser and check the **Console** tab for errors.

---

## Ideas for Future Improvements

- Sound effects and background music
- High score saved with `localStorage`
- More story chapters and levels
- Malayalam and Hindi language options
- A mobile touch-friendly layout

---

Made with ♻️ to help everyone sort waste the right way.
