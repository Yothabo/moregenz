export function mountLifecycleDiagnosticsPanel() {
  const toggle = document.createElement('button');
  toggle.textContent = 'Lifecycle log';
  toggle.setAttribute('type', 'button');

  Object.assign(toggle.style, {
    position: 'fixed',
    right: '12px',
    bottom: '12px',
    zIndex: '2147483647',
    padding: '10px 14px',
    border: '1px solid #777',
    borderRadius: '8px',
    background: '#222',
    color: '#fff',
    font: '13px sans-serif',
  });

  const panel = document.createElement('div');
  Object.assign(panel.style, {
    display: 'none',
    position: 'fixed',
    inset: 'auto 8px 58px 8px',
    zIndex: '2147483647',
    maxHeight: '65vh',
    overflow: 'auto',
    padding: '12px',
    border: '1px solid #888',
    borderRadius: '10px',
    background: '#111',
    color: '#eee',
    boxShadow: '0 4px 24px #0008',
    font: '12px sans-serif',
  });

  const actions = document.createElement('div');
  Object.assign(actions.style, {
    display: 'flex',
    gap: '8px',
    marginBottom: '10px',
  });

  const copy = document.createElement('button');
  copy.textContent = 'Copy log';

  const close = document.createElement('button');
  close.textContent = 'Close';

  for (const button of [copy, close]) {
    Object.assign(button.style, {
      padding: '7px 10px',
      border: '1px solid #777',
      borderRadius: '6px',
      background: '#333',
      color: '#fff',
    });
  }

  const output = document.createElement('pre');
  Object.assign(output.style, {
    margin: '0',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
    lineHeight: '1.45',
  });

  function readLog() {
    try {
      const records = JSON.parse(
        sessionStorage.getItem('yotaabo-lifecycle-diagnostics') || '[]',
      );
      return Array.isArray(records) ? records : [];
    } catch {
      return [];
    }
  }

  function refresh() {
    output.textContent = JSON.stringify(readLog(), null, 2);
  }

  toggle.addEventListener('click', () => {
    refresh();
    panel.style.display = 'block';
  });

  close.addEventListener('click', () => {
    panel.style.display = 'none';
  });

  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(readLog(), null, 2),
      );
      copy.textContent = 'Copied';
    } catch {
      copy.textContent = 'Copy unavailable';
    }
  });

  actions.append(copy, close);
  panel.append(actions, output);
  document.body.append(panel, toggle);
}
