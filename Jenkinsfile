node {
    environment {
      DOCKER_LOGIN='(aws ecr get-login --no-include-email --region us-east-1)'
      dockerImage = ''
    }
     stage('Git Checkout') {
          deleteDir()
          dir ('App'){
              git(
                branch: 'development',
                url: 'https://github.com/usdot-jpo-codehub/codehub-ui.git'
            )
          }

        }

    stage('Unit Test') {
        nodejs('node') {
            dir ('App'){
              script {
                sh './process_unit_test.sh'
            }
          }
  }
  }
  stage('Unit Test') {
      nodejs('node') {
          dir ('App'){
            script {
              sh './process_bundling.sh'
          }
        }
}
}

      stage('Static Code Analysis'){
        dir ('App'){

        script {
            def scannerHome = tool 'SonarQube Scanner 2.8';
            withSonarQubeEnv('SonarQube') {
                    sh "${scannerHome}/bin/sonar-scanner -X  -Dsonar.projectName=codehub-ui -Dsonar.projectVersion=1.0.0 -Dsonar.projectKey=codehub-ui -Dsonar.sources=src,scripts"
                }
            }
        }
      }

      stage('508 Complaince Using lighthouse') {
       nodejs('node') {
          dir ('App'){
            script {
                sh 'npm install -g lighthouse'
                sh 'npm install chrome-launcher'
                sh 'lighthouse http://dev-codehub-external-1278179393.us-east-1.elb.amazonaws.com -GA —output html —output-path report.html --chrome-flags="--headless"'
                sh 'echo 508 Complaince is complete'
            }
         }
       }
      }

      stage('508 Complaince Using Axe') {
       nodejs('node') {
          dir ('App'){
            script {
                sh 'npm install axe-cli -g'
                sh 'npm install chromedriver'
                sh 'axe $(cat list-of-urls.txt)'
                sh 'echo 508 Complaince is complete'
            }
         }
       }
      }

      stage('Integration Test') {
      dir ('App'){
          script {

              sh 'docker-compose up -d'
              sh 'docker-compose logs --tail="all"'
              sh 'docker-compose down'
              sh 'echo Integration Test is complete'
          }
      }
  }
      stage('Build Codehub-UI Base Image') {
      dir ('App'){
          script {
            withAWS(region:'us-east-1') {
              sh 'eval $(aws ecr get-login --no-include-email) > login'
              dockerImage=docker.build("797335914619.dkr.ecr.us-east-1.amazonaws.com/dev-codehub/codehub-ui" + ":latest")
          }
            sh 'echo "Completing image build"'
          }
      }
}

      stage('Publish Codehub-UI Base Image') {
      dir ('App'){
          script {
            withAWS(region:'us-east-1') {
              sh 'eval $(aws ecr get-login --no-include-email) > login'
              dockerImage.push()
          }
            sh 'echo "Image Build Published Completed Successfully"'
          }
      }
}
      stage('Register TaskDefinition Updates') {
      dir ('App'){
          script {
              sh 'aws ecs register-task-definition --cli-input-json file://codehub-ui-taskDefinition.json --region us-east-1'
              sh 'echo Task Definition Updated Successfully'
          }
      }
      }
      stage('Deploy Service') {
      dir ('App'){
      nodejs('node') {
            script {
              sh './process_deployment.sh'
          }
        }
}
}

}
