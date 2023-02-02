export default async (db) => {
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
        nom: 'User2',
        prenom: 'user2',
        pseudo: 'user2',
        password: '$2b$10$Tiyx7K6cCD0M9PkHMPGdf.0lJf4i5/HgzD4Z.x0ZnkYbSqPZPGKL.',/*demodemo*/
        email: 'demo@aa.fr',
        isNotif: true,
        idRole: 3
    })
    await db.user.create({
        nom: 'MonAmi',
        prenom: 'Pierre',
        pseudo: 'pierre',
        password: '$2b$10$6doy.w4jhx1s7CF2yeyATu84T7Hdz59K48nRiu98RWOMySMIDgt.W',/*monamipierre*/
        email: 'demo@aa.fr',
        isNotif: true,
        idRole: 2
    })
    await db.user.create({
        nom: 'inconnu',
        prenom: 'inconnu',
        pseudo: 'personne404',
        password: '$2b$10$zR7F3b9SYSuEsg36mkoOjOkI2E5zs8fSMWkjXJ.V8NAeFghfXxnXm',/*error404*/
        email: 'inconnu@pasla.fr',
        isNotif: true,
        idRole: 2
    })

}