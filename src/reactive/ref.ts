import { toRaw } from "./reactive"
import { shouldTrack, activeEffect, trackEffects } from "./effect"

export function trackRefValue(ref){
  if(shouldTrack && activeEffect){
    trackEffects(ref.dep)
  }
}

export function triggerRefValue(ref, newVal){

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
    this._rawValue = __v_isShallow ? value : toRaw(value)
    this._value = value
  }
  
  get value(){
    trackRefValue(this)
    return this._value
  }
  set value(newVal){
    this._rawValue = newVal
    triggerRefValue(this, newVal)
  }
}