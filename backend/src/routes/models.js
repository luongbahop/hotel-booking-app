import db from '../configs/database.js';

import User from './users/user.model.js';
// import Customer from './customers/customer.model.js';
import Booking from './bookings/booking.model.js';
import Hotel from './hotels/hotel/hotel.model.js';
import Room from './hotels/room/room.model.js';

const isSyncDatabase = false;

const initData = async () => {
  try {
    // Truncate tables
    await User.destroy({ where: {}, force: true });
    // await Customer.destroy({ where: {}, force: true });
    await Room.destroy({ where: {}, force: true });
    await Hotel.destroy({ where: {}, force: true });
    await Booking.destroy({ where: {}, force: true });

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

    await User.create(userData);
    console.log('Created user successfully');

    // Create an array of customers
    const customersData = [
      {
        fullname: 'Jonh Doe',
        email: 'john@gmail.com',
        phone: '9876543210',
        status: 'active',
        created_by: 1,
        updated_by: 1,
      },
      {
        fullname: 'Jenny Lee',
        email: 'jenny@gmail.com',
        phone: '933333333',
        status: 'active',
        created_by: 1,
        updated_by: 1,
      },
    ];

    // await Customer.bulkCreate(customersData);
    console.log('Created customers successfully');

    // Create an array of hotels
    const hotelsData = [
      {
        title: 'Holiday Inn Express Singapore Clarke Quay',
        phone: '1234567891',
        description: 'The hotel has 39 parking spaces available. For Monday to Saturday (6am-5pm)',
        address: '123 Example Street',
        city: 'Singapore',
        country: 'Singapore',
        status: 'active',
        created_by: 1,
        updated_by: 1,
      },
      {
        title: 'InterContinental Singapore',
        phone: '1234567892',
        description: 'Car parking is available at Bugis Junction Car Park. Charges apply.',
        address: '456 Example Avenue',
        city: 'Singapore',
        country: 'Singapore',
        status: 'active',
        created_by: 1,
        updated_by: 1,
      },
    ];
    await Hotel.bulkCreate(hotelsData);
    console.log('Created hotels successfully');

    // Create an array of rooms
    const roomsData = [
      {
        title: 'Standard Single Room',
        hotel_id: 1,
        price: 100,
        type: 'single',
        capacity: 2,
        number_of_rooms: 10,
        description: 'Price is one night',
        status: 'active',
        created_by: 1,
        updated_by: 1,
      },
      {
        title: 'Classic Double Room',
        hotel_id: 1,
        price: 200,
        type: 'double',
        capacity: 2,
        number_of_rooms: 5,
        description: 'Price is one night',
        status: 'active',
        created_by: 1,
        updated_by: 1,
      },
      {
        title: 'Comfort Triple Room',
        hotel_id: 1,
        price: 300,
        type: 'triple',
        capacity: 3,
        number_of_rooms: 1,
        description: 'Price is one night',
        status: 'active',
        created_by: 1,
        updated_by: 1,
      },
      {
        title: 'Small Single Room',
        hotel_id: 2,
        price: 50,
        type: 'single',
        capacity: 2,
        number_of_rooms: 2,
        description: 'Price is one night',
        status: 'active',
        created_by: 1,
        updated_by: 1,
      },
      {
        title: 'Small Double Room',
        hotel_id: 2,
        price: 100,
        type: 'double',
        capacity: 2,
        number_of_rooms: 1,
        description: 'Price is one night',
        status: 'active',
        created_by: 1,
        updated_by: 1,
      },
    ];

    Room.bulkCreate(roomsData);
    console.log('Created rooms successfully');

    // Create an array of bookings
    const bookingsData = [
      {
        room_id: 1,
        check_in_date: '2024-04-20 03:10:31',
        check_out_date: '2024-04-21 03:10:31',
        total_price: 200,
        created_by: 1,
      },
      {
        room_id: 2,
        check_in_date: '2024-04-20 03:10:31',
        check_out_date: '2024-04-21 03:10:31',
        total_price: 400,
        created_by: 1,
      },
    ];

    Booking.bulkCreate(bookingsData);
    console.log('Created bookings successfully');
  } catch (error) {
    console.log('Error while initializing data:', error);
  }
}

if (isSyncDatabase) {
  // Sync the models with the database
  db.sync({ alter: true, force: true })
    .then(() => {
      console.log('Database & tables created!');
      initData();
    })
    .catch((error) => {
      console.error(`Error while syncing database: ${error}`);
    });
}

User.belongsTo(User, { foreignKey: 'created_by', as: 'author' });
User.belongsTo(User, { foreignKey: 'updated_by', as: 'editor' });

// Customer.belongsTo(User, { foreignKey: 'created_by', as: 'author' });
// Customer.belongsTo(User, { foreignKey: 'updated_by', as: 'editor' });

Hotel.belongsTo(User, { foreignKey: 'created_by', as: 'author' });
Hotel.belongsTo(User, { foreignKey: 'updated_by', as: 'editor' });

Room.belongsTo(User, { foreignKey: 'created_by', as: 'author' });
Room.belongsTo(User, { foreignKey: 'updated_by', as: 'editor' });

Booking.belongsTo(User, { foreignKey: 'created_by', as: 'author' });
Booking.belongsTo(User, { foreignKey: 'updated_by', as: 'editor' });

Hotel.hasMany(Room, { foreignKey: 'hotel_id', as: 'rooms' });
Room.belongsTo(Hotel, { foreignKey: 'hotel_id', as: 'hotel' });

Room.hasMany(Booking, { foreignKey: 'room_id', as: 'bookings' });
Booking.belongsTo(Room, { foreignKey: 'room_id', as: 'room' });

User.hasMany(Booking, { foreignKey: 'created_by', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'created_by', as: 'booking' });

export default {
  User,
  // Customer,
  Hotel,
  Room,
  Booking
};
