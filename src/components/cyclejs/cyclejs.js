import { img } from '@cycle/dom'
import xs from 'xstream'
import delay from 'xstream/extra/delay'
import { WIRE_TIMEOUT } from '../../config'

const stopEvent = { stop: true }

const addDelay = stream$ => stream$ && stream$.compose(delay(WIRE_TIMEOUT))

export default ({ MUSIC$, NOTE$, HTTP$ }) => {
  const className = '.cyclejs'

  const start$ = xs.merge(
    MUSIC$ || xs.empty(),
    NOTE$ || xs.empty(),
    HTTP$ || xs.empty(),
  )

  // Add a 'stop' event after timeout
  const stop$ = start$.compose(delay(WIRE_TIMEOUT))
    .map(() => stopEvent)

  const vdom$ = xs.merge(start$, stop$)
    .startWith(stopEvent)
    .map(s =>
      img(
        `${className} ${s.stop ? '' : '.animate'}`,
        { props: { src: '/svg/libraries/cyclejs.svg' } },
      ))

  return {
    DOM$: vdom$,
    MUSIC$: addDelay(MUSIC$),
    NOTE$: addDelay(NOTE$),
    HTTP$: addDelay(HTTP$),
  }
}
