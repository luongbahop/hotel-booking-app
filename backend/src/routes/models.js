import db from '../configs/database.js';

import User from './users/user.model.js';
import Hotel from './hotels/hotel/hotel.model.js';
import Room from './hotels/room/room.model.js';

// Sync the models with the database
db.sync({ alter: true, force: true })
  .then(() => {
    console.log('Database & tables created!');

    // Create an array of users
    const userData = {
      username: 'admin',
      password: '12345678',
      fullname: 'Luong Ba Hop',
      email: 'luonghop.lc@gmail.com',
      status: 'active',
      created_by: 1,
      updated_by: 1,
    };

    User.create(userData)
      .then(() => {
        console.log('Users created successfully');
      })
      .catch((error) => {
        console.error(`Error while creating user: ${error}`);
      });

    // Create an array of hotels
    const hotelsData = [
      {
        title: 'Hotel Example 1',
        phone: '1234567890',
        description: 'This is an example hotel description',
        address: '123 Example Street',
        city: 'Example City',
        country: 'Example Country',
        status: 'active',
        created_by: 1,
        updated_by: 1,
      },
      {
        title: 'Hotel Example 2',
        phone: '1234567890',
        description: 'This is an example hotel description',
        address: '456 Example Avenue',
        city: 'Example City',
        country: 'Example Country',
        status: 'active',
        created_by: 1,
        updated_by: 1,
      },
    ];

    Hotel.bulkCreate(hotelsData)
      .then(() => {
        console.log('Hotels created successfully');
      })
      .catch((error) => {
        console.error(`Error while creating hotels: ${error}`);
      });


    // Create an array of room
    const roomsData = [
      {
        title: 'Room Example 1',
        hotel_id: 1,
        description: 'This is an example room description',
        status: 'active',
        created_by: 1,
        updated_by: 1,
      },
      {
        title: 'Room Example 2',
        hotel_id: 2,
        description: 'This is an example room description',
        status: 'active',
        created_by: 1,
        updated_by: 1,
      },
    ];

    Room.bulkCreate(roomsData)
      .then(() => {
        console.log('Rooms created successfully');
      })
      .catch((error) => {
        console.error(`Error while creating rooms: ${error}`);
      });
  })
  .catch((error) => {
    console.error(`Error while syncing database: ${error}`);
  });

User.belongsTo(User, { foreignKey: 'created_by', as: 'author' });
User.belongsTo(User, { foreignKey: 'updated_by', as: 'editor' });
Hotel.hasMany(Room, { foreignKey: 'hotel_id', as: 'rooms' });
Room.belongsTo(Hotel, { foreignKey: 'hotel_id', as: 'room' });

export default {
  User,
  Hotel,
  Room
};
