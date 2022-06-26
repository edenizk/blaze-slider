import { AutomataConfig, State } from '../types'
import { calculateStates } from './calculateStates'
import { fixSliderConfig } from '../utils/fixSliderConfig'

export type Transition = [oldStateIndex: number, slideCount: number]

export class Automata {
  config: AutomataConfig
  // state
  stateIndex: number
  // states
  states: State[]
  // data
  totalSlides: number
  isTransitioning: boolean

  // slider is static if number of slides are less than config.slidesToShow
  isStatic: boolean

  constructor(totalSlides: number, config: AutomataConfig) {
    this.config = config
    this.totalSlides = totalSlides
    this.stateIndex = 0
    this.isTransitioning = false
    fixSliderConfig(this)
    this.isStatic = totalSlides <= config.slidesToShow
    this.states = calculateStates(this)
  }

  next(pages = 1): Transition | void {
    if (this.isTransitioning || this.isStatic) return
    const { stateIndex } = this
    let slidesMoved = 0
    let newStateIndex = stateIndex

    for (let i = 0; i < pages; i++) {
      const state = this.states[newStateIndex]
      slidesMoved += state.next.moveSlides
      newStateIndex = state.next.stateIndex
    }

    if (newStateIndex === stateIndex) return
    this.stateIndex = newStateIndex

    return [stateIndex, slidesMoved]
  }

  prev(pages = 1): Transition | void {
    if (this.isTransitioning || this.isStatic) return
    const { stateIndex } = this
    let slidesMoved = 0
    let newStateIndex = stateIndex

    for (let i = 0; i < pages; i++) {
      const state = this.states[newStateIndex]
      slidesMoved += state.prev.moveSlides
      newStateIndex = state.prev.stateIndex
    }
    if (newStateIndex === stateIndex) return
    this.stateIndex = newStateIndex

    return [stateIndex, slidesMoved]
  }
}
