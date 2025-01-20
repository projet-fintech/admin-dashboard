pipeline {
    agent any
    tools {
        nodejs 'Node'
        dockerTool 'Docker'
    }
    environment {
        AWS_REGION = 'eu-west-3'
        ECR_REGISTRY = '329599629502.dkr.ecr.eu-west-3.amazonaws.com'
        IMAGE_NAME = 'frontend_admin_dashboard'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(
                    branches: [[name: '*/main']],
                    extensions: [],
                    userRemoteConfigs: [[credentialsId: 'ser3elah', url: 'https://github.com/projet-fintech/admin-dashboard.git']]
                )
            }
        }
        stage('Prepare Environment Variables') {
            steps {
                script {
                   sh """
                       cp .env-production .env
                       cat .env
                   """
                }
            }
        }
         stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build Frontend') {
            steps {
               sh 'npm run build'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def localImageName = "${IMAGE_NAME}:${BUILD_NUMBER}"
                     sh "docker build --add-host=registry-1.docker.io:8.8.8.8 -t ${localImageName} ."
                }
            }
        }
        stage('Push to ECR') {
            steps {
                script {
                    withCredentials([aws(credentialsId: 'aws-credentials')]) {
                        
                        def awsCredentials = "-e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}"
                        
                        docker.image('amazon/aws-cli').inside("--entrypoint='' ${awsCredentials}") {
                            sh """
                                aws ecr get-login-password --region ${AWS_REGION} > ecr_password.txt
                            """
                        }
                        
                        // Login à ECR
                        sh "cat ecr_password.txt | docker login --username AWS --password-stdin ${ECR_REGISTRY}"
                        sh "rm ecr_password.txt"
                        
                        // Tag et push des images
                        def localImageName = "${IMAGE_NAME}:${BUILD_NUMBER}"
                        def ecrImageLatest = "${ECR_REGISTRY}/${IMAGE_NAME}:latest"
                        def ecrImageVersioned = "${ECR_REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER}"
                        
                        sh """
                            docker tag ${localImageName} ${ecrImageLatest}
                            docker tag ${localImageName} ${ecrImageVersioned}
                            docker push ${ecrImageLatest}
                            docker push ${ecrImageVersioned}
                        """
                    }
                }
            }
        }
        stage('Deploy to EKS') {
            steps {
                script {
                   withCredentials([aws(credentialsId: 'aws-credentials')]) {
                     
                      //Authentification
                        sh """
                            aws eks update-kubeconfig --name main-eks-cluster --region ${AWS_REGION} 
                        """
                       // Déploiement des ressources
                        sh """
                          kubectl apply -f k8s/config-map-admin.yaml
                           kubectl apply -f k8s/frontend-admin-deployment.yaml
                           kubectl apply -f k8s/frontend-admin-service.yaml
                        """
                    }
                }
            }
        }
        stage('Cleanup') {
            steps {
                script {
                    sh """
                        docker rmi ${IMAGE_NAME}:${BUILD_NUMBER} || true
                        docker rmi ${ECR_REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER} || true
                        docker rmi ${ECR_REGISTRY}/${IMAGE_NAME}:latest || true
                    """
                }
            }
        }
    }
    post {
        failure {
            echo 'Pipeline failed! Cleaning up...'
            sh 'rm -f ecr_password.txt || true'
        }
        success {
            echo 'Pipeline succeeded! Image pushed to ECR.'
        }
        always {
            cleanWs()
        }
    }
}
