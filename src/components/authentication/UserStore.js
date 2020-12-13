import { extendObservable } from 'mobx';

class UserStore {
  constructor() {
    extendObservable(this, {
      isAuthenticated: false,
      authToken: '',
      username: '',
      isAdmin: false,

    });
  }
}

export default new UserStore();
