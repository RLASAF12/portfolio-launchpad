export default function Footer() {
  return (
    <footer className="site-footer" style={{
      borderTop: '1px solid var(--color-border)', padding: '28px 0 36px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap' as const, gap: 12,
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted)' }}>
        Built by <span style={{ color: 'var(--color-accent)' }}>Harel Asaf</span> · Deployed by{' '}
        <span style={{ color: 'var(--color-accent)' }}>Ben</span> · Powered by Vercel + Supabase
      </div>
      <div style={{ display: 'flex', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
        {[
          { label: 'GitHub', href: 'https://github.com/RLASAF12' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/harel-asaf' },
          { label: 'Podcast', href: '#' },
          { label: 'Contact', href: '#' },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
