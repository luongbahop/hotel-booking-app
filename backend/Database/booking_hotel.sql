-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2024 at 10:25 AM
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
(3, 5, 200, '2024-04-19 20:10:31', '2024-04-20 20:10:31', 1, NULL, '2024-04-13 03:57:12', '2024-04-13 03:57:12');

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
(1, 'Holiday Inn Express Singapore Clarke Quay', '1234567890', 'Car parking is available at Lavender Junction Car Park. Charges apply.', '123 Example Street', NULL, 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:39:08'),
(2, 'InterContinental Singapore', '1234567890', 'Car parking is available at Bugis Junction Car Park. Charges apply.', '456 Example Avenue', NULL, 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:13:45'),
(3, 'V Hotel', '1234567893', 'Car parking is available at Bugis Junction Car Park. Charges apply.', '888 Example Avenue', NULL, 'active', 1, NULL, '2024-04-13 03:32:44', '2024-04-13 03:32:44');

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
(1, 1, 'Classic Single Room', 'Price is one night', 100, 2, 10, 'single', NULL, NULL, 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:53:42'),
(2, 1, 'Classic Double Room', 'Price is one night', 200, 2, 5, 'double', NULL, NULL, 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:13:45'),
(3, 1, 'Comfort Triple Room', 'Price is one night', 300, 3, 1, 'triple', NULL, NULL, 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:13:45'),
(4, 2, 'Small Single Room', 'Price is one night', 50, 2, 2, 'single', NULL, NULL, 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:13:45'),
(5, 2, 'Small Double Room', 'Price is one night', 100, 2, 1, 'double', NULL, NULL, 'active', 1, 1, '2024-04-13 03:13:45', '2024-04-13 03:13:45'),
(16, 3, 'Standard Single Room', 'Price is one night', 100, 2, NULL, NULL, NULL, NULL, 'active', 1, NULL, '2024-04-13 03:53:07', '2024-04-13 03:53:07');

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
(1, 'luonghop.lc@gmail.com', 'admin', 'Admin', '$2b$10$mz3.Hm3Yv69Fo/WWIkCnLeqtjY.2.Xv67Q3F658YBRLlRkEFP7RzK', NULL, NULL, NULL, NULL, 'active', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Imx1b25naG9wLmxjQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJmdWxsbmFtZSI6Ikx1b25nIEJhIEhvcCIsInN0YXR1cyI6ImFjdGl2ZSIsImlhdCI6MTcxMjk3OTE0NCwiZXhwIjoxNzEzMDY1NTQ0fQ.gpCsdGZsNpGeIRE62mGWYzH-5c3', 1, 1, '2024-04-13 03:13:44', '2024-04-13 04:00:01'),
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
  MODIFY `booking_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_customers`
--
ALTER TABLE `tbl_customers`
  MODIFY `customer_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_hotels`
--
ALTER TABLE `tbl_hotels`
  MODIFY `hotel_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_rooms`
--
ALTER TABLE `tbl_rooms`
  MODIFY `room_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
