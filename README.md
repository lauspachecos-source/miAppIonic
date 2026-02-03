Music App - Ionic/Angular
Descripción
Aplicación de música desarrollada con Ionic y Angular usando Standalone Components. Esta app permite la autenticación de usuarios (login y registro), navegación a través de diferentes pantallas (Intro, Home, Menu), y funcionalidades relacionadas con la reproducción de música, como mostrar álbumes, artistas y canciones, y gestionarlas como favoritos.
Tecnologías
•	Ionic Framework
•	Angular
•	Standalone Components
•	Lazy Loading
•	Rutas Hijas
•	Servicios personalizados

Estructura del Proyecto
src/app/
├── guards/
│   ├── intro-guard.ts
│   ├── intro-guard.spec.ts
│   └── login-guard.ts
├── home/
│   ├── home.page.ts
│   ├── home.page.html
│   ├── home.page.scss
│   ├── home.page.spec.ts
│   └── artist.interface.ts
├── intro/
│   ├── intro.page.ts
│   ├── intro.page.html
│   ├── intro.page.scss
│   └── intro.page.spec.ts
├── login/
│   ├── login.page.ts
│   ├── login.page.html
│   ├── login.page.scss
│   └── login.page.spec.ts
├── menu/
│   ├── menu.page.ts
│   ├── menu.page.html
│   ├── menu.page.scss
│   └── menu.page.spec.ts
├── register/
│   ├── register.page.ts
│   ├── register.page.html
│   ├── register.page.scss
│   └── register.page.spec.ts
├── services/
│   ├── auth.ts
│   ├── auth.spec.ts
│   ├── register.ts
│   ├── register.spec.ts
│   ├── storage.ts
│   ├── storage.spec.ts
│   ├── music.ts
│   ├── music.spec.ts
│   └── artistas.json
├── songs-modal/
│   ├── songs-modal.page.ts
│   ├── songs-modal.page.html
│   ├── songs-modal.page.scss
│   └── songs-modal.page.spec.ts
├── app.component.ts
├── app.component.html
├── app.component.scss
├── app.component.spec.ts
└── app.routes.ts

 Funcionalidades Principales
1.	Login:
o	Formulario reactivo con validaciones.
o	Guarda la sesión del usuario en el Storage (isLogged = true).
2.	Intro:
o	Tutorial inicial de la aplicación.
o	Marca como vista la introducción en el Storage (introVisited = true).
3.	Home:
o	Muestra un swiper de álbumes y artistas.
o	Abre un modal con la lista de canciones de un álbum o artista.
o	Muestra un reproductor de música en el pie de página (play/pause, progreso).
4.	Register:
o	Formulario de registro con validación de correos.
o	Guarda los datos del usuario en el Storage.
5.	Menu:
o	Menú lateral con opciones de navegación y logout.
o	Al cerrar sesión, elimina la información de login del Storage.
6.	Songs Modal:
o	Muestra una lista de canciones de un álbum o artista.
o	Permite seleccionar una canción y enviarla al Home.

 Servicios
•	AuthService:
o	Funciones: loginUser(), logout(), isLogged().
o	Utiliza el Storage para manejar el estado de la sesión del usuario.
•	RegisterService:
o	Funciones: Guarda usuarios, valida correos electrónicos.
•	StorageService:
o	Funciones: Guarda información de sesión, visita intro, y usuarios.
o	Almacena los valores: isLogged, introVisited, users.
•	MusicService:
o	Funciones:
	getSongsByAlbum(): Obtiene canciones por álbum.
	getSongsByArtist(): Obtiene canciones por artista.
	getLocalArtist(): Devuelve artistas desde un archivo JSON local.

 Guards
•	IntroGuard:
o	Verifica si el tutorial de intro ha sido visitado (introVisited).
o	Redirige al tutorial si no se ha visitado.
•	LoginGuard:
o	Verifica si el usuario ha iniciado sesión (isLogged).
o	Redirige al login si no está autenticado.

 Arquitectura del Proyecto
La aplicación utiliza Standalone Components en lugar del enfoque tradicional con AppModule. Esto significa que cada página y componente se gestiona de forma independiente y solo importa las dependencias necesarias en el decorador @Component.
La navegación y carga de componentes se gestiona directamente en el archivo app.routes.ts con Lazy Loading y Rutas Hijas.

 Consumo de la API
El proyecto consume datos de una API pública para obtener la información de álbumes, artistas y canciones. La estructura de la API es la siguiente:
Endpoints principales:
•	Artists:
o	GET /artists: Obtiene todos los artistas.
o	GET /artists/:id: Obtiene un artista específico.
•	Albums:
o	GET /albums: Obtiene todos los álbumes.
o	GET /albums/artist/:id: Obtiene los álbumes de un artista.
•	Tracks:
o	GET /tracks: Obtiene todas las canciones.
o	GET /tracks/album/:id: Obtiene canciones de un álbum.
•	Authentication:
o	POST /login: Inicia sesión.
o	POST /signup: Registra un nuevo usuario.
o	DELETE /logout: Cierra sesión.

 Instrucciones de Uso
1.	Clonación del Repositorio
Clona el repositorio en tu máquina local:
2.	git clone https://github.com/usuario/music-app-ionic.git
3.	cd music-app-ionic
4.	Instalación de dependencias
Instala las dependencias del proyecto:
5.	npm install
6.	Ejecutar la aplicación
Para ejecutar la aplicación en un entorno de desarrollo:
7.	ionic serve
8.	Acceder a la API
La aplicación utiliza la API de música, cuyo flujo está detallado en Postman.

•	Conectar la funcionalidad de favoritos con API o almacenamiento local.

 Nota Técnica
Este proyecto ha sido desarrollado para aplicar los conceptos y prácticas de Ionic, Angular, y Standalone Components. Se ha seguido una estructura modular con Lazy Loading, Guards, y Servicios para mantener el código ordenado y escalable.
