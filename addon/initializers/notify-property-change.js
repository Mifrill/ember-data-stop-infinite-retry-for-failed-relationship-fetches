import Model from '@ember-data/model';
import { inject as service } from '@ember/service';

export default {
  initialize() {
    Model.reopen({
      cacheResponse: service(),

      notifyBelongsToChanged() {
        if (this.get('cacheResponse').isRetry) {
          console.error('Infinite retry bug for failed relationship fetches detected. The following requests stopped!');
        } else {
          return this._super(...arguments);
        }
      },
    });
  }
};
