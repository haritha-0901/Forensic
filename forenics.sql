-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2024 at 11:05 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `forenics`
--

-- --------------------------------------------------------

--
-- Table structure for table `area`
--

CREATE TABLE `area` (
  `aid` int(11) NOT NULL,
  `area` varchar(100) DEFAULT NULL,
  `pincode` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `area`
--

INSERT INTO `area` (`aid`, `area`, `pincode`) VALUES
(1, 'villanur', '605011'),
(2, 'orleanpet', '605009');

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `did` int(11) NOT NULL,
  `filename` varchar(100) DEFAULT NULL,
  `codeid` text DEFAULT NULL,
  `keyvalue` varchar(2000) NOT NULL,
  `caseid` text NOT NULL,
  `aid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`did`, `filename`, `codeid`, `keyvalue`, `caseid`, `aid`) VALUES
(1, 'last.PNG', 'QmfQiRyzskMwa8Ekjk7aZfRazR4TLNqcb1NuREumJmjiuh', 'Ø¹NÞ3Ä¬:¨ã¸Ù', 'c1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `requestaccess`
--

CREATE TABLE `requestaccess` (
  `rid` int(11) DEFAULT NULL,
  `caseid` varchar(1000) DEFAULT NULL,
  `approve` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transactiondata`
--

CREATE TABLE `transactiondata` (
  `td` int(11) NOT NULL,
  `trandata` text DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `did` int(11) DEFAULT NULL,
  `transcation` varchar(100) DEFAULT NULL,
  `alltrans` text DEFAULT NULL,
  `trandate` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactiondata`
--

INSERT INTO `transactiondata` (`td`, `trandata`, `uid`, `did`, `transcation`, `alltrans`, `trandate`) VALUES
(1, '674D6F3F21786AF072334FAB4D08792857BD2B1C8E22AF7E2229A6A99EEA5435', 0, 1, NULL, 'insert', '2024-04-03 02:09:47');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `addresss` varchar(1000) DEFAULT NULL,
  `keydata` varchar(1000) DEFAULT NULL,
  `role` varchar(1000) NOT NULL,
  `aid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `name`, `email`, `password`, `addresss`, `keydata`, `role`, `aid`) VALUES
(0, 'admin', 'admin@gmail.com', '1212', '0x2BC2c958c93dbCb4925B7cdb25a80755f6aC16E4', '0xc52513a689601a06ef613f1af1bad9e8aef5cc7ac4e4c85fbc47691e7a9101e1', 'admin', 0),
(1, 'p1', 'p1@gmail.com', '1212', '0x9e4953824907162E7A4F9f047eB647acc3713E37', '0xe8f5572e9ecadb5a842f51ec97656e666585d98d589787c6573cff837ad879aa', 'Police', 1),
(2, 'fo1', 'fo1@gmail.com', '1234', '0xE2c66b821b3d751A6fE26faDF5Bfda70b2F95417', '0xd1b0d307d60e05385c58340e96f5c693d483a449b43da790029fe3a436d69290', 'Forensic', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`aid`);

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`did`);

--
-- Indexes for table `transactiondata`
--
ALTER TABLE `transactiondata`
  ADD PRIMARY KEY (`td`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
