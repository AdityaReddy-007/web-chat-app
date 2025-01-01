pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'web-chat-app'
        IBM_REGISTRY = 'us.icr.io'
        IMAGE_NAME = '$DOCKER_IMAGE'
        IBM_NAMESPACE = 'us.icr.io/my-chat-namespace
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
                    echo 'Running tests for frontend...'
                    // Run frontend tests
                    sh 'cd frontend && npm install && npm test'

                    echo 'Running tests for backend...'
                    // Run backend tests
                    sh 'cd backend && npm install && npm test'
                }
            }
        }

        stage('Push to IBM Cloud Container Registry') {
            steps {
                script {
                    // Log in to IBM Cloud
                    sh 'ibmcloud login --apikey $IBM_CLOUD_API_KEY'

                    // Set the IBM Cloud Container Registry region
                    sh 'ibmcloud target -r us-south'

                    // Log in to Docker registry
                    sh 'ibmcloud cr login'

                    // Tag the Docker image for IBM Cloud Container Registry
                    sh "docker tag $DOCKER_IMAGE $IBM_REGISTRY/$IBM_NAMESPACE/$IMAGE_NAME:latest"

                    // Push the image to IBM Cloud Container Registry
                    sh "docker push $IBM_REGISTRY/$IBM_NAMESPACE/$IMAGE_NAME:latest"
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
