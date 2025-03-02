-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : ven. 28 fév. 2025 à 11:28
-- Version du serveur : 8.0.40
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projetexpress`
--

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `isBanned` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `email`, `password`, `isAdmin`, `isBanned`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@example.com', '$2b$10$wSZnwigXzCwbZbGo.x.ziezG3HOuduHCoFHt.hMtoMZU.MN.159Mu', 1, 0, '2025-02-27 17:43:36', '2025-02-27 17:43:36'),
(2, 'admin@exampeele.com', '$2b$10$YtOwvUxOnebUzCKPV.5SuO3Apt6X6R5H549hzS6Np8pMxRQQlaXXa', 0, 0, '2025-02-27 17:47:47', '2025-02-27 17:47:47'),
(5, 'admintesssst@example.com', '$2b$10$rASyPINl/6zM5HGChbcRLuWMPdlHg3842hecymLgJ/oBybj1s23by', 0, 1, '2025-02-28 09:29:13', '2025-02-28 11:15:05'),
(7, 'testtt.com', '$2b$10$G.nQHWB6rmAr67zGMONKQ.XYMR1uGHD8eiWpH0bw6uwU8UJIE0Hi.', 0, 0, '2025-02-28 11:12:00', '2025-02-28 11:12:00');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
