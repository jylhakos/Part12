db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
});

db.createCollection('todos');

db.todos.insert({ text: 'Write code', done: true });

db.todos.insert({ text: 'Learn about containers', done: false });

//12.8
try {

  console.log('db.todos.insertOne');

  db.todos.insertOne( { text: 'learn react', done: false } );

} catch (e) {

   print (e);
};