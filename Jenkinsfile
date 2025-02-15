pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'my-app'
        REGISTRY_URL = 'us.icr.io/my-chat-namespace'
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/AdityaReddy-007/web-chat-app.git'
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
                    sh 'docker push $REGISTRY_URL/$DOCKER_IMAGE'
                    sh 'docker push $REGISTRY_URL/$DOCKER_IMAGE-backend'
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // Assuming you have a docker-compose.yml file in your project
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