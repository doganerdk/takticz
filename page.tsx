@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --ui-bg: #0d1117;
  --ui-panel: #161b22;
  --ui-border: #30363d;
  --accent: #00ff87;
  --text-primary: #f0f6fc;
  --text-secondary: #8b949e;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; overflow: hidden; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--ui-bg);
  color: var(--text-primary);
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--ui-bg); }
::-webkit-scrollbar-thumb { background: var(--ui-border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #484f58; }

@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,135,0.4); }
  50% { box-shadow: 0 0 0 8px rgba(0,255,135,0); }
}
.pulse-green { animation: pulse-green 2s infinite; }
