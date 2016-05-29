export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export default function increment() {
  return { type: INCREMENT }
}

export default function decrement() {
  return { type: DECREMENT }
}
