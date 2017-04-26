import { button } from '@cycle/dom'
import xs from 'xstream'

const className = '.touch'

export default ({ DOM$, props$ }) => {
  const click$ = DOM$
    .select(className)
    .events('click')

  const music$ = xs
    .combine(props$, click$)
    .map(([props]) => ({
      frequency: props.frequency,
    }))

  const vdom$ = props$
    .map(() => button(className))

  return {
    DOM$: vdom$,
    MUSIC$: music$,
  }
}