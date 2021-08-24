import DS from 'ember-data';
import { inject as service } from '@ember/service';

export default DS.JSONAPIAdapter.extend({
  cacheResponse: service(),

  handleResponse(status, headers, payload, requestData) {
    // This handle needs for a workaround see app/initializers/notify-property-change.js
    this.get('cacheResponse').handle([status, payload, requestData]);

    return this._super(status, headers, payload, requestData);
  },
});
