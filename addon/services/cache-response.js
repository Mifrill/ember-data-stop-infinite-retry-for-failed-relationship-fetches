import classic from 'ember-classic-decorator';
import Service from '@ember/service';
import { compare } from '@ember/utils';

@classic
export default class CacheResponseService extends Service {
  isRetry = false;

  handle(response) {
    this.isRetry = compare(response, this._cache) === 0;
    this._cache = response;
  }
}
