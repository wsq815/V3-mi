export let shouldTrack = true

export let activeEffect: ReactiveEffect | undefined

export class ReactiveEffect {
  active = true
  deps:any[] = []
  parent: ReactiveEffect | undefined = undefined
}

export function trackEffects(dep){
  let shouldTrack = false

  dep.add(activeEffect!)
  activeEffect!.deps.push(dep)
}