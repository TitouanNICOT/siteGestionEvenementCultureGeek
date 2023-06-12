# siteGestionEvenementCultureGeek : geekyEvent
Développement d'un site web visant la gestion d'événements autour de la culture geek.

## Identifiants
- Admin : admin - mdpadmin
- Utilisateur : user - mdpuser
- Prestataire : presta - mdppresta

## Fonctionnalités/services
- Gestion des événements 
- Gestion des tournois 
- Commentaires
- Boutiques
- Contact
- Statistiques prestataires

## Fonctionnalités autres
- Inscription/Connection
- Carte
- Filtre sur stands/evenements
- Programme
→ Toutes les fonctionnalités utilisent l'api

## Informations autres
Le service contact fonctionne et envoie un mail, mais il l'envoie sur une adresse mail personnelle.
Il faut donc eviter de l'utiliser ou pour voir le resultat changer l'adresse mail (dans mail.controller.js)

Pour modifier l'arbre de tournois, il faut être connecté en tant que prestataire et valider les inscriptions 
(l'événement "Tournoi Mario Kart" à déjà toutes les inscriptions nécessaires pour générer la vue)
