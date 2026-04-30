import './Transition.css'

const TYPES = ['ripple', 'wipe', 'zoom']

function pickType(preferred) {
  if (preferred && preferred !== 'random') return preferred
  return TYPES[Math.floor(Math.random() * TYPES.length)]
}

export function triggerPageTransition(clickX, clickY, opts = {}) {
  const color = opts.color || getComputedStyle(document.documentElement).getPropertyValue('--accent-gradient') || 'linear-gradient(135deg,#6dd5ed,#2193b0)'
  const duration = opts.duration || 700
  const type = pickType(opts.type)

  let node
  if (type === 'ripple') {
    node = document.createElement('div')
    node.className = 'page-transit ripple'
    node.style.left = `${clickX}px`
    node.style.top = `${clickY}px`
    node.style.background = color
  } else if (type === 'wipe') {
    node = document.createElement('div')
    node.className = 'page-transit wipe'
    node.style.background = color
    // place near click Y for subtlety
    node.style.top = `${Math.max(0, clickY - 100)}px`
  } else {
    node = document.createElement('div')
    node.className = 'page-transit zoom'
    node.style.left = `${clickX}px`
    node.style.top = `${clickY}px`
    node.style.background = color
  }

  // loader for visual feedback
  const loader = document.createElement('div')
  loader.className = 'page-transit-loader'
  node.appendChild(loader)

  document.body.appendChild(node)

  // force style recalc then trigger animation
  // eslint-disable-next-line no-unused-expressions
  node.offsetWidth

  if (type === 'ripple') node.classList.add('expand')
  else if (type === 'wipe') node.classList.add('wipe-expand')
  else node.classList.add('zoom-in')

  return new Promise((resolve) => {
    const total = duration + 250
    setTimeout(() => {
      node.classList.add('fadeout')
      setTimeout(() => {
        try { document.body.removeChild(node) } catch (e) {}
        resolve()
      }, 220)
    }, total)
  })
}

export default triggerPageTransition
