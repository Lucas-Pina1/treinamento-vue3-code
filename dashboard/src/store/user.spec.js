import useStore from '../hooks/useStore'
import {
  cleanCurrentUser,
  resetUserStore,
  setApiKey,
  setCurrentUser
} from './user'

describe('UserStore', () => {
  afterEach(() => {
    resetUserStore()
  })

  it('should set current user', () => {
    const store = useStore()
    setCurrentUser({ name: 'Igor' })
    expect(store.User.current.name).toBe('Igor')
  })

  it('should set api_key on current user', () => {
    const store = useStore()
    setApiKey('123')
    expect(store.User.current.apiKey).toBe('123')
  })

  it('should clean current user', () => {
    const store = useStore()

    setCurrentUser({ name: 'Igor' })

    expect(store.User.currentUser.name).toBe('Igor')
    cleanCurrentUser()

    expect(store.User.currentUser.name).toBeFalsy()
  })
})
