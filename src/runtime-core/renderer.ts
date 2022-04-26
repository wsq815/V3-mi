import { isObject } from '../shared'
import { createComponentInstance, setupComponent } from './components'

export function patch(vnode, container){
  if(typeof vnode.type === 'string'){
    processElement(vnode, container)
  }else if(isObject(vnode.type)){
    processComponent(vnode, container)
  }
}

export function render(vnode, container){
  patch(vnode, container)
} 

export function processElement(vnode, container){
  mountElement(vnode, container)
}
const mountElement = (vnode, container) => {
  const { type, props, children } = vnode
   // type
   const el = document.createElement(type);
    // children
    if (typeof children == 'string') {
      el.textContent = children
    } else if (Array.isArray(children)) {
        mountChildren(vnode.children, el)
    }
    // props
    for (const key in props) {
      const val = props[key]
      el.setAttribute(key, val)
    }
    container && container.append(el)
    // document.body.append(el)
}
function mountChildren(children, container){
  children.forEach(v => {
    patch(v, container)
  })
}


export function processComponent(vnode, container){
  mountComponent(vnode, container)
}
const mountComponent = (vnode, container) => {
  const instance = createComponentInstance(vnode)
  setupComponent(instance)

  setupRenderEffect(instance, container)
}


const setupRenderEffect = (instance, container) => {
  const subTree = instance.render()
  // vnode -> patch
  // vnode -> element ->mountElement
  patch(subTree, container)
}