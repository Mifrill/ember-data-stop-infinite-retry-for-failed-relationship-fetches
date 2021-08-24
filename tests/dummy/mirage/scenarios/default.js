export default function(server) {
  const user = server.create('user');
  server.create('note', { user })
}
