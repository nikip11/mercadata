SERVICE_NAME=mercadata
HOST_UID=$(shell id -u)
HOST_GID=$(shell id -g)

.PHONY: help
help: Makefile
	@echo "Lista de comandos disponibles para gestionar el contenedor del servicio $(SERVICE_NAME):"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-10s\033[0m %s\n", $$1, $$2}'

.PHONY: up
up: ## Inicia los contenedores
	docker-compose -f docker-compose.dev.yml up

.PHONY: b
b: ## Inicia los contenedores
	docker-compose -f docker-compose.dev.yml run $(SERVICE_NAME) pnpm run build

.PHONY: down
down: ## Detiene y elimina los recursos generados por 'up'
	docker-compose -f docker-compose.dev.yml down

.PHONY: sh
sh: ## Accede al shell del contenedor de la aplicación
	docker-compose -f docker-compose.dev.yml run $(SERVICE_NAME) sh

.PHONY: dbuild
dbuild: ## Construye la imagen de Docker basada en el Dockerfile
	docker-compose -f docker-compose.dev.yml build $(SERVICE_NAME)

.PHONY: build
build: ## Compila el proyecto
	@docker-compose -f docker-compose.dev.yml run --rm $(SERVICE_NAME) pnpm run build

.PHONY: add
add: ## Agrega paquetes con pnpm dentro del contenedor, e.g., make add vue-router@next axios
	@docker-compose -f docker-compose.dev.yml run --rm $(SERVICE_NAME) pnpm i $(filter-out $@,$(MAKECMDGOALS))

.PHONY: create
create:
	docker-compose -f docker-compose.dev.yml run --rm $(SERVICE_NAME) sh -c "\
		pnpm create vite . --template vue-ts && \
		printf \"import { defineConfig } from 'vite';\\n\
		import vue from '@vitejs/plugin-vue';\\n\
		import path from 'path';\\n\\n\
		export default defineConfig({\\n\
		  plugins: [vue()],\\n\
		  resolve: {\\n\
		    alias: {\\n\
		      '@': path.resolve(__dirname, 'src')\\n\
		    }\\n\
		  },\\n\
		  server: {\\n\
		    host: true,\\n\
		    port: 3000\\n\
		  }\\n\
		});\" > vite.config.ts && \
		pnpm add -D eslint @types/node && \
		printf \"{\\n\
		  \\\"compilerOptions\\\": {\\n\
		    \\\"baseUrl\\\": \\\".\\\",\\n\
		    \\\"paths\\\": {\\n\
		      \\\"@/*\\\": [\\\"src/*\\\"]\\n\
		    }\\n\
		  }\\n\
		}\" > tsconfig.json && \
		pnpm add -D eslint-import-resolver-alias && \
		printf \"module.exports = {\\n\
		  settings: {\\n\
		    'import/resolver': {\\n\
		      alias: {\\n\
		        map: [['@', './src']],\\n\
		        extensions: ['.js', '.ts', '.vue']\\n\
		      }\\n\
		    }\\n\
		  }\\n\
		};\" > .eslintrc.cjs && \
		chown -R $(HOST_UID):$(HOST_GID) ."



%:
	@:

.PHONY: prod-build
prod-build: ## Construye la imagen de producción
	docker-compose build

.PHONY: prod-up
prod-up: ## Inicia el contenedor de producción
	docker-compose up -d

.PHONY: prod-down
prod-down: ## Detiene y elimina el contenedor de producción
	docker-compose down

.PHONY: prod-logs
prod-logs: ## Muestra los logs del contenedor de producción
	docker-compose logs -f

.PHONY: default
default: help
