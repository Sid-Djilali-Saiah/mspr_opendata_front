def scannerHome = tool 'SonarScanner';

pipeline {
  agent none
  stages {
    stage('Install') {
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
    stage('Sonar') {
      agent any
      steps {
        withSonarQubeEnv('SonarQube') {
          sh "${scannerHome}/bin/sonar-scanner"
        }
      }
    }
    stage('Build') {
      agent {
        docker { image 'node:lts-alpine' }
      }
      environment { HOME="." }
      steps { sh 'npm run build:prod' }
    }
    stage('Deploy') {
      agent any
      steps { sh 'docker-compose -f docker-compose.prod.yml up --build -d' }
    }
  }
}
