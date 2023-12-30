---
title: 📚Tarea 2 de JS📚
publishDate: 2020-03-02 00:00:00
img: /assets/stock-1.jpg
img_alt: Iridescent ripples of a bright blue and pink liquid
description: |
  Proyecto de la Tarea 2 de Optativa I de JavaScript sobre la gestión de una librería usando el framework progresivo Vue.js para el frontend y JavaScript para el backend
tags:
  - JavaScript
  - Vue
---


<h1 id="tarea-2-de-optativa-i-javascript">Tarea 2 de Optativa I JavaScript</h1>
<p><img src="https://img.shields.io/badge/-JavaScript-35495E?style=for-the-badge&amp;logo=javascript" alt="Javascript">
<img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&amp;logo=vuedotjs&amp;logoColor=4FC08D" alt="Vue">
<img src="https://img.shields.io/badge/MIT-e63caa?style=for-the-badge&amp;label=License&amp;labelColor=35495E" alt="Static Badge"></p>
<h2 id="-enunciado-1-gestor-de-libros-">📚 Enunciado 1 Gestor de Libros:</h2>
<p>Crea una clase &quot;Libro&quot; que tenga propiedades como &quot;título&quot;, &quot;autor&quot; y &quot;año de publicación&quot;.
Luego, implementa funciones que permitan agregar, editar y eliminar libros en una lista de
libros. Además, desarrolla otra función que permita buscar libros por autor.</p>
<h2 id="-descripci-n-del-proyecto">📙 Descripción del proyecto</h2>
<h3 id="-consideraciones-generales">🤔 Consideraciones Generales</h3>
<p>Al libro se le agregaron otros atributos a parte de los básicos dados en la problemática: Publicador, Contenido, Cover (ruta) y Thumbnail (ruta).</p>
<p>Se desarrolló una interfaz de usuario usando el framework progresivo <a href="https://es.vuejs.org/">Vue.js</a>.</p>
<p>Para iniciar el proyecto se usó el comando:</p>
<pre><code class="lang-sh"><span class="hljs-built_in">npm</span> create vue@latest
</code></pre>
<p><br/></p>
<p>Para instalar las dependencias necesarias se empleó el comando:</p>
<pre><code class="lang-sh">npm <span class="hljs-keyword">install</span>
</code></pre>
<p><br/></p>
<p>Para ejecutar e ir probando la visual del proyecto se usó el comando:</p>
<pre><code class="lang-sh">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span>
</code></pre>
<p><br/></p>
<p>Para construir la aplicación se usó el comando:</p>
<pre><code class="lang-sh">npm <span class="hljs-keyword">run</span><span class="bash"> build</span>
</code></pre>
<p>Los archivos resultantes del anterior comando fueron usados para desplegar el proyecto con <a href="https://pages.github.com/">Github Pages</a>.</p>
<h3 id="-estructura-del-proyecto-">🏛️ Estructura del proyecto:</h3>
<p>Se utilizó la siguiente estructura:</p>
<pre><code class="lang-bash">.
├── .vscode/
├── node_modules/
├── public/
|<span class="hljs-string">   ├── backgrounds/
</span>|<span class="hljs-string">   ├── covers/
</span>|<span class="hljs-string">   ├── icons/
</span>|<span class="hljs-string">   └── thumbnails/
├── src/
</span>|<span class="hljs-string">   ├── assets/
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   ├── main.css
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   └── modal.css
</span>|<span class="hljs-string">   ├── code/
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   ├── biblioteca.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   ├── controller.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   ├── inicializacion.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   ├── libro.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   ├── pruebas.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   ├── useEventEmitter.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   └── utilidades.js
</span>|<span class="hljs-string">   ├── components/
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   ├── VAniadirLibro.vue
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   ├── VBarraNavegacion.vue
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   ├── VCarta.vue
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   ├── VEstanteria.vue
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   ├── VEliminarLibro.vue
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   ├── VLibro.vue
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   └── VModificarLibro.vue
</span>|<span class="hljs-string">   ├── App.vue
</span>|<span class="hljs-string">   └── main.js
├── .eslintrc.js
├── .gitignore
├── .prettierrc.json
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js</span>
</code></pre>
<p>Donde:</p>
<table>
<thead>
<tr>
<th style="text-align:left"><strong>Fichero o carpeta</strong></th>
<th style="text-align:left"><strong>Descripción</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>.vscode/</code></td>
<td style="text-align:left">Directorio que contiene archivos de configuración del editor <strong>Visual Studio Code</strong></td>
</tr>
<tr>
<td style="text-align:left"><code>node_modules</code></td>
<td style="text-align:left">Directorio que contiene los paquetes o dependencias instaladas mediante <code>npm</code></td>
</tr>
<tr>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
</tr>
<tr>
<td style="text-align:left"><code>public/</code></td>
<td style="text-align:left">Directorio que contiene los ficheros estáticos del proyecto (imágenes)</td>
</tr>
<tr>
<td style="text-align:left"><code>public/backgrounds/</code></td>
<td style="text-align:left">Directorio que contiene las imágenes de fondo</td>
</tr>
<tr>
<td style="text-align:left"><code>public/covers/</code></td>
<td style="text-align:left">Directorio que contiene las imágenes de las carátulas de los libros</td>
</tr>
<tr>
<td style="text-align:left"><code>public/icons/</code></td>
<td style="text-align:left">Directorio que contiene los iconos usados</td>
</tr>
<tr>
<td style="text-align:left"><code>public/thumbnails/</code></td>
<td style="text-align:left">Directorio que contiene los thumbnails de las imágenes usadas</td>
</tr>
<tr>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
</tr>
<tr>
<td style="text-align:left"><code>src/</code></td>
<td style="text-align:left">Directorio donde se almacena el código fuente del proyecto</td>
</tr>
<tr>
<td style="text-align:left"><code>src/assets</code></td>
<td style="text-align:left">Directorio de archivos estáticos privados usados en el proyecto</td>
</tr>
<tr>
<td style="text-align:left"><code>src/assets/main.css</code></td>
<td style="text-align:left">Fichero de estilos <code>css</code> principal del proyecto</td>
</tr>
<tr>
<td style="text-align:left"><code>src/assets/modal.css</code></td>
<td style="text-align:left">Fichero de estilos <code>css</code> para los ficheros modales</td>
</tr>
<tr>
<td style="text-align:left"><code>src/code/</code></td>
<td style="text-align:left">Directorio que contiene la lógica del proyecto, es decir, los archivos <code>.js</code></td>
</tr>
<tr>
<td style="text-align:left"><code>src/code/biblioteca.js</code></td>
<td style="text-align:left">Fichero <code>.js</code> que contiene la lógica de la biblioteca (listado de libros) y la única instancia de la misma en la aplicación</td>
</tr>
<tr>
<td style="text-align:left"><code>src/code/controller.js</code></td>
<td style="text-align:left">Fichero <code>.js</code> que contiene métodos para vincular la lógica con la interfaz</td>
</tr>
<tr>
<td style="text-align:left"><code>src/code/inicializacion.js</code></td>
<td style="text-align:left">Fichero <code>.js</code> que permite inicializar la aplicación con datos de prueba</td>
</tr>
<tr>
<td style="text-align:left"><code>src/code/libro.js</code></td>
<td style="text-align:left">Fichero <code>.js</code> que contiene la lógica de los libros</td>
</tr>
<tr>
<td style="text-align:left"><code>src/code/pruebas.js</code></td>
<td style="text-align:left">Fichero <code>.js</code> que contiene pruebas por consola de la lógica implementada</td>
</tr>
<tr>
<td style="text-align:left"><code>src/code/useEventEmitter.js</code></td>
<td style="text-align:left">Fichero <code>.js</code> que contiene los métodos para agregar y consumir eventos.</td>
</tr>
<tr>
<td style="text-align:left"><code>src/code/utilidades.js</code></td>
<td style="text-align:left">Fichero <code>.js</code> que contiene las funciones auxiliares implementadas</td>
</tr>
<tr>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
</tr>
<tr>
<td style="text-align:left"><code>src/components/</code></td>
<td style="text-align:left">Directorio que contiene los componentes <code>.vue</code> del proyecto</td>
</tr>
<tr>
<td style="text-align:left"><code>src/components/VAniadirLibro.vue</code></td>
<td style="text-align:left">Fichero <code>.vue</code> con la interfaz de la funcionalidad <strong>Añadir Libro</strong></td>
</tr>
<tr>
<td style="text-align:left"><code>src/components/VBarraNavegacion.vue</code></td>
<td style="text-align:left">Fichero <code>.vue</code> con la interfaz de la funcionalidad <strong>Barra de Navegación</strong>, incluyendo la <strong>Barra de Búsqueda</strong></td>
</tr>
<tr>
<td style="text-align:left"><code>src/components/VCarta.vue</code></td>
<td style="text-align:left">Fichero <code>.vue</code> de la interfaz de la información del libro</td>
</tr>
<tr>
<td style="text-align:left"><code>src/components/VEliminarLibro.vue</code></td>
<td style="text-align:left">Fichero <code>.vue</code> de la funcionalidad de <strong>Eliminar Libro</strong></td>
</tr>
<tr>
<td style="text-align:left"><code>src/components/VEstanteria.vue</code></td>
<td style="text-align:left">Fichero <code>.vue</code> del listado de libros</td>
</tr>
<tr>
<td style="text-align:left"><code>src/components/VLibro.vue</code></td>
<td style="text-align:left">Fichero <code>.vue</code> de cada libro del listado de libros</td>
</tr>
<tr>
<td style="text-align:left"><code>src/components/VModificarLibro.vue</code></td>
<td style="text-align:left">Fichero <code>.vue</code> de la interfaz de <strong>Editar Libro</strong></td>
</tr>
<tr>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
</tr>
<tr>
<td style="text-align:left"><code>src/App.vue</code></td>
<td style="text-align:left">Fichero principal de <code>Vue</code> de la aplicación desarrollada</td>
</tr>
<tr>
<td style="text-align:left"><code>src/main.js</code></td>
<td style="text-align:left">Fichero principal que carga <code>Vue</code> y el proyecto</td>
</tr>
<tr>
<td style="text-align:left"><code>.eslintrc.js</code></td>
<td style="text-align:left">Fichero de configuración del <em>linter</em> de <strong>Javascript</strong> <code>ESLint</code></td>
</tr>
<tr>
<td style="text-align:left"><code>.gitignore</code></td>
<td style="text-align:left">Fichero que indica los archivos que <code>Git</code> debe ignorar al hacer el versionado</td>
</tr>
<tr>
<td style="text-align:left"><code>.prettierrc.json</code></td>
<td style="text-align:left">Fichero de configuración del formateador de código <code>Prettier</code></td>
</tr>
<tr>
<td style="text-align:left"><code>index.html</code></td>
<td style="text-align:left">Fichero <code>HTML</code> principal de la aplicación</td>
</tr>
<tr>
<td style="text-align:left"><code>LICENSE</code></td>
<td style="text-align:left">Manifiesto de la licencia utilizada (<strong>MIT</strong>)</td>
</tr>
<tr>
<td style="text-align:left"><code>package-lock.json</code></td>
<td style="text-align:left">Fichero histórico de versionado de apoyo para <code>package.json</code></td>
</tr>
<tr>
<td style="text-align:left"><code>package.json</code></td>
<td style="text-align:left">Fichero de configuración del proyecto, usando <code>npm</code></td>
</tr>
<tr>
<td style="text-align:left"><code>README.md</code></td>
<td style="text-align:left">Fichero <code>Markdown</code> donde se documenta el proyecto</td>
</tr>
<tr>
<td style="text-align:left"><code>vite.config.js</code></td>
<td style="text-align:left">Fichero de configuración de <code>Vite</code>, automatizador de aplicaciones web <strong>Javascript</strong></td>
</tr>
</tbody>
</table>
<h2 id="-despliegue-en-github-pages-">🚀 Despliegue en Github Pages:</h2>
<p>El proyecto fue desplegado con éxito en Github Pages. Se puede acceder a dicho despliegue a través del <a href="https://eduardoprofe666.github.io/Tarea-2-JS/">siguiente enlace</a></p>
<h2 id="-capturas-de-pantalla">📸 Capturas de pantalla</h2>
<h3 id="pantalla-principal">Pantalla Principal</h3>
<p><img src="/assets/inicio.png" alt="inicio"></p>
<h3 id="buscador">Buscador</h3>
<p><img src="/assets/buscador.png" alt="buscador"></p>
<h3 id="carta-de-libro">Carta de Libro</h3>
<p><img src="/assets/carta.png" alt="carta"></p>
<h3 id="a-adir-libro">Añadir Libro</h3>
<p><img src="/assets/annadir.png" alt="añadir"></p>
<h3 id="modificar-libro">Modificar Libro</h3>
<p><img src="/assets/modificar.png" alt="modificar"></p>
<h3 id="eliminar-libro">Eliminar Libro</h3>
<p><img src="/assets/eliminar.png" alt="eliminar"></p>
<h2 id="-miembros-del-equipo">👥 Miembros del equipo</h2>
<table>
    <tbody>
        <tr>
            <td align="center" valign="top" width="32.28%"><a href="https://github.com/LilyRosa"><img src="https://avatars.githubusercontent.com/u/135471998?v=3?s=100" width="100px;" alt="Lilian Rosa Rojas Rodríguez"/><br /><sub><b>Lilian Rosa Rojas Rodríguez</b></sub></a><br/> </td>
            <td align="center" valign="top" width="32.28%"><a href="https://github.com/Acce117"><img src="https://avatars.githubusercontent.com/u/105556788?v=3?s=100" width="100px;" alt="Ernesto Alejandro Carralero Conde"/><br /><sub><b>Ernesto Alejandro Carralero Conde</b></sub></a><br/> </td>
            <td align="center" valign="top" width="32.28%"><a href="https://github.com/jezeus17"><img src="https://avatars.githubusercontent.com/u/116925902?v=3?s=100" width="100px;" alt="Jesús Manuel Castellanos Reynaldo"/><br /><sub><b>Jesús Manuel Castellanos Reynaldo</b></sub></a><br/> </td>
        </tr>
        <tr>
            <td align="center" valign="top" width="32.28%"><a href="https://github.com/alejandroES10"><img src="https://avatars.githubusercontent.com/u/135449712?v=3?s=100" width="100px;" alt="Alejandro Estrada Suarez"/><br /><sub><b>Alejandro Estrada Suarez</b></sub></a><br/> </td>
            <td align="center" valign="top" width="32.28%"><a href="https://github.com/NeoUroboros"><img src="https://avatars.githubusercontent.com/u/126987083?v=3?s=100" width="100px;" alt="Fabio Ford Campbell"/><br /><sub><b>Fabio Ford Campbell</b></sub></a><br/> </td>
            <td align="center" valign="top" width="32.28%"><a href="https://github.com/EduardoProfe666"><img src="https://avatars.githubusercontent.com/u/119138695?v=3?s=100" width="100px;" alt="Eduardo Alejandro González Martell"/><br /><sub><b>Eduardo Alejandro González Martell</b></sub></a><br/> </td>
        </tr>
    </tbody>
</table>