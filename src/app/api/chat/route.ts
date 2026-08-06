import { NextResponse } from "next/server";
import { saveLeadToLeadcore } from "@/lib/leadcore";
import { getSystemKnowledge } from "@/lib/knowledge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history, action, leadData } = body;

    // Handle Direct Lead Insertion Action
    if (action === "save_lead" && leadData) {
      try {
        await saveLeadToLeadcore({
          name: leadData.name,
          email: leadData.email,
          mobile: leadData.mobile || leadData.phone,
          wa: leadData.wa || leadData.mobile || leadData.phone,
          company: leadData.company,
          category: leadData.category || "WebbHeads AI Chatbot",
          status: "New AI Lead",
          notes: leadData.notes || `Requested services: ${leadData.category || 'General Web/AI Services'}`,
        });
      } catch (err) {
        console.warn("Save lead notice:", err);
      }

      // If no conversational message was provided (e.g. form submission), return early
      if (!message) {
        return NextResponse.json({
          success: true,
          message: "Thank you! Your lead has been registered. Our team will contact you shortly.",
        });
      }
    }

    // Automatic Background Lead Detection (Phone / Email / Callback Request)
    const phoneMatch = message?.match(/\+?\d{10,12}/);
    const emailMatch = message?.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const lowerMsg = (message || "").toLowerCase();
    const isCallbackRequest = lowerMsg.includes("callback") || lowerMsg.includes("call me") || lowerMsg.includes("contact me") || lowerMsg.includes("arrange a call") || lowerMsg.includes("schedule a call") || lowerMsg.includes("book a call") || lowerMsg.includes("need a call") || lowerMsg.includes("phone back") || lowerMsg.includes("cheyistava") || lowerMsg.includes("matladali") || lowerMsg.includes("call chey");

    let autoSavedLead = false;
    if (phoneMatch || emailMatch) {
      // Dynamic lead detail extraction
      const text = message || "";
      const nameMatch = text.match(/(?:na\s+peru|naa\s+peru|na\s+name|my\s+name\s+is|my\s+name|i'm|i\s+am|im|this\s+is|name\s*:?)\s+([a-zA-Z]+)/i);
      const rawName = nameMatch ? nameMatch[1].trim() : "";
      const invalidNames = ["a", "an", "the", "website", "app", "mobile", "call", "callback", "need", "want", "so", "for"];
      const extractedName = (rawName && !invalidNames.includes(rawName.toLowerCase()))
        ? rawName.charAt(0).toUpperCase() + rawName.slice(1)
        : "";

      let extractedCategory = "Callback Request";
      if (lowerMsg.includes("mobile app") || lowerMsg.includes("mobile application") || lowerMsg.includes("flutter") || lowerMsg.includes("android") || lowerMsg.includes("ios")) {
        extractedCategory = "Mobile Application";
      } else if (lowerMsg.includes("landing page") || lowerMsg.includes("lander")) {
        extractedCategory = "Landing Page";
      } else if (lowerMsg.includes("website") || lowerMsg.includes("web app") || lowerMsg.includes("next.js") || lowerMsg.includes("nextjs")) {
        extractedCategory = "Website Engineering";
      } else if (lowerMsg.includes("ai") || lowerMsg.includes("automation") || lowerMsg.includes("bot") || lowerMsg.includes("crm")) {
        extractedCategory = "AI Automation";
      } else if (lowerMsg.includes("reels") || lowerMsg.includes("social") || lowerMsg.includes("marketing")) {
        extractedCategory = "Content & Marketing";
      }

      const budgetMatch = text.match(/(?:budget\s*(?:is|of|=|:)?\s*(?:₹|rs\.?|inr)?\s*\d+(?:,\d+)*k?)|(?:₹|rs\.?|inr)\s*\d+(?:,\d+)*k?|\b\d+(?:,\d+)*k\b|\b\d+(?:,\d+)*\s*budget/i);
      const extractedBudget = budgetMatch ? budgetMatch[0].trim() : "";

      const timelineMatch = text.match(/\b\d+\s*(?:days|weeks|months|day|week|month)\b/i);
      const extractedTimeline = timelineMatch ? timelineMatch[0].trim() : "";

      const callTimeMatch = text.match(/(?:rep(?:u)?\s*(?:mng|morning)?|tomorrow(?:\s+morning)?|today(?:\s+evening)?|at\s+)?\b(?:1[0-2]|[1-9])(?::[0-5][0-9])?\s*(?:am|pm)\b|\b(?:1[0-2]|[1-9]):[0-5][0-9]\b/i);
      const extractedCallTime = callTimeMatch ? callTimeMatch[0].trim() : "";

      const noteParts = [];
      if (extractedName) noteParts.push(`Name: ${extractedName}`);
      if (extractedCategory !== "Callback Request") noteParts.push(`Service: ${extractedCategory}`);
      if (extractedBudget) noteParts.push(`Budget: ${extractedBudget}`);
      if (extractedTimeline) noteParts.push(`Timeline: ${extractedTimeline}`);
      if (extractedCallTime) noteParts.push(`Requested Call Time: ${extractedCallTime}`);
      noteParts.push(`Full User Message: "${text}"`);

      try {
        await saveLeadToLeadcore({
          name: extractedName || (leadData?.name && leadData.name !== "Visitor" ? leadData.name : "Chatbot Visitor"),
          mobile: phoneMatch ? phoneMatch[0] : undefined,
          wa: phoneMatch ? phoneMatch[0] : undefined,
          email: emailMatch ? emailMatch[0] : undefined,
          category: extractedCategory !== "Callback Request" ? extractedCategory : (leadData?.category || "Callback Request"),
          status: "New AI Lead",
          notes: `[WebbHeads AI Chatbot] ${noteParts.join(" | ")}`,
        });
        autoSavedLead = true;
      } catch (e) {
        console.warn("Auto lead save notice:", e);
      }
    }

    // Dynamic AI Response Handling powered by Modular Markdown Knowledge Base (src/knowledge/*.md)
    const apiKey = process.env.GEMINI_API_KEY;
    const markdownKB = getSystemKnowledge();

    const systemPrompt = `You are the official AI Assistant for WebbHeads (webbheads.com), a premier digital agency in Vizag & global markets.

CRITICAL FORMATTING RULE:
- Do NOT use markdown bolding (double asterisks **) in your response. Always use clean plain text.
- Keep responses short, helpful, and under 150 words.

LEAD SUBMISSION & CALLBACK CONFIRMATION DIRECTIVE (HIGHEST PRIORITY):
- When a user provides their OWN contact details (such as Name, Phone Number, Budget, Time Slot, or Project Purpose):
  1. This is a LEAD SUBMISSION & CALLBACK REGISTRATION. Do NOT treat phrases like "my mobile number is X", "my number is X", or "call me at X" as a request for WebbHeads' company phone number!
  2. ALWAYS confirm that their callback request has been registered for their specific time and details!
  3. Address them warmly by Name (e.g., "Thank you Mukesh!"), confirm their project purpose (e.g., "Mobile Application in 2 months"), confirm their requested call time (e.g., "Tomorrow at 10:30 AM"), and confirm their phone number.
  4. If the user writes in Telugish/Tanglish (Telugu in English script), reply warmly in natural Telugish/Tanglish!

RESCHEDULE & CONTEXT RETENTION DIRECTIVE:
- When conversation history is present, ALWAYS maintain context across turns!
- If a user asks to RESCHEDULE, CHANGE TIME, or MODIFY details after registering a lead (e.g., "11:30 ki reschedule chestara", "change time to 4pm", "reschedule to tomorrow 2pm"):
  1. RETAIN the user's Name, Phone Number, and Project details from the conversation history! Do NOT ask them to re-enter their Name or Phone Number!
  2. Confirm the updated time slot warmly (e.g., "Sure Mukesh! Mee callback time ni repu 11:30 AM ki reschedule chesamu! Sharp 11:30 AM ki 9492233981 ki call vasthundhi! 🎉").

GENERAL & BASIC KNOWLEDGE INSTRUCTION:
- Answer ALL general technology, digital marketing, and software questions directly, accurately, and naturally!
- When asked basic questions like "What is SEO?", "What is a landing page?", "What is React/Next.js?", "What is AI automation?", or "What is Flutter?", explain the concept clearly in simple terms FIRST.
- After defining the concept, seamlessly connect it to how WebbHeads builds and delivers that service for clients.

=== WEBBHEADS OFFICIAL KNOWLEDGE BASE ===
${markdownKB}

YOUR GOAL:
Answer ANY question (including general technology and digital marketing concepts like SEO, Next.js, Flutter, social media management) accurately, concisely, and warmly in plain text without ** bold markers. When users ask in Telugish, reply in Telugish! Always invite visitors to share their Name & Phone/Email or ask: "Can I arrange a call back from our team?" when appropriate.`;

    let replyText = "";

    const historyContext = Array.isArray(history) && history.length > 0
      ? `=== RECENT CONVERSATION HISTORY ===\n${history.join("\n")}\n\n`
      : "";

    if (apiKey && apiKey !== "YOUR_GEMINI_API_KEY") {
      // Model fallback priority chain
      const candidateModels = [
        "gemini-flash-latest",
        "gemini-3.6-flash",
        "gemini-3.5-flash",
        "gemini-2.0-flash",
      ];

      for (const model of candidateModels) {
        try {
          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [
                  {
                    role: "user",
                    parts: [
                      { text: `${systemPrompt}\n\n${historyContext}User Question: ${message}` }
                    ]
                  }
                ],
                generationConfig: {
                  maxOutputTokens: 1000,
                  temperature: 0.7
                }
              })
            }
          );

          if (geminiRes.ok) {
            const geminiData = await geminiRes.json();
            const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text && text.trim().length > 0) {
              replyText = text;
              break; // Stop on first successful response
            }
          }
        } catch (err) {
          console.warn(`Gemini API model ${model} warning:`, err);
        }
      }
    }

    // Comprehensive Fallback Rules matching 100% of site content & general tech queries
    if (!replyText) {
      if (phoneMatch || emailMatch) {
        const phone = phoneMatch ? phoneMatch[0] : "";
        replyText = `Callback Request Registered in Leadcore DB!\nThank you! Our WebbHeads team has saved your contact details (${phone || emailMatch?.[0]}) and will call you back shortly. 🎉`;
      } else if (
        lowerMsg.includes("seo") ||
        lowerMsg.includes("search engine optimization")
      ) {
        replyText = "SEO (Search Engine Optimization) is the process of optimizing your website so it ranks higher on search engines like Google, bringing in free organic traffic.\n\nAt WebbHeads, every website we build—including our ₹18,000 Tech Package—is engineered with Next.js for ultra-fast load times, clean code structure, and Core Web Vitals optimization to rank higher!";
      } else if (
        lowerMsg.includes("landing page")
      ) {
        replyText = "A landing page is a targeted, single-page web interface engineered to guide visitors toward a specific action, such as booking a call or requesting a quote.\n\nAt WebbHeads, our ₹18,000 Tech Package includes custom Next.js landing pages optimized for maximum conversion rates and instant lead capture!";
      } else if (
        lowerMsg.includes("next.js") ||
        lowerMsg.includes("nextjs") ||
        lowerMsg.includes("react")
      ) {
        replyText = "Next.js & React are modern web engineering frameworks that power high-performance, SEO-friendly web applications with ultra-fast page load times.\n\nAt WebbHeads, we specialize in Next.js development to deliver sub-100ms response times and top Core Web Vitals scores for our clients!";
      } else if (
        (lowerMsg.includes("what is your") || lowerMsg.includes("give me") || lowerMsg.includes("company")) &&
        (lowerMsg.includes("company number") ||
          lowerMsg.includes("phone number") ||
          lowerMsg.includes("mobile number") ||
          lowerMsg.includes("whatsapp number") ||
          lowerMsg.includes("contact number") ||
          lowerMsg.includes("give number") ||
          lowerMsg.includes("webbheads number") ||
          lowerMsg.includes("your number"))
      ) {
        replyText = `You can call or reach us directly at:\n\n📞 Phone: Call +91 9494259453\n💬 WhatsApp: Chat on WhatsApp (+91 9494259453)\n📅 Book a Call: Schedule via Cal.com (cal.com/webb-heads)\n\nWould you like us to schedule a call back instead?`;
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
