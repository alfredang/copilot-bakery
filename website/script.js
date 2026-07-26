/* Cook & Bake Academy landing page course catalogue. */

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

const COURSE_DETAILS = {
  "BAK-101": { hours: 24, intakes: "Jan, Apr, Jul and Oct", certificate: "Certificate in Artisan Sourdough Baking" },
  "BAK-102": { hours: 48, intakes: "Feb, Jun and Sep", certificate: "Diploma in French Pastry Arts" },
  "BAK-103": { hours: 36, intakes: "Mar, Aug and Nov", certificate: "Certificate in Cake Design" },
  "BAK-104": { hours: 12, intakes: "Monthly", certificate: "Certificate of Completion" },
  "BAK-105": { hours: 24, intakes: "Jan, May and Sep", certificate: "Certificate in Chocolate Artistry" },
  "BAK-106": { hours: 8, intakes: "Weekly", certificate: "Certificate of Completion" },
  "BAK-107": { hours: 18, intakes: "Jan, Apr, Jul and Oct", certificate: "Certificate in Bread Baking" },
  "BAK-108": { hours: 8, intakes: "Weekly", certificate: "Certificate of Completion" },
  "BAK-109": { hours: 18, intakes: "Mar, Jul and Nov", certificate: "Certificate in Pastry Making" },
  "BAK-110": { hours: 24, intakes: "Feb, Jun and Oct", certificate: "Certificate in Asian Baking" },
  "CUL-201": { hours: 36, intakes: "Feb, Jun and Oct", certificate: "Diploma in Italian Cooking" },
  "CUL-202": { hours: 18, intakes: "Monthly", certificate: "Certificate in Thai Cuisine" },
  "CUL-203": { hours: 24, intakes: "Jan, May and Sep", certificate: "Certificate in Japanese Cuisine" },
  "CUL-204": { hours: 48, intakes: "Feb and Sep", certificate: "Diploma in French Cuisine" },
  "CUL-205": { hours: 18, intakes: "Monthly", certificate: "Certificate in Chinese Cooking" },
  "CUL-206": { hours: 18, intakes: "Mar, Jul and Nov", certificate: "Certificate in Indian Cuisine" },
  "CUL-207": { hours: 12, intakes: "Monthly", certificate: "Certificate in Healthy Cooking" },
  "CUL-208": { hours: 18, intakes: "Feb, Jun and Oct", certificate: "Certificate in Plant-Based Cooking" },
  "CUL-209": { hours: 12, intakes: "Mar, Jun, Sep and Dec", certificate: "Certificate in Grilling & BBQ" },
  "CUL-210": { hours: 8, intakes: "Weekly", certificate: "Certificate of Completion" },
};

const CAMPUSES = {
  Bakehouse: "Sweet Heights Bakery Campus, 123 Orchard Road, #04-12, Singapore 238888",
  Culinary: "Flavour Lab Culinary Campus, 88 Bukit Timah Road, #02-05, Singapore 229841",
};

