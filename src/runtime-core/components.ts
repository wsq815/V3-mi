export function createComponentInstance(vnode){
  const instance = {
    vnode,
    type: vnode.type
  }
  return instance
}

export function setupComponent(instance){
  setupStateFulComponent(instance)
}
function setupStateFulComponent(instance){
  const Component = instance.type;

  const { setup } = Component;
  if (setup) {
      // function Object
      const setupResult = setup();
      handleSetupResult(instance, setupResult)
  }
}
function handleSetupResult(instance, setupResult){
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult;
  }
  finishComponentSetup(instance)
}
function finishComponentSetup(instance){
  const Component = instance.type
  
  if(Component.render){
    instance.render = Component.render
  }
}