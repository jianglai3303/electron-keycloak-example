import ContextAPI from './ContextAPI'

declare global {
  interface Window {
    context: ContextAPI
    env: {
      VMInfo: string | undefined
    }
    api: unknown
  }
}
