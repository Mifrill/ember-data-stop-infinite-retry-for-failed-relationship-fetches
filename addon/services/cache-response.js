import Service from '@ember/service';
import { compare } from '@ember/utils';

export default Service.extend({
  isRetry: false,

  handle(response) {
    this.set('isRetry', compare(response, this.get('_cache')) === 0);
    this.set('_cache', response);
  }
});
