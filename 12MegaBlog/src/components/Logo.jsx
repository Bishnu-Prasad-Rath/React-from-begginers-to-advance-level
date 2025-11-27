function Logo({ width = '150px' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width }}>
      {/* Simple document icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        style={{ width: '28px', height: '28px', marginRight: '8px', color: 'white' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="3" width="16" height="18" rx="3" stroke="#000" strokeWidth="2" />
        <line x1="8" y1="8" x2="16" y2="8" stroke="#000" strokeWidth="2" />
        <line x1="8" y1="12" x2="16" y2="12" stroke="#000" strokeWidth="2" />
        <line x1="8" y1="16" x2="14" y2="16" stroke="#000" strokeWidth="2" />
      </svg>
      <span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'white', userSelect: 'none' }}>
        MEGABLOG.IO
      </span>
    </div>
  );
}

export default Logo;
