def scannerHome = tool 'SonarScanner'

pipeline {
  agent {
    docker { image 'node:lts-alpine' }
  }
  environment { HOME="." }
  stages {
    stage('Clean Install Modules') {
      steps { sh 'npm ci' }
    }
    stage('Static code Analysis') {
      steps { sh 'npm run lint' }
    }
    stage('Unit tests') {
      steps { sh 'npm run test' }
    }
    stage('build && SonarQube analysis') {
      steps {
        withSonarQubeEnv('SonarQube') {
          sh "${scannerHome}/bin/sonar-scanner"
        }
      }
    }
    stage('Build') {
      steps { sh 'npm run build' }
    }
  }
}
