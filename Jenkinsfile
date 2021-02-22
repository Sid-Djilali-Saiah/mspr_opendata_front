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
