/* Réinitialise les tables afin que les valeurs mises dans les tables ne soient
pas comptées en double. à mettre en commentaire si besoin. */
-- DELETE * FROM *;
\i tables.sql


-- user_role
INSERT INTO user_role VALUES(DEFAULT, 'Visiteur');
INSERT INTO user_role VALUES(DEFAULT, 'Invité');
INSERT INTO user_role VALUES(DEFAULT, 'Prestataire');
INSERT INTO user_role VALUES(DEFAULT, 'Administrateur');


INSERT INTO type_stand VALUES(DEFAULT, 'Emplacement non-stand');
INSERT INTO type_stand VALUES(DEFAULT, 'Vente de nourriture');
INSERT INTO type_stand VALUES(DEFAULT, 'Vente de goodies');
INSERT INTO type_stand VALUES(DEFAULT, 'Vente de mangas');
INSERT INTO type_stand VALUES(DEFAULT, 'Vente de jeux de plateau');


INSERT INTO type_evenement VALUES(DEFAULT, 'Tournoi');
INSERT INTO type_evenement VALUES(DEFAULT, 'Conférences');
INSERT INTO type_evenement VALUES(DEFAULT, 'Prestation Invité');
INSERT INTO type_evenement VALUES(DEFAULT, 'Exposition');

INSERT INTO equipe VALUES(DEFAULT, 'Calamus Calamity');
INSERT INTO equipe VALUES(DEFAULT, 'The Awakened Ones');
INSERT INTO equipe VALUES(DEFAULT, 'We make the Roulxs');
INSERT INTO equipe VALUES(DEFAULT, 'Miserys Nemesis');
INSERT INTO equipe VALUES(DEFAULT, 'The Winter of Polaris');
INSERT INTO equipe VALUES(DEFAULT, 'Squids Evil Presentation');
INSERT INTO equipe VALUES(DEFAULT, 'The Owl Express');
-- J'ai passé beaucoup plus de temps à trouver ces noms que j'aimerais
-- ne l'admettre


INSERT INTO type_produit VALUES(DEFAULT, 'Nourriture');
INSERT INTO type_produit VALUES(DEFAULT, 'Boisson');
INSERT INTO type_produit VALUES(DEFAULT, 'Vêtement');
INSERT INTO type_produit VALUES(DEFAULT, 'Accésoire');
INSERT INTO type_produit VALUES(DEFAULT, 'Poster');
INSERT INTO type_produit VALUES(DEFAULT, 'Livre');


INSERT INTO users VALUES(DEFAULT, 'Esuercal','Nairod','IArceusI','0$jwhAuwpgq$D#Yn0cUeMtVX$TWjBid496zLW%HtfkLHm#ofCW', 'arceus@coronet.sinnoh', 'true' , 4);
INSERT INTO users VALUES(DEFAULT, 'Redbird','Calamus','Calamus','dP78M6g6WM', 'Calamus@glen.os', 'true' , 3);
INSERT INTO users VALUES(DEFAULT, 'Bluejay','Alula','AlulaJay','IrOsIUmo', 'AlulaJay@glen.os', 'true' , 3);

INSERT INTO users VALUES(DEFAULT, 'Vedast','Cedric','The Author ♧','n3M2ft1lT@7pbRL', 'theauthor@refuge.os', 'true' , 2);

INSERT INTO users VALUES(DEFAULT, 'Maximilien','Sylvestre','Maxi_de_la_Forêt','tqNrL1U35D', 'maximilien@gmail.com', 'true' , 1);
INSERT INTO users VALUES(DEFAULT, 'Abel','Théodore','Théodore52','6jU85&3Xns', 'theodore52@gmail.com', 'false' , 1);
INSERT INTO users VALUES(DEFAULT, 'Alison','Léonce','Léonce_du_90','RpBpZb', 'leonce90@hotmail.com', 'false' , 1);
INSERT INTO users VALUES(DEFAULT, 'Ginette','Alexis','Mr_Alexis','3692', 'mralexis@sfr.fr', 'true' , 1);
INSERT INTO users VALUES(DEFAULT, 'Andréa','Emmanuelle','Emma20','U7mAUA1n94', 'Emma20@bbox.fr', 'true' , 1);
-- Merci https://www.behindthename.com/random/
-- et https://www.lastpass.com/fr/features/password-generator

INSERT INTO contient VALUES(1, 1);
INSERT INTO contient VALUES(2, 1);
INSERT INTO contient VALUES(3, 1);

