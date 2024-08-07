# Usar la imagen oficial de PHP con Apache
FROM php:8.2-apache

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    libssl-dev \
    openssl \
    && docker-php-ext-install pdo pdo_mysql

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Habilitar mod_rewrite de Apache
RUN a2enmod rewrite

# Copiar el contenido de la aplicación al directorio raíz de Apache
COPY . /var/www/html/

# Establecer el directorio de trabajo
WORKDIR /var/www/html/

# Exponer el puerto 80
EXPOSE 80