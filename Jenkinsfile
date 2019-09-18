node {

  environment {
    DOCKER_LOGIN='(aws ecr get-login --no-include-email --region us-east-1)'
    dockerImage = ''
  }

  stage('Git Checkout') {
    deleteDir()
    dir ('App') {
      git(
        branch: 'development',
        url: 'https://github.com/usdot-jpo-codehub/codehub-ui.git'
      )
    }
  }

  stage('Unit Test') {
    nodejs('node') {
      dir ('App') {
        script {
          sh './process_unit_test.sh'
        }
      }
    }
  }

  stage('Bundling') {
    nodejs('node') {
      dir ('App') {
        script {
          sh './process_bundling.sh'
        }
      }
    }
  }

  stage('Static Code Analysis') {
    dir ('App') {
      script {
        def scannerHome = tool 'SonarQube Scanner 2.8';
        withSonarQubeEnv('SonarQube') {
          sh "${scannerHome}/bin/sonar-scanner -X  -Dsonar.projectName=codehub-ui -Dsonar.projectVersion=1.0.0 -Dsonar.projectKey=codehub-ui -Dsonar.sources=src,scripts -Dsonar.sourceEncoding=UTF-8"
        }
      }
    }
  }



}
