node {
  stage('Git Checkout') {
    deleteDir()
    dir('App') {
      checkout scm
    }
  }

  stage('Unit Test') {
    nodejs('node') {
      dir('App') {
        script {
          sh 'npm install'
          sh 'au test --browsers ChromeHeadlessNoSandbox --watch=false --code-coverage'
        }
      }
    }
  }

  stage('Create Package Bundle') {
    dir('App') {
      script {
        'au package-bundle --env prod'
      }
    }
  }

  stage('508 Complaince, Performance Using lighthouse') {
    nodejs('node') {
      dir('App') {
        script {
          withAWS(region: 'us-east-1') {
            sh 'eval $(aws ecr get-login --no-include-email)'
            sh 'docker run -t -v /tmp:/tmp -e USERID=$UID 797335914619.dkr.ecr.us-east-1.amazonaws.com/dev-codehub/codehub-ui-access:latest lighthouse https://dev-codehub-external-1278179393.us-east-1.elb.amazonaws.com --output html --output-path=/tmp/dev-codehub-external-1278179393.us-east-1.elb.amazonaws.html --save-assets'
            publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, keepAll: true, reportDir: '/tmp', reportFiles: 'dev-codehub-external-1278179393.us-east-1.elb.amazonaws.html', reportName: 'HTML Report', reportTitles: '508 Report'])
          }
        }
      }
    }
  }

  stage('508 Complaince Using Axe') {
    nodejs('node') {
      dir('App') {
        script {
          sh 'npm install axe-cli@3.0.0 -g'
          sh 'npm install chromedriver@^75.0.0'
          sh 'axe $(cat list-of-urls.txt)'
          sh 'echo 508 Complaince is complete'
        }
      }
    }
  }

  stage('Integration Test') {
    dir('App') {
      script {
        sh 'docker-compose up -d'
        sh 'docker-compose logs --tail="all"'
        sh 'docker-compose down'
        sh 'echo Integration Test is complete'
      }
    }
  }

  stage('Push Image to ECR') {
    dir('App') {
      script {
        sh "docker build -t ${params.IMAGE_TAG} ."
        sh "docker push ${params.IMAGE_TAG}"
      }
    }
  }

    stage('Redeploy Service') {
    dir('App') {
      script {
        sh "aws ecs update-service --cluster ${params.ECS_CLUSTER} --service ${params.ECS_SERVICE} --force-new-deployment"

      }
    }
  }
}
