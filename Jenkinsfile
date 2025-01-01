pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'web-chat-app'
        MINIKUBE_CONTEXT = 'minikube'
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
                    // Use Minikube's Docker environment to build the image
                    sh 'eval $(minikube docker-env) && docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Test') {
    steps {
        script {
            echo 'Running tests from "tests" directory...'
            // Run tests from the "tests" directory
            sh 'cd tests && npm install && npm test1'
        }
    }
}


        stage('Deploy to Minikube') {
            steps {
                script {
                    // Ensure Minikube is running
                    sh 'minikube start'

                    // Set the Kubernetes context for kubectl
                    sh 'kubectl config use-context $MINIKUBE_CONTEXT'

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
