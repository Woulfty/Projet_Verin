 40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Affaire
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Affaire` (
  `idAffaire` int(11) NOT NULL AUTO_INCREMENT,
  `Capteur` int(11) NOT NULL DEFAULT 1,
  `Frequence` int(11) NOT NULL,
  `TempAcquisition` int(11) NOT NULL,
  `PV` int(11) NOT NULL,
  `Date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idAffaire`),
  KEY `PV` (`PV`)
) ENGINE = InnoDB AUTO_INCREMENT = 17 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Essaie
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Essaie` (
  `idEssaie` int(11) NOT NULL AUTO_INCREMENT,
  `idAffaire` int(11) NOT NULL,
  `NumEssaie` int(11) NOT NULL,
  `Debit` float NOT NULL,
  `Value` float NOT NULL,
  PRIMARY KEY (`idEssaie`),
  KEY `Affaire` (`idAffaire`),
  CONSTRAINT `Essaie_ibfk_1` FOREIGN KEY (`idAffaire`) REFERENCES `Affaire` (`idAffaire`)
) ENGINE = InnoDB AUTO_INCREMENT = 101 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: PV
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `PV` (
  `idPV` int(11) NOT NULL AUTO_INCREMENT,
  `idAffaire` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `Texte` varchar(1000) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`idPV`),
  KEY `User` (`idUser`),
  KEY `Affaire` (`idAffaire`),
  CONSTRAINT `PV_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `User` (`idUser`),
  CONSTRAINT `PV_ibfk_2` FOREIGN KEY (`idAffaire`) REFERENCES `Affaire` (`idAffaire`)
) ENGINE = InnoDB AUTO_INCREMENT = 24 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: User
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `User` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(20) NOT NULL,
  `Mdp` varchar(20) NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Affaire
# ------------------------------------------------------------

INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `Frequence`,
    `TempAcquisition`,
    `PV`,
    `Date`
  )
VALUES
  (7, 1, 5, 500, 1, '2022-04-27 16:28:43');
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `Frequence`,
    `TempAcquisition`,
    `PV`,
    `Date`
  )
VALUES
  (8, 2, 4, 500, 2, '2022-04-28 16:28:43');
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `Frequence`,
    `TempAcquisition`,
    `PV`,
    `Date`
  )
VALUES
  (9, 2, 4, 500, 2, '2022-04-29 16:28:43');
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `Frequence`,
    `TempAcquisition`,
    `PV`,
    `Date`
  )
VALUES
  (10, 2, 4, 500, 2, '2022-04-30 16:28:43');
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `Frequence`,
    `TempAcquisition`,
    `PV`,
    `Date`
  )
VALUES
  (11, 2, 4, 500, 2, '2022-05-01 16:28:43');
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `Frequence`,
    `TempAcquisition`,
    `PV`,
    `Date`
  )
VALUES
  (13, 2, 4, 500, 2, '2022-05-02 16:28:42');
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `Frequence`,
    `TempAcquisition`,
    `PV`,
    `Date`
  )
VALUES
  (14, 2, 4, 500, 2, '2022-05-24 09:02:33');
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `Frequence`,
    `TempAcquisition`,
    `PV`,
    `Date`
  )
VALUES
  (15, 1, 6, 500, 2, '2022-05-24 14:53:08');
INSERT INTO
  `Affaire` (
    `idAffaire`,
    `Capteur`,
    `Frequence`,
    `TempAcquisition`,
    `PV`,
    `Date`
  )
VALUES
  (16, 1, 4, 1, 0, '2022-05-25 09:09:32');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Essaie
# ------------------------------------------------------------

INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (1, 7, 1, 0, 8);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (2, 7, 6, 0, 12);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (3, 7, 7, 0, 20);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (4, 8, 6, 0, 33);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (5, 8, 1, 0, 55);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (50, 7, 5, 0, 12);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (51, 8, 2, 0, 5);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (52, 8, 3, 0, 20);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (53, 8, 4, 0, 26);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (54, 8, 5, 0, 14);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (55, 9, 4, 0, 98);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (56, 9, 2, 0, 50);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (57, 9, 3, 0, 64);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (58, 9, 1, 0, 25);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (59, 10, 5, 0, 65);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (60, 10, 0, 0, 80);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (61, 10, 0, 0, 54);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (62, 11, 0, 0, 45);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (63, 11, 0, 0, 65);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (64, 11, 0, 0, 87);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (65, 13, 0, 0, 0);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (66, 13, 0, 0, 0);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (67, 13, 0, 0, 0);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (68, 13, 0, 0, 45);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (69, 7, 2, 0, 84);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (70, 7, 4, 0, 75);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (71, 7, 3, 0, 46);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (92, 16, 0, 0, 5);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (93, 16, 0, 0, 15);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (94, 16, 0, 0, 30);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (95, 16, 0, 0, 50);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (96, 16, 0, 0, 80);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (97, 14, 1, 0, 2);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (98, 15, 1, 0, 2);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (99, 15, 1, 0, 2);
INSERT INTO
  `Essaie` (
    `idEssaie`,
    `idAffaire`,
    `NumEssaie`,
    `Debit`,
    `Value`
  )
VALUES
  (100, 15, 1, 0, 1.63);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: PV
# ------------------------------------------------------------

INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    1,
    7,
    1,
    'Erreur lors du deuxièmes test. Le vérin présente une défaillance lors du test. 80 kpa n\'est pas acceptable pour une fréquence de 12s. A revoir.',
    '2022-05-31 10:05:36'
  );
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    2,
    7,
    1,
    'Erreur lors du deuxièmes test. Le vérin présente une défaillance lors du test.',
    '2022-05-30 09:37:16'
  );
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    3,
    8,
    1,
    'ça marche toujours pas ? Alors normalement ça fonctionne maintenant, j\'ai corriger le code d\'Alex.',
    '2022-06-01 14:55:10'
  );
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    4,
    7,
    1,
    'Résolution erreur, le vérin avait une fuite lors de la pressurisation.',
    '2022-05-30 09:37:07'
  );
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    5,
    7,
    1,
    'Sur le graphique il y a une grosse perte de pression, est-ce normal ?',
    '2022-05-02 14:19:17'
  );
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (7, 10, 1, 'Test du jour.', '2022-05-30 09:37:00');
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    9,
    13,
    1,
    'Bonjour je suis un test.',
    '2022-05-30 09:36:52'
  );
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (15, 16, 1, 'suce', '2022-06-01 15:15:16');
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    17,
    14,
    1,
    'Normal qu\'il y ait aucun essais ?',
    '2022-06-01 14:46:02'
  );
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    18,
    16,
    1,
    'Le verin a un rendement acceptable, je contact Véolia. ',
    '2022-06-01 14:58:05'
  );
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    22,
    9,
    1,
    'Normal la valeur de la courbe actuel ?',
    '2022-06-01 15:29:38'
  );
INSERT INTO
  `PV` (`idPV`, `idAffaire`, `idUser`, `Texte`, `Date`)
VALUES
  (
    23,
    15,
    1,
    'bonjour je suis le pv',
    '2022-06-01 15:31:13'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: User
# ------------------------------------------------------------

INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (0, 'root', 'root');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (1, 'greg', 'greg');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (2, 'User', 'User');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (3, 'kiki', 'kiki');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (4, 'nico', 'nico');
INSERT INTO
  `User` (`idUser`, `Username`, `Mdp`)
VALUES
  (5, 'alex', 'alex');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