INSERT INTO contient VALUES(5, 2);
INSERT INTO contient VALUES(6, 2);

INSERT INTO contient VALUES(7, 3);
INSERT INTO contient VALUES(8, 3);
INSERT INTO contient VALUES(9, 3);


INSERT INTO produit VALUES(DEFAULT, 'Crêpe', 'Une crêpe faite sur place. Peut être assaisonnée de pâte à tartiner ou de sucre selon choix. PEUT CONTENIR : GLUTEN', 1.90, 'crepe.jpg', 1);
INSERT INTO produit VALUES(DEFAULT, 'Kinder Bueno', 'Gaufrettes enrobée de chocolat et de noisette ', 1.5, 'kbueno.jpg', 1);
INSERT INTO produit VALUES(DEFAULT, 'Coca-cola', 'Boisson sucrée. Rend 120 HP.', 2, 'coca.jpg', 2);
INSERT INTO produit VALUES(DEFAULT, 'Sprite', 'limonade au citron et au citron vert.', 2, 'coca.jpg', 2);
INSERT INTO produit VALUES(DEFAULT, 'T-Shirt Splatoon 2', 'T-Shirt occasionel pour un événement sur Splatoon 2. Taille: L.', 35, 'tshirtsplatoon2.jpg', 2);
INSERT INTO produit VALUES(DEFAULT, 'Porte-clés Defect - Slay the Spire', 'Un porte-clés, dont une mini-figurine représentant Le Défecueux de Slay the Spire y est accroché (6cm)', 5, 'portecledefect.jpg', 3);
INSERT INTO produit VALUES(DEFAULT, 'Poster The Refuge - OneShot', 'Poster du jeu OneShot montrant Niko arrivant dans le Refuge. Taille: 24cm*60cm', 9, 'posterrefuge.jpg', 4);
INSERT INTO produit VALUES(DEFAULT, 'Halo - La chute de Reach', 'Livre portant sur l univers des jeux Halo', 20, 'livrehalolachutedereach.jpg', 5);
INSERT INTO produit VALUES(DEFAULT, 'Le Journal', 'Oeuvre de Cedric', 20, 'lejournal.jpg', 5);
-- l'univers pas lunivers, j'ai pas réussi à inclure l'apostrophe dans la description


INSERT INTO reserve VALUES(6, 8, 1);
INSERT INTO reserve VALUES(5, 4, 1);
INSERT INTO reserve VALUES(7, 8, 1);


INSERT INTO achete VALUES(6, 6, 1);


INSERT INTO emplacement VALUES(DEFAULT, 'Salle principale - tournois', 80, 80, 1, 1);
INSERT INTO emplacement VALUES(DEFAULT, 'Salle de conférences', 160, 80, 4, 1);
INSERT INTO emplacement VALUES(DEFAULT, 'Stand de restauration', 80, 160, 2, 2);


INSERT INTO vend VALUES(3, 1, 800);
INSERT INTO vend VALUES(3, 2, 800);
INSERT INTO vend VALUES(3, 3, 624);
INSERT INTO vend VALUES(3, 4, 204);


INSERT INTO evenement VALUES(DEFAULT, 'Tournoi Polytopia', '2022-06-22 14:00:00-07', '2022-06-22 16:00:00-07', 1, 1);
INSERT INTO evenement VALUES(DEFAULT, 'Tournoi Mario Kart', '2022-06-22 17:00:00-07', '2022-06-22 20:00:00-07', 1, 1);
INSERT INTO evenement VALUES(DEFAULT, 'Conférence de Cedric', '2022-06-22 15:00:00-07', '2022-06-22 16:30:00-07', 2, 2);


INSERT INTO reservation VALUES(4, 2);
INSERT INTO reservation VALUES(5, 1);
INSERT INTO reservation VALUES(5, 2);
INSERT INTO reservation VALUES(7, 2);

INSERT INTO tournoi VALUES(DEFAULT, 4, 'The Battle of Polytopia', 1);
INSERT INTO tournoi VALUES(DEFAULT, 5, 'Mario Kart 8 Deluxe', 2);

INSERT INTO participe VALUES(1,1);
INSERT INTO participe VALUES(3,1);
INSERT INTO participe VALUES(7,2);
INSERT INTO participe VALUES(4,1);
INSERT INTO participe VALUES(4,2);
INSERT INTO participe VALUES(5,2);
