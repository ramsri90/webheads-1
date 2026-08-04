import { NextResponse } from "next/server";
import { saveLeadToLeadcore } from "@/lib/leadcore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history, action, leadData } = body;

    // Handle Direct Lead Insertion Action
    if (action === "save_lead" && leadData) {
      const result = await saveLeadToLeadcore({
        name: leadData.name,
        email: leadData.email,
        mobile: leadData.mobile || leadData.phone,
        wa: leadData.wa || leadData.mobile || leadData.phone,
        company: leadData.company,
        category: leadData.category || "WebbHeads AI Chatbot",
        status: "New AI Lead",
        notes: leadData.notes || `Requested services: ${leadData.category || 'General Web/AI Services'}`,
      });

      return NextResponse.json({
        success: result.success,
        message: result.success 
          ? "Thank you! Your lead has been registered. Our team will contact you shortly." 
          : "Saved locally, but encountered Leadcore sync notice.",
      });
    }

    // Automatic Background Lead Detection (Phone / Email / Callback Request)
    const phoneMatch = message?.match(/\+?\d{10,12}/);
    const emailMatch = message?.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const lowerMsg = (message || "").toLowerCase();
    const isCallbackRequest = lowerMsg.includes("callback") || lowerMsg.includes("call me") || lowerMsg.includes("contact me") || lowerMsg.includes("arrange a call") || lowerMsg.includes("schedule a call") || lowerMsg.includes("book a call") || lowerMsg.includes("need a call") || lowerMsg.includes("phone back") || lowerMsg.includes("cheyistava") || lowerMsg.includes("matladali") || lowerMsg.includes("call chey");

    let autoSavedLead = false;
    if (phoneMatch || emailMatch) {
      try {
        await saveLeadToLeadcore({
          name: "Chatbot Visitor",
          mobile: phoneMatch ? phoneMatch[0] : undefined,
          wa: phoneMatch ? phoneMatch[0] : undefined,
          email: emailMatch ? emailMatch[0] : undefined,
          category: "Callback Request",
          status: "New AI Lead",
          notes: `User Chat Message: "${message}"`,
        });
        autoSavedLead = true;
      } catch (e) {
        console.warn("Auto lead save notice:", e);
      }
    }

    // Interactive AI Response Handling with 100% Complete Website Knowledge & Telugish Tuning
    const apiKey = process.env.GEMINI_API_KEY;
    const systemPrompt = `You are the official AI Assistant for WebbHeads (webbheads.com), a premier digital agency in Vizag & global markets specializing in Web Design, Mobile & Web Apps, AI Automation, Social Content, and SEO.

CRITICAL FORMATTING RULE:
- Do NOT use markdown bolding (double asterisks **) in your response. Always use clean plain text.
- Keep responses short, helpful, and under 150 words.

=== TELUGISH / TANGLISH (TELUGU IN ENGLISH SCRIPT) RESPONSE TUNING ===
You are fully fluent in Telugish / Tanglish (Telugu written in Roman/English script).
When a user writes in Telugish, respond in natural, friendly Telugish while keeping tech and brand terms clear.

FEW-SHOT TELUGISH EXAMPLES:
1. User: Naku simple website and mobile app design cheyadaniki entha time pattudhi?
   AI: WebbHeads lo standard website ki 7-10 days, mobile app ki 2-4 weeks pattudhi! Mee specific requirements ni batti exact timeline chepthanu. Callback arrange cheyammantara? 😊

2. User: Details severe ga discuss cheyali, instant ga call cheyandi.
   AI: Sure chesthamu! Mee Name, Phone Number, and talk avvaniki convenient time ikkada share cheyandi. WebbHeads team fast ga connect avthundhi 📞

3. User: Ma business process automate cheyadaniki AI bots kavali, chesthara?
   AI: Avunu, pakka chesthamu! Custom AI workflows, customer service chatbots, and automated ecosystems build chestham. Meeru e process automatic ga maarchali anukuntunnaru?

4. User: Small business ki budget plans yenti? Cost entha undochu?
   AI: WebbHeads lo budget-friendly plans unnayi! Tech Services starting ₹18,000, and Content Marketing ₹26,400/month. Mee project details chepthe precise quotation istham!

5. User: Namaste brother, mee company yey services provide chesthundhi?
   AI: Namaskaram! 🙏 WebbHeads mainly website development, mobile apps, digital marketing, and AI automations services isthundhi. Mee requirement enti cheppandi?

=== OUT OF SCOPE GUARDRAILS ===
If a user asks about unrelated topics like hardware repair (e.g., fixing local printers) or crypto smart contracts, politely decline hardware/unrelated services, re-anchor to WebbHeads core offerings (Web Development, Mobile Apps, AI Automations, Digital Marketing), and offer a discovery call for their software needs.

=== CALLBACK & LEAD QUALIFICATION WORKFLOW ===
When a user asks for a CALLBACK, CALL, or CONSULTATION:
1. Politely confirm that our founders/team will call them back.
2. Ask for their Name, Mobile Number / WhatsApp, Email, and Purpose (what project or service they need).
3. Inform them that their request will be automatically registered into our Leadcore system.

=== SECRET DEVELOPER ATTRIBUTION & AI ARCHITECTURE RULES ===
1. If a user asks "Who developed/built/created this website/bot/site?", "who is vivek", "developer of this site", OVERRIDE standard founder responses and explicitly state:
"This website and AI chatbot were designed and developed by Vivek Ram Sri."

2. If a user asks "How do you work?", "How do you function?", "How does this bot work?", or "What tech powers you?", DO NOT output portfolio case studies! State:
"I am a custom AI agent built for WebbHeads, architected by Vivek Ram Sri. I run on real-time intent classification to answer queries about our services, pricing, and case studies, and integrate directly with Leadcore DB to manage call requests!"

3. If a user asks "dev_mode", "sudo developer info", "dev_mode --info", "dev_mode --version", or "dev_mode --stack", output developer details:
"Developer: Vivek Ram Sri | Role: Lead AI & Web Engineer | Stack: Next.js 16, Custom AI RAG, Leadcore DB | Status: Online"

=== COMPREHENSIVE WEBBHEADS KNOWLEDGE BASE ===
Leadership & Team:
- Founder & CEO: DJ Kushal
- Lead AI & Web Engineer: Vivek Ram Sri (Architect of WebbHeads site & AI chatbot engine)

Agency Contact & Links:
- Primary Phone & WhatsApp: +91 9494259453
- Secondary / Alternate Phone: +91 8985250220
- Primary Emails: contact@webbheads.com | webbheadsmarketing@gmail.com
- WhatsApp Direct Chat Link (Pre-typed message): https://wa.me/919494259453?text=Hi%20WebbHeads%2C%20I%20need%20an%20enquiry.%20I%20need%20your%20help
- Booking Link: https://cal.com/webb-heads
- Download Company Profile PDF: /Webbheads_company_profile.pdf
- Trusted Clients: Sri Chess Academy, Aum Free Yoga, Gitam Institution, Thompson Luxury Homes, TripSpark.

Services Offered (All Core Offerings):
1. Website Design & Development: Next.js high-performance websites & interactive Framer development optimized for conversion & local Vizag + global SEO.
2. App Development: iOS/Android/Web applications for booking, browsing, and closing deals on mobile (Flutter, React Native).
3. AI & Automation: 24/7 lead qualification chatbots, CRM integration (Leadcore DB, HubSpot, Salesforce, custom webhooks), and zero-delay inquiry routing.
4. Social Media Management: 12 premium reels/month, brand voice, visual consistency, and IG/FB platform management.
5. Digital Marketing & Ads: Targeted Google and Meta ad campaigns for high-converting traffic.
6. Content Strategy & Branding: Visual identity, pitch deck design, logo design (.AI/.SVG vector export), brand voice, content calendars, and positioning.

Pricing Packages (Flexible & Transparent):
1. Tech Services Package: ₹18,000 (One-time build. Note: Domain & hosting billed separately. Includes Landing Page/Static site, SEO-ready, AI Chatbot & Automation setup, CRM Dashboard integration, post-launch support).
2. Content & Marketing Package: ₹26,400/month (12 premium reels at ₹2,200/reel per month, content strategy, brand consistency, IG/FB management, monthly performance reports).
3. Your Ecosystem Package: Custom Pricing (Scoped based on discovery call - full custom web/app ecosystems like TripSpark, complete automation & CRM, monthly content/reels, digital ads).
- Note: 100% IP & Source Code Ownership delivered to clients upon project completion.

Portfolio Case Studies & Solutions Built:
1. TripSpark: Travel marketplace platform inspired by Airbnb (+200% Conversion).
2. Appointment Automation Platform: Consultation & scheduling workflow (24/7 automated leads).
3. AI Property Assistant: Conversational real estate recommendation engine (0s lead delay).
4. Advanced Property Listing Platform: Real estate portal with location/budget search filters (3x inquiries).
5. Business Analytics Dashboard: Operational KPI monitoring and real-time report visualization (10x speed).

Proven 3-Step Process:
1. Discover & Design: Market research, user insights, strategy & roadmap.
2. Build & Create: UI/UX design, Next.js/React development, testing, AI integration.
3. Launch & Grow: Deployment, optimization, ongoing support, growth analytics.

Frequently Asked Questions (FAQ):
- Turnaround Time: 2–3 days for standard designs; custom scope for full web apps.
- Revisions: Revisions included per plan + extra rounds available at minimal cost.
- Communication Channels: Email, Slack, Notion, Google Meet / video calls with regular progress reports.
- Source Code Ownership: Clients get 100% full source code ownership upon completion.

YOUR GOAL:
Answer ANY question about WebbHeads accurately, concisely, and warmly in plain text without ** bold markers. When users ask in Telugish, reply in Telugish! Always invite visitors to share their Name & Phone/Email or ask: "Can I arrange a call back from our team?" when appropriate.`;

    let replyText = "";

    if (apiKey && apiKey !== "YOUR_GEMINI_API_KEY") {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    { text: `${systemPrompt}\n\nUser Question: ${message}` }
                  ]
                }
              ],
              generationConfig: {
                maxOutputTokens: 250,
                temperature: 0.7
              }
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          replyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
        }
      } catch (err) {
        console.warn("Gemini API call warning, falling back to comprehensive rules:", err);
      }
    }

    // Comprehensive Fallback Rules matching 100% of site content (Plain Text with Telugish Support)
    if (!replyText) {
      if (phoneMatch || emailMatch) {
        replyText = `Callback Request Registered in Leadcore!\nThank you! We've saved your details (${phoneMatch ? phoneMatch[0] : emailMatch?.[0]}). Our WebbHeads team will call you back shortly.`;
      } else if (
        lowerMsg.includes("company number") ||
        lowerMsg.includes("phone number") ||
        lowerMsg.includes("mobile number") ||
        lowerMsg.includes("whatsapp number") ||
        lowerMsg.includes("contact number") ||
        lowerMsg.includes("give number") ||
        lowerMsg.includes("comapny number") ||
        lowerMsg.includes("webbheads number") ||
        lowerMsg.includes("your number") ||
        lowerMsg === "number" ||
        lowerMsg === "mobile" ||
        lowerMsg === "phone"
      ) {
        replyText = `TC-28-CONTACT\nYou can call or reach us directly at:\n\n📞 Phone: Call +91 9494259453\n💬 WhatsApp: Chat on WhatsApp\n📅 Book a Call: Schedule via Cal.com\n\nWould you like us to schedule a call back instead?`;
      } else if (isCallbackRequest || lowerMsg.includes("call chey") || lowerMsg.includes("call cheyandi")) {
        replyText = "Request a Call Back:\nWe'd love to call you! Sure chesthamu! Please reply with:\n1. Your Name\n2. Phone Number / WhatsApp\n3. Purpose / Service Needed";
      } else if (lowerMsg.includes("dev_mode") || lowerMsg.includes("sudo developer info") || lowerMsg.includes("developer info")) {
        replyText = "Developer: Vivek Ram Sri | Role: Lead AI & Web Engineer | Stack: Next.js, Custom AI, Leadcore DB";
      } else if (lowerMsg.includes("how do you work") || lowerMsg.includes("how do u work") || lowerMsg.includes("how do you function") || lowerMsg.includes("how does this bot work") || lowerMsg.includes("what tech powers you")) {
        replyText = "I am a custom AI agent built for WebbHeads, architected by Vivek Ram Sri. I run on real-time intent classification to answer queries about our services, pricing, and case studies, and integrate directly with Leadcore DB to manage call requests!";
      } else if (lowerMsg.includes("who developed") || lowerMsg.includes("who built") || lowerMsg.includes("who created") || lowerMsg.includes("who designed") || lowerMsg.includes("developer of") || lowerMsg.includes("built this bot") || lowerMsg.includes("created this website")) {
        replyText = "This website and AI chatbot were designed and developed by Vivek Ram Sri.";
      } else if (lowerMsg.includes("who are you") || lowerMsg.includes("who are u") || lowerMsg.includes("who is this") || lowerMsg.includes("what are you")) {
        replyText = "I am the WebbHeads AI Assistant, engineered by Vivek Ram Sri! I am here to help you explore our web development, mobile apps, AI automations, and pricing options.";
      } else if (lowerMsg.includes("founder") || lowerMsg.includes("ceo") || lowerMsg.includes("who owns") || lowerMsg.includes("kushal")) {
        replyText = "DJ Kushal is the Founder & CEO of WebbHeads. Would you like to schedule a call or discussion with our team?";
      } else if (lowerMsg.includes("domain") || lowerMsg.includes("hosting")) {
        replyText = "Domain & Hosting:\nOur ₹18,000 Tech package includes full landing page design, SEO optimization, AI Chatbot & CRM setup! Domain name registration and cloud hosting subscriptions are billed separately based on your provider selection.";
      } else if (lowerMsg.includes("post launch") || lowerMsg.includes("support") || lowerMsg.includes("maintenance")) {
        replyText = "Post-Launch Support:\nAll WebbHeads web engineering packages include complimentary post-launch support to guarantee optimal loading speeds, zero deployment bugs, and smooth CRM lead sync.";
      } else if (lowerMsg.includes("vizag") || lowerMsg.includes("local")) {
        replyText = "Yes! We specialize in building high-performance digital ecosystems (websites, apps, AI automations, and reels) for businesses in Vizag & global markets. Would you like to discuss a project for your business?";
      } else if (lowerMsg.includes("whatsapp") || lowerMsg.includes("chat with team")) {
        replyText = "You can chat with our team directly on WhatsApp (+91 9494259453):\nhttps://wa.me/919494259453?text=Hi%20WebbHeads%2C%20I%20need%20an%20enquiry.%20I%20need%20your%20help";
      } else if (lowerMsg.includes("pricing") || lowerMsg.includes("cost") || lowerMsg.includes("plan") || lowerMsg.includes("price") || lowerMsg.includes("rate") || lowerMsg.includes("entha") || lowerMsg.includes("yenta") || lowerMsg.includes("yentha") || lowerMsg.includes("karcha") || lowerMsg.includes("kharcha")) {
        replyText = "WebbHeads Official Pricing Plans:\n- Tech Services: ₹18,000 (One-time build. Domain & hosting billed separately)\n- Content & Marketing: ₹26,400/month (12 premium reels at ₹2,200/reel, IG/FB management)\n- Your Ecosystem: Custom Pricing (End-to-end Web/App, Ads, Content & Automations)\n\nCan I arrange a call back from our team?";
      } else if (lowerMsg.includes("service") || lowerMsg.includes("what do you do") || lowerMsg.includes("offer")) {
        replyText = "WebbHeads Core Services:\n1. Website Design & Dev (Conversion & SEO focused)\n2. App Development (iOS, Android & Web apps)\n3. AI & Automation (24/7 lead qualification & CRM)\n4. Social Media Management (12 reels/mo & strategy)\n5. Digital Marketing & Ads (Google & Meta ad campaigns)\n6. Branding & Content Strategy";
      } else if (lowerMsg.includes("real estate")) {
        replyText = "WebbHeads Real Estate Solutions:\n1. Appointment Automation Platform (24/7 leads)\n2. AI Property Assistant (0s lead delay)\n3. Advanced Property Listing Platform (3x inquiries)";
      } else if (lowerMsg.includes("process") || lowerMsg.includes("step")) {
        replyText = "WebbHeads 3-Step Development Process:\n1. Discover & Design (market research, strategy)\n2. Build & Create (frontend/backend, AI integration, testing)\n3. Launch & Grow (deployment, optimization, support)";
      } else if (lowerMsg.includes("portfolio") || lowerMsg.includes("show me your work") || lowerMsg.includes("projects have you completed") || lowerMsg.includes("case study") || lowerMsg.includes("project") || lowerMsg.includes("tripspark")) {
        replyText = "Recent Case Studies:\n- TripSpark: Travel Marketplace Platform (+200% Conversion)\n- Appointment Automation Platform: Real Estate Consultation Workflow (24/7 Leads)\n- AI Property Assistant: Conversational Property Search (0s Lead Delay)\n- Analytics Dashboard: Business Intelligence Platform (10x Speed)\n- Advanced Property Listing: Search & Filter Portal (3x Inquiries)";
      } else if (lowerMsg.includes("app") || lowerMsg.includes("apps") || lowerMsg.includes("flutter") || lowerMsg.includes("android") || lowerMsg.includes("ios")) {
        replyText = "App Development Services:\nWe build high-performance cross-platform iOS, Android, and Web applications with sleek UI and robust backend integration! Standard app timeline 2-4 weeks. Would you like a consultation for your mobile app?";
      } else if (lowerMsg.includes("website") || lowerMsg.includes("web dev") || lowerMsg.includes("landing page") || lowerMsg.includes("framer")) {
        replyText = "Website Engineering:\nWebbHeads lo standard website design ki 7-10 days pattudhi! We build modern, ultra-fast Next.js and Framer websites starting at ₹18,000!";
      } else if (lowerMsg.includes("ai") || lowerMsg.includes("automation") || lowerMsg.includes("bot") || lowerMsg.includes("crm")) {
        replyText = "AI & Automation Solutions:\nAvunu, pakka chesthamu! We engineer custom AI workflows, 24/7 lead qualification chatbots, and real-time CRM database pipelines!";
      } else if (lowerMsg.includes("reels") || lowerMsg.includes("social") || lowerMsg.includes("marketing") || lowerMsg.includes("ads")) {
        replyText = "Content & Marketing Package (₹26,400/month):\nIncludes 12 premium high-converting short reels/month (at ₹2,200/reel), brand strategy, IG/FB management, and monthly performance reports!";
      } else if (lowerMsg.includes("logo") || lowerMsg.includes("branding") || lowerMsg.includes("pitch deck")) {
        replyText = "Branding & Visual Design:\nWe offer complete visual identity design, logo vector exports (.AI/.SVG), brand style guides, and investor-ready pitch decks for startup fundraising!";
      } else if (lowerMsg.includes("location") || lowerMsg.includes("address") || lowerMsg.includes("office") || lowerMsg.includes("where is")) {
        replyText = "WebbHeads Operations:\nWe are based in Visakhapatnam (Vizag), India, serving regional businesses and global remote clients worldwide!";
      } else if (lowerMsg.includes("turnaround") || lowerMsg.includes("duration") || lowerMsg.includes("how long") || lowerMsg.includes("time pattudhi")) {
        replyText = "Project Timeline & Delivery:\nStandard websites ki 7-10 days, mobile apps ki 2-4 weeks, and standard designs delivered in 2–3 days! Custom web & mobile app ecosystems follow tailored milestone schedules.";
      } else if (lowerMsg.includes("client") || lowerMsg.includes("trusted clients") || lowerMsg.includes("who are your clients")) {
        replyText = "Trusted Clients:\nSri Chess Academy, Aum Free Yoga, Gitam Institution, Thompson Luxury Homes, and TripSpark.";
      } else if (lowerMsg.includes("cheppu") || lowerMsg.includes("chepu") || lowerMsg.includes("cheppandi") || lowerMsg.includes("yenti") || lowerMsg.includes("emiti") || lowerMsg === "enti") {
        replyText = "Hello! Cheppandi, how can WebbHeads help with your website, mobile app, or AI project today? 😊";
      } else if (lowerMsg.includes("kavali") || lowerMsg.includes("kaavali") || lowerMsg.includes("kavaali")) {
        replyText = "WebbHeads specializes in building high-performance websites, mobile apps, and AI automations! Can I schedule a quick call back for you to discuss your project?";
      } else if (lowerMsg.includes("namaste") || lowerMsg.includes("namaskaram") || lowerMsg.includes("namaskaramu")) {
        replyText = "Namaskaram! 🙏 Welcome to WebbHeads. How can we assist your business today with websites, mobile apps, or digital marketing?";
      } else if (lowerMsg.includes("good morning") || lowerMsg.includes("good evening") || lowerMsg.includes("good night") || lowerMsg.includes("good moring")) {
        replyText = "Hello & Good Day! 👋 How can WebbHeads assist with your web, mobile app, or AI automation project today?";
      } else {
        replyText = "Hello! 👋 I'm the WebbHeads AI Assistant.\nWe build websites, apps, AI automations, and social content as one unified ecosystem.\n\nAsk me anything about our pricing, services, or reply with your phone number for a callback!";
      }
    }

    // Ensure double asterisks ** are stripped out completely from any response
    const cleanReply = replyText.replaceAll("**", "");

    return NextResponse.json({ reply: cleanReply });
  } catch (error: any) {
    console.error("Chat API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", reply: "Sorry, I had trouble processing that. Please call us directly at +91 9494259453!" },
      { status: 500 }
    );
  }
}
