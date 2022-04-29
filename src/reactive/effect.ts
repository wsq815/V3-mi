export let shouldTrack = true

export let activeEffect: ReactiveEffect | undefined

export class ReactiveEffect {
  active = true
  deps:any[] = []
  parent: ReactiveEffect | undefined = undefined
  onTrack?: (event) => void
  constructor(public fn, scheduler?){

  }

  run(){
    // let parent: ReactiveEffect | undefined = activeEffect
    // while(parent){
    //   if(parent === this){
    //     return
    //   }
    //   parent = parent.parent
    // }
    try {
      // this.parent = activeEffect
      activeEffect = this
      shouldTrack = true

      return this.fn()
    } catch (error) {
      
    } finally {
      // activeEffect = this.parent

      // this.parent = undefined
    }
  }
}

export function effect(fn, options?){

  const _effect = new ReactiveEffect(fn)

  if(!options || !options.lazy){
    _effect.run()
  }
}

export function trackEffects(dep, debuggerEventExtraInfo?){
  let shouldTrack = false

  dep.add(activeEffect!)
  activeEffect!.deps.push(dep)

  // activeEffect!.onTrack({
  //   effect: activeEffect!,
  //   ...debuggerEventExtraInfo!
  // })
}

export function triggerEffects(
  dep, 
  debuggerEventExtraInfo?
) {
  const effects = Array.isArray(dep) ? dep : [...dep]
  for(const effect of effects){
    triggerEffect(effect, debuggerEventExtraInfo)
  }
    
}

function triggerEffect(
  effect,
  debuggerEventExtraInfo?
){
  console.log(333333333333333);
  
  if(effect !== activeEffect){
    console.log(44444444444);
    effect.run()
  }
}

