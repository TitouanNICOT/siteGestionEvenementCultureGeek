export default async (db) => {
    await db.type_stand.create({idTypeStand: 1, libelleTypeStand: 'boutique'})
    await db.type_stand.create({idTypeStand: 2, libelleTypeStand: 'tournois'})
    await db.type_stand.create({idTypeStand: 3, libelleTypeStand: 'temporaire'})
    await db.type_stand.create({idTypeStand: 4, libelleTypeStand: 'autre'})

    await db.stand.create({
        idStand: 300,
        descriptionStand: 'c est une description du stand',
        idTypeStand: 1,
        idPrestataire: 1,
        nomStand: 'stand 300'
    })
    await db.stand.create({
        idStand: 310,
        descriptionStand: 'c est une description du stand',
        idTypeStand: 3,
        idPrestataire: 6,
        nomStand: 'stand 310',
        nbPlace: 80
    })
    await db.stand.create({
        idStand: 500,
        descriptionStand: 'c est une salle pour organiser des tournois',
        idTypeStand: 2,
        idPrestataire: 1,
        nomStand: 'Salle tournois',
        nbPlace: 160
    })
    await db.stand.create({
        idStand: 600,
        descriptionStand: 'c est une salle pour organiser des tournois',
        idTypeStand: 2,
        idPrestataire: 1,
        nomStand: 'Salle tournois',
        nbPlace: 160
    })
    await db.stand.create({
        idStand: 320,
        descriptionStand: 'ici on vend rien',
        idTypeStand: 1,
        idPrestataire: 6,
        nomStand: 'Stand de vente'
    })
    await db.stand.create({
        idStand: 315,
        descriptionStand: 'c est une salle d interview',
        idTypeStand: 3,
        idPrestataire: 5,
        nomStand: 'Salle interview de M Pierre',
        nbPlace: 160
    })
    await db.stand.create({
        idStand: 317,
        descriptionStand: 'c est une salle d interview',
        idTypeStand: 3,
        idPrestataire: 5,
        nomStand: 'Salle interview 2 de M Pierre',
        nbPlace: 160
    })
    await db.livreOr.create({commentaire: 'Super stand !', idStand: 300})
    await db.livreOr.create({commentaire: 'Super événement !', idStand: 600})
    await db.livreOr.create({commentaire: 'Super événement !', idStand: 500})
    await db.livreOr.create({commentaire: 'il est nul le stand', idStand: 320})
    await db.livreOr.create({commentaire: 'bonjour Pierre', idStand: 315})
    await db.livreOr.create({commentaire: 'bonjour Pierre', idStand: 317})
    await db.livreOr.create({commentaire: 'peut-etre ?', idStand: 300})
}