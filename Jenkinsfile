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
    stage('Build') {
      steps { sh 'npm run build' }
    }
  }
}
