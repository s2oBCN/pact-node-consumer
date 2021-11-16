pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
        }
    }
    environment {
        PACT_BROKER_URL = 'http://172.29.240.1'
    }
     options {
        ansiColor('xterm')
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm i'
            }
        }
        stage('Test') {
            steps {
                sh script:'npm run test', returnStatus:true
            }
        }
        stage('Publish') {
            steps {
                 sh script: 'npm run pact:publish'
            }
        }
    }
}