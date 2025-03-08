<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# NestJS Report Server

Esta aplicación tiene el objetivo de servir como ejemplo para crear reportes profesionales en NestJS.

## Despliegue en local

1. Clonar el repositorio.

```bash
git clone https://github.com/vcharco/report-server.git
```

2. Acceder al nuevo directorio e instalar las dependencias.

```bash
cd report-server
npm install
```

3. Duplicar el archivo `.env.template`, renombralo a `.env` y configurar las variables. A continuación, un ejemplo:

```text
PORT=3000
DB_NAME=postgres
DB_USER=postgres
DB_PASS=postgres
DB_PORT=5432
DB_HOST=localhost
ENVIRONMENT=dev
```

4. Levantar la base de datos (necesario docker y docker-compose instalado y corriendo).

```bash
docker-compose up -d
```

5. Abrir la base de datos con algún sistema de gestión como TablePlus y ejecutar el sql de `/migrations/reportdb.sql`, el cual contiene queries para crear las tablas y rellenarlas con datos de pruebas.

6. Lanzar la aplicación.

```bash
npm run start:dev
```
