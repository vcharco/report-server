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

3. Levantar la base de datos (necesario docker y docker-compose instalado y corriendo).

```bash
docker-compose up -d
```

4. Lanzar la aplicación.

```bash
npm run start:dev
```
