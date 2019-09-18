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

  stage('508 Complaince, Performance Using lighthouse') {
    nodejs('node') {
      dir ('App') {
        script {
          withAWS(region:'us-east-1') {
            sh 'eval $(aws ecr get-login --no-include-email) > login'
            sh 'npm install'
            sh 'docker run -t -v /tmp:/tmp -e USERID=$UID 797335914619.dkr.ecr.us-east-1.amazonaws.com/dev-codehub/codehub-ui-access:latest lighthouse https://dev-codehub-external-1278179393.us-east-1.elb.amazonaws.com --output html --output-path=/tmp/dev-codehub-external-1278179393.us-east-1.elb.amazonaws.html --save-assets'
            publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: '/tmp', reportFiles: 'dev-codehub-external-1278179393.us-east-1.elb.amazonaws.html', reportName: 'HTML Report', reportTitles: '508 Report'])
          }
        }
      }
    }
  }

  stage('508 Complaince Using Axe') {
    nodejs('node') {
      dir ('App') {
        script {
          sh 'npm install axe-cli@3.0.0 -g'
          sh 'npm install chromedriver@^75.0.0'
          sh 'axe $(cat list-of-urls.txt)'
          sh 'echo 508 Complaince is complete'
        }
      }
    }
  }

}
