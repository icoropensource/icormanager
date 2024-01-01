import { LocalStorage } from 'quasar'

const storage = {
  get (id, adefault) {
    if (LocalStorage.has(id)) {
      return LocalStorage.get.item(id)
    }
    return adefault
  },
  set (id, value) {
    LocalStorage.set(id, value)
  },
  del (id) {
    LocalStorage.remove(id)
  },
  clear () {
    LocalStorage.clear()
  }
}

export default storage
