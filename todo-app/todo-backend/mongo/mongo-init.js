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
/*try {

   db.todos.insertOne( { text: 'Increase the number of tools in my toolbelt', done: false } );

} catch (e) {

   print (e);
};*/