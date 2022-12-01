DROP TABLE IF EXISTS participe;
DROP TABLE IF EXISTS tournoi;
DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS evenement;
DROP TABLE IF EXISTS vend;
DROP TABLE IF EXISTS emplacement;
DROP TABLE IF EXISTS achete;
DROP TABLE IF EXISTS reserve;
DROP TABLE IF EXISTS produit;
DROP TABLE IF EXISTS contient;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS type_produit;
DROP TABLE IF EXISTS equipe;
DROP TABLE IF EXISTS type_evenement;
DROP TABLE IF EXISTS type_stand;
DROP TABLE IF EXISTS user_role;


-- A NOTER :
-- Ne me demandez pas pourquoi mais PostGreSQL n'aime pas que je donne le nom
-- de table "user". Du coup le nom de la table est "users" pour l'instant.


-- --------------------------------------- [miroir]
CREATE TABLE IF NOT EXISTS user_role(
    idRole SERIAL PRIMARY KEY,
    libelleRole VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS type_stand(
    idTypeStand SERIAL PRIMARY KEY,
    libelleTypeStand VARCHAR(50)
);


CREATE TABLE IF NOT EXISTS type_evenement(
    idTypeEvenement SERIAL PRIMARY KEY,
    libelleTypeEvenement VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS equipe(
    idEquipe SERIAL PRIMARY KEY,
    nomEquipe VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS type_produit(
    idTypeProduit SERIAL PRIMARY KEY,
    libelletypeProduit VARCHAR(50)
);


CREATE TABLE IF NOT EXISTS users(
    idUser SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    pseudo VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    isNotif BOOLEAN,
    idRole INT,
    FOREIGN KEY (idRole) REFERENCES user_role(idRole)
);

CREATE TABLE IF NOT EXISTS contient(
    idUser INT, 
    idEquipe INT,
    PRIMARY KEY (idUser, idEquipe),
    FOREIGN KEY (idUser) REFERENCES users(idUser),
    FOREIGN KEY (idEquipe) REFERENCES equipe(idEquipe)
);

CREATE TABLE IF NOT EXISTS produit(
    idProduit SERIAL PRIMARY KEY,
    libelleProduit VARCHAR(50),
    descriptionProduit VARCHAR(150),
    prix DECIMAL(6,2),
    imageProduit VARCHAR(75),
    idTypeProduit INT,
    FOREIGN KEY (idTypeProduit) REFERENCES type_produit(idTypeProduit)
);

CREATE TABLE IF NOT EXISTS reserve(
    idUser INT,
    idProduit INT,
    quantite INT,
    PRIMARY KEY(idUser, idProduit),
    FOREIGN KEY (idUser) REFERENCES users(idUser),
    FOREIGN KEY (idProduit) REFERENCES produit(idProduit)
);

CREATE TABLE IF NOT EXISTS achete(
    idUser INT,
    idProduit INT,
    quantite INT,
    PRIMARY KEY (idUser, idProduit),
    FOREIGN KEY (idUser) REFERENCES users(idUser),
    FOREIGN KEY (idProduit) REFERENCES produit(idProduit)
);


CREATE TABLE IF NOT EXISTS emplacement(
    idEmplacement SERIAL PRIMARY KEY,
    descriptionEmplacement VARCHAR(150),
    x INT, 
    y INT, 
    idUser INT,
    idTypeStand INT,
    FOREIGN KEY (idUser) REFERENCES users(idUser),
    FOREIGN KEY (idTypeStand) REFERENCES type_stand(idTypeStand)
);


CREATE TABLE IF NOT EXISTS vend(
    idEmplacement INT,
    idProduit INT,
    stock INT,
    PRIMARY KEY (idEmplacement, idProduit),
    FOREIGN KEY (idEmplacement) REFERENCES emplacement(idEmplacement)
);

CREATE TABLE IF NOT EXISTS evenement(
    idEvenement SERIAL PRIMARY KEY,
    libelleEvenement VARCHAR(50),
    heureDebut TIMESTAMP,
    heureFin TIMESTAMP,
    idTypeEvenement INT, 
    idEmplacement INT,
    FOREIGN KEY (idTypeEvenement) REFERENCES type_evenement(idTypeEvenement),
    FOREIGN KEY (idEmplacement) REFERENCES emplacement(idEmplacement)
);


CREATE TABLE IF NOT EXISTS reservation(
    idUser INT,
    idEvenement INT,
    PRIMARY KEY (idUser, idEvenement),
    FOREIGN KEY (idUser) REFERENCES users(idUser),
    FOREIGN KEY (idEvenement) REFERENCES evenement(idEvenement)
);


CREATE TABLE IF NOT EXISTS tournoi(
    idTournoi SERIAL PRIMARY KEY,
    nbManche INT,
    jeu VARCHAR(50),
    idEvenement INT,
    FOREIGN KEY (idEvenement) REFERENCES evenement(idEvenement)
);



CREATE TABLE IF NOT EXISTS participe(
    idEquipe INT,
    idTournoi INT,
    PRIMARY KEY (idEquipe, idTournoi),
    FOREIGN KEY (idEquipe) REFERENCES equipe(idEquipe),
    FOREIGN KEY (idTournoi) REFERENCES tournoi(idTournoi)
);

