import { BlazeSlider } from '../slider'
import { onSlideEnd } from './scroll'

// when loop is disabled, we must update the offset
export function noLoopScroll(slider: BlazeSlider) {
  slider.offset = -1 * slider.states[slider.stateIndex].page[0]
  updateTransform(slider)
  onSlideEnd(slider)
}

export function wrapPrev(slider: BlazeSlider, count: number) {
  const len = slider.slides.length
  for (let i = 0; i < count; i++) {
    // pick the last and move to first
    const slide = slider.slides[len - 1]
    // @ts-ignore
    slider.track.prepend(slide)
  }
}

export function wrapNext(slider: BlazeSlider, count: number) {
  for (let i = 0; i < count; i++) {
    slider.track.append(slider.slides[0])
  }
}

export function updateTransform(slider: BlazeSlider) {
  const { track, offset, dragged, config } = slider
  let transform = '0px';

  if (offset === 0) {
    transform = dragged + 'px';
  }
   else {
    transform = `calc( ${dragged}px + ${offset} * (var(--slide-width) + ${slider.config.slideGap}))`;
  }

  if (config.isVertical) {
    track.style.transform = `translate3d(0px,${transform},0px)`
  } else {
    track.style.transform = `translate3d(${transform},0px,0px)`
  }
}

export function enableTransition(slider: BlazeSlider) {
  slider.track.style.transitionDuration = `${slider.config.transitionDuration}ms`
}

export function disableTransition(slider: BlazeSlider) {
  slider.track.style.transitionDuration = `0ms`
}
