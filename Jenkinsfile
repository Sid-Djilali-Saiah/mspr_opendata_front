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
    stage('Code Quality Gate') {
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
    }
    stage('Build') {
      steps { sh 'npm run build' }
    }
  }
}
