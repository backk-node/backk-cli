sed -i '' "s|^imageRegistry:.*|imageRegistry: $DOCKER_REGISTRY|g" helm/values/values-minikube.yaml
sed -i '' "s|^imageRepository:.*|imageRepository: $DOCKER_REPOSITORY|g" helm/values/values-minikube.yaml

USERNAME=$(whoami)
BRANCH=$(git rev-parse --abbrev-ref HEAD)
sed -i '' "s|^imageTag:.*|imageTag: $USERNAME-$BRANCH|g" helm/values/values-minikube.yaml

helm lint -f helm/values/values-minikube.yaml helm/"$MICROSERVICE_NAME"
