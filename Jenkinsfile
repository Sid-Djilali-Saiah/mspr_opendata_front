pipeline {
  agent none
  stages {
    stage('Set environment') {
      agent any
      steps {
        script {
          env.BRANCH_NAME = "${env.GIT_BRANCH.replaceFirst(/^.*\//, '')}"
          env.ENV_NAME = getEnvName(env.BRANCH_NAME)
        }
      }
    }
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
    stage('Build') {
      agent {
        docker { image 'node:lts-alpine' }
      }
      environment { HOME="." }
      steps { sh 'npm run build:prod' }
    }
    stage('Sonarqube') {
      agent any
      steps {
        def scannerHome = tool 'SonarScanner';
        withSonarQubeEnv('SonarQube') {
          sh """
          ${scannerHome}/bin/sonar-runner.bat
          pip install -r requirements.txt
          """
        }
      }
    }
    stage('Deploy') {
      agent any
      when {
        expression { ENV_NAME == 'preprod' || ENV_NAME == 'prod' }
      }
      steps {
        sh 'docker-compose -p frontend_${ENV_NAME} -f docker-compose.${ENV_NAME}.yml up --build -d'
      }
    }
  }
  post {
    always {
      emailext to: "nonstopintegration@gmail.com",
               subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
               attachLog: true,
               body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}"
    }
  }
}

def getEnvName(branchName) {
  if (branchName.startsWith("release-")) {
    return 'prod';
  } else if (branchName == "preprod") {
    return 'preprod';
  }
  return "dev";
}
