-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2024 at 06:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking_hotel`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_bookings`
--

CREATE TABLE `tbl_bookings` (
  `booking_id` bigint(20) NOT NULL,
  `room_id` bigint(20) NOT NULL,
  `total_price` double DEFAULT NULL,
  `check_in_date` datetime DEFAULT NULL,
  `check_out_date` datetime DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_bookings`
--

INSERT INTO `tbl_bookings` (`booking_id`, `room_id`, `total_price`, `check_in_date`, `check_out_date`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 1, 200, '2024-04-19 20:10:31', '2024-04-21 20:10:31', 1, NULL, '2024-04-13 03:13:45', '2024-04-13 03:58:00'),
(2, 2, 400, '2024-04-19 20:10:31', '2024-04-20 20:10:31', 1, NULL, '2024-04-13 03:13:45', '2024-04-13 03:13:45'),
(3, 5, 200, '2024-04-19 20:10:31', '2024-04-20 20:10:31', 1, NULL, '2024-04-13 03:57:12', '2024-04-13 03:57:12'),
(14, 1, 200, '2024-05-19 13:10:31', '2024-05-20 13:10:31', 1, NULL, '2024-04-13 09:07:26', '2024-04-13 09:07:26'),
(15, 5, 200, '2024-05-13 13:10:31', '2024-05-16 13:10:31', 1, NULL, '2024-04-14 06:20:15', '2024-04-14 06:20:15'),
(16, 3, 4800, '2024-04-13 17:00:00', '2024-04-20 16:59:59', 1, NULL, '2024-04-14 15:20:54', '2024-04-14 15:20:54'),
(17, 3, 800, '2024-04-13 17:00:00', '2024-04-15 16:59:59', 1, NULL, '2024-04-14 15:22:01', '2024-04-14 15:22:01'),
(18, 1, 500, '2024-04-13 17:00:00', '2024-04-15 16:59:59', 1, NULL, '2024-04-14 15:35:51', '2024-04-14 15:35:51'),
(19, 1, 500, '2024-04-13 17:00:00', '2024-04-15 16:59:59', 1, NULL, '2024-04-14 15:54:21', '2024-04-14 15:54:21'),
(20, 1, 500, '2024-04-13 17:00:00', '2024-04-15 16:59:59', 1, NULL, '2024-04-14 15:55:56', '2024-04-14 15:55:56'),
(21, 1, 500, '2024-04-13 17:00:00', '2024-04-15 16:59:59', 1, NULL, '2024-04-14 15:56:15', '2024-04-14 15:56:15');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_customers`
--

CREATE TABLE `tbl_customers` (
  `customer_id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `gender` tinyint(4) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_customers`
--

INSERT INTO `tbl_customers` (`customer_id`, `email`, `fullname`, `birthday`, `gender`, `phone`, `address`, `avatar`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'john@gmail.com', 'John Lee', NULL, NULL, '9876543210', NULL, NULL, 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:45:57'),
(2, 'jenny@gmail.com', 'Jenny Lee', NULL, NULL, '933333333', NULL, NULL, 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:13:45'),
(3, 'mark@gmail.com', 'Mark Ng', NULL, NULL, '1234567895', NULL, NULL, 'active', NULL, NULL, '2024-04-13 03:44:42', '2024-04-13 03:44:42');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_hotels`
--

CREATE TABLE `tbl_hotels` (
  `hotel_id` bigint(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_hotels`
--

INSERT INTO `tbl_hotels` (`hotel_id`, `title`, `phone`, `description`, `address`, `image`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Holiday Inn Express Singapore Clarke Quay', '1234567890', 'Car parking is available at Bugis Junction Car Park. Charges apply. The hotel is part of Raffles City Complex, offering a convention and shopping centre. A well-equipped fitness centre and 6 tennis courts are available. 24-hour room service is available for guests’ convenience. Guests can approach the 24-hour front desk to request for currency exchange, paperless Chinese newspapers and concierge services. Staff are able to converse in English, Malay and Mandarin, Indonesian and Filipino.', '123 Example Street', 'hotel2.png', 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:39:08'),
(2, 'InterContinental Singapore', '1234567890', 'Car parking is available at Bugis Junction Car Park. Charges apply. The hotel is part of Raffles City Complex, offering a convention and shopping centre. A well-equipped fitness centre and 6 tennis courts are available. 24-hour room service is available for guests’ convenience. Guests can approach the 24-hour front desk to request for currency exchange, paperless Chinese newspapers and concierge services. Staff are able to converse in English, Malay and Mandarin, Indonesian and Filipino.', '456 Example Avenue', 'hotel3.png', 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:13:45'),
(3, 'Viet Hotel', '1234567893', 'The Stamford is a 10-minute train ride from the shopping district of Orchard Road. Singapore Flyer is a 15-minute train ride away. Nightlife options at Boat Quay and Clarke Quay are approximately a 20-minute walk away.', '888 Example Avenue', 'hotel1.png', 'active', 1, NULL, '2024-04-13 03:32:44', '2024-04-13 03:32:44'),
(5, 'ST Signature Bugis Middle', '1234567893', 'The Stamford is a 10-minute train ride from the shopping district of Orchard Road. Singapore Flyer is a 15-minute train ride away. Nightlife options at Boat Quay and Clarke Quay are approximately a 20-minute walk away.', '999 Example Avenue', 'hotel5.png', 'active', 1, 1, '2024-04-14 11:05:17', '2024-04-14 11:05:39'),
(6, 'The Fullerton Hotel Singapore', '1234567893', 'The Stamford is a 10-minute train ride from the shopping district of Orchard Road. Singapore Flyer is a 15-minute train ride away. Nightlife options at Boat Quay and Clarke Quay are approximately a 20-minute walk away.', '999 Example Avenue', 'hotel6.png', 'active', 1, NULL, '2024-04-14 11:06:08', '2024-04-14 11:06:08'),
(7, 'JEN Singapore Orchardgateway by Shangri-La', '1234567893', 'Car parking is available at Bugis Junction Car Park. Charges apply.Car parking is available at Bugis Junction Car Park. Charges apply. The hotel is part of Raffles City Complex, offering a convention and shopping centre. A well-equipped fitness centre and 6 tennis courts are available. 24-hour room service is available for guests’ convenience. Guests can approach the 24-hour front desk to request for currency exchange, paperless Chinese newspapers and concierge services. Staff are able to converse in English, Malay and Mandarin, Indonesian and Filipino.', '999 Example Avenue', 'hotel7.png', 'active', 1, NULL, '2024-04-14 11:06:26', '2024-04-14 11:06:26'),
(8, 'Paradox Singapore Merchant Court at Clarke Quay', '1234567893', 'The Stamford is a 10-minute train ride from the shopping district of Orchard Road. Singapore Flyer is a 15-minute train ride away. Nightlife options at Boat Quay and Clarke Quay are approximately a 20-minute walk away.', '999 Example Avenue', 'hotel8.png', 'active', 1, NULL, '2024-04-14 11:06:56', '2024-04-14 11:06:56');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_rooms`
--

CREATE TABLE `tbl_rooms` (
  `room_id` bigint(20) NOT NULL,
  `hotel_id` bigint(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `price` double DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `number_of_rooms` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `sale_price` double DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_rooms`
--

INSERT INTO `tbl_rooms` (`room_id`, `hotel_id`, `title`, `description`, `price`, `capacity`, `number_of_rooms`, `type`, `sale_price`, `image`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 1, 'Classic Single Room', 'Each room comes with a flat-screen cable TV with local Chinese channels and a tea/coffee maker.', 500, 2, 10, 'single', NULL, 'room1.png', 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:53:42'),
(2, 1, 'Classic Double Room', 'Each room comes with a flat-screen cable TV with local Chinese channels and a tea/coffee maker.', 600, 2, 5, 'double', NULL, 'room2.png', 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:13:45'),
(3, 1, 'Comfort Triple Room', 'Each room comes with a flat-screen cable TV with local Chinese channels and a tea/coffee maker.', 800, 8, 1, 'triple', NULL, 'room3.png', 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:13:45'),
(4, 2, 'Small Single Room', '12 restaurants and bars serving an extensive range of cuisines including Peranakan and Japanese dishes', 50, 2, 2, 'single', NULL, 'room4.png', 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:13:45'),
(5, 2, 'Small Double Room', '12 restaurants and bars serving an extensive range of cuisines including Peranakan and Japanese dishes', 100, 2, 1, 'double', NULL, 'room5.png', 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:13:45'),
(16, 3, 'Standard Single Room', '12 restaurants and bars serving an extensive range of cuisines including Peranakan and Japanese dishes', 100, 2, NULL, NULL, NULL, 'room6.png', 'active', 1, NULL, '2024-04-13 03:53:07', '2024-04-13 03:53:07'),
(17, 8, 'Classic Single Room', '12 restaurants and bars serving an extensive range of cuisines including Peranakan and Japanese dishes', 100, 2, 10, 'single', NULL, 'room1.png', 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:53:42'),
(18, 8, 'Classic Double Room', 'The hotel\'s 3 bars including SKAI Bar offer fine wines and a comfortable setting where guests can unwind.', 200, 2, 5, 'double', NULL, 'room2.png', 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:13:45'),
(19, 8, 'Comfort Triple Room', 'The hotel\'s 3 bars including SKAI Bar offer fine wines and a comfortable setting where guests can unwind.', 300, 3, 1, 'triple', NULL, 'room3.png', 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:13:45'),
(20, 7, 'Classic Single Room', 'The hotel\'s 3 bars including SKAI Bar offer fine wines and a comfortable setting where guests can unwind.', 100, 2, 10, 'single', NULL, 'room1.png', 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:53:42'),
(21, 7, 'Classic Double Room', 'The hotel\'s 3 bars including SKAI Bar offer fine wines and a comfortable setting where guests can unwind.', 200, 2, 5, 'double', NULL, 'room2.png', 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:13:45'),
(22, 6, 'Comfort Triple Room', 'The hotel\'s 3 bars including SKAI Bar offer fine wines and a comfortable setting where guests can unwind.', 300, 4, 1, 'triple', NULL, 'room3.png', 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:13:45'),
(23, 5, 'Comfort Triple Room', 'The hotel\'s 3 bars including SKAI Bar offer fine wines and a comfortable setting where guests can unwind.', 800, 6, 1, 'triple', NULL, 'room3.png', 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:13:45');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` tinyint(4) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `avatar` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`user_id`, `email`, `username`, `fullname`, `password`, `gender`, `phone`, `website`, `address`, `status`, `avatar`, `token`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'luonghop.lc@gmail.com', 'admin', 'Admin', '$2b$10$mz3.Hm3Yv69Fo/WWIkCnLeqtjY.2.Xv67Q3F658YBRLlRkEFP7RzK', NULL, NULL, NULL, NULL, 'active', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Imx1b25naG9wLmxjQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJmdWxsbmFtZSI6IkFkbWluIiwic3RhdHVzIjoiYWN0aXZlIiwiaWF0IjoxNzEzMTExNjk3LCJleHAiOjE3MTMxOTgwOTd9.wE70NAl7aU23c9yFRp7T_-DmtK5re-iSdNK2F', 1, 1, '2024-04-13 03:13:44', '2024-04-14 16:21:37'),
(2, 'client1@gmail.com', 'client1', 'Client', '$2b$10$pFRmZp5oMOod3aJt2aEl7ur71mJzeSosBftrzLLe4QQxhsBWjY.IC', NULL, NULL, NULL, NULL, 'active', NULL, NULL, 1, NULL, '2024-04-13 04:01:14', '2024-04-13 04:01:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_bookings`
--
ALTER TABLE `tbl_bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD UNIQUE KEY `booking_id` (`booking_id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `tbl_customers`
--
ALTER TABLE `tbl_customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `customer_id` (`customer_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `tbl_hotels`
--
ALTER TABLE `tbl_hotels`
  ADD PRIMARY KEY (`hotel_id`),
  ADD UNIQUE KEY `hotel_id` (`hotel_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `tbl_rooms`
--
ALTER TABLE `tbl_rooms`
  ADD PRIMARY KEY (`room_id`),
  ADD UNIQUE KEY `room_id` (`room_id`),
  ADD KEY `hotel_id` (`hotel_id`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `tbl_users_username_unique` (`username`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `updated_by` (`updated_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_bookings`
--
ALTER TABLE `tbl_bookings`
  MODIFY `booking_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tbl_customers`
--
ALTER TABLE `tbl_customers`
  MODIFY `customer_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_hotels`
--
ALTER TABLE `tbl_hotels`
  MODIFY `hotel_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_rooms`
--
ALTER TABLE `tbl_rooms`
  MODIFY `room_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_bookings`
--
ALTER TABLE `tbl_bookings`
  ADD CONSTRAINT `tbl_bookings_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `tbl_rooms` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_bookings_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `tbl_customers` (`customer_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_bookings_ibfk_3` FOREIGN KEY (`updated_by`) REFERENCES `tbl_customers` (`customer_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_customers`
--
ALTER TABLE `tbl_customers`
  ADD CONSTRAINT `tbl_customers_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_customers_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_hotels`
--
ALTER TABLE `tbl_hotels`
  ADD CONSTRAINT `tbl_hotels_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_hotels_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_rooms`
--
ALTER TABLE `tbl_rooms`
  ADD CONSTRAINT `tbl_rooms_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `tbl_hotels` (`hotel_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_rooms_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_rooms_ibfk_3` FOREIGN KEY (`updated_by`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD CONSTRAINT `tbl_users_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_users_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
