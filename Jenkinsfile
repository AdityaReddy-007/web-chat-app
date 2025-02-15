// pipeline {
//     agent any
//     environment {
//         GITHUB_CREDS = credentials('github-creds')
//         IBM_CLOUD_API_KEY = credentials('ibm-cloud-api-key')
//         IBM_REGISTRY_CREDS = credentials('ibm-container-registry-creds')
//         DOCKER_IMAGE = 'my-app'
//         REGISTRY_URL = 'icr.io/my-chat-namespace'
//     }
//     stages {
//         stage('Checkout') {
//             steps {
//                 git credentialsId: 'github-creds', url: 'https://github.com/AdityaReddy-007/web-chat-app.git', branch: 'main'
//             }
//         }
//         stage('Build Docker Image') {
//             steps {
//                 script {
//                     sh 'docker build -t $REGISTRY_URL/$DOCKER_IMAGE ./client'
//                     sh 'docker build -t $REGISTRY_URL/$DOCKER_IMAGE-backend ./server'
//                 }
//             }
//         }
//         stage('Push Docker Image to IBM Cloud Container Registry') {
//     steps {
//         script {
//             retry(3) {
//                 try {
//                     // Log in to IBM Cloud Container Registry
//                     sh 'echo $IBM_CLOUD_API_KEY | docker login -u iamapikey --password-stdin $REGISTRY_URL'
//                 } catch (Exception e) {
//                     echo "Failed to log in to IBM Cloud Container Registry: ${e}"
//                     throw e
//                 }
//             }
//             // Push Docker images
//             sh 'docker push $REGISTRY_URL/$DOCKER_IMAGE'
//             sh 'docker push $REGISTRY_URL/$DOCKER_IMAGE-backend'
//         }
//     }
// }
//         stage('Test') {
//             steps {
//                 script {
//                     // Use WSL to run npm commands
//                     dir('./tests') {
//                         bat 'npm install' // Install test dependencies using WSL
//                         bat 'npm run test3'    // Run Mocha tests using WSL
//                     }
//                 }
//             }
//         }
//         stage('Deploy with Docker Compose') {
//             steps {
//                 script {
//                     sh 'docker-compose up -d'
//                 }
//             }
//         }
//     }
//     post {
//         success {
//             echo 'Pipeline executed successfully.'
//         }
//         failure {
//             echo 'Pipeline failed. Please check the logs.'
//         }
//     }
// }

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
                        sh '''
                        set -e
                        echo $IBM_CLOUD_API_KEY | docker login -u iamapikey --password-stdin $REGISTRY_URL
                        '''
                    }
                    sh 'docker push $REGISTRY_URL/$DOCKER_IMAGE'
                    sh 'docker push $REGISTRY_URL/$DOCKER_IMAGE-backend'
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    sh 'docker-compose up -d'
                    sleep(10) // Wait for services to initialize
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    dir('./tests') {
                        sh 'npm install'
                        retry(3) { 
                            sh 'curl --fail http://localhost:3000 || exit 1' 
                        }
                        sh 'npm run test3'
                    }
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
