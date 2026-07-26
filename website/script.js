/* Cook & Bake Academy: zero-cost, browser-only course catalogue and assistant. */

const COURSES = [
  ["BAK-101","Artisan Sourdough Bread Baking","Bakery","Beginner",4,680,"Bakehouse","1589367920969-ab8e050bbb04","Jan, Apr, Jul and Oct","Certificate in Artisan Sourdough Baking"],
  ["BAK-102","French Pastry & Viennoiserie","Bakery","Intermediate",8,1480,"Bakehouse","1509440159596-0249088772ff","Feb, Jun and Sep","Diploma in French Pastry Arts"],
  ["BAK-103","Wedding Cake Design & Decoration","Bakery","Advanced",6,1280,"Bakehouse","1535141192574-5d4897c12636","Mar, Aug and Nov","Certificate in Cake Design"],
  ["BAK-104","Macaron Masterclass","Bakery","Intermediate",2,420,"Bakehouse","1558326567-98ae2405596b","Monthly","Certificate of Completion"],
  ["BAK-105","Chocolate & Confectionery Making","Bakery","Intermediate",4,760,"Bakehouse","1511381939415-e44015466834","Jan, May and Sep","Certificate in Chocolate Artistry"],
  ["BAK-106","Cupcake & Cake Pops Workshop","Bakery","Beginner",1,220,"Bakehouse","1486427944299-d1955d23e34d","Weekly","Certificate of Completion"],
  ["BAK-107","Bread Making Fundamentals","Bakery","Beginner",3,480,"Bakehouse","1549931319-a545dcf3bc73","Jan, Apr, Jul and Oct","Certificate in Bread Baking"],
  ["BAK-108","Cookie & Biscuit Baking","Bakery","Beginner",1,180,"Bakehouse","1499636136210-6f4ee915583e","Weekly","Certificate of Completion"],
  ["BAK-109","Pie & Tart Specialist","Bakery","Intermediate",3,560,"Bakehouse","1535920527002-b35e96722eb9","Mar, Jul and Nov","Certificate in Pastry Making"],
  ["BAK-110","Korean & Asian Bakery","Bakery","Intermediate",4,720,"Bakehouse","1558961363-fa8fdf82db35","Feb, Jun and Oct","Certificate in Asian Baking"],
  ["CUL-201","Italian Cuisine Mastery","Cooking","Intermediate",6,1180,"Culinary","1551183053-bf91a1d81141","Feb, Jun and Oct","Diploma in Italian Cooking"],
  ["CUL-202","Thai Street Food Cooking","Cooking","Beginner",3,540,"Culinary","1559314809-0d155014e29e","Monthly","Certificate in Thai Cuisine"],
  ["CUL-203","Japanese Sushi & Sashimi","Cooking","Intermediate",4,980,"Culinary","1579871494447-9811cf80d66c","Jan, May and Sep","Certificate in Japanese Cuisine"],
  ["CUL-204","French Culinary Foundations","Cooking","Beginner",8,1580,"Culinary","1414235077428-338989a2e8c0","Feb and Sep","Diploma in French Cuisine"],
  ["CUL-205","Chinese Wok Cooking","Cooking","Beginner",3,520,"Culinary","1525755662778-989d0524087e","Monthly","Certificate in Chinese Cooking"],
  ["CUL-206","Indian Curry & Spices","Cooking","Beginner",3,500,"Culinary","1505253758473-96b7015fcd40","Mar, Jul and Nov","Certificate in Indian Cuisine"],
  ["CUL-207","Healthy Meal Prep & Nutrition","Cooking","Beginner",2,360,"Culinary","1490645935967-10de6ba17061","Monthly","Certificate in Healthy Cooking"],
  ["CUL-208","Vegetarian & Vegan Cuisine","Cooking","Beginner",3,540,"Culinary","1512621776951-a57141f2eefd","Feb, Jun and Oct","Certificate in Plant-Based Cooking"],
  ["CUL-209","Grilling & BBQ Mastery","Cooking","Intermediate",2,460,"Culinary","1555939594-58d7cb561ad1","Mar, Jun, Sep and Dec","Certificate in Grilling & BBQ"],
  ["CUL-210","Knife Skills & Kitchen Essentials","Cooking","Beginner",1,160,"Culinary","1556909212-d5b604d0c90d","Weekly","Certificate of Completion"],
].map(([code,title,cat,level,weeks,fee,campus,img,intakes,certificate]) =>
  ({code,title,cat,level,weeks,fee,campus,img,intakes,certificate}));

const CAMPUSES = {
  Bakehouse: "Sweet Heights Bakery Campus, 123 Orchard Road, #04-12, Singapore 238888",
  Culinary: "Flavour Lab Culinary Campus, 88 Bukit Timah Road, #02-05, Singapore 229841",
};

