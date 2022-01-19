helm status "$MICROSERVICE_NAME" >/dev/null 2>&1

if [ $? -eq 0 ]; then
  helm uninstall "$MICROSERVICE_NAME"
fi

helm install -f helm/values/values-minikube.yaml "$MICROSERVICE_NAME" helm/"$MICROSERVICE_NAME"-1.0.0.tgz
