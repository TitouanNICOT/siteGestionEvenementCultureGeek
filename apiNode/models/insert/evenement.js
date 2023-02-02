export default async (db) => {
    await db.type_evenement.create({idTypeEvenement: 1, libelleTypeEvenement: 'Tournoi'})
    await db.type_evenement.create({idTypeEvenement: 2, libelleTypeEvenement: 'Conférence'})
    await db.type_evenement.create({idTypeEvenement: 3, libelleTypeEvenement: 'Prestation Invité'})
    await db.type_evenement.create({idTypeEvenement: 4, libelleTypeEvenement: 'Exposition'})
    await db.evenement.create({
        libelleEvenement: 'Tournoi Polytopia',
        heureDebut: '2022-06-22 14:00:00',
        heureFin: '2022-06-22 16:00:00',
        idTypeEvenement: 1,
        idStand: 500
    })
    await db.evenement.create({
        libelleEvenement: 'Tournoi Mario Kart',
        heureDebut: '2022-06-22 17:00:00',
        heureFin: '2022-06-22 20:00:00',
        idTypeEvenement: 1,
        idStand: 500
    })
    await db.evenement.create({
        libelleEvenement: 'Conférence de Cedric',
        heureDebut: '2022-06-22 14:00:00',
        heureFin: '2022-06-22 16:00:00',
        idTypeEvenement: 2,
        idStand: 310
    })
    await db.evenement.create({
        libelleEvenement: 'Conférence de Cedric jour 2',
        heureDebut: '2022-07-22 14:00:00',
        heureFin: '2022-07-22 16:00:00',
        idTypeEvenement: 2,
        idStand: 310
    })

    await db.reservation.create({idUser:4,idEvenement:2})
    await db.reservation.create({idUser:4,idEvenement:1})
    await db.reservation.create({idUser:2,idEvenement:2})
    await db.reservation.create({idUser:3,idEvenement:2})
}