const insert = async (db) => {
    await db.role.create({idRole: 1, libelle: "admin"})
    await db.role.create({idRole: 2, libelle: "prestataire"})
    await db.role.create({idRole: 3, libelle: "user"})
    await db.user.create({
        nom: 'Esuercal',
        prenom: 'Yann',
        pseudo: 'presta',
        password: '$2b$10$q4z7DU75NlOyvebNaQ9enezFFDZsKS2MQHH.0x142ZZviAsqdzt1S',/*mdp:mdppresta*/
        email: 'yann@qerf.vv',
        isNotif: true,
        idRole: 2
    })
    await db.user.create({
        nom: 'Admin',
        prenom: 'Admin',
        pseudo: 'admin',
        password: '$2b$10$RIXprpxdp4.NVQn9tJK8..d6cGeSXBJuqAVOyK9.roVheiaVx0lqS',/*mdp:mdpadmin*/
        email: 'admin@qerf.vv',
        isNotif: true,
        idRole: 1
    })//admin
    await db.user.create({
        nom: 'User',
        prenom: 'User',
        pseudo: 'user',
        password: '$2b$10$EoU4bT5KRoJE.90xLNzmmO.TqFzuQPUM3U/JJusjSGVzsphex07QW',/*mdp:mdpuser*/
        email: 'user@qerf.vv',
        isNotif: true,
        idRole: 3
    })//user
    await db.user.create({
        nom: 'Demo',
        prenom: 'Demo',
        pseudo: 'demo',
        password:'$2b$10$kgLawUqfMerTbLk.4KfyueNqhtql5r4a2HA.aGE4pWg6iF2z2g1j2',/*demodemo*/
        email: 'demo@aa.fr',
        isNotif: true,
        idRole: 3
    })
    //partie stand
    await db.type_stand.create({idTypeStand: 1, libelleTypeStand: 'boutique'})
    await db.type_stand.create({idTypeStand: 2, libelleTypeStand: 'tournois'})
    await db.type_stand.create({idTypeStand: 3, libelleTypeStand: 'temporaire'})
    await db.type_stand.create({idTypeStand: 4, libelleTypeStand: 'autre'})
    await db.stand.create({
        idStand: 300,
        descriptionStand: 'c est une description du stand',
        idTypeStand: 1,
        idPrestataire: 1,
        nomStand: 'stand 300',
        nbPlace:80
    })
    await db.stand.create({
        idStand: 310,
        descriptionStand: 'c est une description du stand',
        idTypeStand: 3,
        idPrestataire: 1,
        nomStand: 'stand 310',
        nbPlace:80
    })
    await db.stand.create({
        idStand: 500,
        descriptionStand: 'c est une salle pour organiser des tournois',
        idTypeStand: 2,
        idPrestataire: 1,
        nomStand: 'Salle tournois',
        nbPlace:160
    })
    await db.stand.create({
        idStand: 600,
        descriptionStand: 'c est une salle pour organiser des tournois',
        idTypeStand: 2,
        idPrestataire: 1,
        nomStand: 'Salle tournois',
        nbPlace:160
    })
    await db.livreOr.create({commentaire: 'Super événement !', idStand: 300})
    //partie evenement
    await db.type_evenement.create({idTypeEvenement: 1, libelleTypeEvenement: 'Tournoi'})
    await db.type_evenement.create({idTypeEvenement: 2, libelleTypeEvenement: 'Conférence'})
    await db.type_evenement.create({idTypeEvenement: 3, libelleTypeEvenement: 'Prestation Invité'})
    await db.type_evenement.create({idTypeEvenement: 4, libelleTypeEvenement: 'Exposition'})
    await db.evenement.create({
        idEvenement: 1,
        libelleEvenement: 'Tournoi Polytopia',
        heureDebut: '2022-06-22 14:00:00',
        heureFin: '2022-06-22 16:00:00',
        idTypeEvenement: 1,
        idStand: 500
    })
    await db.evenement.create({
        idEvenement: 2,
        libelleEvenement: 'Tournoi Mario Kart',
        heureDebut: '2022-06-22 17:00:00',
        heureFin: '2022-06-22 20:00:00',
        idTypeEvenement: 1,
        idStand: 500
    })
    await db.evenement.create({
        idEvenement: 3,
        libelleEvenement: 'Conférence de Cedric',
        heureDebut: '2022-06-22 14:00:00',
        heureFin: '2022-06-22 16:00:00',
        idTypeEvenement: 2,
        idStand: 310
    })
    //partie boutique
    await db.type_produit.create({idTypeProduit: 1, libelleTypeProduit: 'Nourriture'})
    await db.type_produit.create({idTypeProduit: 2, libelleTypeProduit: 'Boisson'})
    await db.type_produit.create({idTypeProduit: 3, libelleTypeProduit: 'Vêtement'})
    await db.type_produit.create({idTypeProduit: 4, libelleTypeProduit: 'Accessoire'})
    await db.type_produit.create({idTypeProduit: 5, libelleTypeProduit: 'Poster'})
    await db.type_produit.create({idTypeProduit: 6, libelleTypeProduit: 'Livre'})
    await db.produit.create({
        idStand: 300,
        libelleProduit: 'Crêpe',
        descriptionProduit: 'Une crêpe faite sur place. Peut être assaisonnée de pâte à tartiner ou de sucre selon choix. PEUT CONTENIR : GLUTEN',
        prix: 1.90,
        imageProduit: 'crepe.jpg',
        idTypeProduit: 1,
        quantite: 50
    })
    await db.produit.create({
        idStand: 300,
        libelleProduit: 'Kinder Bueno',
        descriptionProduit: 'Gaufrettes enrobée de chocolat et de noisette ',
        prix: 1.5,
        imageProduit: 'kbueno.jpg',
        idTypeProduit: 1,
        quantite: 50
    })
    await db.produit.create({
        idStand: 300,
        libelleProduit: 'Coca-cola',
        descriptionProduit: 'Boisson sucrée. Rend 120 HP.',
        prix: 2,
        imageProduit: 'coca.jpg',
        idTypeProduit: 2,
        quantite: 45
    })
    await db.produit.create({
        idStand: 300,
        libelleProduit: 'Sprite',
        descriptionProduit: 'limonade au citron et au citron vert.',
        prix: 2,
        imageProduit: 'sprite.jpg',
        idTypeProduit: 2,
        quantite: 50
    })
    await db.produit.create({
        idStand: 300,
        libelleProduit: 'T-Shirt Splatoon 2',
        descriptionProduit: 'T-Shirt occasionel pour un événement sur Splatoon 2. Taille: L.',
        prix: 35,
        imageProduit: 'tshirtsplatoon2.jpg',
        idTypeProduit: 2,
        quantite: 28
    })
    await db.produit.create({
        idStand: 300,
        libelleProduit: 'Porte-clés Defect - Slay the Spire',
        descriptionProduit: 'Un porte-clés, dont une mini-figurine représentant Le Défecueux de Slay the Spire y est accroché (6cm)',
        prix: 5,
        imageProduit: 'portecledefect.jpg',
        idTypeProduit: 3,
        quantite: 50
    })
    await db.produit.create({
        idStand: 300,
        libelleProduit: 'Poster The Refuge - OneShot',
        descriptionProduit: 'Poster du jeu OneShot montrant Niko arrivant dans le Refuge. Taille: 24cm*60cm',
        prix: 9,
        imageProduit: 'posterrefuge.jpg',
        idTypeProduit: 4,
        quantite: 30
    })
    await db.produit.create({
        idStand: 300,
        libelleProduit: 'Halo - La chute de Reach',
        descriptionProduit: 'Livre portant sur lunivers des jeux Halo',
        prix: 20,
        imageProduit: 'livrehalolachutedereach.jpg',
        idTypeProduit: 5,
        quantite: 50
    })
    await db.produit.create({
        idStand: 300,
        libelleProduit: 'Le Journal : Oeuvre de Cedric',
        descriptionProduit: 'Oeuvre de Cedric',
        prix: 20,
        imageProduit: 'lejournal.jpg',
        idTypeProduit: 5,
        quantite: 32
    })
    await db.reserverProduit.create({quantite: 6, idUser: 1, idProduit: 8})
    await db.reserverProduit.create({quantite: 5, idUser: 1, idProduit: 4})
    await db.reserverProduit.create({quantite: 7, idUser: 1, idProduit: 7})
    await db.reserverProduit.create({quantite: 7, idUser: 1, idProduit: 7})


    await db.reservation.create({idUser:4,idEvenement:2})
    await db.reservation.create({idUser:4,idEvenement:1})
    await db.reservation.create({idUser:2,idEvenement:2})
    await db.reservation.create({idUser:3,idEvenement:2})
}
export {insert};