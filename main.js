// Pizzería Don Mateo - Main JavaScript
class PizzeriaApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('pizzeria-cart')) || [];
        this.products = this.initializeProducts();
        this.filteredProducts = [...this.products];
        this.deferredPrompt = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderProducts();
        this.updateCartUI();
        this.setupPWA();
        this.animateElements();
    }
    
    initializeProducts() {
        return [
            // Pizzas
            {
                id: 'pizza-margarita',
                name: 'Pizza Margarita',
                category: 'pizzas',
                price: 2800,
                image: 'https://kimi-web-img.moonshot.cn/img/media.istockphoto.com/2b82ef30d0a8a74b13ea8690792912ad5a7b4cff.jpg',
                description: 'La clásica italiana con tomate, mozzarella y albahaca fresca.',
                ingredients: ['Tomate', 'Mozzarella', 'Albahaca', 'Aceite de oliva']
            },
            {
                id: 'pizza-pepperoni',
                name: 'Pizza Pepperoni',
                category: 'pizzas',
                price: 3200,
                image: 'https://kimi-web-img.moonshot.cn/img/www.foodandwine.com/98dc39b8042a88eb27f7a23c262ad52595ad07e2.jpg',
                description: 'Generosa cantidad de pepperoni con mozzarella derretida.',
                ingredients: ['Pepperoni', 'Mozzarella', 'Salsa de tomate', 'Orégano']
            },
            {
                id: 'pizza-napolitana',
                name: 'Pizza Napolitana',
                category: 'pizzas',
                price: 2900,
                image: 'https://kimi-web-img.moonshot.cn/img/www.fornobravo.com/27c1a6f921d8a6705f3f6b6b38c8db37246de818.jpeg',
                description: 'Auténtica napolitana con anchoas, aceitunas y alcaparras.',
                ingredients: ['Tomate', 'Mozzarella', 'Anchoas', 'Aceitunas', 'Alcaparras']
            },
            {
                id: 'pizza-cuatro-quesos',
                name: 'Pizza Cuatro Quesos',
                category: 'pizzas',
                price: 3400,
                image: 'https://kimi-web-img.moonshot.cn/img/nz.gozney.com/4eb224c0724cce65431e27f6cbf88341734c716d.jpg',
                description: 'Exquisita combinación de mozzarella, gorgonzola, parmesano y provolone.',
                ingredients: ['Mozzarella', 'Gorgonzola', 'Parmesano', 'Provolone', 'Orégano']
            },
            {
                id: 'pizza-fugazzeta',
                name: 'Pizza Fugazzeta',
                category: 'pizzas',
                price: 3100,
                image: 'https://kimi-web-img.moonshot.cn/img/allforpizza.com/b5d86f3dc027fd4dd470736505ddc2888da796ab.jpg',
                description: 'Argentina por excelencia con cebolla caramelizada y queso.',
                ingredients: ['Mozzarella', 'Cebolla', 'Orégano', 'Aceite de oliva']
            },
            {
                id: 'pizza-calabresa',
                name: 'Pizza Calabresa',
                category: 'pizzas',
                price: 3000,
                image: 'https://kimi-web-img.moonshot.cn/img/cdn.pixabay.com/fb192d7b4a657c7c6b072589f612d6b78bc38d24.jpg',
                description: 'Salame calabresa con cebolla y aceitunas negras.',
                ingredients: ['Calabresa', 'Cebolla', 'Aceitunas negras', 'Mozzarella']
            },
            {
                id: 'pizza-hawaiana',
                name: 'Pizza Hawaiana',
                category: 'pizzas',
                price: 3300,
                image: 'https://kimi-web-img.moonshot.cn/img/thumbs.dreamstime.com/09114511d1fc5df2b69c8330bfc6c0f925765fc3.jpg',
                description: 'Pollo, jamón y piña en una combinación tropical.',
                ingredients: ['Jamón', 'Pollo', 'Piña', 'Mozzarella', 'Salsa de tomate']
            },
            {
                id: 'pizza-vegetariana',
                name: 'Pizza Vegetariana',
                category: 'pizzas',
                price: 3150,
                image: 'https://kimi-web-img.moonshot.cn/img/live.staticflickr.com/68203041def656793a8266bf54f1a177a88366e0.jpg',
                description: 'Verduras frescas asadas: berenjena, zapallitos, pimientos.',
                ingredients: ['Berenjena', 'Zapallitos', 'Pimientos', 'Cebolla', 'Mozzarella']
            },
            
            // Acompañamientos
            {
                id: 'empanadas-carne',
                name: 'Empanadas de Carne (3u)',
                category: 'acompanamientos',
                price: 1200,
                image: 'https://kimi-web-img.moonshot.cn/img/129780912.cdn6.editmysite.com/e8ac97e82e85a62cee019ae1d06dae1e3682b4e0.jpeg',
                description: 'Tradicionales empanadas argentinas con carne picante.',
                ingredients: ['Carne picada', 'Cebolla', 'Huevo duro', 'Aceitunas']
            },
            {
                id: 'faina',
                name: 'Fainá',
                category: 'acompanamientos',
                price: 800,
                image: 'https://kimi-web-img.moonshot.cn/img/www.thespruceeats.com/4af757505861f47de3a08cdb99aee4b5f452d5d9.jpg',
                description: 'Clásico garbanzo horneado, perfecto para acompañar pizza.',
                ingredients: ['Harina de garbanzo', 'Agua', 'Aceite de oliva', 'Sal']
            },
            {
                id: 'garlic-bread',
                name: 'Garlic Bread',
                category: 'acompanamientos',
                price: 1000,
                image: 'https://kimi-web-img.moonshot.cn/img/www.allrecipes.com/09d83494711e23f0a7c4a1c72e814a9e1d195d39.jpg',
                description: 'Pan artesanal con ajo, mantequilla y hierbas aromáticas.',
                ingredients: ['Pan baguette', 'Ajo', 'Mantequilla', 'Perejil', 'Orégano']
            },
            {
                id: 'provoletas',
                name: 'Provoletas',
                category: 'acompanamientos',
                price: 1500,
                image: 'https://kimi-web-img.moonshot.cn/img/www.artisanalcheese.com/841b70067695345a8cf342a2818c4dc11cc0cf07.jpg',
                description: 'Queso provolone grillado con tomates secos y orégano.',
                ingredients: ['Provolone', 'Tomates secos', 'Orégano', 'Aceite de oliva']
            },
            {
                id: 'rabas',
                name: 'Rabas',
                category: 'acompanamientos',
                price: 1800,
                image: 'https://kimi-web-img.moonshot.cn/img/blogger.googleusercontent.com/2d1047f69f89d2a974aa424305d0d7dd053a50e5.jpg',
                description: 'Calamares fritos en aceite de oliva con limón.',
                ingredients: ['Calamares', 'Harina', 'Aceite de oliva', 'Limón', 'Sal']
            },
            
            // Bebidas
            {
                id: 'coca-cola',
                name: 'Coca Cola 1.5L',
                category: 'bebidas',
                price: 800,
                image: 'https://kimi-web-img.moonshot.cn/img/cdn.pixabay.com/44d128ca318f7abc6bfc3acc2cda669001567b7a.jpg',
                description: 'La clásica bebida gaseosa perfecta para acompañar.',
                ingredients: ['Agua carbonatada', 'Azúcar', 'Cafeína', 'Saborizantes']
            },
            {
                id: 'cerveza-quilmes',
                name: 'Cerveza Quilmes 1L',
                category: 'bebidas',
                price: 900,
                image: 'https://kimi-web-img.moonshot.cn/img/www.publicdomainpictures.net/38aef50e57289ab50669faa01d590b13677acd48.jpg',
                description: 'Cerveza rubia argentina, ideal para acompañar pizza.',
                ingredients: ['Agua', 'Malta', 'Lúpulo', 'Levadura']
            },
            {
                id: 'agua-mineral',
                name: 'Agua Mineral 500ml',
                category: 'bebidas',
                price: 400,
                image: 'https://kimi-web-img.moonshot.cn/img/food400.com/03b33487c39a89ee2bffa23c13d50a251f1e10fc.jpg',
                description: 'Agua mineral natural sin gas, perfecta para hidratarse.',
                ingredients: ['Agua mineral natural']
            },
            
            // Ofertas especiales
            {
                id: 'oferta-2x1',
                name: 'Oferta 2x1 Martes',
                category: 'ofertas',
                price: 2800,
                image: 'https://kimi-web-img.moonshot.cn/img/media.istockphoto.com/4cf104692d83cc566e810436287eaa7b8e1ae906.jpg',
                description: 'Llevate 2 pizzas clásicas por el precio de 1.',
                ingredients: ['Variedad de pizzas clásicas']
            },
            {
                id: 'combo-familiar',
                name: 'Combo Familiar',
                category: 'ofertas',
                price: 3600,
                image: 'https://kimi-web-img.moonshot.cn/img/cdn.pixabay.com/fb192d7b4a657c7c6b072589f612d6b78bc38d24.jpg',
                description: 'Pizza grande + 2 bebidas de 1.5L.',
                ingredients: ['Pizza a elección', '2 Bebidas 1.5L']
            },
            {
                id: 'combo-noche',
                name: 'Combo Noche',
                category: 'ofertas',
                price: 4200,
                image: 'https://kimi-web-img.moonshot.cn/img/www.publicdomainpictures.net/effbfd0a11768c866230f2a123f3c5d4a13021a7.jpg',
                description: 'Pizza + Cerveza artesanal + Acompañamiento.',
                ingredients: ['Pizza a elección', 'Cerveza artesanal', 'Acompañamiento']
            }
        ];
    }
    
    setupEventListeners() {
        // Cart toggle
        document.getElementById('cart-toggle').addEventListener('click', () => this.toggleCart());
        document.getElementById('cart-close').addEventListener('click', () => this.closeCart());
        document.getElementById('cart-overlay').addEventListener('click', () => this.closeCart());
        
        // Search
        document.getElementById('search-input').addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e.target.dataset.category));
        });
        
        // Install prompt
        document.getElementById('install-dismiss').addEventListener('click', () => this.dismissInstallPrompt());
        document.getElementById('install-accept').addEventListener('click', () => this.acceptInstallPrompt());
        
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    renderProducts() {
        const grid = document.getElementById('products-grid');
        grid.innerHTML = '';
        
        this.filteredProducts.forEach(product => {
            const productCard = this.createProductCard(product);
            grid.appendChild(productCard);
        });
        
        // Animate product cards
        anime({
            targets: '.product-card',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutQuart'
        });
    }
    
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card bg-white rounded-2xl shadow-lg overflow-hidden opacity-0';
        card.innerHTML = `
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" 
                     class="w-full h-48 object-cover" loading="lazy">
                <div class="absolute top-4 right-4">
                    <span class="bg-tomato text-white px-3 py-1 rounded-full text-sm font-bold">
                        $${product.price.toLocaleString()}
                    </span>
                </div>
            </div>
            
            <div class="p-6">
                <h3 class="font-display text-xl font-bold mb-2">${product.name}</h3>
                <p class="text-gray-600 mb-4 text-sm leading-relaxed">${product.description}</p>
                
                <div class="mb-4">
                    <div class="flex flex-wrap gap-1">
                        ${product.ingredients.slice(0, 3).map(ingredient => 
                            `<span class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">${ingredient}</span>`
                        ).join('')}
                        ${product.ingredients.length > 3 ? `<span class="text-gray-500 text-xs">+${product.ingredients.length - 3} más</span>` : ''}
                    </div>
                </div>
                
                <div class="flex gap-2">
                    <button onclick="app.showProductDetails('${product.id}')" 
                            class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                        Ver Detalles
                    </button>
                    <button onclick="app.addToCart('${product.id}')" 
                            class="flex-1 bg-tomato text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors">
                        Agregar
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }
    
    showProductDetails(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
                <div class="relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover rounded-t-2xl">
                    <button onclick="this.closest('.fixed').remove()" 
                            class="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="p-6">
                    <h2 class="font-display text-3xl font-bold mb-2">${product.name}</h2>
                    <p class="text-gray-600 mb-4">${product.description}</p>
                    
                    <div class="mb-4">
                        <h3 class="font-bold mb-2">Ingredientes:</h3>
                        <div class="flex flex-wrap gap-2">
                            ${product.ingredients.map(ingredient => 
                                `<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">${ingredient}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <span class="text-3xl font-bold text-tomato">$${product.price.toLocaleString()}</span>
                        <button onclick="app.addToCart('${product.id}'); this.closest('.fixed').remove();" 
                                class="bg-tomato text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animate modal
        anime({
            targets: modal,
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });
        
        anime({
            targets: modal.querySelector('.bg-white'),
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 400,
            delay: 100,
            easing: 'easeOutBack'
        });
    }
    
    handleSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm))
            );
        }
        
        this.renderProducts();
    }
    
    handleFilter(category) {
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.style.backgroundColor = '';
            btn.style.color = '';
        });
        
        const activeBtn = document.querySelector(`[data-category="${category}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
            activeBtn.style.backgroundColor = '#DC2626';
            activeBtn.style.color = 'white';
        }
        
        // Filter products
        if (category === 'todos') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product => product.category === category);
        }
        
        this.renderProducts();
    }
    
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showAddToCartAnimation();
        
        // Show notification
        this.showNotification(`${product.name} agregado al carrito!`);
    }
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    }
    
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartUI();
            }
        }
    }
    
    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartEmpty = document.getElementById('cart-empty');
        const cartSummary = document.getElementById('cart-summary');
        const cartSubtotal = document.getElementById('cart-subtotal');
        const cartTotal = document.getElementById('cart-total');
        
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Update cart count
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        
        // Show/hide cart sections
        if (this.cart.length === 0) {
            cartEmpty.classList.remove('hidden');
            cartItems.classList.add('hidden');
            cartSummary.classList.add('hidden');
        } else {
            cartEmpty.classList.add('hidden');
            cartItems.classList.remove('hidden');
            cartSummary.classList.remove('hidden');
            
            // Render cart items
            cartItems.innerHTML = this.cart.map(item => `
                <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <img src="${item.image}" alt="${item.name}" 
                         class="w-16 h-16 object-cover rounded-lg">
                    <div class="flex-1">
                        <h4 class="font-bold text-sm">${item.name}</h4>
                        <p class="text-tomato font-bold">$${item.price.toLocaleString()}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="app.updateQuantity('${item.id}', ${item.quantity - 1})" 
                                class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                            </svg>
                        </button>
                        <span class="w-8 text-center font-bold">${item.quantity}</span>
                        <button onclick="app.updateQuantity('${item.id}', ${item.quantity + 1})" 
                                class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                        </button>
                    </div>
                    <button onclick="app.removeFromCart('${item.id}')" 
                            class="text-red-500 hover:text-red-700 p-1">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            `).join('');
            
            // Update totals
            cartSubtotal.textContent = `$${subtotal.toLocaleString()}`;
            cartTotal.textContent = `$${subtotal.toLocaleString()}`;
        }
    }
    
    toggleCart() {
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');
        
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        
        // Animate cart items
        if (sidebar.classList.contains('open')) {
            anime({
                targets: '#cart-items > div',
                opacity: [0, 1],
                translateX: [30, 0],
                delay: anime.stagger(100),
                duration: 400,
                easing: 'easeOutQuart'
            });
        }
    }
    
    closeCart() {
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');
        
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }
    
    showAddToCartAnimation() {
        const cartIcon = document.getElementById('cart-toggle');
        
        anime({
            targets: cartIcon,
            scale: [1, 1.2, 1],
            duration: 400,
            easing: 'easeOutBack'
        });
        
        anime({
            targets: '#cart-count',
            scale: [1, 1.5, 1],
            duration: 400,
            delay: 100,
            easing: 'easeOutBack'
        });
    }
    
    showNotification(message) {
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-tomato text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        anime({
            targets: notification,
            translateX: [100, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuart'
        });
        
        // Animate out and remove
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 100],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuart',
                complete: () => notification.remove()
            });
        }, 3000);
    }
    
    animateElements() {
        // Animate hero elements
        anime({
            targets: '.floating-animation',
            translateY: [-10, 0, -10],
            duration: 3000,
            loop: true,
            easing: 'easeInOutSine'
        });
        
        // Animate filter buttons
        const style = document.createElement('style');
        style.textContent = `
            .filter-btn {
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                font-weight: 500;
                transition: all 0.3s ease;
                border: 2px solid transparent;
            }
            .filter-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
        `;
        document.head.appendChild(style);
    }
    
    setupPWA() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('SW registered:', registration);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        }
        
        // Handle install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            document.getElementById('install-app').classList.remove('hidden');
            document.getElementById('install-prompt').classList.remove('hidden');
        });
        
        // Handle app installed
        window.addEventListener('appinstalled', () => {
            console.log('App installed successfully');
            this.dismissInstallPrompt();
        });
    }
    
    dismissInstallPrompt() {
        document.getElementById('install-app').classList.add('hidden');
        document.getElementById('install-prompt').classList.add('hidden');
        this.deferredPrompt = null;
    }
    
    async acceptInstallPrompt() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            console.log(`User response: ${outcome}`);
            this.dismissInstallPrompt();
        }
    }
    
    saveCart() {
        localStorage.setItem('pizzeria-cart', JSON.stringify(this.cart));
    }
}

// Global functions
function scrollToProducts() {
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}

function showOffers() {
    document.getElementById('ofertas').scrollIntoView({ behavior: 'smooth' });
}

function closeCart() {
    app.closeCart();
}

function addToCart(productId) {
    app.addToCart(productId);
}

// Initialize app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new PizzeriaApp();
});

// Handle page visibility for PWA
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh cart when app becomes visible
        app.updateCartUI();
    }
});