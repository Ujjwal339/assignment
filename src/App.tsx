import React, { useEffect, useRef, useState } from "react";
import Particles from "react-tsparticles";

const sections = [
  {
    title: "AI Transforming Content Marketing",
    content:
      "AI revolutionizes content marketing by enabling hyper-personalization at scale. It analyzes user data, preferences, and behavior to generate tailored messages and content automatically. AI-powered tools assist marketers by creating blog posts, social media content, video scripts, and email campaigns that resonate with individual audience segments — driving better engagement and ROI.",
  },
  {
    title: "Challenges & Solutions in AI Marketing",
    content:
      "Challenges:\n- Data privacy concerns & compliance with regulations like GDPR\n- Dependence on quality data and biases in AI models\n- Integration complexity with existing marketing platforms\n- Trust & transparency in AI-generated content\n\nSolutions:\n- Implement strict data governance and anonymization techniques\n- Use explainable AI (XAI) to increase transparency\n- Adopt hybrid workflows where AI supports but doesn’t replace human creativity\n- Continuous monitoring and auditing of AI outputs to mitigate bias",
  },
  {
    title: "Ethical Implications of AI in Marketing",
    content:
      "AI introduces ethical concerns that marketers must address:\n- Potential misuse of personal data\n- Creation and spread of misinformation through AI-generated content\n- Automation replacing human jobs and reducing creative diversity\n- Ensuring fairness, transparency, and respect for consumer autonomy\n\nAdopting ethical AI frameworks, transparency with customers, and responsible use policies are key to building trust and sustainable AI-driven marketing.",
  },
  {
    title: "Human-AI Collaboration Models",
    content:
      "AI works best as a collaborative partner, not a replacement:\n- Marketers leverage AI for data insights, predictive analytics, and automating repetitive tasks\n- Humans provide strategic direction, creativity, empathy, and ethical oversight\n- Examples include AI suggesting personalized offers while humans approve final campaigns\n- This symbiosis boosts efficiency, creativity, and ethical integrity",
  },
];

const particlesOptions = {
  background: { color: { value: "#0a192f" } },
  fpsLimit: 60,
  interactivity: {
    events: { onHover: { enable: true, mode: "repulse" }, resize: true },
    modes: { repulse: { distance: 100, duration: 0.4 } },
  },
  particles: {
    color: { value: "#61dafb" },
    links: {
      color: "#61dafb",
      distance: 150,
      enable: true,
      opacity: 0.3,
      width: 1,
    },
    move: { enable: true, speed: 2, outModes: { default: "bounce" } },
    number: { density: { enable: true, area: 800 }, value: 50 },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 4 } },
  },
  detectRetina: true,
};

export default function App() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(sections.map(() => false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const updated = [...visible];
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          updated[index] = entry.isIntersecting;
        });
        setVisible(updated);
      },
      { threshold: 0.3 }
    );

    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      sectionRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, [visible]);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        minHeight: "400vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "white",
        position: "relative",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <Particles id="tsparticles" options={particlesOptions} />

      {/* Scroll Menu (Dots) */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          right: "30px",
          transform: "translateY(-50%)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {sections.map((_, idx) => (
          <div
            key={idx}
            onClick={() => scrollToSection(idx)}
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: visible[idx] ? "#61dafb" : "#888",
              cursor: "pointer",
              border: "2px solid white",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "800px",
          margin: "0 auto",
          padding: "100px 20px",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            textAlign: "center",
            marginBottom: "2rem",
            textShadow: "0 0 10px rgba(0,0,0,0.7)",
          }}
        >
          AI Transforming Marketing Functions
        </h1>

        {sections.map((section, idx) => (
          <div
            key={idx}
            data-index={idx}
            ref={(el) => (sectionRefs.current[idx] = el)}
            style={{
              marginBottom: "80px",
              opacity: visible[idx] ? 1 : 0,
              transform: visible[idx] ? "translateY(0)" : "translateY(70px)",
              transition: "all 0.6s ease",
              backgroundColor: "rgba(0, 0, 0, 0.55)",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 15px rgba(0,0,0,0.5)",
            }}
          >
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
              {section.title}
            </h2>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "1.1rem",
                lineHeight: "1.6",
                color: "#d1d5db",
              }}
            >
              {section.content}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
