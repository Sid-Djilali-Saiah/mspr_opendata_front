node {
  stage('SCM') {
    git 'https://github.com/Nicolas-Chambon/mspr_recipe_front'
  }
  stage('SonarQube analysis') {
    def scannerHome = tool 'SonarScanner';
    withSonarQubeEnv('SonarQube') { // If you have configured more than one global server connection, you can specify its name
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
}
pipeline {
  agent none
  stages {
    stage('Install dependencies') {
      agent {
        docker { image 'node:lts' }
      }
      steps { sh 'npm ci' }
    }
    stage('Unit tests') {
      agent {
        docker {
          image 'node:lts'
        }
      }
      steps { sh 'npm run test:ci' }
    }
    stage('Build container') {
      agent any
      steps { sh 'docker-compose -f docker-compose.prod.yml up --build -d' }
    }
    /* stage('Static code Analysis') {
      steps { sh 'docker exec recipe_frontend npm run lint' }
    }
    stage('Unit tests') {
      steps { sh 'docker exec recipe_frontend npm run test:ci' }
    }
    stage('Build') {
      steps { sh 'npm run build' }
    } */
  }
}
