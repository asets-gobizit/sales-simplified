/* Yoni chat — scripted brain (v1).
   Each entry: keys (lowercase keywords), a (answer text),
   optional video (talking-avatar clip, added in Phase 2 via HeyGen),
   optional scroll (selector to scroll the page to). */
window.YM_FAQ = [
  {
    keys: ["program", "course", "what is", "about the program", "learn"],
    a: "Sales Simplified is an online program with personal expert support: video lessons, a proven plan to grow into new markets, and Jonathan personally answering your questions.",
    video: "chat/assets/answers/program.mp4",
    scroll: "#program"
  },
  {
    keys: ["who is it for", "for me", "founder", "startup", "beginner", "fit for"],
    a: "It's built for entrepreneurs and young company owners taking their first steps in executing a sales strategy — the stage where wrong sales steps waste time, money, and market opportunity.",
    video: "chat/assets/answers/who-for.mp4"
  },
  {
    keys: ["who is jonathan", "who is yoni", "about jonathan", "experience", "background", "cv"],
    a: "Jonathan Yuval (MBA) is a former CEO with 25+ years in international sales and business development, and founder of Lead-IT (2004). You can verify everything on his LinkedIn.",
    video: "chat/assets/answers/about-yoni.mp4",
    scroll: "#about"
  },
  {
    keys: ["price", "cost", "how much", "pricing", "pay"],
    a: "Pricing is discussed on the free consultation call, so Jonathan can first understand your stage and needs. The consultation itself is completely free — no purchase necessary."
  },
  {
    keys: ["result", "testimonial", "success", "proof", "review", "helped"],
    a: "Founders like Maximilian von Duering (AiSight, exited) and Ben Grinberg (CEO of COMMUNi) credit Jonathan with building their sales infrastructure and giving them practical, real-world strategies.",
    scroll: "#stories"
  },
  {
    keys: ["lead-it", "lead it", "leadit", "company"],
    a: "Lead-IT (founded 2004) is Jonathan's international business development firm: penetrating target markets, securing pilot orders, building channel networks, closing first deals, and introducing clients to investors and VCs."
  },
  {
    keys: ["consultation", "book", "call", "meeting", "contact", "talk to", "schedule"],
    a: "Great — the consultation is free and Jonathan replies within 24 hours. I'm taking you to the form now.",
    scroll: "#contact"
  },
  {
    keys: ["linkedin", "verify"],
    a: "Here is Jonathan's LinkedIn: https://www.linkedin.com/in/jonathan-yuval/ — feel free to check his background and recommendations."
  },
  {
    keys: ["video", "watch", "demo"],
    a: "There's a short course video at the top of this page — scroll up and press play (the sound button is on the video).",
    scroll: "#top"
  },
  {
    keys: ["market", "product-market fit", "pmf", "target", "competition", "leads", "team", "scale"],
    a: "That's exactly what the program covers: identifying the right target market, product-market fit, sales strategy and plan, lead generation, scaling sales, and building a sales team.",
    scroll: "#program"
  },
  {
    keys: ["hello", "hi", "hey", "shalom"],
    a: "Hi! I'm Yoni's assistant. Ask me about the program, Jonathan's background, or success stories — or book a free consultation."
  }
];

window.YM_FALLBACK = "Good question — I don't want to guess. Leave your email and Jonathan will answer you personally within 24 hours.";
window.YM_LEAD_EMAIL_ENDPOINT = "https://formsubmit.co/ajax/danny@gobzizit.com"; /* activate: first submission sends a confirm email */