const imgUrl = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=70`;

function renderCourses(filter = "all") {
  const grid = document.getElementById("course-grid");
  const list = COURSES.filter((course) => filter === "all" || course.cat === filter);
  grid.innerHTML = list.map((course) => `
    <article class="card">
      <div class="card__img" style="background-image:url('${imgUrl(course.img)}')">
        <span class="card__tag">${course.cat === "Bakery" ? "🧁 Bakery" : "🍳 Cooking"}</span>
        <span class="card__lvl">${course.level}</span>
      </div>
      <div class="card__body">
        <h3>${course.title}</h3>
        <div class="card__meta">
          <span>🕒 ${course.weeks} week${course.weeks > 1 ? "s" : ""}</span>
          <span>📍 ${course.campus === "Bakehouse" ? "Orchard Rd" : "Bukit Timah"}</span>
        </div>
        <div class="card__foot">
          <span class="card__price">S$${course.fee}</span>
          <a class="card__ask" href="#course-concierge">Ask &amp; enrol →</a>
        </div>
      </div>
    </article>`).join("");
}

document.getElementById("filters").addEventListener("click", (event) => {
  const button = event.target.closest(".chip");
  if (!button) return;
  document.querySelectorAll(".chip").forEach((chip) => chip.classList.remove("is-active"));
  button.classList.add("is-active");
  renderCourses(button.dataset.filter);
});

renderCourses();

const BrowserCourseAssistant = (() => {
  const messages = document.getElementById("faq-chat-messages");
  const suggestions = document.getElementById("faq-chat-suggestions");
  const form = document.getElementById("faq-chat-form");
  const input = document.getElementById("faq-chat-input");
  const resetButton = document.getElementById("faq-chat-reset");

  const normalize = (value) =>
    value.toLowerCase().replace(/[^a-z0-9$-]+/g, " ").replace(/\s+/g, " ").trim();

  function addMessage(text, sender = "bot") {
    const row = document.createElement("div");
    const avatar = document.createElement("span");
    const bubble = document.createElement("div");

    row.className = `faq-chat__message faq-chat__message--${sender}`;
    avatar.className = "faq-chat__avatar";
    avatar.textContent = sender === "bot" ? "CB" : "You";
    bubble.className = "faq-chat__bubble";
    bubble.textContent = text;
    row.append(avatar, bubble);
    messages.append(row);
    messages.scrollTop = messages.scrollHeight;
  }

  function findCourse(question) {
    const query = normalize(question);
    const exactCode = COURSES.find((course) => query.includes(course.code.toLowerCase()));
    if (exactCode) return exactCode;

    const genericWords = new Set([
      "bakery", "baking", "cooking", "course", "courses", "beginner",
      "intermediate", "advanced", "class", "classes", "recommend",
    ]);
    let bestMatch;
    let bestScore = 0;
    COURSES.forEach((course) => {
      const words = normalize(course.title)
        .split(" ")
        .filter((word) => word.length > 3 && !genericWords.has(word));
      const score = words.filter((word) => query.includes(word)).length;
      if (score > bestScore) {
        bestMatch = course;
        bestScore = score;
      }
    });
    return bestScore >= 1 ? bestMatch : undefined;
  }

  function courseSummary(course) {
    const detail = COURSE_DETAILS[course.code];
    return `${course.title} (${course.code}) is a ${course.level.toLowerCase()} ${course.cat.toLowerCase()} course. It runs for ${course.weeks} week${course.weeks === 1 ? "" : "s"} (${detail.hours} hours) and costs S$${course.fee}, including ingredients, an apron and take-home recipes. Published intakes: ${detail.intakes}. Location: ${CAMPUSES[course.campus]}. Award: ${detail.certificate}. Contact enrol@cookbakeacademy.sg to confirm the next available place.`;
  }

  function recommendCourses(question) {
    const query = normalize(question);
    const wantsCooking = /\b(cook|cooking|cuisine|sushi|meal|knife|bbq|grill)\b/.test(query);
    const wantsBakery = /\b(bake|bakery|bread|cake|pastry|cookie|macaron|chocolate)\b/.test(query);
    const level = /\badvanced\b/.test(query)
      ? "Advanced"
      : /\bintermediate\b/.test(query)
        ? "Intermediate"
        : /\bbeginner|new|no experience|start\b/.test(query)
          ? "Beginner"
          : undefined;
    const budgetMatch = query.match(/(?:under|below|max|budget)\s*(?:s\$|\$)?\s*(\d+)/);
    const budget = budgetMatch ? Number(budgetMatch[1]) : Infinity;
    const wantsShort = /\b(short|quick|one week|1 week|workshop)\b/.test(query);

    let matches = COURSES.filter((course) => {
      if (wantsCooking && !wantsBakery && course.cat !== "Cooking") return false;
      if (wantsBakery && !wantsCooking && course.cat !== "Bakery") return false;
      if (level && course.level !== level) return false;
      return course.fee <= budget;
    });

    if (!matches.length) {
      return "I could not find an exact course matching all those requirements. Try increasing the budget or tell me whether you prefer bakery or cooking.";
    }

    matches.sort((a, b) => wantsShort ? a.weeks - b.weeks || a.fee - b.fee : a.fee - b.fee);
    const picks = matches.slice(0, 3);
    return `My top match${picks.length > 1 ? "es are" : " is"}: ${picks
      .map((course) => `${course.title} (${course.code}) — ${course.level}, ${course.weeks} week${course.weeks === 1 ? "" : "s"}, S$${course.fee}`)
      .join("; ")}. Ask me about a course code for full details.`;
  }

  function answer(question) {
    const query = normalize(question);
    const course = findCourse(question);

    if (course) return courseSummary(course);
    if (/\b(refund|cancel|cancellation|transfer|withdraw)\b/.test(query)) {
      return "Refund policy: written notice 14+ calendar days before class receives 100%; 7–13 days receives 75% less S$30; 3–6 days receives 50% less S$30; under 3 days or after the course starts receives no refund. One same-course intake transfer may be requested at least 7 days before the start date for S$30. Email enrol@cookbakeacademy.sg. Approval and any materials deduction remain subject to academy review.";
    }
    if (/\b(where|location|campus|address)\b/.test(query)) {
      return `Bakery courses are held at ${CAMPUSES.Bakehouse}. Cooking courses are held at ${CAMPUSES.Culinary}.`;
    }
    if (/\b(enrol|enroll|register|sign up|booking|book)\b/.test(query)) {
      return "To enrol, email enrol@cookbakeacademy.sg or call +65 6888 1234 with your name, selected course code, preferred intake and contact details. Published intakes do not guarantee a place, so please confirm availability before paying.";
    }
    if (/\b(fee|price|cost|intake|schedule|course|recommend|beginner|advanced|short|budget|bakery|cooking)\b/.test(query)) {
      return recommendCourses(question);
    }
    if (/\b(hello|hi|hey|help)\b/.test(query)) {
      return "Hello! I can help you compare our 20 bakery and cooking courses, check fees and published intakes, find campus details, explain enrolment, or summarize the refund policy.";
    }
    return "I can answer questions about course recommendations, fees, duration, published intakes, campuses, enrolment and refunds. Try asking “Which beginner bakery course is under S$500?”";
  }

  function send(question) {
    const text = question.trim();
    if (!text) return;
    addMessage(text, "user");
    input.value = "";
    window.setTimeout(() => addMessage(answer(text)), 180);
  }

  function reset() {
    messages.replaceChildren();
    addMessage("Hi! I’m the Cook & Bake Academy Course Concierge. Ask me about courses, fees, intakes, campuses, enrolment or refunds.");
    input.focus();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    send(input.value);
  });
  suggestions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-question]");
    if (button) send(button.dataset.question);
  });
  resetButton.addEventListener("click", reset);

  reset();
  return { ask: send };
})();

document.querySelectorAll(".card__ask").forEach((link, index) => {
  link.addEventListener("click", () => {
    const course = COURSES[index];
    window.setTimeout(() => BrowserCourseAssistant.ask(`Tell me about ${course.code}`), 250);
  });
});
