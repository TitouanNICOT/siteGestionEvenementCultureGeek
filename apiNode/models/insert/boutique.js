export default async (db) => {
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
}