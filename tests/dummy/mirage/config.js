import Response from 'ember-cli-mirage/response';

export default function() {
  this.get('/users');
  this.get('/notes/:id', function() {
    return new Response(404);
  });
}
