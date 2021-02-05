pipeline {
  agent {
    docker { image 'node:lts-alpine' }
  }
  environment { HOME="." }
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
    stage('sonarqube') {
      steps {
        withSonarQubeEnv() {
          sh '${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=mspr_front -Dsonar.sources=. -Dsonar.host.url=https://sonarqube.nonstopintegration.ml -Dsonar.login=db7b3274067b4323f4e690899dd011d6b6c762b4'
        }
      }
    }
  }
}
