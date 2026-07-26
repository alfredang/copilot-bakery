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
          <button class="card__ask" onclick="window.CookBakeChat.ask('Tell me about the ${c.title.replace(/'/g,"")} course')">Ask &amp; enrol →</button>
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

/* Custom in-page client. The browser receives a short-lived Direct Line token
   from the server-side broker; it never receives the Direct Line secret. */
const CookBakeChat = (() => {
  const config = window.CookBakeCopilotConfig || {};
  const tokenServiceUrl = (config.tokenServiceUrl || "").trim();
  const panel = document.getElementById("chat");
  const fab = document.getElementById("chat-fab");
  const closeButton = document.getElementById("chat-close");
  const restartButton = document.getElementById("chat-restart");
  const retryButton = document.getElementById("chat-retry");
  const welcome = document.getElementById("chat-welcome");
  const status = document.getElementById("chat-status");
  const error = document.getElementById("chat-error");
  const webchat = document.getElementById("webchat");
  let initialized = false;
  let initializing = false;
  let pendingPrompt = "";
  let store;
  let directLine;
  let connectionTimeout;
  let lastActiveElement;

  const styleOptions = {
    accent: "#b9581b",
    backgroundColor: "#fffaf4",
    botAvatarBackgroundColor: "#f4dfc9",
    botAvatarInitials: "CB",
    botAvatarInitialsColor: "#8f4315",
    bubbleBackground: "#ffffff",
    bubbleBorderColor: "#ead8c5",
    bubbleBorderRadius: 16,
    bubbleBorderStyle: "solid",
    bubbleBorderWidth: 1,
    bubbleFromUserBackground: "#b9581b",
    bubbleFromUserBorderColor: "#b9581b",
    bubbleFromUserBorderRadius: 16,
    bubbleFromUserTextColor: "#ffffff",
    bubbleMaxWidth: 292,
    bubbleMinHeight: 38,
    bubbleNubSize: 0,
    bubbleFromUserNubSize: 0,
    bubbleTextColor: "#2a2018",
    hideUploadButton: true,
    paddingRegular: 12,
    primaryFont: "'Inter', system-ui, sans-serif",
    sendBoxBackground: "#ffffff",
    sendBoxBorderTop: "1px solid #ead8c5",
    sendBoxButtonColor: "#b9581b",
    sendBoxButtonColorOnHover: "#8f4315",
    sendBoxHeight: 58,
    sendBoxPlaceholder: "Ask about courses, fees or enrolment",
    sendBoxPlaceholderColor: "#8a7a6b",
    sendBoxTextColor: "#2a2018",
    showAvatarInGroup: "status",
    suggestedActionBackgroundColor: "#fff7ed",
    suggestedActionBackgroundColorOnHover: "#f9e8d6",
    suggestedActionBorderColor: "#d8b993",
    suggestedActionBorderRadius: 999,
    suggestedActionTextColor: "#8f4315",
    userAvatarBackgroundColor: "#8f4315",
    userAvatarInitials: "You",
  };

  function setWelcomeVisible(visible) {
    welcome.hidden = !visible;
  }

  function sendMessage(text) {
    if (!text || !store) return;
    setWelcomeVisible(false);
    store.dispatch({
      type: "WEB_CHAT/SEND_MESSAGE",
      payload: { text, method: "keyboard" },
    });
  }

  function clearConnectionTimeout() {
    if (connectionTimeout) {
      window.clearTimeout(connectionTimeout);
      connectionTimeout = undefined;
    }
  }

  function showConnectionError(connectionError) {
    clearConnectionTimeout();
    initialized = false;
    initializing = false;
    status.hidden = true;
    error.hidden = false;
    console.error("Unable to start course concierge.", connectionError);
  }

  function createStore() {
    return window.WebChat.createStore(
      {},
      ({ dispatch }) => (next) => (action) => {
        if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
          clearConnectionTimeout();
          initialized = true;
          initializing = false;
          status.hidden = true;
          error.hidden = true;
          dispatch({
            type: "DIRECT_LINE/POST_ACTIVITY",
            meta: { method: "keyboard" },
            payload: {
              activity: {
                channelData: { postBack: true },
                name: "startConversation",
                type: "event",
              },
            },
          });
          if (pendingPrompt) {
            const prompt = pendingPrompt;
            pendingPrompt = "";
            window.setTimeout(() => sendMessage(prompt), 250);
          }
        }
        if (action.type === "DIRECT_LINE/CONNECT_REJECTED") {
          showConnectionError(
            action.payload || new Error("Direct Line connection was rejected.")
          );
        }
        if (
          action.type === "DIRECT_LINE/POST_ACTIVITY" &&
          action.payload?.activity?.type === "message"
        ) {
          setWelcomeVisible(false);
        }
        return next(action);
      }
    );
  }

  async function connect() {
    if (!tokenServiceUrl) throw new Error("Token service URL is not configured.");
    if (!window.WebChat) throw new Error("Web Chat did not load.");

    status.hidden = false;
    error.hidden = true;
    const response = await fetch(tokenServiceUrl, { method: "POST" });
    if (!response.ok) throw new Error("Token service request failed.");
    const conversation = await response.json();
    if (!conversation.token) throw new Error("Conversation token is missing.");

    webchat.replaceChildren();
    store = createStore();
    directLine = window.WebChat.createDirectLine({
      token: conversation.token,
    });
    window.WebChat.renderWebChat({ directLine, store, styleOptions }, webchat);
    connectionTimeout = window.setTimeout(() => {
      showConnectionError(new Error("Direct Line connection timed out."));
    }, 15000);
  }

  async function initialize() {
    if (initialized || initializing) return;
    initializing = true;
    try {
      await connect();
    } catch (connectionError) {
      showConnectionError(connectionError);
    }
  }

  function open() {
    lastActiveElement = document.activeElement;
    panel.removeAttribute("inert");
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    fab.hidden = true;
    closeButton.focus();
    initialize();
  }

  function close() {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    panel.setAttribute("inert", "");
    fab.hidden = false;
    lastActiveElement?.focus();
  }

  async function restart() {
    clearConnectionTimeout();
    directLine?.end();
    directLine = undefined;
    initialized = false;
    initializing = false;
    store = null;
    pendingPrompt = "";
    setWelcomeVisible(true);
    error.hidden = true;
    await initialize();
  }

  function ask(prompt = "") {
    pendingPrompt = prompt;
    open();
    if (initialized) {
      sendMessage(prompt);
      pendingPrompt = "";
    }
  }

  fab.addEventListener("click", open);
  closeButton.addEventListener("click", close);
  restartButton.addEventListener("click", restart);
  retryButton.addEventListener("click", restart);
  document.querySelector(".chat__prompts").addEventListener("click", (event) => {
    const button = event.target.closest("[data-chat-prompt]");
    if (button) ask(button.dataset.chatPrompt);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel.classList.contains("is-open")) close();
  });

  return { open, close, ask };
})();

window.CookBakeChat = CookBakeChat;
