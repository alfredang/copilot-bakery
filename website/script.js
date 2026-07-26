/* Cook & Bake Academy landing page with a Copilot Studio chat canvas. */

/* ---------------------------------------------------------------------
   Course catalogue (mirrors the 20 brochures in /brochures)
   --------------------------------------------------------------------- */
const COURSES = [
  { code:"BAK-101", title:"Artisan Sourdough Bread Baking", cat:"Bakery", level:"Beginner", weeks:4, fee:680, campus:"Bakehouse", img:"1589367920969-ab8e050bbb04" },
  { code:"BAK-102", title:"French Pastry & Viennoiserie", cat:"Bakery", level:"Intermediate", weeks:8, fee:1480, campus:"Bakehouse", img:"1509440159596-0249088772ff" },
  { code:"BAK-103", title:"Wedding Cake Design & Decoration", cat:"Bakery", level:"Advanced", weeks:6, fee:1280, campus:"Bakehouse", img:"1535141192574-5d4897c12636" },
  { code:"BAK-104", title:"Macaron Masterclass", cat:"Bakery", level:"Intermediate", weeks:2, fee:420, campus:"Bakehouse", img:"1558326567-98ae2405596b" },
  { code:"BAK-105", title:"Chocolate & Confectionery Making", cat:"Bakery", level:"Intermediate", weeks:4, fee:760, campus:"Bakehouse", img:"1511381939415-e44015466834" },
  { code:"BAK-106", title:"Cupcake & Cake Pops Workshop", cat:"Bakery", level:"Beginner", weeks:1, fee:220, campus:"Bakehouse", img:"1486427944299-d1955d23e34d" },
  { code:"BAK-107", title:"Bread Making Fundamentals", cat:"Bakery", level:"Beginner", weeks:3, fee:480, campus:"Bakehouse", img:"1549931319-a545dcf3bc73" },
  { code:"BAK-108", title:"Cookie & Biscuit Baking", cat:"Bakery", level:"Beginner", weeks:1, fee:180, campus:"Bakehouse", img:"1499636136210-6f4ee915583e" },
  { code:"BAK-109", title:"Pie & Tart Specialist", cat:"Bakery", level:"Intermediate", weeks:3, fee:560, campus:"Bakehouse", img:"1535920527002-b35e96722eb9" },
  { code:"BAK-110", title:"Korean & Asian Bakery", cat:"Bakery", level:"Intermediate", weeks:4, fee:720, campus:"Bakehouse", img:"1558961363-fa8fdf82db35" },
  { code:"CUL-201", title:"Italian Cuisine Mastery", cat:"Cooking", level:"Intermediate", weeks:6, fee:1180, campus:"Culinary", img:"1551183053-bf91a1d81141" },
  { code:"CUL-202", title:"Thai Street Food Cooking", cat:"Cooking", level:"Beginner", weeks:3, fee:540, campus:"Culinary", img:"1559314809-0d155014e29e" },
  { code:"CUL-203", title:"Japanese Sushi & Sashimi", cat:"Cooking", level:"Intermediate", weeks:4, fee:980, campus:"Culinary", img:"1579871494447-9811cf80d66c" },
  { code:"CUL-204", title:"French Culinary Foundations", cat:"Cooking", level:"Beginner", weeks:8, fee:1580, campus:"Culinary", img:"1414235077428-338989a2e8c0" },
  { code:"CUL-205", title:"Chinese Wok Cooking", cat:"Cooking", level:"Beginner", weeks:3, fee:520, campus:"Culinary", img:"1525755662778-989d0524087e" },
  { code:"CUL-206", title:"Indian Curry & Spices", cat:"Cooking", level:"Beginner", weeks:3, fee:500, campus:"Culinary", img:"1505253758473-96b7015fcd40" },
  { code:"CUL-207", title:"Healthy Meal Prep & Nutrition", cat:"Cooking", level:"Beginner", weeks:2, fee:360, campus:"Culinary", img:"1490645935967-10de6ba17061" },
  { code:"CUL-208", title:"Vegetarian & Vegan Cuisine", cat:"Cooking", level:"Beginner", weeks:3, fee:540, campus:"Culinary", img:"1512621776951-a57141f2eefd" },
  { code:"CUL-209", title:"Grilling & BBQ Mastery", cat:"Cooking", level:"Intermediate", weeks:2, fee:460, campus:"Culinary", img:"1555939594-58d7cb561ad1" },
  { code:"CUL-210", title:"Knife Skills & Kitchen Essentials", cat:"Cooking", level:"Beginner", weeks:1, fee:160, campus:"Culinary", img:"1556909212-d5b604d0c90d" },
];

const CAMPUSES = {
  Bakehouse: "Sweet Heights Bakery Campus, 123 Orchard Road, #04-12, Singapore 238888",
  Culinary:  "Flavour Lab Culinary Campus, 88 Bukit Timah Road, #02-05, Singapore 229841",
};

const imgUrl = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=70`;

/* ---------------------------------------------------------------------
   Render course cards + filters
   --------------------------------------------------------------------- */
function renderCourses(filter = "all") {
  const grid = document.getElementById("course-grid");
  const list = COURSES.filter((c) => filter === "all" || c.cat === filter);
  grid.innerHTML = list.map((c) => `
    <article class="card">
      <div class="card__img" style="background-image:url('${imgUrl(c.img)}')">
        <span class="card__tag">${c.cat === "Bakery" ? "🧁 Bakery" : "🍳 Cooking"}</span>
        <span class="card__lvl">${c.level}</span>
      </div>
      <div class="card__body">
        <h3>${c.title}</h3>
        <div class="card__meta">
          <span>🕒 ${c.weeks} week${c.weeks > 1 ? "s" : ""}</span>
          <span>📍 ${c.campus === "Bakehouse" ? "Orchard Rd" : "Bukit Timah"}</span>
        </div>
        <div class="card__foot">
          <span class="card__price">S$${c.fee}</span>
          <button class="card__ask" onclick="window.CookBakeAgent.open()">Ask &amp; enrol →</button>
        </div>
      </div>
    </article>`).join("");
}

document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  document.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
  btn.classList.add("is-active");
  renderCourses(btn.dataset.filter);
});
renderCourses();

/* Open the published agent directly. Nothing is embedded in this website. */
const CookBakeAgent = (() => {
  const agentUrl = (window.CookBakeCopilotConfig?.agentUrl || "").trim();

  function open() {
    if (!agentUrl) {
      console.error("The published Copilot Studio agent URL is not configured.");
      return;
    }
    const agentWindow = window.open(agentUrl, "_blank");
    if (agentWindow) {
      agentWindow.opener = null;
    } else {
      window.location.assign(agentUrl);
    }
  }

  return { open };
})();

window.CookBakeAgent = CookBakeAgent;
