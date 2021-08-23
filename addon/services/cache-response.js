import Service from '@ember/service';
import { isEqual } from 'lodash';

export default Service.extend({
  isRetry: false,

  init() {
    this._super(...arguments);
    this._cachedResponse = this._cachedResponse || [];
  },

  handle(response) {
    let status = response[0];
    if (this.isError(status)) {
      this.set('isRetry', isEqual(response, this.get('_cachedResponse')));
      this.set('_cachedResponse', response);
    } else {
      this.reset();
    }
  },

  isError(status) {
    return status >= 400 && status <= 599;
  },

  reset() {
    this.set('isRetry', false);
    this.set('_cachedResponse', []);
  },
});
