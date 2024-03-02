---
title: 📝AicaDocs API and UI📝
publishDate: 2020-03-02 00:00:00
img: /assets/p14.png
img_alt: Iridescent ripples of a bright blue and pink liquid
description: |
  Proyecto de Prácticas I de Sistema de Documentación de Aica+ en Asp.Net 8.0
tags:
  - ASP.NET Core
  - Api
  - Swagger
  - .Net
---

# AicaDocsApi

![C#](https://img.shields.io/badge/c%23-%23239120.svg?style=for-the-badge&logo=csharp&logoColor=white)
![.Net](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white)

Proyecto de Práctica I de Ingeniería Informática.

Se creó un sistema de para el control de la documentación para el Sistema
de Gestión de Calidad de la Empresa Laboratorios Farmacéuticos de AICA+.

Se creó una minimal API en Asp.Net Core 8 cumpliendo con todos los requisitos
capturados.

Se creó una base de datos en `PostgreSql` robusta con dichos requisitos, y para
el almacenamiento de los ficheros se empleó [MinIO](https://min.io/)

## 📖 Problemática

En los Laboratorios Aica se desea llevar un control de la documentación del
Sistema de Gestión de Calidad de la empresa. Esta documentación se organiza
de acuerdo a un alcance, que puede ser Rector (aplica en toda la empresa) o
específico (aplica en una UEB); un proceso, que corresponde con uno de los
procesos definidos en el mapa de procesos de la organización; y un
tipo de documento, que es definido por los especialistas del Área de Calidad.
De estos documentos se conoce el código, título, edición, páginas, fecha
de vigencia y dos archivos asociados, uno en formato pdf y otro en word.
Se desea crear un sistema que permita la creación y visualización de esta
documentación. Para ello, se definen los siguientes requisitos:

- Creación de documentos
- Búsqueda de documentos, con filtros asociados a cada propiedad del documento
- Descargar documentos, donde se especifica que archivo se desea descargar (pdf o word) y un motivo de la descarga

## 🖼️ Modelo físico de la base de datos

![modelo fisico](/assets/modelo.png)

## 📶 Configuración de la conexión a la base de datos

Para poder configurar la conexión a la base de datos en PostgreSQL siga los siguientes pasos:

1. Cree/Actualice en la ruta raíz del proyecto un archivo `appsettings.json`
2. En dicho archivo coloque las siguientes líneas, sustituyendo `INFO` por la información
   correspondiente en cada caso:

```json
}
    (...),
    "ConnectionStrings": {
        "PostgreSQLConnection": "Server=INFO;Port=INFO;Database=INFO;User Id=INFO;password=INFO"
    }
}
```

3. Si no tiene la base de datos de Aica, en la consola escriba el siguiente comando: `dotnet ef database update`.
   Asegúrese que tiene las `Migrations`, si no ejecute antes el comando: `dotnet ef migrations add InitialCreate`

## 📶 Configuración de la conexión a MinIO

> [!IMPORTANT]
> Se debe tener instalado `MinIO Server` y tener configurado el usuario necesario
> con permiso de escritura-lectura y el `bucket` en el cual se almacenarán los datos
> con la estructura de carpetas `/pdf` y `/word`

Para poder configurar la conexión a MinIO siga los siguientes pasos:

1. Cree/Actualice en la ruta raíz del proyecto un archivo `appsettings.json`
2. En dicho archivo coloque las siguientes líneas, sustituyendo `INFO` por la información
   correspondiente en cada caso:

```json
}
    (...),
    "Minio": {
       "Endpoint": "INFO",
       "AccessKey": "INFO",
       "SecretKey": "INFO",
       "Bucket": "INFO"
    }
}
```

Otra posible forma de probar la api es usando el servidor de prueba en la nube de MinIO,
usando los siguientes datos en el archivo `appsettings.json`:

```json
}
    (...),
    "Minio": {
       "Endpoint": "play.min.io",
       "AccessKey": "testuser",
       "SecretKey": "testuser",
       "Bucket": "aica-docs"
    }
}
```

## 🚀 Despliegue

> [!NOTE]
> Estos despliegues son solamente para probar la Api en entornos de despliegue,
> no es para el uso extensivo de la misma.

Se realizó un despliegue de prueba de los 3 servicios básicos de la API:

- Despliegue del servidor Asp.Net en [Render](https://aica-docs.onrender.com/)
- Despliegue de la base de datos en [ElephantSQL](https://api.elephantsql.com/)
- Despliegue del servidor de MinIO en [Railway](https://railway.app/)

## 🎦 AicaDocs UI

Se realizó una prueba en `Razor Pages` para ilustrar como sería un posible escenario
de consumo de la api. La página se encuentra en el [siguiente enlace](https://aica-docs-ui.onrender.com)

## 👥 Autores

<table>
    <tbody>
        <tr>
            <td align="center" valign="top" width="40%"><a href="https://github.com/LilyRosa"><img src="https://avatars.githubusercontent.com/u/135471998?v=3?s=100" width="100px;" alt="Lilian Rosa Rojas Rodríguez"/><br /><sub><b>Lilian Rosa Rojas Rodríguez</b></sub></a><br/> </td>
            <td align="center" valign="top" width="40%"><a href="https://github.com/EduardoProfe666"><img src="https://avatars.githubusercontent.com/u/119138695?v=3?s=100" width="100px;" alt="Eduardo Alejandro González Martell"/><br /><sub><b>Eduardo Alejandro González Martell</b></sub></a><br/> </td>
        </tr>
    </tbody>
</table>

## 👥 Tutores

- Dr. Carlos Ramón López Paz
- Msc. Ana Lilian Infante Abreu

## 👥 Especialistas

<table>
    <tbody>
        <tr>
            <td align="center" valign="top" width="70%"><a href="https://github.com/pedrydev"><img src="https://avatars.githubusercontent.com/u/54073823?v=3?s=100" width="100px;" alt="Ing. Pedro Velázquez Borrero"/><br /><sub><b>Ing. Pedro Velázquez Borrero</b></sub></a><br/> </td>
        </tr>
    </tbody>
</table>
