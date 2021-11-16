pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
        }
    }
    environment {
        PACT_BROKER_URL = "http://${getIP()}"
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

def getIP(){
    def ip =  sh(returnStdout: true, script:"/sbin/ip route|awk '/default/ { print $3 }'")
    echoInfo("Host IP:$ip")
}

def echoInfo(msg){
    echo "\033[32m ${msg} \033[0m"
}

def echoError(msg){
    echo "\033[31m ${msg} \033[0m"
}
