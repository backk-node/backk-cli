minikube status >/dev/null 2>&1

if [ $? -ne 0 ]; then
  minikube start
fi
