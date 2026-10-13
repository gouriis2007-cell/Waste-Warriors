// ============ 1. DATA ============
const $ = (id) => document.getElementById(id);

// The 5 bins
const BINS = [
  { t: "organic", n: "Organic",       i: "🍃", c: "#43a047" },
  { t: "plastic", n: "Plastic",       i: "🧴", c: "#1e88e5" },
  { t: "paper",   n: "Paper",         i: "📄", c: "#f9a825" },
  { t: "glass",   n: "Glass & Metal", i: "🥫", c: "#8e24aa" },
  { t: "hazard",  n: "Hazardous",     i: "☣️", c: "#e53935" }
];

// All waste items: [emoji, name]
const make = (type, list) => list.map((x) => ({ t: type, e: x[0], n: x[1] }));
const WASTE = [
  ...make("organic", [["🍌", "Banana peel"], ["🍎", "Apple core"], ["🥕", "Carrot"], ["🍞", "Stale bread"],
                      ["🥚", "Egg shell"], ["🍂", "Dry leaves"], ["🍉", "Melon rind"]]),
  ...make("plastic", [["🧴", "Shampoo bottle"], ["🥤", "Plastic cup"], ["🛍️", "Plastic bag"],
                      ["🪥", "Toothbrush"], ["🧸", "Broken toy"]]),
  ...make("paper",   [["📰", "Newspaper"], ["📦", "Cardboard box"], ["📄", "Used paper"],
                      ["📚", "Old book"], ["✉️", "Envelope"]]),
  ...make("glass",   [["🍾", "Glass bottle"], ["🥫", "Tin can"], ["🔑", "Old key"], ["🥄", "Steel spoon"]]),
  ...make("hazard",  [["🔋", "Battery"], ["💡", "Used bulb"], ["📱", "Old phone"],
                      ["💊", "Expired medicine"], ["🧪", "Chemical bottle"]])
];

// The story: m = mother (Amma), c = child (Appu)
const STORY = [
  ["m", "Appu! Why is a banana peel on the sofa and a bottle in the garden?"],
  ["c", "Sorry Amma... I never know which bin to use!"],
  ["m", "Wet waste, plastic, paper, glass, and dangerous things like batteries, each has its own bin."],
  ["c", "That's a lot to remember! Can you teach me?"],
  ["m", "Of course! Today you become a Waste Warrior. Catch every item before it touches the ground!"],
  ["c", "Let's go, Amma! I will make our Earth clean! 💪"]
];

// ============ 2. BUILD THE BIN BUTTONS ============
BINS.forEach((b, i) => {
  const el = document.createElement("button");
  el.className = "bin";
  el.dataset.t = b.t;
  el.style.background = b.c;
  el.innerHTML = `<span>${b.i}</span>${b.n}<small>Key ${i + 1}</small>`;
  el.onclick = () => pick(b.t);
  $("bins").appendChild(el);
});

// ============ 3. WELCOME + STORY ============
let si = 0, typer = null, fullText = "";

$("play-btn").onclick = () => {
  $("welcome").classList.add("hidden");
  $("story").classList.remove("hidden");
  si = 0;
  showLine();
};

function showLine() {
  const [who, text] = STORY[si];
  fullText = text;
  $("speaker").textContent = who === "m" ? "Amma 👩" : "Appu 👦";
  $("mother").classList.toggle("talking", who === "m");
  $("child").classList.toggle("talking", who === "c");
  $("line").textContent = "";
  let i = 0;
  clearInterval(typer);
  typer = setInterval(() => {            // typing effect
    $("line").textContent = fullText.slice(0, ++i);
    if (i >= fullText.length) clearInterval(typer);
  }, 28);
}

$("next-btn").onclick = () => {
  if ($("line").textContent.length < fullText.length) {   // finish typing first
    clearInterval(typer);
    $("line").textContent = fullText;
    return;
  }
  si++;
  si < STORY.length ? showLine() : startGame();
};
$("skip-btn").onclick = startGame;
$("again-btn").onclick = startGame;

