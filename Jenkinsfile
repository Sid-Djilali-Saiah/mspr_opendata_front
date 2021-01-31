pipeline {
  agent none
  environment { HOME="." }
  stages {
    stage('Install') {
      agent {
        docker { label 'test-container' image 'node:lts-alpine' }
      }
      steps { sh 'npm install' }
    }
    stage('Test') {
      parallel {
        stage('Static code analysis') {
            agent { label 'test-container' }
            steps { sh 'npm run-script lint' }
        }
        stage('Unit tests') {
           agent { label 'test-container' }  
           steps { sh 'npm run-script test' }
        }
      }
    }
    stage('Build') {
      agent { label 'test-container' }
      steps { sh 'npm run-script build' }
    }
    stage('Deploy') {
      agent any
      steps { sh 'docker-compose up --build -d'}
    }
  }
}
