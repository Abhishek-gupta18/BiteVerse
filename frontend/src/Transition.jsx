import './Transition.css'

export function triggerPageTransition(clickX, clickY, opts = {}) {
  const duration = opts.duration || 700

  // create simple loader container
  const container = document.createElement('div')
  container.className = 'page-loader-overlay'
  
  // create spinner
  const spinner = document.createElement('div')
  spinner.className = 'page-loader-spinner'
  container.appendChild(spinner)
  
  document.body.appendChild(container)

  return new Promise((resolve) => {
    setTimeout(() => {
      try { document.body.removeChild(container) } catch (e) {}
      resolve()
    }, duration)
  })
}

export default triggerPageTransition