function renderCourses(filter = "all") {
  const list = COURSES.filter((course) => filter === "all" || course.cat === filter);
  document.getElementById("course-grid").innerHTML = list.map((course) => `
    <article class="card">
      <div class="card__img" style="background-image:url('https://images.unsplash.com/photo-${course.img}?auto=format&fit=crop&w=700&q=70')">
        <span class="card__tag">${course.cat === "Bakery" ? "🧁 Bakery" : "🍳 Cooking"}</span>
        <span class="card__lvl">${course.level}</span>
      </div>
      <div class="card__body">
        <h3>${course.title}</h3>
        <div class="card__meta">
          <span>🕒 ${course.weeks} week${course.weeks === 1 ? "" : "s"}</span>
          <span>📍 ${course.campus === "Bakehouse" ? "Orchard Rd" : "Bukit Timah"}</span>
        </div>
        <div class="card__foot">
          <span class="card__price">S$${course.fee}</span>
          <button class="card__ask" type="button" data-course-code="${course.code}">Ask &amp; enrol →</button>
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

const CookBakeChat = (() => {
  const panel = document.getElementById("chat");
  const fab = document.getElementById("chat-fab");
  const closeButton = document.getElementById("chat-close");
  const restartButton = document.getElementById("chat-restart");
  const welcome = document.getElementById("chat-welcome");
  const messages = document.getElementById("chat-messages");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  let previousFocus;

  const normalize = (value) =>
    value.toLowerCase().replace(/[^a-z0-9$-]+/g, " ").replace(/\s+/g, " ").trim();

  function open() {
    previousFocus = document.activeElement;
    panel.removeAttribute("inert");
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    fab.setAttribute("aria-expanded", "true");
    fab.hidden = true;
    window.setTimeout(() => input.focus(), 0);
  }

  function close() {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    panel.setAttribute("inert", "");
    fab.hidden = false;
    fab.setAttribute("aria-expanded", "false");
    if (previousFocus && previousFocus.focus) previousFocus.focus();
  }

  function appendMessage(content, sender) {
    const row = document.createElement("div");
    const avatar = document.createElement("span");
    const bubble = document.createElement("div");
    row.className = `chat__message chat__message--${sender}`;
    avatar.className = "chat__avatar";
    avatar.textContent = sender === "bot" ? "CB" : "You";
    bubble.className = "chat__bubble";

    if (typeof content === "string") {
      bubble.textContent = content;
    } else {
      if (content.heading) {
        const heading = document.createElement("strong");
        heading.textContent = content.heading;
        bubble.append(heading);
      }
      (content.paragraphs || []).forEach((text) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        bubble.append(paragraph);
      });
      if (content.bullets && content.bullets.length) {
        const list = document.createElement("ul");
        content.bullets.forEach((text) => {
          const item = document.createElement("li");
          item.textContent = text;
          list.append(item);
        });
        bubble.append(list);
      }
    }

    row.append(avatar, bubble);
    messages.append(row);
    messages.scrollTop = messages.scrollHeight;
  }

  function findCourse(question) {
    const query = normalize(question);
    const byCode = COURSES.find((course) => query.includes(course.code.toLowerCase()));
    if (byCode) return byCode;
    const ignored = new Set(["course","courses","bakery","baking","cooking","beginner","intermediate","advanced"]);
    let best;
    let score = 0;
    COURSES.forEach((course) => {
      const hits = normalize(course.title).split(" ")
        .filter((word) => word.length > 3 && !ignored.has(word) && query.includes(word)).length;
      if (hits > score) { best = course; score = hits; }
    });
    return score ? best : undefined;
  }

  function courseAnswer(course) {
    return {
      heading: `${course.title} (${course.code})`,
      bullets: [
        `${course.level} ${course.cat.toLowerCase()} course`,
        `${course.weeks} week${course.weeks === 1 ? "" : "s"} · approximately ${course.weeks === 1 ? 8 : course.weeks * 6} hours`,
        `Fee: S$${course.fee}`,
        `Published intakes: ${course.intakes}`,
        `Campus: ${CAMPUSES[course.campus]}`,
        `Award: ${course.certificate}`,
        "Ingredients, apron and take-home recipes included",
      ],
      paragraphs: ["Email enrol@cookbakeacademy.sg or call +65 6888 1234 to confirm an available place."],
    };
  }

  function refundAnswer(query) {
    const amountMatch = query.match(/(?:s\$|\$|paid\s*)(\d+(?:\.\d{1,2})?)/);
    const daysMatch = query.match(/(\d+)\s*days?/);
    const paragraphs = ["Policy CBA-REF-2026-01 (demo policy, effective 1 August 2026). Send written notice to enrol@cookbakeacademy.sg."];
    const bullets = [
      "14+ calendar days before class: 100% refund, no administration fee",
      "7–13 days: 75% refund less S$30",
      "3–6 days: 50% refund less S$30",
      "Under 3 days or after the course starts: no refund",
      "One same-course intake transfer: request at least 7 days before class; S$30 fee",
    ];
    if (amountMatch && daysMatch) {
      const amount = Number(amountMatch[1]);
      const days = Number(daysMatch[1]);
      const rate = days >= 14 ? 1 : days >= 7 ? .75 : days >= 3 ? .5 : 0;
      const admin = days >= 3 && days < 14 ? 30 : 0;
      const refund = Math.max(0, amount * rate - admin);
      paragraphs.unshift(`Estimated refund for S$${amount.toFixed(2)} with ${days} days' notice: S$${refund.toFixed(2)}.`);
    }
    return { heading: "Refund and transfer policy", paragraphs, bullets };
  }

  function recommendation(query) {
    const bakery = /\b(bake|bakery|bread|cake|pastry|cookie|macaron|chocolate)\b/.test(query);
    const cooking = /\b(cook|cooking|cuisine|sushi|meal|knife|bbq|grill)\b/.test(query);
    const level = /\badvanced\b/.test(query) ? "Advanced" :
      /\bintermediate\b/.test(query) ? "Intermediate" :
      /\b(beginner|new|start|no experience)\b/.test(query) ? "Beginner" : undefined;
    const budgetMatch = query.match(/(?:under|below|less than|max|budget)\s*(?:s\$|\$)?\s*(\d+)/);
    const budget = budgetMatch ? Number(budgetMatch[1]) : Infinity;
    let options = COURSES.filter((course) =>
      (!bakery || cooking || course.cat === "Bakery") &&
      (!cooking || bakery || course.cat === "Cooking") &&
      (!level || course.level === level) &&
      course.fee <= budget);
    options.sort((a, b) => a.fee - b.fee || a.weeks - b.weeks);
    options = options.slice(0, 3);
    if (!options.length) {
      return { heading: "No exact match", paragraphs: ["Try a higher budget, or tell me whether you prefer bakery or cooking."] };
    }
    return {
      heading: "Recommended courses",
      bullets: options.map((course) =>
        `${course.title} (${course.code}) — ${course.level}, ${course.weeks} week${course.weeks === 1 ? "" : "s"}, S$${course.fee}`),
      paragraphs: ["Ask me about any course code for full details."],
    };
  }

  function answer(question) {
    const query = normalize(question);
    const course = findCourse(question);
    if (course) return courseAnswer(course);
    if (/\b(refund|cancel|cancellation|transfer|withdraw)\b/.test(query)) return refundAnswer(query);
    if (/\b(where|location|campus|address)\b/.test(query)) {
      return { heading: "Our campuses", bullets: [
        `Bakery: ${CAMPUSES.Bakehouse}`,
        `Cooking: ${CAMPUSES.Culinary}`,
      ]};
    }
    if (/\b(enrol|enroll|register|sign up|booking|book|contact|phone|email)\b/.test(query)) {
      return { heading: "Enrolment", paragraphs: [
        "Email enrol@cookbakeacademy.sg or call +65 6888 1234 with your name, course code and preferred intake.",
        "Published intakes do not guarantee a place, so confirm availability before paying.",
      ]};
    }
    if (/\b(hello|hi|hey|help)\b/.test(query)) {
      return { heading: "Hello!", paragraphs: ["I can compare courses, fees and published intakes, find campuses, explain enrolment, or summarize the refund policy."] };
    }
    if (/\b(fee|price|cost|cheap|cheapest|intake|schedule|course|recommend|beginner|advanced|short|budget|bakery|cooking)\b/.test(query)) {
      return recommendation(query);
    }
    return {
      heading: "I can help with course information",
      paragraphs: ["Try asking “Which beginner bakery course is under S$500?” or enter a course code such as BAK-101."],
    };
  }

  function ask(question) {
    const text = String(question || "").trim();
    if (!text) return;
    open();
    welcome.hidden = true;
    appendMessage(text, "user");
    input.value = "";
    window.setTimeout(() => appendMessage(answer(text), "bot"), 150);
  }

  function restart() {
    messages.replaceChildren();
    welcome.hidden = false;
    input.value = "";
    input.focus();
  }

  fab.addEventListener("click", open);
  closeButton.addEventListener("click", close);
  restartButton.addEventListener("click", restart);
  welcome.addEventListener("click", (event) => {
    const button = event.target.closest("[data-question]");
    if (button) ask(button.dataset.question);
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    ask(input.value);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel.classList.contains("is-open")) close();
  });

  return { open, close, ask, restart };
})();

window.CookBakeChat = CookBakeChat;

document.getElementById("course-grid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-course-code]");
  if (button) CookBakeChat.ask(`Tell me about ${button.dataset.courseCode}`);
});

renderCourses();
