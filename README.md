# **Projet d'application mobile - Forum films et séries**

## Forums de discutions, de partages, de news sur vos séries et films préférer. Discutez et partagez avec des fans, recevez des notifications sur les news et sorties de série et films préférés
---
>## **Utilisateurs** :
---

>### Differents Utilisateurs
- Administrateurs
- Modérateurs
- Utilisateurs
>### Nom d'application potentiels
- ### **Foxinema**
>### Logo potentiels
![Texte alternatif](images/Banniere-Foxinema-600.png "Logo Foxinema").
![Texte alternatif](images/Banniere-Foxinema2-600.png "Logo Foxinema").
>## **Fonctionnalitées et sécurités**
---
>### Fonctionnalitées Utilisateurs

- Créer un compte utilisateur
- Choisir des films et des séries préférées à la création du compte pour proposer directement des postes associés
- Choisir ces séries et films prérérés
- Créer des postes par série/ films et saison d'une série
- Commenter les postes
- Répondre aux commentaires
- Liker des postes et commentaires
- Parler et partagés avec d'autres fans via des discutions par séries et par thèmes ( type forum comme JVC )
- Créer des groupes de discutions avec les personnes de son choix ( 
optionnel )
- Follow ou Unfollow un autre utilisateurs, un film/serie/saison
- Voir son nombre de followers et de personnes follows
- Voir les followers d'un film/série/saison
- Signaler certains utilisateurs
- Proposer des séries et films à ajouter à faire valider par administrateurs
- Donner un avis sur les films/séries et saisons

>### Fonctionnalitées Administrateurs

- Supprimer des discutions et des séries
- Bannir et suspendre des utilisateurs
- Attribuer des roles ( modérateurs par exemple )
- Valider l'ajout de séries et films
- Supprimer des commentaires ou publications/posts

>### Fonctionnalitées Modérateurs

- Suspendre des utilisateurs
- Demander le ban d'un utilisateur à valider par admin
- Supprimer des commentaires ou publications

### Page

- Page type réseau social, fil d'actualitée avec les postes des personnes suivit 

>### Sécurités

- Vérifications d'age pour que les plus jeunes n'accèdent pas à certaines séries et films non adaptés
- Vérifications e-mail
- Mot de passe fort selon ANSSI
- Aucune informations personnelles, sauf date de naissance et addresse email obligatoire
- Autoriser l'accès selon l'age requis pour le film ou la série
- Listes de opérations faites par les utilisateurs (Trigger MySQL)

>## **Design**
- Théme dark ( foncé )
- Menu déroulant
- Card avec image pour accéder à chaque films et séries ( type netflix )

>### Couleurs et fonts

---
- Fond <span style="color: #1c1b27; background-color : #ffffff; font-weight : bold">#1c1b27</span> ( Bleu Foncé) ou <span style="color: #3D3B54; font-weight : bold">#3D3B54<span>
- Titres <span style="color: #ee5b26">#ee5b26<span> ( Orange) - Orbitron
- Texte #ffffff ( Blanc) - Roboto
>## **Fonctionnalitées futur**
- Partage de vidéos et photos sur les postes, les discutions de groupes et les discutions privées
#### Classe mermaid des medias
          class Image {
            +int id pk
            +varchar name
            +varchar src
            +boolean active
          }
          class Video {
            +int id pk
            +varchar name
            +varchar src
            +boolean active
          }

- Listes des épisodes par saisons des séries

>## **Maquette** :
https://www.figma.com/file/nmdX1OYZddckkYzplggFFh/Projet-S%C3%A9ries-Films?node-id=0%3A1
