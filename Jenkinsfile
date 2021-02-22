pipeline {
  agent {
    docker { image 'node:lts-alpine' }
  }
  environment { HOME="." }
  stages {
    stage('Install') {
      steps { sh 'npm ci && npm i -g sonar-scanner' }
    }
    stage('Static code Analysis') {
      steps { sh 'npm run lint' }
    }
    stage('Unit tests') {
      steps { sh 'npm run test' }
    }
    stage('Code Quality') {
      steps { sh "npm run sonar" }
    }
    stage('Build') {
      steps { sh 'npm run build' }
    }
  }
}