// ============ 4. GAME ============
let score, lives, startTime, y, cur, timer, playing, slowUntil, used;
const field = $("field");

function startGame() {
  clearInterval(typer);
  score = 0; lives = 5; used = {}; slowUntil = 0; playing = true;
  startTime = Date.now();
  ["story", "over", "welcome"].forEach((id) => $(id).classList.add("hidden"));
  $("game").classList.remove("hidden");
  document.querySelectorAll(".ll").forEach((b) => (b.disabled = false));
  say("Sort the waste! You can also press keys 1 to 5.");
  newItem();
  clearInterval(timer);
  timer = setInterval(fall, 20);          // game loop: runs every 20 ms
}

const seconds = () => (Date.now() - startTime) / 1000;
const level = () => 1 + Math.floor(seconds() / 20);   // new level every 20 s

// Speed grows with TIME (not only with score). Capped so it stays playable.
function speed() {
  let s = Math.min(1.6 + seconds() * 0.04, 7);
  return Date.now() < slowUntil ? s * 0.5 : s;        // "Slow time" lifeline
}

function updateHud() {
  $("score").textContent = score;
  $("level").textContent = level();
  $("hearts").textContent = "❤️".repeat(Math.max(lives, 0));
}

function newItem() {
  cur = WASTE[Math.floor(Math.random() * WASTE.length)];
  $("emoji").textContent = cur.e;
  $("name").textContent = cur.n;
  y = -10;
  $("item").style.left = Math.random() * (field.clientWidth - 110) + "px";
  document.querySelectorAll(".bin").forEach((b) => b.classList.remove("glow"));
}

function fall() {
  y += speed();
  $("item").style.top = y + "px";
  updateHud();
  if (y > 310) loseLife(-5, `Missed the ${cur.n}! −5 points 😟`);   // missed = negative points
}

function loseLife(points, text) {
  score += points;
  lives--;
  flash("bad");
  say(text);
  updateHud();
  lives <= 0 ? endGame() : newItem();
}

function pick(type) {
  if (!playing) return;
  if (type === cur.t) {
    score += 10;
    flash("good");
    say("Correct! +10 ✅");
    newItem();
  } else {
    loseLife(-2, `${cur.n} doesn't go in that bin! −2 points ❌`);
  }
  updateHud();
}

function endGame() {
  playing = false;
  clearInterval(timer);
  $("final").textContent = `Your score: ${score}  |  Level reached: ${level()}`;
  $("rank").textContent =
    score >= 150 ? "Eco Hero 🏆" :
    score >= 80  ? "Waste Warrior 🥇" :
    score >= 30  ? "Green Learner 🌱" : "Keep practising 💪";
  $("over").classList.remove("hidden");
}

// ============ 5. LIFELINES (each can be used once per game) ============
function useLifeline(name, action) {
  if (!playing || used[name]) return;
  used[name] = true;
  $("ll-" + name).disabled = true;
  action();
  updateHud();
}
$("ll-slow").onclick = () => useLifeline("slow", () => { slowUntil = Date.now() + 8000; say("Time slowed for 8 seconds ⏳"); });
$("ll-life").onclick = () => useLifeline("life", () => { lives++; say("You got an extra life ❤️"); });
$("ll-hint").onclick = () => useLifeline("hint", () => {
  document.querySelector(`.bin[data-t="${cur.t}"]`).classList.add("glow");
  say("The glowing bin is the right one 💡");
});

// ============ 6. SMALL HELPERS ============
function say(text) { $("message").textContent = text; }

function flash(kind) {                    // green or red flash on the game box
  field.classList.remove("good", "bad");
  void field.offsetWidth;                 // restart the animation
  field.classList.add(kind);
}

document.addEventListener("keydown", (e) => {   // keys 1-5 choose bins
  const bin = BINS[Number(e.key) - 1];
  if (bin) pick(bin.t);
});
