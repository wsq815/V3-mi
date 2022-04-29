import { toRaw } from "./reactive"
import { 
  shouldTrack, 
  activeEffect, 
  trackEffects,
  triggerEffects
} from "./effect"
import { createDep } from './dep'

export function trackRefValue(ref){
  if(shouldTrack && activeEffect){
    trackEffects(ref.dep || (ref.dep = createDep()), {
      key: 'value'
    })
  }
}

export function triggerRefValue(ref, newVal){
   if(ref.dep){
    triggerEffects(ref.dep || (ref.dep = createDep()))
   }
}

export function ref(value){
  return createRef(value, false)
}

function createRef(rawValue, shallow){
  return new RefImpl(rawValue, shallow)
}

class RefImpl{
  private _value
  private _rawValue

  public dep? = new Set()
  public readonly __v_isRef = true

  constructor(value, __v_isShallow){
    this._rawValue = value
    this._value = value
  }
  
  get value(){
    trackRefValue(this)
    return this._value
  }
  set value(newVal){
    this._rawValue = newVal
    this._value = newVal
    triggerRefValue(this, newVal)
  }
}