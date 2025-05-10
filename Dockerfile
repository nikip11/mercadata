# Multi-stage build para optimizar el tamaño de la imagen final
# Etapa de compilación
FROM node:18-alpine AS build

# Instalar pnpm
RUN npm install -g pnpm

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY app/package.json app/pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el código fuente
COPY app/ ./

# Compilar la aplicación
RUN pnpm build

# Etapa de producción con Nginx
FROM nginx:stable-alpine

# Copiar la configuración personalizada de Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

# Copiar los archivos de compilación desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Configurar permisos correctos para los archivos en Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Exponer el puerto 80
EXPOSE 80

# Usar usuario no root para mejorar la seguridad
USER nginx

# Iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
