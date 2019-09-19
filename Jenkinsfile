node {
  stage('Git Checkout') {
    checkout scm
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

  stage('Static Code Analysis') {
    dir('App') {
      script {
        def scannerHome = tool 'SonarQube Scanner 2.8';
        withSonarQubeEnv('SonarQube') {
          sh "${scannerHome}/bin/sonar-scanner -X  -Dsonar.projectName=codehub-ui -Dsonar.projectVersion=1.0.0 -Dsonar.projectKey=codehub-ui -Dsonar.sources=src,scripts -Dsonar.sourceEncoding=UTF-8"
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
            sh 'eval $(aws ecr get-login --no-include-email) > login'
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

  stage('Upload to S3') {
    dir('App') {
      script {
        def branchname = sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()

        echo "Current branch is ${branchname}"
        if (branchname == 'master') {
          sh 'aws s3 sync dist/ s3://codehub-ui-stage --delete'
        } else if (branchname == 'development') {
          sh 'aws s3 sync dist/ s3://codehub-ui-dev --delete'
        }
      }
    }
  }
}
