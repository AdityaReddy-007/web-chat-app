pipeline {
    agent any
    environment {
        GITHUB_CREDS = credentials('github-creds')
        IBM_CLOUD_API_KEY = credentials('ibm-cloud-api-key')
        IBM_REGISTRY_CREDS = credentials('ibm-container-registry-creds')
        DOCKER_IMAGE = 'my-app'
        REGISTRY_URL = 'icr.io/my-chat-namespace'
    }
    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'github-creds', url: 'https://github.com/AdityaReddy-007/web-chat-app.git', branch: 'main'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $REGISTRY_URL/$DOCKER_IMAGE ./client'
                    sh 'docker build -t $REGISTRY_URL/$DOCKER_IMAGE-backend ./server'
                }
            }
        }
        stage('Push Docker Image to IBM Cloud Container Registry') {
    steps {
        script {
            retry(3) {
                try {
                    // Log in to IBM Cloud Container Registry
                    sh 'echo $IBM_CLOUD_API_KEY | docker login -u iamapikey --password-stdin $REGISTRY_URL'
                } catch (Exception e) {
                    echo "Failed to log in to IBM Cloud Container Registry: ${e}"
                    throw e
                }
            }
            // Push Docker images
            sh 'docker push $REGISTRY_URL/$DOCKER_IMAGE'
            sh 'docker push $REGISTRY_URL/$DOCKER_IMAGE-backend'
        }
    }
}
        stage('Test') {
            steps {
                script {
                    // Use WSL to run npm commands
                    dir('./tests') {
                        bat 'npm install' // Install test dependencies using WSL
                        bat 'npm run test3'    // Run Mocha tests using WSL
                    }
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline executed successfully.'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}