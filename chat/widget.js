/* Yoni chat widget - v1 (scripted brain, idle video, avatar-clip ready).
   Embed with: <script src="chat/faq.js" defer></script><script src="chat/widget.js" defer></script> */
(function () {
  "use strict";

  var IDLE_VIDEO = "chat/assets/yoni-idle.mp4";
  var IDLE_FALLBACK = "file:///Z:/01 Shared Customers/@@@Yoni Yuval/Sales Simplified Practical Course for Entrepreneurs and Founders.mp4";
  var BUBBLE_IMG = "chat/assets/yoni-bubble.png";
  var BUBBLE_FALLBACK = "file:///Z:/01 Shared Customers/@@@Yoni Yuval/Yoni Passport.jpg";

  // load css
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "chat/widget.css";
  document.head.appendChild(link);

  // markup
  var bubble = document.createElement("button");
  bubble.className = "ym-bubble";
  bubble.type = "button";
  bubble.setAttribute("aria-label", "Open chat with Yoni");
  bubble.innerHTML =
    '<img src="' + BUBBLE_IMG + '" onerror="if(!this.dataset.f){this.dataset.f=1;this.src=\'' + BUBBLE_FALLBACK + '\'}" alt="">' +
    '<span class="ym-dot"></span><span>Ask Yoni</span>';

  var card = document.createElement("div");
  card.className = "ym-card";
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-label", "Chat with Yoni");
  card.innerHTML =
    '<div class="ym-video-wrap">' +
      '<video id="ymVideo" autoplay muted loop playsinline preload="metadata">' +
        '<source src="' + IDLE_VIDEO + '" type="video/mp4">' +
        '<source src="' + IDLE_FALLBACK + '" type="video/mp4">' +
      "</video>" +
      '<button class="ym-close" type="button" aria-label="Close chat">&#10005;</button>' +
    "</div>" +
    '<div class="ym-body" id="ymBody" aria-live="polite"></div>' +
    '<div class="ym-pills">' +
      '<button class="ym-pill" data-q="What is the program?">The Program</button>' +
      '<button class="ym-pill" data-q="Show me success stories">Success Stories</button>' +
      '<button class="ym-pill" data-q="I want to book a free consultation">Book a Free Consultation</button>' +
    "</div>" +
    '<div class="ym-input-row">' +
      '<input id="ymInput" type="text" placeholder="Ask Yoni anything..." aria-label="Ask Yoni anything">' +
      '<button class="ym-send" id="ymSend" type="button" aria-label="Send">' +
        '<svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>' +
      "</button>" +
    "</div>";

  document.body.appendChild(bubble);
  document.body.appendChild(card);

  var body = card.querySelector("#ymBody");
  var input = card.querySelector("#ymInput");
  var video = card.querySelector("#ymVideo");
  var idleSources = video.innerHTML; // to restore after an answer clip
  var leadMode = false;
  var greeted = false;

  // helpers
  function addMsg(text, who) {
    var div = document.createElement("div");
    div.className = "ym-msg " + (who === "user" ? "ym-user" : "ym-bot");
    // linkify URLs
    div.innerHTML = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function playAnswerClip(src) {
    // Phase-2 hook: if a talking-avatar clip exists for this answer, play it once with sound, then return to idle loop.
    if (!src) return;
    var probe = document.createElement("video");
    probe.src = src;
    probe.onloadedmetadata = function () {
      video.loop = false;
      video.muted = false;
      video.innerHTML = "";
      video.src = src;
      video.play();
      video.onended = function () {
        video.removeAttribute("src");
        video.loop = true;
        video.muted = true;
        video.innerHTML = idleSources;
        video.load();
        video.play();
        video.onended = null;
      };
    };
    // if clip missing (404), do nothing - idle keeps looping
  }

  function answer(q) {
    var ql = q.toLowerCase();
    var best = null, bestScore = 0;
    (window.YM_FAQ || []).forEach(function (item) {
      var score = 0;
      item.keys.forEach(function (k) { if (ql.indexOf(k) > -1) score += k.length; });
      if (score > bestScore) { bestScore = score; best = item; }
    });
    setTimeout(function () {
      if (best) {
        addMsg(best.a, "bot");
        playAnswerClip(best.video);
        if (best.scroll) {
          var el = document.querySelector(best.scroll);
          if (el) setTimeout(function () { el.scrollIntoView({ behavior: "smooth" }); }, 600);
        }
      } else {
        addMsg(window.YM_FALLBACK, "bot");
        leadMode = true;
        input.placeholder = "Type your email here...";
        input.type = "email";
      }
    }, 450);
  }

  function captureLead(email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      addMsg("That doesn't look like an email - try again?", "bot");
      return;
    }
    leadMode = false;
    input.placeholder = "Ask Yoni anything...";
    input.type = "text";
    addMsg("Thanks! Jonathan will get back to you within 24 hours.", "bot");
    var transcript = Array.prototype.map.call(body.querySelectorAll(".ym-msg"), function (m) {
      return (m.classList.contains("ym-user") ? "USER: " : "YONI-BOT: ") + m.textContent;
    }).join("\n");
    if (window.YM_LEAD_EMAIL_ENDPOINT) {
      fetch(window.YM_LEAD_EMAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email, transcript: transcript, _subject: "New lead from Yoni chat widget" })
      }).catch(function () { /* silent - transcript still visible in chat */ });
    }
  }

  function send() {
    var q = input.value.trim();
    if (!q) return;
    addMsg(q, "user");
    input.value = "";
    if (leadMode) captureLead(q);
    else answer(q);
  }

  // events
  bubble.addEventListener("click", function () {
    card.classList.add("ym-open");
    bubble.style.display = "none";
    video.play();
    if (!greeted) {
      greeted = true;
      setTimeout(function () {
        addMsg("Hi, I'm Jonathan. Ask me anything about the Sales Simplified program - or tap a button below.", "bot");
      }, 350);
    }
    input.focus();
  });
  card.querySelector(".ym-close").addEventListener("click", function () {
    card.classList.remove("ym-open");
    bubble.style.display = "flex";
    video.pause();
  });
  card.querySelectorAll(".ym-pill").forEach(function (p) {
    p.addEventListener("click", function () {
      card.classList.add("ym-response-focus");
      addMsg(p.dataset.q, "user");
      answer(p.dataset.q);
    });
  });
  card.querySelector("#ymSend").addEventListener("click", send);
  input.addEventListener("keydown", function (e) { if (e.key === "Enter") send(); });
})();
