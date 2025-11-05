# PWA Restaurantes y Pizzerías - Especificaciones Técnicas

## Arquitectura de la Aplicación

### Estructura de Archivos
```
/mnt/okcomputer/output/
├── index.html              # Catálogo principal con productos y carrito
├── checkout.html           # Página de pago con métodos argentinos
├── pedidos.html            # Seguimiento de pedidos
├── manifest.json           # Manifiesto PWA
├── sw.js                   # Service Worker para offline
├── main.js                 # Lógica principal de la aplicación
└── resources/              # Recursos multimedia
    ├── pizza-margarita.jpg
    ├── pizza-pepperoni.jpg
    ├── pizza-napolitana.jpg
    ├── empanadas-carne.jpg
    ├── faina.jpg
    └── ...
```

### Tecnologías Implementadas
- **Frontend**: HTML5, CSS3 (Tailwind), JavaScript ES6+
- **PWA Features**: Service Worker, Web App Manifest, Cache API
- **Storage**: LocalStorage para carrito y preferencias
- **UI/UX**: Animaciones con Anime.js, efectos visuales con p5.js
- **Tipografía**: Google Fonts (serif audaz para títulos, sans para body)

## Funcionalidades Principales

### 1. Catálogo de Productos
- **Pizzas**: Margarita, Pepperoni, Napolitana, Cuatro Quesos, Fugazzeta
- **Acompañamientos**: Empanadas, Fainá, Garlic Bread, Ensaladas
- **Bebidas**: Gaseosas, Cervezas, Agua
- **Categorías**: Filtros por tipo de producto
- **Búsqueda**: Búsqueda en tiempo real por nombre

### 2. Carrito de Compras
- **Gestión**: Agregar, quitar, modificar cantidades
- **Persistencia**: Datos guardados en LocalStorage
- **Cálculos**: Subtotal, impuestos, total en tiempo real
- **Validación**: Stock disponible y precios actualizados

### 3. Métodos de Pago Argentinos
- **Mercado Pago**: Integración con botón de pago
- **Transferencia Bancaria**: Datos para transferencia
- **Efectivo**: Pago contra entrega

### 4. Sistema de Pedidos
- **Generación**: Código único de pedido
- **Seguimiento**: Estados del pedido (preparando, en camino, entregado)
- **Notificaciones**: Actualizaciones de estado
- **Historial**: Pedidos anteriores del usuario

## Diseño de Interfaz

### Paleta de Colores
- **Primario**: Rojo tomate (#DC2626)
- **Secundario**: Verde albahaca (#16A34A)
- **Fondo**: Crema suave (#FEF7ED)
- **Texto**: Gris oscuro (#1F2937)
- **Acento**: Dorado (#F59E0B)

### Tipografía
- **Títulos**: Playfair Display (serif audaz)
- **Body**: Inter (sans legible)
- **Precios**: Fuente monoespaciada

### Layout
- **Header**: Logo, navegación, carrito con badge
- **Hero**: Imagen destacada con llamada a acción
- **Productos**: Grid responsivo con cards
- **Footer**: Información de contacto y redes

## Características PWA

### Service Worker
- **Cache**: Estrategia Network First
- **Offline**: Página fallback para modo sin conexión
- **Background Sync**: Sincronización de pedidos pendientes

### Web App Manifest
- **Nombre**: "Pizzería Don Mateo"
- **Íconos**: Generados en múltiples tamaños
- **Display**: Standalone (sin barra de navegación)
- **Theme**: Color consistente con la marca

### Instalación
- **Prompt**: Banner de instalación personalizado
- **Ícono**: En pantalla de inicio
- **Splash**: Pantalla de carga personalizada

## Datos de Productos

### Pizzas (8 variedades)
- Margarita: $2800
- Pepperoni: $3200
- Napolitana: $2900
- Cuatro Quesos: $3400
- Fugazzeta: $3100
- Calabresa: $3000
- Hawaiana: $3300
- Vegetariana: $3150

### Acompañamientos (6 variedades)
- Empanadas de carne (3u): $1200
- Fainá: $800
- Garlic Bread: $1000
- Provoletas: $1500
- Rabas: $1800
- Ensalada Caesar: $1400

### Bebidas (6 variedades)
- Coca Cola 1.5L: $800
- Cerveza Quilmes 1L: $900
- Agua mineral 500ml: $400
- Fanta 1.5L: $800
- Sprite 1.5L: $800
- Vino Malbec: $2200

## Estados del Pedido
1. **Confirmado**: Pedido recibido (5 min)
2. **En Preparación**: Cocina trabajando (15-20 min)
3. **En Camino**: Delivery en ruta (10-15 min)
4. **Entregado**: Pedido completado

## Seguridad y Rendimiento
- **HTTPS**: Requerido para PWA
- **Validación**: Sanitización de inputs
- **Optimización**: Imágenes comprimidas
- **Lazy Loading**: Carga progresiva de contenido