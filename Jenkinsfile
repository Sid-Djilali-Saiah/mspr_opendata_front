pipeline {
  agent {
    docker { image 'node:14.15.4-alpine3.1O' }
  }
  stages {
    stage('Install') {
      steps { sh 'npm install' }
    }
    stage('Test') {
      parallel {
        stage('Static code analysis') {
            steps { sh 'npm run-script lint' }
        }
        stage('Unit tests') {
            steps { sh 'npm run-script test' }
        }
      }
    }
    stage('Build') {
      steps { sh 'npm run-script build' }
    }
    stage('Deploy') {
      steps { sh 'docker-compose up --build -d'}
    }
  }
}
