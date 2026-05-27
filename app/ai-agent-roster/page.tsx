import type { Metadata } from "next";
import SubpageNav from "../components/SubpageNav";

export const metadata: Metadata = {
  title: "AI Agent Team Roster — Harel Asaf",
  description: "9 specialized AI agents. One coherent system. Built with the ABC-TOM framework.",
};

export default function AiAgentRosterPage() {
  return (
    <>
      <SubpageNav title="AI Agent Team Roster" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --roster-bg: #0a0a0f;
          --roster-card-bg: #12121a;
          --roster-purple: #6c63ff;
          --roster-teal: #2dd4bf;
          --roster-text: #e8e8f0;
          --roster-secondary: #b0b0bb;
          --roster-code-bg: #1f1f2a;
        }
        .roster-wrap {
          font-family: 'Inter', sans-serif;
          background-color: var(--roster-bg);
          color: var(--roster-text);
          margin: 0;
          padding: 20px;
          min-height: 100vh;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }
        .roster-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .roster-header {
          text-align: center;
          margin-bottom: 3rem;
          padding-top: 2rem;
        }
        .roster-header h1 {
          font-size: 3em;
          color: var(--roster-text);
          margin: 0 0 0.5rem;
          font-weight: 700;
        }
        .roster-header h2 {
          font-size: 1.2em;
          color: var(--roster-secondary);
          font-weight: 400;
          margin: 0;
        }
        .roster-intro {
          background-color: var(--roster-card-bg);
          border-radius: 8px;
          padding: 1.5rem;
          margin: 0 auto 3rem;
          text-align: center;
          max-width: 700px;
          border-top: 4px solid var(--roster-purple);
        }
        .roster-intro p {
          color: var(--roster-secondary);
          font-size: 1em;
          margin: 0;
        }
        .roster-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 4rem;
        }
        .roster-card {
          background-color: var(--roster-card-bg);
          border-radius: 8px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s ease-in-out;
          border-top: 4px solid transparent;
        }
        .roster-card:hover { transform: scale(1.02); }
        .roster-card.purple { border-color: var(--roster-purple); }
        .roster-card.teal { border-color: var(--roster-teal); }
        .roster-card-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .roster-emoji {
          font-size: 2em;
          margin-right: 0.75rem;
          line-height: 1;
        }
        .roster-name {
          font-size: 1.6em;
          font-weight: 600;
          color: var(--roster-text);
          margin: 0;
        }
        .roster-role {
          font-size: 1em;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        .roster-card.purple .roster-role { color: var(--roster-purple); }
        .roster-card.teal .roster-role { color: var(--roster-teal); }
        .roster-tagline {
          font-size: 0.9em;
          color: var(--roster-secondary);
          margin-bottom: 1rem;
          flex-grow: 1;
        }
        .roster-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
          margin-bottom: 1rem;
        }
        .roster-skill {
          font-size: 0.75em;
          padding: 0.4em 0.7em;
          border-radius: 4px;
          font-weight: 500;
          white-space: nowrap;
        }
        .roster-card.purple .roster-skill {
          background-color: rgba(108, 99, 255, 0.2);
          color: var(--roster-purple);
        }
        .roster-card.teal .roster-skill {
          background-color: rgba(45, 212, 191, 0.2);
          color: var(--roster-teal);
        }
        .roster-trigger {
          background-color: var(--roster-code-bg);
          color: var(--roster-text);
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
          font-size: 0.8em;
          padding: 0.5em 0.8em;
          border-radius: 4px;
          display: inline-block;
          margin-top: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .roster-footer {
          text-align: center;
          margin-top: 3rem;
          padding-bottom: 2rem;
          font-size: 0.9em;
          color: var(--roster-secondary);
        }
        .roster-footer a {
          color: var(--roster-purple);
          text-decoration: none;
        }
        .roster-footer a:hover {
          color: var(--roster-text);
          text-decoration: underline;
        }
        @media (max-width: 1024px) {
          .roster-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .roster-header h1 { font-size: 2.5em; }
          .roster-header h2 { font-size: 1.1em; }
          .roster-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .roster-wrap { padding: 15px; }
          .roster-header h1 { font-size: 2em; }
        }
      `}} />
      <div className="roster-wrap">
        <div className="roster-container">
          <header className="roster-header">
            <h1>{"Harel's AI Agent Team"}</h1>
            <h2>9 specialized agents. One coherent system.</h2>
          </header>

          <section className="roster-intro">
            <p>Tasks are routed via <code className="roster-trigger">/vision</code>. Cross-agent work goes through Vision backlog, processed daily at 7am IL.</p>
          </section>

          <section className="roster-grid">
            {/* C-SUITE */}
            <AgentCard tier="purple" emoji="🔭" name="Vision" role="COO - System architect and builder" tagline="System architect and builder" skills={["Agent Building","Workflow Design","System Architecture"]} trigger="/vision" />
            <AgentCard tier="purple" emoji="📢" name="Jams" role="CMO - Content strategy and brand authority" tagline="Content strategy and brand authority" skills={["LinkedIn","Brand Voice","Campaigns"]} trigger="draft post" />
            <AgentCard tier="purple" emoji="⚙️" name="Martin" role="CTO - Infrastructure and automation reliability" tagline="Infrastructure and automation reliability" skills={["Automation","Model Routing","System Health"]} trigger="tech issue" />
            <AgentCard tier="purple" emoji="📊" name="Albert" role="CFO - Runway, pricing, unit economics" tagline="Runway, pricing, unit economics" skills={["Cash Runway","Pricing","Investment"]} trigger="budget check" />
            <AgentCard tier="purple" emoji="🎯" name="Alex" role="CRO - Pipeline, outreach, revenue motion" tagline="Pipeline, outreach, revenue motion" skills={["Pipeline","Account Plans","Outreach"]} trigger="sales help" />
            <AgentCard tier="purple" emoji="🗺️" name="Dana" role="CPO - Roadmap, specs, product discovery" tagline="Roadmap, specs, product discovery" skills={["Roadmap","Specs","Analytics"]} trigger="product spec" />

            {/* SPECIALTY */}
            <AgentCard tier="teal" emoji="🔨" name="Ben" role="Prototype Builder - Ideas to working prototypes fast" tagline="Ideas to working prototypes fast" skills={["Base44","Gemini CLI","GitHub Pages"]} trigger="build this" />
            <AgentCard tier="teal" emoji="🌍" name="Maya" role="Travel Lead - Weekend plans, family trips, Hebrew" tagline="Weekend plans, family trips, Hebrew" skills={["Weekend Plans","Travel","Family"]} trigger="trip idea" />
            <AgentCard tier="teal" emoji="🏠" name="Tabu" role="Real Estate - Israeli property market and tenders" tagline="Israeli property market and tenders" skills={["Israeli Market","Tenders","Rentals"]} trigger="real estate" />
          </section>

          <footer className="roster-footer">
            Built with ABC-TOM framework | <a href="https://github.com/RLASAF12/ai-agent-roster" target="_blank" rel="noopener noreferrer">github.com/RLASAF12/ai-agent-roster</a>
          </footer>
        </div>
      </div>
    </>
  );
}

function AgentCard({ tier, emoji, name, role, tagline, skills, trigger }: {
  tier: "purple" | "teal";
  emoji: string;
  name: string;
  role: string;
  tagline: string;
  skills: string[];
  trigger: string;
}) {
  return (
    <div className={`roster-card ${tier}`}>
      <div>
        <div className="roster-card-header">
          <span className="roster-emoji">{emoji}</span>
          <h3 className="roster-name">{name}</h3>
        </div>
        <p className="roster-role">{role}</p>
        <p className="roster-tagline">{tagline}</p>
      </div>
      <div>
        <div className="roster-skills">
          {skills.map((s) => (
            <span key={s} className="roster-skill">{s}</span>
          ))}
        </div>
        <code className="roster-trigger">{trigger}</code>
      </div>
    </div>
  );
}
