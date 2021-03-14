
# Angular Frontend

### Sommaire :

* [Pré-requis](#pré-requis)
* [Mise en place de l'environnement de développement](#mise-en-place-de-lenvironnement-de-développement)
* [Projet](#projet)
  * [Angular CLI](#angular-cli)
  * [Code scaffolding](#code-scaffolding)
  * [Dépendances](#dépendances)
  * [Commandes utiles](#commandes-utiles)
  * [Tests Unitaires](#tests-unitaires)
  * [Tests de non-régression](#tests-de-non-régression)
  * [Outils de qualité du code](#outils-de-qualité-du-code)
  * [Intégration continue](#intégration-continue)
  * [Exemple](#exemple)
* [Githooks avec Husky](#githooks-avec-husky)
  * [Pre-commit](#pre-commit-ce-hook-se-déclenche-en-premier-avant-même-de-saisir-le-message-du-commit)
  * [Pre-push](#pre-push-ce-hook-se-déclenche-avant-lexécution-de-la-commande-git-push)
  * [Contourner les hooks](#contourner-les-hooks)

-----------------------------------------------------------------------------------------------------

## Pré-requis

* Git
* Docker et Docker Compose

## Mise en place de l'environnement de développement

* Afin de conteneuriser notre application, nous avons créé le  `Dockerfile`  suivant :
```Dockerfile
FROM node:lts-alpine

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm ci -qy

COPY ./ .

EXPOSE 4200

CMD ["npm", "run", "start:dev"]
```
> Ce fichier  **Dockerfile**  permet de :
> * D'utiliser une image node lts (Long Terme Support)
> * Récupérer du fichier `package.json` puis d'installer des dépendances
> * Récupérer les sources et lancer l'application en mode développement sur le port **4200** du container


* On utilise ensuite le fichier  `docker-compose.yml`  (qui utilisera le  `Dockerfile`  pour build l'application) :

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
> * Pour le service `frontend`
>   * Construire un conteneur appelé `mspr-recipe-frontend` à partir du **Dockerfile** présent dans le dossier `./dockerfiles/local/`
>   * Utiliser la racine du répertoire local comme **volumes** et le lier au source du container
>   * Rediriger le port **4200** du container vers le **4200** de la machine parent


* Pour construire le container et le déployer en local

```sh
docker-compose up --build -d
```

* L'Application est disponible à l'URL suivant : `http://localhost:4200`

> **NB :** Les sources local sont liées à celle présente dans le container, du coup pas besoin de build de nouveau à chaque changement dans le code.

## Projet

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.

### Angular CLI

Pour plus d'informations à propos du Angular CLI utiliser `ng help` ou se rendre sur la documentation officielle disponible ici [Angular CLI Overview and Command Reference](https://angular.io/cli).

### Code scaffolding

Lancer la commande `ng generate component component-name` pour générer un nouveau composant. Vous pouvez aussi utiliser `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Dépendances

| Dépendance | Version | Commentaire                                                  |
| :--------- | ------- | ------------------------------------------------------------ |
| Angular    |      11 | Framework frontend écrit en TypeScript                                         |
| Rxjs       |   6.6.0 | Librairie permettant de faciliter la gestion des évènements asynchrones en intégrant la programmation réactive |
| TsLib      |   2.0.0 | Il s'agit d'une bibliothèque d'exécution pour TypeScript qui contient toutes les fonctions d'assistance TypeScript. |
| Jest       |  26.6.3 | Framework de tests unitaires pour JavaScript et TypeScript                                |
| Prettier   |   2.2.1 | Permet de formater le code d'un projet selon des règles spécifiques |
| TsLint     |   6.1.0 | TSLint est un outil d'analyse statique extensible qui vérifie le code TypeScript pour la lisibilité, la maintenabilité et les erreurs de fonctionnalité |
| Husky      |   4.3.8 | Husky est une librairie permettant de faciliter la création et le partage des hooks au sein d’un projet |
| TypeScript |   4.0.2 | TypeScript est un langage de programmation libre et open source développé par Microsoft |

### Commandes utiles

- Commande pour lancer l'application en local sur la machine hôte

```sh
npm run start
```

- Commande pour lancer l'application dans le conteneur docker de developement afin que la redirection du container vers l'hôte fontionne

```sh
npm run start:dev
```

- Commande pour compiler les sources du projet pour l'environement de dev

```sh
npm run build
```

- Commande pour compiler les sources du projet pour la production. Les artefacts de compilation seront stockés dans le répertoire `dist/`. Utilisez l'option `--prod` pour l'environnement de production.

```sh
npm run build:prod
```

### Documentation Compodoc
- Run to generate the Documentation in default output folder documentation/, the local HTTP server is launched automatically at http://localhost:4201
```shell
npm run start:compodoc
```

### Tests Unitaires

- Commande pour lancer les tests unitaires en local, `ng test` pour executer les tests unitaires via [Jest](https://www.npmjs.com/package/@angular-builders/jest).

```sh
npm run test
```

- Commande permettant d'executer les tests unitaires dans la pipeline d'intégration continue et de générer un rapport de test au format `junit` ainsi qu'un rapport de coverage au format `jacoco`, qui vont ensuite être interprêtés par l'outil d'analyse de qualité du code.

```sh
npm run test:ci
```

- Commande permettant de relancer automatique, pendant le developement, les tests sur un fichier qui vient d'être modifié

```sh
npm run test:watch
```

- Commande permettant de lancer des tests end to end avec [Protractor](https://www.protractortest.org/#/)

```sh
npm run e2e
```

### Tests de Non Régression

> Les tests par "Snapshot" est un très bon outils afin de s'assurer que l'UI ne change pas de façon inattendu.
> * Un test par "Snapshot"  pour une application mobile affiche un composant UI, prend un "Snapshot" et le compare avec le "Snapshot" de référence stockés pour le test en question.
> * Le test échoue si les deux `Snapshot` sont différents : soit le changement n'est pas souhaité, soit la capture de référence doit être mise à jour avec la nouvelle version du composant UI.

- Pour générer un `snapshot` pour un composant il suffit d'ajouter le code ci-dessous au fichier de test `.spec.ts` :
```typescript
  it('should equal snapshot', () => {
      expect(fixture).toMatchSnapshot();
    });
```

- Commande permettant de mettre les snapshots de tests
```shell
npm run test:update
```

### Outils de qualité du code

- Commande pour formater le code en utilisant le module Prettier et la configuration dans le fichier `.prettierrc` 

```sh
npm run format
```

- Commande permettant de valider que toutes les régles de formattage de code et bonnes pratiques définies dans le fichier `tslint.json` soient bien respectées et d'afficher les potentiels erreurs.

```sh
npm run lint
```

- Commande pour lancer l'analyse de qualité du code en local, la configuration se trouve dans le fichier `sonar-projet.properties`

```sh
npm run sonar
```

### Intégration continue

L’intégration continue de projet est géré avec une pipeline `jenkins` multibranche disponible sur l'url : http://nonstopintegration.ml:8080/

* Le fichier `Jenkinsfile` nous permet de gérer cette pipeline : 
```java
def getEnvName(branchName) {
  if (branchName.startsWith("release-")) {
    return 'prod';
  } else if (branchName == "preprod") {
    return 'preprod';
  }
  return "dev";
}

pipeline {
  agent none
  stages {
    stage('Set environment') {
      agent any
      steps {
        script {
          env.BRANCH_NAME = "${env.GIT_BRANCH.replaceFirst(/^.*\//, '')}"
          env.ENV_NAME = getEnvName(env.BRANCH_NAME)
        }
      }
    }
    stage('Install Dependencies') {
      agent {
        docker { image 'node:lts-alpine' }
      }
      environment { HOME="." }
      steps { sh 'npm install' }
    }
    stage('Static code Analysis') {
      agent {
        docker { image 'node:lts-alpine' }
      }
      environment { HOME="." }
      steps { sh 'npm run lint' }
    }
    stage('Unit tests') {
      agent {
        docker { image 'node:lts-alpine' }
      }
      environment { HOME="." }
      steps { sh 'npm run test:ci' }
    }
    stage('Build') {
      agent {
        docker { image 'node:lts-alpine' }
      }
      environment { HOME="." }
      steps { sh 'npm run build:prod' }
    }
    stage('Sonarqube') {
      agent any
      environment {
        SONAR_HOME = tool 'SonarScanner'
      }
      steps {
        withSonarQubeEnv('SonarQube') {
          sh '$SONAR_HOME/bin/sonar-scanner'
        }
        timeout(time: 5, unit: 'MINUTES') {  
          waitForQualityGate abortPipeline: true  
        }
      }
    }
    stage('Deploy') {
      agent any
      when {
        expression { ENV_NAME == 'preprod' || ENV_NAME == 'prod' }
      }
      steps {
        sh 'docker-compose -p frontend_${ENV_NAME} -f docker-compose.${ENV_NAME}.yml up --build -d'
      }
    }
  }
  post {
    always {
      emailext to: "nonstopintegration@gmail.com",
               subject: "Jenkins Build ${currentBuild.currentResult}: \
                         Job ${env.JOB_NAME}",
               attachLog: true,
               body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} \
                      build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}"
    }
  }
}
```
> Ce fichier **Jenkinsfile** permet de créer une pipeline déclarative dont les différentes étapes sont :
>
> * De mettre en place les variables d'environnements :
>   * `BRANCH_NAME` : Ici on retire le préfix "origin/" du nom de la  branche
>   * `ENV_NAME` : On définit l'environnement (`prod`, `préprod` ou `dev`) en fonction du nom de la branche.
> * D'installer les dépendances du projet du projet : 
>   * A partir d'un docker créé avec l'image `node:lts-alpine`
> * D'exécuter les tests unitaire du projet et générer les rapports de tests et de coverage au bon format : 
>   * A partir d'un docker créé avec l'image `node:lts-alpine`
>   * En spécifiant l'option `npm run test:ci`
> * D'analyser la qualité du code avec SonarQube : 
>   * A partir d'un docker créé avec l'image `node:lts-alpine`
>   * withSonarQubeEnv nous permet d'exécuter l'analyse sur l'environnement sonar en utilisant le sonar-scanner pour TypeScript.
>   * waitForQualityGate nous permet d'attendre la réponse de sonar et ainsi d'indiquer à la pipeline si ce stage doit échouer ou non
> * De déployer notre application si l'environnement est la prod ou la préprod, sinon l'étape est ignorée. Nous utilisons la variable "ENV_NAME" pour sélectionner le bon fichier "docker-compose".
> * À la fin de la pipeline, un mail récap est envoyé en indiquant si la pipeline est un succès ou un échec. Ce mail est accompagné des logs de la pipeline en pièce jointe.

#### Le fonctionnement de notre intégration continue est le suivant
* Lorsqu'on push un commit ou un tag, un webhook sur notre projet github va s'activer et informer Jenkins qu'une branche a été mis à jour (avec le commit) ou qu'un nouveau tag est disponible.
* Lorsque le webhook indique à jenkins les changements sur la nouvelle branche, celui-ci va automatiquement exécuter la pipeline et vérifier si toutes les étapes passent.
* Si on crée une Pull Request sur github, la dernière pipeline effectuée sur la branche sera automatiquement affiché dans la PR avec le statut de celui-ci : En cours, Succès ou Échec
* Un lien amenant au détail de la pipeline est également affichée et permet de consulter, en autre, les résultats des tests unitaires ou de l'analyse de sonarqube

### Exemple
* Voici un exemple du projet installé sur un serveur : https://recipe.nonstopintegration.ml


## Githooks avec Husky

> Un hook est un script qui s’exécute automatiquement lorsqu’un événement particulier se produit dans un dépôt git. Les scripts se trouvent dans le fichier `package.json`

#### pre-commit (Ce hook se déclenche en premier avant même de saisir le message du commit)

  ```sh
    npm run format && npm run lint
  ```

> Formate le code à l'aide de prettier puis lance un linter sur le code afin de vérifier toute erreur potentiel avant de valider le commit

#### pre-push (Ce hook se déclenche avant l’exécution de la commande git push)

  ```sh
     npm run test && npm run build
  ```

> Lance les tests utitaires puis une compilation du projet et vérifie que les deux réussissent avec d'autoriser le push

#### Contourner les hooks

> Si besoin il est possible de contourner l’utilisation des hooks via l’option `--no-verify`

**NB : Cette option n'est à utiliser que lorsque cela est nécessaire.**
