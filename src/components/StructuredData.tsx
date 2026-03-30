export default function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kensho Ventures",
    legalName: "Kensho Capital Management GmbH",
    url: "https://kensho.vc",
    logo: "https://kensho.vc/Kensho_Logo.svg",
    description:
      "European early-stage venture capital firm investing in resilience technologies: robotics, cybersecurity, quantum, and industrial AI.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rosenthaler Straße 72 A",
      addressLocality: "Berlin",
      postalCode: "10119",
      addressCountry: "DE",
    },
    email: "info@kensho.vc",
    sameAs: ["https://www.linkedin.com/company/kensho-vc/"],
    knowsAbout: [
      "Venture Capital",
      "Deep Technology",
      "Robotics",
      "Cybersecurity",
      "Quantum Computing",
      "Industrial AI",
      "European Startups",
    ],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 2,
    },
    foundingLocation: {
      "@type": "Place",
      name: "Berlin, Germany",
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What's the best way to reach out to Kensho Ventures?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Come introduced through someone we know. That works best. You can also use the contact form - but fewer than 1 in 200 cold submissions lead to an investment. Most of our portfolio started with us reaching out first.",
        },
      },
      {
        "@type": "Question",
        name: "How fast does Kensho Ventures make investment decisions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our GP evaluates the research directly - technical deep-dive, reference checks, advisory review. No black box. Throughout the process, we tell you where we stand: what we find strong, where we see risks, and what we need to understand better. If it is a fit, you will know. If it is not, you will know that too.",
        },
      },
      {
        "@type": "Question",
        name: "What does Kensho Ventures do after investing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We deploy commercial infrastructure from Day 1. For Qambria, that meant 3,250 B2B leads and introductions to three add-on investors. For Diffraqtion, an intro to the Head of Defense Research in Munich. We build your pipeline and your investor network so you can focus on the technology.",
        },
      },
      {
        "@type": "Question",
        name: "Why is Kensho Ventures a small fund?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "By design. 20 companies, EUR 500K first checks. A small fund means we can commit fully: dedicated lead generation, direct customer introductions, hands-on operational support. That is harder with 80 companies in a portfolio. We chose depth over breadth.",
        },
      },
      {
        "@type": "Question",
        name: "What won't Kensho Ventures invest in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Business models. We back hard technology - systems where the defensibility is in the architecture, not the go-to-market. No SaaS, no marketplaces, no consumer apps. If your moat is a network effect rather than a technical breakthrough, we are the wrong fund.",
        },
      },
      {
        "@type": "Question",
        name: "What kind of founders is Kensho Ventures looking for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Technical founders who can sell - or are coachable enough to learn. We look for what we call Double PMF: proof of fit in one focused use case, plus visibility into a larger market. We do not need a finished company. We need defensible technology with global potential.",
        },
      },
    ],
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kensho Ventures",
    url: "https://kensho.vc",
    description:
      "European early-stage venture capital firm investing in resilience technologies.",
    publisher: {
      "@type": "Organization",
      name: "Kensho Ventures",
    },
  };

  // All data is hardcoded -- no user input, no XSS risk
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
    </>
  );
}
