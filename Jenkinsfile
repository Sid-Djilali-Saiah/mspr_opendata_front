pipeline {
  agent {
    docker { image 'node:lts-alpine' }
  }
  environment { HOME="." }
  stages {
    stage('Install') {
      steps { sh 'npm install' }
    }
    stage('Static code Analysis') {
      steps { sh 'npm run-script lint' }
    }
    stage('Unit tests') {
      steps { sh 'npm run-script test' }
    }
    stage('Build') {
      steps { sh 'npm run-script build' }
    }
    stage('Code Quality') {
      steps { sh 'npm run-script sonar' }
    }
  }
}
