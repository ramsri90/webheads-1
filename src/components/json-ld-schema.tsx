import React from "react";

export function JsonLdSchema() {
  const websiteUrl = "https://webbheads.com";
  const logoUrl = `${websiteUrl}/icon.png`;

  // 1. ProfessionalService & LocalBusiness Schema (Local Geo-SEO)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${websiteUrl}/#organization`,
    "name": "WebbHeads",
    "alternateName": ["WebbHeads Digital Agency", "WebbHeads Vizag", "WebbHeads Web Development"],
    "url": websiteUrl,
    "logo": logoUrl,
    "image": logoUrl,
    "description": "WebbHeads is the premier digital agency in Visakhapatnam (Vizag), engineering high-converting Next.js websites, mobile apps, AI automations, and reel content ecosystems.",
    "telephone": "+919494259453",
    "email": "contact@webbheads.com",
    "priceRange": "₹18,000 - ₹50,000+",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Visakhapatnam",
      "addressRegion": "Andhra Pradesh",
      "addressCountry": "IN",
      "postalCode": "530001"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.6868,
      "longitude": 83.2185
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      "https://wa.me/919494259453",
      "https://cal.com/webb-heads",
      "https://instagram.com/webbheads"
    ],
    "founder": {
      "@type": "Person",
      "name": "DJ Kushal",
      "jobTitle": "Founder & CEO",
      "worksFor": {
        "@id": `${websiteUrl}/#organization`
      }
    },
    "employee": [
      {
        "@type": "Person",
        "name": "Vivek Ram Sri",
        "jobTitle": "Lead AI & Web Engineer",
        "worksFor": {
          "@id": `${websiteUrl}/#organization`
        }
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Visakhapatnam"
      },
      {
        "@type": "Country",
        "name": "India"
      },
      {
        "@type": "Country",
        "name": "Worldwide"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "WebbHeads Digital Agency Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tech Package (Website & AI Chatbot)",
            "description": "High-converting Next.js website engineering, responsive UI, SEO optimization, and 24/7 AI Chatbot lead capture sync.",
            "price": "18000",
            "priceCurrency": "INR"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Content & Marketing Package",
            "description": "12 premium short-form reels per month (evaluated at ₹2,200/reel), brand strategy, IG & FB account management, and analytics.",
            "price": "26400",
            "priceCurrency": "INR"
          }
        }
      ]
    }
  };

  // 2. WebPage Schema (GEO Published & Updated Date Signal)
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": websiteUrl,
    "url": websiteUrl,
    "name": "WebbHeads | Best Digital Agency in Vizag",
    "description": "WebbHeads is the top digital agency in Vizag. We build high-converting Next.js websites, mobile apps, and AI automations starting at ₹18,000.",
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${websiteUrl}/#website`,
      "name": "WebbHeads",
      "url": websiteUrl
    },
    "datePublished": "2026-01-01T08:00:00+05:30",
    "dateModified": "2026-08-28T23:55:00+05:30",
    "author": {
      "@type": "Organization",
      "name": "WebbHeads Digital Agency",
      "url": websiteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "WebbHeads",
      "logo": {
        "@type": "ImageObject",
        "url": logoUrl
      }
    }
  };

  // 3. BreadcrumbList Schema (AEO Hierarchy)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": websiteUrl
      }
    ]
  };

  // 4. FAQPage Schema (AEO Answer Engine & Google AI Overviews Optimization)
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is WebbHeads and what services do you provide in Vizag?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WebbHeads is the premier full-stack digital agency based in Visakhapatnam (Vizag), India. We specialize in Next.js web application development, iOS and Android mobile app engineering, 24/7 AI lead qualification chatbots, and high-converting short-form reels for social media marketing."
        }
      },
      {
        "@type": "Question",
        "name": "How much does website development cost at WebbHeads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WebbHeads offers standard web engineering packages starting at ₹18,000 (one-time build). This includes Next.js development, high-converting landing pages, SEO optimization, and 24/7 AI Chatbot lead integration into Leadcore DB."
        }
      },
      {
        "@type": "Question",
        "name": "What is included in the ₹26,400/month Content Marketing package?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The ₹26,400/month package includes 12 premium short-form reels per month (evaluated at ₹2,200/reel), complete brand video editing, Instagram & Facebook platform management, content calendar strategy, and monthly growth analytics."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to deliver a website or mobile app?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard website design and engineering takes 20-25 days. Mobile app development typically takes 2 to 4 weeks, while standard graphic design assets are delivered in 2 to 3 business days."
        }
      },
      {
        "@type": "Question",
        "name": "Who founded WebbHeads and who built the AI Chatbot engine?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WebbHeads was founded by DJ Kushal (Founder & CEO). The web platform, AI Assistant, and automated Leadcore database pipeline were designed and engineered by Lead AI & Web Engineer Vivek Ram Sri."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
    </>
  );
}
