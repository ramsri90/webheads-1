"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, X, Send, Bot, User, Sparkles, 
  Phone, Mail, Calendar, Calculator, CheckCircle2, ArrowRight, Rocket 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "👋 Hi there! I'm the WebbHeads AI Assistant.\nHow can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Lead capture form state
  const [leadForm, setLeadForm] = useState({
    name: "",
    mobile: "",
    email: "",
    company: "",
    category: "Web & AI Ecosystem",
    notes: "",
  });
  const [leadStatus, setLeadStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showLeadForm]);

  // Stateful Callback Step-by-Step Flow
  const [callbackStep, setCallbackStep] = useState<"IDLE" | "AWAITING_NAME" | "AWAITING_PHONE" | "AWAITING_EMAIL" | "AWAITING_PURPOSE">("IDLE");
  const [callbackData, setCallbackData] = useState({
    name: "",
    mobile: "",
    email: "",
    purpose: "",
    preferredTime: "",
  });

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");

    const lowerText = text.toLowerCase();

    // Time Slot Extraction helper (e.g., "11 am", "tomorrow 2 to 4 PM", "at 3pm", "morning")
    const timeSlotMatch = text.match(/(?:strictly\s+)?(?:between\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)?\s*and\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)?|tomorrow(?:\s+strictly)?\s+(?:between\s+)?\d{1,2}(?::\d{2})?\s*(?:am|pm)?(?:\s*to\s*\d{1,2}\s*(?:am|pm)?)?|at\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)?|\d{1,2}\s*(?:am|pm|a\.m\.|p\.m\.))/i);
    const extractedTime = timeSlotMatch ? timeSlotMatch[0] : "";

    // Strip out currency/price numbers (e.g. ₹18,000, 26,400) before extracting phone numbers
    const textWithoutPrices = text.replace(/(?:₹|rs\.?|inr)?\s*\d{1,3}(?:,\d{3})+|\b18000\b|\b26400\b/gi, "");

    // Smart regex for genuine mobile numbers (e.g. Indian mobile numbers starting with 6,7,8,9, or +91)
    const phoneRegex = /(?:\+?91[-.\s]?)?[6-9]\d{9}|\b[6-9]\d{2}[-.\s]?\d{3}[-.\s]?\d{4}\b/;
    const phoneMatch = textWithoutPrices.match(phoneRegex);
    const hasPhone = Boolean(phoneMatch);
    const extractedPhone = phoneMatch ? phoneMatch[0] : "";

    // Smart regex extraction for name (e.g., "my name is vivek", "na name vivek", "naa peru vivek", "name vivek")
    const nameMatch = text.match(/(?:my name is|my name|i am|i'm|this is|name\s+is|na\s+name|naa\s+peru|na\s+peru|peru|name\s*:?)\s+([a-zA-Z]+)/i);
    const extractedName = nameMatch ? nameMatch[1] : "";

    // Smart regex extraction for purpose/project (e.g., "build a Flutter app", "Next.js rebuild")
    const purposeMatch = text.match(/(?:want to build|regarding|for|need)\s+(?:a\s+)?([^,.!?]+)/i);
    const extractedPurpose = purposeMatch ? purposeMatch[1].trim() : "";

    // --- TC-28: Direct Click-to-Call / Phone Request Handler ---
    const isAskingCompanyContact = lowerText.includes("company number") || 
      lowerText.includes("webbheads number") || 
      lowerText.includes("give number") || 
      lowerText.includes("im asking company number") || 
      lowerText.includes("asking company number") ||
      lowerText.includes("company phone") || 
      lowerText.includes("how to call") || 
      lowerText.includes("contact details") ||
      lowerText.includes("phone number") ||
      lowerText.includes("mobile number") ||
      lowerText.includes("whatsapp number") ||
      lowerText.includes("contact number") ||
      lowerText.includes("comapny number") ||
      lowerText.includes("your number") ||
      lowerText === "number" ||
      lowerText === "nuber" ||
      lowerText === "numbe" ||
      lowerText === "numb" ||
      lowerText === "mobile" ||
      lowerText === "phone";

    if (isAskingCompanyContact) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `TC-28-CONTACT\nYou can call or reach us directly at:\n\n📞 Phone: Call +91 9494259453\n💬 WhatsApp: Chat on WhatsApp\n📅 Book a Call: Schedule via Cal.com\n\nWould you like us to schedule a call back instead?`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      return;
    }

    // --- TC-07: Mid-Flow Topic Switch (Interrupt & Pivot) ---
    const isAskingQuestion = lowerText.includes("how much") || lowerText.includes("cost") || lowerText.includes("pricing") || lowerText.includes("service") || lowerText.includes("turnaround") || lowerText.includes("portfolio");
    if (callbackStep !== "IDLE" && isAskingQuestion) {
      setIsLoading(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });
        const data = await res.json();
        const pivotResponse = `${data.reply || "We offer custom packages starting at ₹18,000."}\n\nWould you like to continue scheduling your callback now?`;
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: pivotResponse,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } catch (err) {
        console.error("Pivot error:", err);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // --- TC-01 & TC-10: Single-Message Full Callback Capture ---
    if (hasPhone && callbackStep === "IDLE") {
      const leadName = extractedName || "Visitor";
      const notesContent = extractedTime 
        ? `Preferred Call Time: ${extractedTime} | Request: ${text}` 
        : `User Message: ${text}`;

      const finalData = {
        name: leadName,
        mobile: extractedPhone,
        email: "",
        notes: notesContent,
        category: extractedPurpose || "Website Callback Request",
      };

      setIsLoading(true);
      try {
        await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "save_lead",
            leadData: finalData,
          }),
        });

        const timeNotice = extractedTime ? ` for ${extractedTime}` : "";
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: `Thank you ${leadName} ! Our WebbHeads team has registered your call request${timeNotice} and will contact you shortly at this number "${extractedPhone}" 🎉`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } catch (err) {
        console.error("Direct lead save error:", err);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // --- TC-08: Partial Detail Extraction (Bypass Name/Purpose if provided) ---
    const isCallbackInit = (
      lowerText.includes("call") || 
      lowerText.includes("callback") || 
      lowerText.includes("contact me") ||
      lowerText.includes("phone back") ||
      lowerText.includes("cheyistava") ||
      lowerText.includes("matladali")
    ) && callbackStep === "IDLE";
    if (isCallbackInit) {
      if (extractedName && !hasPhone) {
        setCallbackData((prev) => ({
          ...prev,
          name: extractedName,
          purpose: extractedPurpose,
          preferredTime: extractedTime,
        }));
        setCallbackStep("AWAITING_PHONE");
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: `Thanks ${extractedName}! What is the best phone or WhatsApp number to reach you at? 📱`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        return;
      }

      setCallbackStep("AWAITING_NAME");
      if (extractedTime) setCallbackData((prev) => ({ ...prev, preferredTime: extractedTime }));
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "We'd love to organize a call for you! 📞 May I know your name first? 😊",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      return;
    }

    // --- Global Callback Cancellation & Reset Guardrail ---
    const isCancelRequest = 
      lowerText === "end" || 
      lowerText === "end chat" || 
      lowerText === "cancel" || 
      lowerText === "stop" || 
      lowerText === "quit" || 
      lowerText === "reset" || 
      lowerText === "close" || 
      lowerText.includes("nevermind") || 
      lowerText.includes("cancel callback") || 
      lowerText === "vaddu" || 
      lowerText === "waddhu" || 
      lowerText === "no thanks";

    if (callbackStep !== "IDLE" && isCancelRequest) {
      setCallbackStep("IDLE");
      setCallbackData({ name: "", mobile: "", email: "", purpose: "", preferredTime: "" });
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "No problem! I've cancelled the callback request. Feel free to ask any other questions about our services, pricing, or projects! 😊",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      return;
    }

    // Step-by-Step Callback Sequence (Natural Flow)
    // --- TC-23: Name Extraction Guardrail & Multi-Entity Single-Message Extraction ---
    if (callbackStep === "AWAITING_NAME") {
      const isLanguageCommand = lowerText.includes("telugu") || lowerText.includes("matladu") || lowerText.includes("matladandi") || lowerText.includes("english") || lowerText.includes("hindi");
      if (isLanguageCommand) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "Sure, Telugulo matladadhamu! 😊 Callback arrange cheyadaniki mee Peru (Name) share cheyandi?",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        return;
      }

      // If user provided phone number along with name in a single message (e.g. "vivek , mobilenumber 6304050076 , call in between 7-8")
      if (hasPhone) {
        const parsedName = extractedName || text.split(",")[0].replace(/(?:my name|na name|naa peru|name|is)\s*:?/gi, "").trim() || "Visitor";
        setCallbackData((prev) => ({
          ...prev,
          name: parsedName,
          mobile: extractedPhone,
          preferredTime: extractedTime || prev.preferredTime,
        }));
        setCallbackStep("AWAITING_EMAIL");
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: `Awesome ${parsedName}! ⚡ Could you also share your Email address? ✉️ (or type 'skip')`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        return;
      }

      const isQuestionOrNumberRequest = (lowerText.includes("what is your") || lowerText.includes("give number") || lowerText.includes("company number") || text.includes("?")) && !extractedName;
      if (isQuestionOrNumberRequest) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "You can reach WebbHeads directly at +91 9494259453!\n\nMay I have your name so our team knows who to ask for when calling back? 😊",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        return;
      }

      const cleanName = extractedName || text.split(",")[0].replace(/(?:my name|na name|naa peru|name|is)\s*:?/gi, "").trim();
      setCallbackData((prev) => ({ ...prev, name: cleanName }));
      setCallbackStep("AWAITING_PHONE");
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `Awesome to meet you, ${cleanName}! 👋 What's the best Phone or WhatsApp number to reach you at? 📱`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      return;
    }

    // --- TC-09, TC-24, TC-25: Phone Validation & Intent Routing ---
    if (callbackStep === "AWAITING_PHONE") {
      const isGreeting = lowerText === "hi" || lowerText === "hello" || lowerText === "hey" || lowerText.startsWith("good morning") || lowerText.startsWith("good evening");
      if (isGreeting) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "Hello! To schedule your callback, could you please provide your 10-digit phone number?",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        return;
      }

      const cleanDigits = text.replace(/\D/g, "");
      if (cleanDigits.length < 10) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "That looks a bit short for a phone number. Could you please share a valid 10-digit number?",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        return;
      }

      if (cleanDigits.length > 12) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "That phone number seems a bit long. Please enter a valid 10-digit mobile or WhatsApp number.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        return;
      }

      setCallbackData((prev) => ({ ...prev, mobile: text }));
      setCallbackStep("AWAITING_EMAIL");
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `Got it! ⚡ Could you also share your Email address? ✉️ (or type 'skip')`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      return;
    }

    // --- TC-12: Skipping Optional Email Step Explicitly ---
    if (callbackStep === "AWAITING_EMAIL") {
      const isSkip = lowerText.includes("skip") || lowerText.includes("no email") || lowerText.includes("don't want") || lowerText.includes("dont have") || lowerText === "no" || lowerText === "pass";
      const emailVal = isSkip ? "" : text;

      setCallbackData((prev) => ({ ...prev, email: emailVal }));

      // If purpose was already extracted (TC-08), jump directly to final submission!
      if (callbackData.purpose) {
        const finalData = {
          name: callbackData.name,
          mobile: callbackData.mobile,
          email: emailVal,
          notes: callbackData.preferredTime 
            ? `Preferred Call Time: ${callbackData.preferredTime} | Purpose: ${callbackData.purpose}` 
            : `Purpose: ${callbackData.purpose}`,
          category: callbackData.purpose,
        };

        setCallbackStep("IDLE");
        setIsLoading(true);

        try {
          await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "save_lead",
              leadData: finalData,
            }),
          });

          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              sender: "bot",
              text: `Thank you ${finalData.name} ! Our WebbHeads team has registered your call request and will contact you shortly at this number "${finalData.mobile}" 🎉`,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
        } catch (err) {
          console.error("Callback save error:", err);
        } finally {
          setIsLoading(false);
        }
        return;
      }

      setCallbackStep("AWAITING_PURPOSE");
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `Perfect! 🚀 What main project or service do you need help with? (e.g. Website, Mobile App, AI Automation) 💡`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      return;
    }

    // --- TC-26: Gibberish / Quality Check on Project Purpose ---
    if (callbackStep === "AWAITING_PURPOSE") {
      const cleanPurpose = text.trim();
      const isGibberish = cleanPurpose.length < 4 || /^(.)\1+$/i.test(cleanPurpose) || /^[bcdfghjklmnpqrstvwxyz]{3,}$/i.test(cleanPurpose);

      if (isGibberish) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "Could you share a few more details about what you need help with? (e.g., Website, Mobile App, or AI Automation)",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        return;
      }

      const notesContent = callbackData.preferredTime 
        ? `Preferred Call Time: ${callbackData.preferredTime} | Purpose: ${text}` 
        : `Purpose: ${text}`;

      const finalData = {
        name: callbackData.name,
        mobile: callbackData.mobile,
        email: callbackData.email,
        notes: notesContent,
        category: text,
      };

      setCallbackStep("IDLE");
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "save_lead",
            leadData: finalData,
          }),
        });

        const data = await res.json();

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: `Thank you ${finalData.name} ! Our WebbHeads team has registered your call request and will contact you shortly at this number "${finalData.mobile}" 🎉`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } catch (err) {
        console.error("Callback save error:", err);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Normal Chat AI API call
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.reply || "Sorry, I couldn't process that. Feel free to call us at +91 9494259453!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Connect error. Please call +91 9494259453 directly or book at cal.com/webb-heads!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || (!leadForm.mobile && !leadForm.email)) return;

    setLeadStatus("submitting");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_lead",
          leadData: leadForm,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLeadStatus("success");
        setTimeout(() => {
          setShowLeadForm(false);
          setLeadStatus("idle");
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              sender: "bot",
              text: `✅ **Lead Saved to Leadcore!**\nThank you **${leadForm.name}**! Our agency team will get in touch with you shortly.`,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
        }, 1200);
      } else {
        setLeadStatus("error");
      }
    } catch (err) {
      console.error("Lead submission error:", err);
      setLeadStatus("error");
    }
  };

  const [isIntroActive, setIsIntroActive] = useState(false);

  useEffect(() => {
    const checkIntro = () => {
      setIsIntroActive(document.body.classList.contains("intro-active"));
    };
    checkIntro();
    const interval = setInterval(checkIntro, 300);
    return () => clearInterval(interval);
  }, []);

  if (isIntroActive) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[90] font-sans">
      {/* Chat Floating Capsule Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex items-center gap-3 px-4 py-3 bg-white hover:bg-teal-500/5 border border-teal-500/40 hover:border-teal-500 rounded-full text-teal-950 shadow-2xl backdrop-blur-xl transition-all duration-300"
        aria-label="Open AI Assistant"
      >
        <div className="relative flex items-center justify-center">
          <img
            src="/images/webbheads-logo-black.png"
            alt="WebbHeads"
            className="h-6 w-auto object-contain"
          />
          <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-white animate-pulse" />
        </div>
        <span className="text-xs font-bold tracking-wide hidden sm:inline text-teal-950">Ask WebbHeads AI</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500/15 text-teal-600 group-hover:bg-teal-600 group-hover:text-teal-950 transition-colors">
          {isOpen ? <X className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
        </span>
      </motion.button>

      {/* Floating Chat Window Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[80vh] rounded-3xl border border-teal-500/20 bg-white/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-teal-500/15 bg-teal-500/5">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-teal-500/15 border border-teal-500/30">
                  <img src="/images/webbheads-logo-black.png" alt="Logo" className="h-5 w-auto object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-teal-950 flex items-center gap-1.5">
                    <span>WebbHeads AI</span>
                    <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                  </h3>
                  <p className="text-[12px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Connected to Leadcore
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowLeadForm(!showLeadForm)}
                  className="px-3 py-1 bg-teal-600/30 hover:bg-teal-600/50 border border-teal-500/40 text-teal-950 rounded-full text-[12px] font-semibold transition-all"
                >
                  {showLeadForm ? "Chat" : "Get Quote"}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 flex items-center justify-center rounded-full text-teal-950/60 hover:text-teal-950 hover:bg-teal-500/10 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            {showLeadForm ? (
              <div className="flex-1 p-5 overflow-y-auto bg-white">
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-teal-950 mb-1">Direct Project Inquiry</h4>
                  <p className="text-xs text-teal-950/60">Submit your details to automatically log your lead in Leadcore.</p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-teal-950/70 mb-1 font-mono">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full px-3 py-2 bg-teal-500/5 border border-teal-500/15 rounded-xl text-teal-950 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-teal-950/70 mb-1 font-mono">Mobile / WA</label>
                      <input
                        type="tel"
                        placeholder="+91 9876543210"
                        value={leadForm.mobile}
                        onChange={(e) => setLeadForm({ ...leadForm, mobile: e.target.value })}
                        className="w-full px-3 py-2 bg-teal-500/5 border border-teal-500/15 rounded-xl text-teal-950 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-teal-950/70 mb-1 font-mono">Email</label>
                      <input
                        type="email"
                        placeholder="rahul@example.com"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        className="w-full px-3 py-2 bg-teal-500/5 border border-teal-500/15 rounded-xl text-teal-950 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-teal-950/70 mb-1 font-mono">Company / Business</label>
                    <input
                      type="text"
                      placeholder="e.g. Thompson Luxury Homes"
                      value={leadForm.company}
                      onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                      className="w-full px-3 py-2 bg-teal-500/5 border border-teal-500/15 rounded-xl text-teal-950 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-teal-950/70 mb-1 font-mono">Service Category</label>
                    <select
                      value={leadForm.category}
                      onChange={(e) => setLeadForm({ ...leadForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-teal-500/15 rounded-xl text-teal-950 focus:outline-none focus:border-teal-500"
                    >
                      <option value="Web & AI Ecosystem">Web & AI Ecosystem</option>
                      <option value="Custom Web App">Custom Web App (Next.js)</option>
                      <option value="AI Automation">AI Property / Business Assistant</option>
                      <option value="3D Motion & Design">3D Motion & Branding</option>
                      <option value="SEO & Growth">SEO & Lead Growth</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-teal-950/70 mb-1 font-mono">Project Requirements / Notes</label>
                    <textarea
                      rows={2}
                      placeholder="Tell us what you'd like to build..."
                      value={leadForm.notes}
                      onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                      className="w-full px-3 py-2 bg-teal-500/5 border border-teal-500/15 rounded-xl text-teal-950 focus:outline-none focus:border-teal-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={leadStatus === "submitting"}
                    className="w-full mt-2 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {leadStatus === "submitting" ? (
                      <span>Saving to Leadcore...</span>
                    ) : leadStatus === "success" ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Saved!
                      </span>
                    ) : (
                      <span>Submit Inquiry to Leadcore &rarr;</span>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender === "bot" && (
                      <div className="h-7 w-7 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="h-4 w-4 text-teal-600" />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-teal-600 text-white rounded-br-none"
                          : "bg-teal-500/10 text-teal-950/90 border border-teal-500/15 rounded-bl-none"
                      }`}
                    >
                      {msg.text.includes("TC-28-CONTACT") ? (
                        <div className="space-y-3">
                          <p className="font-semibold text-teal-950/90">You can call or reach us directly at:</p>
                          <div className="flex flex-wrap gap-2 pt-1">
                            <a
                              href="tel:+919494259453"
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all"
                            >
                              <Phone className="h-3.5 w-3.5" />
                              <span>Call +91 9494259453</span>
                            </a>
                            <a
                              href="https://wa.me/919494259453?text=Hi%20WebbHeads%2C%20I%20need%20an%20enquiry.%20I%20need%20your%20help"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all"
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                              <span>Chat on WhatsApp</span>
                            </a>
                            <a
                              href="https://cal.com/webb-heads"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all"
                            >
                              <Calendar className="h-3.5 w-3.5" />
                              <span>Schedule via Cal.com</span>
                            </a>
                          </div>
                          <p className="text-teal-950/70 pt-1">Would you like us to schedule a call back instead?</p>
                        </div>
                      ) : msg.text.includes("wa.me") ? (
                        <div>
                          <div className="whitespace-pre-wrap mb-2">
                            {msg.text.replace(/https:\/\/wa\.me\S+/g, "").trim()}
                          </div>
                          <a
                            href="https://wa.me/919494259453?text=Hi%20WebbHeads%2C%20I%20need%20an%20enquiry.%20I%20need%20your%20help"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>Click to Chat on WhatsApp &rarr;</span>
                          </a>
                        </div>
                      ) : (msg.text.includes("+91 9494259453") || msg.text.includes("tel:")) ? (
                        <div>
                          <div className="whitespace-pre-wrap mb-2">{msg.text}</div>
                          <a
                            href="tel:+919494259453"
                            className="inline-flex items-center gap-2 px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            <span>Click to Call +91 9494259453 &rarr;</span>
                          </a>
                        </div>
                      ) : msg.text.includes("Email address") ? (
                        <div>
                          <div className="whitespace-pre-wrap mb-2">{msg.text}</div>
                          <button
                            onClick={() => handleSendMessage("skip")}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/40 text-amber-600 font-semibold rounded-xl text-xs border border-amber-500/40 shadow-md transition-all cursor-pointer"
                          >
                            <span>Skip Email ⏩</span>
                          </button>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      )}
                      <div className={`mt-1 text-[12px] text-right font-mono ${msg.sender === "user" ? "text-white/70" : "text-teal-950/40"}`}>{msg.timestamp}</div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2.5 items-center text-xs text-teal-600 font-mono">
                    <Sparkles className="h-4 w-4 animate-spin" />
                    <span>WebbHeads AI is thinking...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Quick Action Chips */}
            {!showLeadForm && (
              <div className="px-3 py-2 border-t border-teal-500/15 bg-teal-500/5 flex gap-1.5 overflow-x-auto scrollbar-none text-[12px]">
                {callbackStep === "AWAITING_EMAIL" && (
                  <button
                    onClick={() => handleSendMessage("skip")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/30 hover:bg-amber-500/50 text-amber-600 font-bold rounded-full shrink-0 border border-amber-400/50 transition-colors cursor-pointer animate-pulse"
                  >
                    <span>Skip Email ⏩</span>
                  </button>
                )}
                <button
                  onClick={() => handleSendMessage("What are your project cost estimates?")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/10 hover:bg-teal-500/20 text-teal-950/90 hover:text-teal-950 rounded-full shrink-0 border border-teal-500/15 hover:border-teal-500/40 transition-colors"
                >
                  <Calculator className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                  <span>Get Estimate</span>
                </button>
                <button
                  onClick={() => handleSendMessage("What services do you offer?")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/10 hover:bg-cyan-500/20 text-teal-950/90 hover:text-teal-950 rounded-full shrink-0 border border-teal-500/15 hover:border-cyan-400/40 transition-colors"
                >
                  <Rocket className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span>Services</span>
                </button>
                <button
                  onClick={() => handleSendMessage("I need a call back from webbheads")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-500/10 hover:bg-teal-500/15 text-teal-600 hover:text-teal-950 rounded-full shrink-0 border border-teal-500/30 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                  <span>Request Call</span>
                </button>
              </div>
            )}

            {/* Input Bar */}
            {!showLeadForm && (
              <div className="p-3 border-t border-teal-500/15 bg-white flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask WebbHeads AI..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-teal-500/5 border border-teal-500/15 rounded-full px-4 py-2 text-xs text-teal-950 focus:outline-none focus:border-teal-500 placeholder-teal-950/40"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="h-8 w-8 rounded-full bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center disabled:opacity-40 transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
