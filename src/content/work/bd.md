---
title: ✨Conest | Proyecto Final BD✨
publishDate: 2020-03-02 00:00:00
img: /assets/p8.png
img_alt: Iridescent ripples of a bright blue and pink liquid
description: |
  CONEST. Proyecto de aplicación de control docente de Bases de Datos en Java Swing y PostgreSQL
tags:
  - Java
  - PostgreSql
  - JasperSoft
---

<h1 id="conest-proyecto-de-bases-de-datos">CONEST. Proyecto de Bases de Datos</h1>
<p><img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&amp;logo=openjdk&amp;logoColor=white" alt="Java">
<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&amp;logo=postgresql&amp;logoColor=white" alt="Postgres">
<img src="https://img.shields.io/badge/Eclipse-FE7A16.svg?style=for-the-badge&amp;logo=Eclipse&amp;logoColor=white" alt="Eclipse">
<img src="https://img.shields.io/badge/MIT-e63caa?style=for-the-badge&amp;label=License&amp;labelColor=35495E" alt="License"></p>
<h2 id="-descripci-n">✨ Descripción</h2>
<p>Proyecto de curso de la asignatura Bases de Datos de una aplicación para el control docente: CONEST.
La misma permite a los usuarios, según sus roles y privilegios, acceder a ciertas informaciones y funcionalidades.</p>
<h2 id="-tecnolog-as-empleadas">😎 Tecnologías empleadas</h2>
<li><code>Java</code> 1.8</li>
<li><code>Postgres</code> 9.5</li>
<li><code>Java Swing</code></li>
<li><code>FlatLaf</code></li>
<li><code>JasperReports</code></li>
<li><code>Dotenv</code></li>
<li>Biblioteca de componentes personalizada</li>
<h2 id="-descarga-de-la-aplicaci-n">🌌 Descarga de la aplicación</h2>
<p>Para poder descargar el proyecto acceda al <a href="https://github.com/EduardoProfe666/bases-de-datos/releases/latest">siguiente enlace</a></p>
<h2 id="-pasos-para-ejecutar-el-proyecto">💻 Pasos para ejecutar el proyecto</h2>
<blockquote>
<p>[!WARNING]
Se requiere tener instalados Java&gt;=1.8 y Postgres 9.5 para el correcto funcionamiento del proyecto. Puede que se requiere ajustar el <code>Compiler Compliance Level</code> a 1.8 para la ejecución correcta del proyecto en Eclipse</p>
</blockquote>
<li>Instalar la base de datos proporcionada en la carpeta <code>/db/</code> siguiente las indicaciones ahí presentes</li>
<li>Modificar los archivos <code>.env</code> deseados con la información de acceso a la base de datos. Si se requiere ejecutar el <code>.jar</code>, modifique el archivo <code>db.env</code>. Si se requiere ejecutar el proyecto, modifique el archivo <code>src/utils/bd_data/bd_eduardo.env</code>, o cree un nuevo archivo <code>.env</code> en esta ruta y cambie la propiedad <code>ENV_TO_LOAD</code> en la clase <code>src/definitions/LogicDefinitions.java</code></li>
<li>Ejecutar el <code>.jar</code> o ejecutar el proyecto a través de <code>src/init/Main.java</code></li>
<h2 id="-splashscreen-y-login">👾 SplashScreen y Login</h2>
<blockquote>
<p>SplashScreen</p>
<p><img src="/assets/1.png" alt="1"></p>
<br>
<p>Login</p>
<p><img src="/assets/2.png" alt="1"></p>
</blockquote>
<h2 id="-roles-y-privilegios">💫 Roles y Privilegios</h2>
<h3 id="-administrador">🕵 Administrador</h3>
<p>Superusuario que puede crear otros usuarios.</p>
<h4 id="-capturas-de-pantalla">🖼 Capturas de pantalla</h4>
<blockquote>
<p>Usuarios</p>
<p><img src="/assets/3.png" alt="1"></p>
</blockquote>
<h3 id="-secretario-docente">💥 Secretario Docente</h3>
<p>Usuario que tiene acceso a toda la información, pudiendo crear, editar y eliminar. Las principales funcionalidades son:</p>
<li>Crear y editar estudiantes</li>
<li>Eliminar bajas del sistema</li>
<li>Agregar/Editar las evaluaciones de todos los estudiantes</li>
<li>Ver todas las asignaturas</li>
<li>Ver el escalafón de todos los años y grupos del curso actual</li>
<li>Ver todos los reportes existentes y parametrizarlos.</li>
<h4 id="-capturas-de-pantalla">🖼 Capturas de pantalla</h4>
<blockquote>
<p>Alumnos</p>
<p><img src="/assets/7.png" alt="1"></p>
<br>
<p>Bajas</p>        
<p><img src="/assets/8.png" alt="1"></p>
<br>
<p>Asignaturas</p>
<p><img src="/assets/9.png" alt="1"></p>
<br>
<p>Evaluaciones</p>
<p><img src="/assets/10.png" alt="1"></p>
<br>
<p>Escalafón</p>
<p><img src="/assets/11.png" alt="1"></p>
<br>
<p>Selección de Reportes</p>
<p><img src="/assets/12.png" alt="1"></p>
</blockquote>
<h3 id="-estudiante">🚢 Estudiante</h3>
<p>Usuario que tiene acceso a su información general, sus evaluaciones y el escalafón de su grupo y año, a menos que el mismo sea baja.</p>
<h4 id="-capturas-de-pantalla">🖼 Capturas de pantalla</h4>
<blockquote>
<p>Inicio</p>
<p><img src="/assets/4.png" alt="1"></p>
<br>
<p>Evaluaciones</p>
<p><img src="/assets/5.png" alt="1"></p>
<br>
<p>Escalafón</p>
<p><img src="/assets/6.png" alt="1"></p>
</blockquote>
<h2 id="-cuentas-de-prueba">🤓 Cuentas de prueba</h2>
<p>Si la base de datos contiene los datos de prueba proporcionados, entonces puede acceder a la aplicación a través de las siguientes cuentas:</p>
<li><code>Administrador</code>: <strong>correo -&gt;</strong> <code>admin</code> | <strong>contraseña -&gt;</strong> <code>1234</code></li>
<li><code>Secretario Docente</code>: <strong>correo -&gt;</strong> <code>secretario</code> | <strong>contraseña -&gt;</strong> <code>1234</code></li>
<li><code>Estudiante</code>: <strong>correo -&gt;</strong> <code>estudiante</code> | <strong>contraseña -&gt;</strong> <code>1234</code></li>

