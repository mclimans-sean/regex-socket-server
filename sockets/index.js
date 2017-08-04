module.exports = function(io) {


  var users = [];
  var rooms = [];
  var roomNames = [];

  io.on('connection', function(socket) {
    socket.on('on message', function(msg) {
      // var obj = JSON.parse(msg);
      var obj = msg;
      console.log("room ", obj.room, " user", obj.user);
      io.to(obj.room).emit('on message', obj.msg);
    });


    socket.on('disconnect', function(data) {
      console.log('Client disconnected:', socket.id);
    });

    socket.on('room', function(info) {
      // var obj = JSON.parse(info);
      var obj = info;

      // if(users.indexOf(obj.user) == -1) {
      console.log("Joining room ->", obj.room);
      console.log("Users joined the room ", users);
      socket.join(obj.room);
      users.push(obj.user);

      var indexOfRoomName = roomNames.indexOf(obj.room);

      var room = {};

      if(indexOfRoomName == -1) {
        roomNames.push(obj.room);
        room = {
          name: obj.room,
          users: []
        }
        rooms.push(room);
      } else {
        room = rooms[indexOfRoomName];
      }



      let user = {
        name: obj.user
      }



      room.users.push(user);


      //
      // if (rooms.indexOf(room) == -1) {
      //   rooms.push(room);
      // }

      // console.log("Rooms data ", rooms);

      for (var i = 0; i < rooms.length; i++) {
        console.log("Room ", rooms[i].name, " Users ", rooms[i].users);
        // console.log("Room users", rooms[i].users);
      }


      io.to(obj.room).emit('room', obj);
      // } else {
      // io.to(obj.room).emit('no join', "User with this name does exist...");
      // }

    });

  });


}
