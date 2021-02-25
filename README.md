## Installation et utilisation de l'environnement de développement front-end

* Cloner le repository GitHub suivant : https://github.com/Nicolas-Chambon/mspr_recipe_front
* Pour l'environnement local, utiliser le fichier `docker-compose.yml`

```yml
version: '3'
services:
  client:
    container_name: mspr-recipe-frontend
    build:
      context: .
      dockerfile: dockerfiles/local/Dockerfile
    volumes:
      - ./:/usr/app
      - /usr/app/node_modules
    ports:
      - 4200:4200
```

> Ce fichier **docker-compose** permet de :
>
> * Pour le service `backend``
>   * Construire un conteneur appelé `mspr-recipe-frontend` à partir du **Dockerfile** présent à la racine du projet`
>   * Utiliser la racine du répertoire local comme **volumes** et le lier au source du container
>   * Rediriger le port **4200** du container vers le **4200** de la machine parent



* Pour construire le container et le déployer en local

```bash
docker-compose up --build -d
```

* L'Application est disponible à l'URL suivant : 

```html
http://localhost:4200
```

> **NB :** Les sources local sont liées à celle présente dans le container, du coup pas besoin de build de nouveau à chaque changement dans le code.



### Dépendances

| Dépendance | Version | Commentaire                                                  |
| :--------- | ------: | ------------------------------------------------------------ |
| Angular    |      11 | Framework typescript                                         |
| rxjs       |   6.6.0 | librairie permettant de faciliter la gestion des évènements asynchrones |
| tslib      |   2.0.0 | Il s'agit d'une bibliothèque d'exécution pour TypeScript qui contient toutes les fonctions d'assistance TypeScript. |
| jest       |  26.6.3 | Framework de test javascript                                 |
| prettier   |   2.2.1 | Permet de formaté le code d'un projet selon des règles spécifiques |
| tslint     |   6.1.0 | TSLint est un outil d'analyse statique extensible qui vérifie le code TypeScript pour la lisibilité, la maintenabilité et les erreurs de fonctionnalité |
| husky      |   4.3.8 | Husky est une librairie permettant de faciliter la création et le partage des hooks au sein d’un projet |
| typescript |   4.0.2 | TypeScript est un langage de programmation libre et open source développé par Microsoft |

### Commande utiles

- ng
- start
- start:dev
- build
- build:prod
- test
- test:ci
- test:update
- test:watch
- lint
- format
- sonar
- e2e

### Tests Unitaires



### Outils de qualité du code

Prettier

Tslint

Sonarqube 

* Indiquer la conf pour expliquer comme la changer (pom.xml) => source a inclure ou exclure
* Indiquer les règles importantes/bloquantes par défault et si il y en a, les customs

### hooks avec Husky

> **NB :** Un hook est un script qui s’exécute automatiquement lorsqu’un événement particulier se produit dans un dépôt git.

- #### pre-commit (Ce hook se déclenche en premier avant même de saisir le message du commit)

  - npm run format
    - Formate le code à l'aide de prettier avant de valider un commit
  - npm run lint
    - Lance un linter sur le code afin de vérifier toute erreur potentiel avant de valider le commit

- #### pre-push (Ce hook se déclenche avant l’exécution de la commande git push)

  - npm run test
    - Lance les tests sur le projet avant de push
  - npm run build
    - Tente de build le projet avant de push

- #### Contourner les hooks

  - Si besoin il est possible de contourner l’utilisation des hooks via l’option --no-verify
