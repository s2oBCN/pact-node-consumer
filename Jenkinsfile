pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
        }
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
                junit 'npm run pact:publish'
            }
        }
    }
}