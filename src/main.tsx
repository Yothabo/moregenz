import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { recordLifecycleEvent } from './utils/lifecycleDiagnostics'
import { mountLifecycleDiagnosticsPanel } from './utils/lifecycleDiagnosticsPanel'

recordLifecycleEvent('document-boot')
mountLifecycleDiagnosticsPanel()

window.addEventListener('pageshow', (event) => {
  recordLifecycleEvent('pageshow', {
    persisted: (event as PageTransitionEvent).persisted,
  })
})

window.addEventListener('pagehide', (event) => {
  recordLifecycleEvent('pagehide', {
    persisted: (event as PageTransitionEvent).persisted,
  })
})

document.addEventListener('visibilitychange', () => {
  recordLifecycleEvent('visibilitychange')
})

window.addEventListener('freeze', () => {
  recordLifecycleEvent('freeze')
})

window.addEventListener('resume', () => {
  recordLifecycleEvent('resume')
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
