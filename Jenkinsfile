/* node {
  stage('SCM') {
    git 'https://github.com/Nicolas-Chambon/mspr_recipe_front'
  }
  stage('SonarQube analysis') {
    def scannerHome = tool 'SonarScanner';
    withSonarQubeEnv('SonarQube') { // If you have configured more than one global server connection, you can specify its name
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
} */
pipeline {
  agent none
  stages {
    stage('Install') {
      agent {
        docker { image 'node:lts-alpine' }
      }
      environment { HOME="." }
      steps { sh 'npm ci' }
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
      steps { sh 'npm run build' }
    }
    stage('Deploy') {
      agent any
      steps { sh 'docker-compose -f docker-compose.prod.yml up --build -d' }
    }
  }
}
