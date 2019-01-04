.DEFAULT_GOAL := help

## GENERAL ##
OWNER 			= utp
SERVICE_NAME 	= pepe-pwa

## DEPLOY ##
ENV 			?= dev

## RESULT_VARS ##
PROJECT_NAME	         = $(OWNER)-$(ENV)-$(SERVICE_NAME)
export CONTAINER_NAME 	 = $(PROJECT_NAME)_backend
export CONTAINER_DB_NAME = $(PROJECT_NAME)_db
export IMAGE_DEV		 = $(PROJECT_NAME):dev


## Init container Commons ##
build: ## build image to dev: make build
	docker build -f container/dev/Dockerfile -t $(IMAGE_DEV) application

install: ## build image to dev: make install
	make build
	make console a="yarn install"

dist: ## build image to dev: make install
	make console a="rm -rf dist"
	make console a="/application/node_modules/.bin/tsc"

console: ## ejecuta la consola de la imagen node: make console a="param"
	@docker run --rm -t -v ${PWD}/application:/application $(IMAGE_DEV) ${a}

start: ## up docker containers: make up
	docker-compose -f container/docker-compose.yml up -d

stop: ## stop docker containers: make stop
	docker-compose -f container/docker-compose.yml stop

ssh: ## Connect to container for ssh protocol : make ssh
	docker exec -it $(CONTAINER_NAME) sh

stats: ## Connect to container for ssh protocol : make ssh
	docker stats $(CONTAINER_NAME)

log: ## Show container logs make : make log
	#docker-compose -f container/docker-compose.yml logs -f backend
	docker logs -f $(CONTAINER_NAME)

## testing - lint

test: ## test unit make : make test
	@make console a="npm run test"

lint-fix: ## test unit make : make test
	make -s console a="npm run lint-fix"

lint: ## inspect code : make lint-inspect
	@make -s console a="npm run lint"

git-hooks: ## test unit make : make test
	cp -p ${PWD}/application/face/git-hook.sh ${PWD}/.git/hooks/pre-commit

## Tools docker##
docker-kill: ## Execute migrate : make migrate
	docker rm -f $$(docker ps -aq)

docker-rmi-dangling: ## Execute migrate : make migrate
	docker rmi $$(docker images -qf "dangling=true")

## Target Help ##
help:
	@printf "\033[31m%-16s %-59s %s\033[0m\n" "Target" "Help" "Usage"; \
	printf "\033[31m%-16s %-59s %s\033[0m\n" "------" "----" "-----"; \
	grep -hE '^\S+:.*## .*$$' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-16s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'
