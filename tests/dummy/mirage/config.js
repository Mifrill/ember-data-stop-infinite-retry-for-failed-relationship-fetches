export default function() {
  this.get('/users');
  this.get('/users/:id');
  this.get('/notes');
  this.get('/notes/:id');
}
