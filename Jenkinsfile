pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'web-chat-app'
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
                    // Use Minikube's Docker environment
                    sh 'eval $(minikube docker-env) && docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                script {
                    // Ensure Minikube is running
                    sh 'minikube start'

                    // Apply Kubernetes deployment
                    sh 'kubectl apply -f k8s/deployment.yaml'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully with Minikube.'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
