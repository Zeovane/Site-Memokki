const INVENTORY_FILE = 'Invent%C3%A1rio%20Memokki%203D.xlsx';

const PHOTO_GROUPS = {
    boys: ['BTS', 'SEVENTEEN', 'STRAYKIDS', 'ENHYPEN', 'ATEEZ', 'GOT7', 'BOYNEXTDOOR', 'XLOV', 'TXT', 'HUNTRIX'],
    girls: ['TWICE', 'KATSEYE', 'BABYMONSTER', 'HEART2HEART', 'ILLIT', 'BLACKPINK', 'IVE', 'NMIXX', 'aespa', 'unchild']
};

const PHOTOCARD_TEMPLATES = [
    { name: 'Photocard Frente e Verso', subCategory: 'Frente e Verso', price: 3.0 },
    { name: 'Photocard Frente', subCategory: 'Frente', price: 2.5 },
    { name: 'Polaroid', subCategory: 'Polaroid', price: 5.0 }
];

const FALLBACK_PRODUCTS = [
    { name: 'Photoholder Bunny Pink', category: 'K-pop', price: 45.9, label: 'hot', description: 'Colecao especial Kpop.' },
    { name: 'Action Figure Anime Girl', category: 'Outros', price: 189.0, label: 'new', description: 'Colecao especial Kpop.' },
    { name: 'Chaveiro Acrilico K-Group', category: 'K-pop', price: 25.0, description: 'Colecao especial Kpop.' },
    { name: 'Caderno Geek Minimalista', category: 'Outros', price: 32.0, description: 'Colecao especial Kpop.' }
];

const PDF_CATALOG_PRODUCTS = [
    { name: 'Photocard Frente e Verso (20 un)', category: 'Personalizados', price: 3.0, description: 'Preco unitario do catalogo PDF.' },
    { name: 'Photocard Frente e Verso (50 un)', category: 'Personalizados', price: 2.5, description: 'Preco unitario do catalogo PDF.' },
    { name: 'Photocard Frente e Verso (100 un)', category: 'Personalizados', price: 2.0, description: 'Preco unitario do catalogo PDF.' },
    { name: 'Photocard Frente e Verso (150+ un)', category: 'Personalizados', price: 1.5, description: 'Preco unitario do catalogo PDF.' },
    { name: 'Photocard Frente (20 un)', category: 'Personalizados', price: 2.5, description: 'Preco unitario do catalogo PDF.' },
    { name: 'Photocard Frente (50 un)', category: 'Personalizados', price: 2.0, description: 'Preco unitario do catalogo PDF.' },
    { name: 'Photocard Frente (100 un)', category: 'Personalizados', price: 1.5, description: 'Preco unitario do catalogo PDF.' },
    { name: 'Photocard Frente (150+ un)', category: 'Personalizados', price: 1.0, description: 'Preco unitario do catalogo PDF.' },
    { name: 'Polaroid Simples', category: 'Personalizados', price: 3.0, description: 'Fazemos com a foto enviada.' },
    { name: 'Polaroid Especial', category: 'Personalizados', price: 5.0, description: 'Fazemos com a foto enviada.' },
    { name: 'Photoholder Basico', category: 'Acessorios', price: 20.0, description: 'Necessario verificar disponibilidade.' },
    { name: 'Photoholder Decorado', category: 'Acessorios', price: 25.0, description: 'Necessario verificar disponibilidade.' },
    { name: 'Photoholder Premium', category: 'Acessorios', price: 30.0, description: 'Necessario verificar disponibilidade.' },
    { name: 'Chaveiro Decorado', category: 'Acessorios', price: 8.0, description: 'Fazemos com a foto enviada.' },
    { name: 'Chaveiro Comum', category: 'Acessorios', price: 6.0, description: 'Fazemos com a foto enviada.' },
    { name: 'Foto 3x4 para Chaveiro', category: 'Acessorios', price: 1.0, description: 'Opcional para chaveiros personalizados.' },
    { name: 'Adesivo Unitario', category: 'Adesivos', price: 1.0, description: 'Fazemos com a arte enviada.' },
    { name: 'Adesivo Tematico', category: 'Adesivos', price: 2.0, description: 'Modelos K-pop e fandoms.' },
    { name: 'Kit Adesivo Pequeno (7 un)', category: 'Adesivos', price: 5.0, description: 'Preco de pacote promocional.' },
    { name: 'Kit Adesivo Pequeno (15 un)', category: 'Adesivos', price: 10.0, description: 'Preco de pacote promocional.' },
    { name: 'Kit Adesivo Pequeno (30 un)', category: 'Adesivos', price: 20.0, description: 'Preco de pacote promocional.' },
    { name: 'Kit Adesivo Medio (15 un)', category: 'Adesivos', price: 25.0, description: 'Preco de pacote promocional.' },
    { name: 'Kit Adesivo Medio (25 un)', category: 'Adesivos', price: 40.0, description: 'Preco de pacote promocional.' },
    { name: 'Kit Adesivo Medio (50 un)', category: 'Adesivos', price: 60.0, description: 'Preco de pacote promocional.' },
    { name: 'Chaveiro BT21', category: 'K-pop', price: 12.0, description: 'Linha BT21 do catalogo.' },
    { name: 'Clicker BT21', category: 'K-pop', price: 15.0, description: 'Linha BT21 do catalogo.' },
    { name: 'Mini Item BT21', category: 'K-pop', price: 3.0, description: 'Linha BT21 do catalogo.' },
    { name: 'Pulseira Personalizada', category: 'Acessorios', price: 5.0, description: 'Fazemos qualquer nome e cor.' }
];

let products = [];
let shopMainFilters = [];
let shopSubMap = {};
let photoMainFilters = [];
let photoSubMap = {};

const state = {
    activeView: 'home',
    searchTerm: '',
    activeMainFilter: 'Todos',
    selectedSubFilters: [],
    maxPrice: Infinity,
    activePhotoMainFilter: 'Todos',
    selectedPhotoSubFilters: [],
    maxPhotoPrice: Infinity,
    cart: JSON.parse(localStorage.getItem('kpopCart') || '[]'),
    coupon: localStorage.getItem('memokkiCoupon') || '',
    lastView: 'home'
};

// Só exibe o desconto. O valor final precisa ser validado no servidor no checkout.
const COUPONS = { MEMO10: 0.10 };

const elements = {
    navLinks: document.querySelectorAll('.navbar a'),
    featuredGrid: document.querySelector('.product-grid'),
    productGrid: document.querySelector('.products-grid'),
    photocardGrid: document.querySelector('.photocard-grid'),
    shopMainFilters: document.getElementById('shopMainFilters'),
    shopSubFilters: document.getElementById('shopSubFilters'),
    priceRange: document.getElementById('priceRange'),
    priceValue: document.getElementById('priceValue'),
    clearFiltersBtn: document.getElementById('clearFiltersBtn'),
    photoMainFilters: document.getElementById('photoMainFilters'),
    photoSubFilters: document.getElementById('photoSubFilters'),
    photoPriceRange: document.getElementById('photoPriceRange'),
    photoPriceValue: document.getElementById('photoPriceValue'),
    clearPhotoFiltersBtn: document.getElementById('clearPhotoFiltersBtn'),
    cartCount: document.querySelector('.badge-counter'),
    cartList: document.querySelector('.cart-list'),
    cartTotal: document.querySelector('.cart-total'),
    searchInput: document.getElementById('searchInput'),
    searchbar: document.querySelector('.searchbar'),
    searchForm: document.getElementById('searchForm')
};

let currentSlide = 0;
const sliderWrapper = document.getElementById('sliderWrapper');
const sliderDots = document.querySelectorAll('.dot');
const totalSlides = document.querySelectorAll('.slide').length;

function formatCurrency(amount) {
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function toNumber(value) {
    if (typeof value === 'number') return value;
    const text = String(value ?? '').trim().replace('.', '').replace(',', '.');
    const parsed = Number.parseFloat(text);
    return Number.isFinite(parsed) ? parsed : NaN;
}

function toText(value) {
    return String(value ?? '').trim();
}

function slugName(name) {
    return String(name || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

function getProductImageUrl(product) {
    const seed = encodeURIComponent(slugName(product.name) || `produto-${product.id}`);
    return `https://picsum.photos/seed/kpop-${seed}/420/420`;
}

function normalizeCategory(sheetName) {
    if (sheetName === 'BTS') return 'K-pop';
    if (sheetName === 'Outros') return 'Outros';
    return sheetName || 'Outros';
}

function classifySubCategory(productName, category) {
    const name = slugName(productName);
    if (name.includes('photocard')) return 'Photocards';
    if (name.includes('polaroid')) return 'Polaroids';
    if (name.includes('adesivo')) return 'Adesivos';
    if (name.includes('chaveiro')) return 'Chaveiros';
    if (name.includes('clicker')) return 'Clickers';
    if (name.includes('holder')) return 'Photoholders';
    if (name.includes('pulseira')) return 'Pulseiras';
    if (name.includes('caneca')) return 'Canecas';
    return category;
}

function isPhotocardItem(productName, subCategory) {
    const name = slugName(productName);
    return subCategory === 'Photocards' || subCategory === 'Polaroids' || name.includes('photocard') || name.includes('polaroid');
}

function enrichProduct(product) {
    const category = product.category || 'Outros';
    const subCategory = product.subCategory || classifySubCategory(product.name, category);
    const fromPersonalizados = slugName(category) === 'personalizados';
    const photoFlag = Boolean(product.isPhotocard) || isPhotocardItem(product.name, subCategory) || fromPersonalizados;
    return {
        ...product,
        category,
        subCategory,
        isPhotocard: photoFlag,
        onlyPhotocardTab: Boolean(product.onlyPhotocardTab) || fromPersonalizados,
        description: product.description || `Colecao ${category}.`
    };
}

function assignIds(list) {
    return list.map((item, index) => ({ ...item, id: index + 1 }));
}

function mergeProducts(baseProducts, extraProducts) {
    const merged = [];
    const seen = new Set();
    [...baseProducts, ...extraProducts].forEach((product) => {
        const key = slugName(product.name);
        if (!key || seen.has(key)) return;
        seen.add(key);
        merged.push(enrichProduct(product));
    });
    return merged;
}

function buildGroupPhotocardProducts() {
    const allGroups = [...PHOTO_GROUPS.boys, ...PHOTO_GROUPS.girls];
    const generated = [];
    allGroups.forEach((group) => {
        PHOTOCARD_TEMPLATES.forEach((template) => {
            generated.push(enrichProduct({
                name: `${template.name} - ${group}`,
                category: 'Photocards',
                subCategory: group,
                price: template.price,
                group,
                onlyPhotocardTab: true,
                isPhotocard: true,
                description: `Modelo ${template.subCategory} para o grupo ${group}.`
            }));
        });
    });
    return generated;
}

function buildProductsFromSheet(rows, sheetName) {
    const mapped = [];
    const category = normalizeCategory(sheetName);
    rows.slice(1).forEach((row) => {
        const name = toText(row[0]);
        if (!name) return;
        if (name.toLowerCase() === 'total' || name.toLowerCase() === 'encomenda') return;
        const price = toNumber(row[3]);
        if (!Number.isFinite(price) || price <= 0) return;
        const stock = toNumber(row[7]);
        if (Number.isFinite(stock) && stock <= 0) return;
        mapped.push(enrichProduct({
            name,
            category,
            price,
            description: `Colecao ${category}${Number.isFinite(stock) ? ` - Estoque: ${Math.round(stock)}` : ''}.`
        }));
    });
    return mapped;
}

async function loadProductsFromWorkbook() {
    if (typeof XLSX === 'undefined') {
        throw new Error('Biblioteca XLSX indisponivel.');
    }
    const response = await fetch(INVENTORY_FILE);
    if (!response.ok) {
        throw new Error(`Nao foi possivel abrir a planilha (${response.status}).`);
    }

    const buffer = await response.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const sourceSheets = ['BTS', 'Outros'];
    const parsed = [];

    sourceSheets.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) return;
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
        parsed.push(...buildProductsFromSheet(rows, sheetName));
    });

    if (parsed.length === 0) {
        throw new Error('Nenhum produto valido foi encontrado na planilha.');
    }
    return parsed;
}

function saveCart() {
    localStorage.setItem('kpopCart', JSON.stringify(state.cart));
}

function updateCartCount() {
    if (!elements.cartCount) return;
    const totalQuantity = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCount.textContent = totalQuantity;
}

function sanitizeCartItems() {
    const validIds = new Set(products.map((product) => product.id));
    state.cart = state.cart.filter((item) => validIds.has(item.id));
    saveCart();
}

function getShopProducts() {
    return products.filter((product) => !product.onlyPhotocardTab);
}

function getPhotocardProducts() {
    return products.filter((product) => product.isPhotocard);
}

function rebuildFilterStructures() {
    const shopProducts = getShopProducts();
    shopMainFilters = ['Todos', ...new Set(shopProducts.map((product) => product.category))];
    if (!shopMainFilters.includes(state.activeMainFilter)) {
        state.activeMainFilter = 'Todos';
    }

    shopSubMap = {};
    shopMainFilters.forEach((mainFilter) => {
        const subSet = new Set();
        shopProducts.forEach((product) => {
            const fitsMain = mainFilter === 'Todos' || product.category === mainFilter;
            if (fitsMain) subSet.add(product.subCategory);
        });
        shopSubMap[mainFilter] = [...subSet];
    });

    const allowedSubs = new Set(shopSubMap[state.activeMainFilter] || []);
    state.selectedSubFilters = state.selectedSubFilters.filter((item) => allowedSubs.has(item));

    const photocardProducts = getPhotocardProducts();
    photoMainFilters = ['Todos', ...new Set(photocardProducts.map((product) => product.category))];
    if (!photoMainFilters.includes(state.activePhotoMainFilter)) {
        state.activePhotoMainFilter = 'Todos';
    }

    photoSubMap = {};
    photoMainFilters.forEach((mainFilter) => {
        const subSet = new Set();
        photocardProducts.forEach((product) => {
            const fitsMain = mainFilter === 'Todos' || product.category === mainFilter;
            if (fitsMain) subSet.add(product.subCategory);
        });
        photoSubMap[mainFilter] = [...subSet];
    });

    const allowedPhotoSubs = new Set(photoSubMap[state.activePhotoMainFilter] || []);
    state.selectedPhotoSubFilters = state.selectedPhotoSubFilters.filter((item) => allowedPhotoSubs.has(item));
}

function filterShopProducts() {
    return getShopProducts().filter((product) => {
        const mainMatch = state.activeMainFilter === 'Todos' || product.category === state.activeMainFilter;
        const subMatch = state.selectedSubFilters.length === 0 || state.selectedSubFilters.includes(product.subCategory);
        const priceMatch = product.price <= state.maxPrice;
        const query = state.searchTerm.toLowerCase();
        const searchMatch = product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
        return mainMatch && subMatch && priceMatch && searchMatch;
    });
}

function filterPhotocardProducts() {
    return getPhotocardProducts().filter((product) => {
        const mainMatch = state.activePhotoMainFilter === 'Todos' || product.category === state.activePhotoMainFilter;
        const subMatch = state.selectedPhotoSubFilters.length === 0 || state.selectedPhotoSubFilters.includes(product.subCategory);
        const priceMatch = product.price <= state.maxPhotoPrice;
        const query = state.searchTerm.toLowerCase();
        const searchMatch = product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
        return mainMatch && subMatch && priceMatch && searchMatch;
    });
}

function getTagMarkup(product) {
    if (product.label === 'hot') return '<span class="product-tag hot">Mais vendido</span>';
    if (product.label === 'new') return '<span class="product-tag new">Novo</span>';
    return '';
}

function createProductCard(product) {
    const imageUrl = getProductImageUrl(product);
    return `
        <article class="product-card">
            ${getTagMarkup(product)}
            <button class="wish-btn" type="button" aria-label="Favoritar produto">
                <i data-lucide="heart"></i>
            </button>
            <a class="product-image" href="#produto/${product.id}">
                <img src="${imageUrl}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.style.display='none';" />
            </a>
            <h3><a href="#produto/${product.id}">${escapeHtml(product.name)}</a></h3>
            <p class="product-price">${formatCurrency(product.price)}</p>
            <button class="add-round" type="button" onclick="addToCart(${product.id})">Adicionar</button>
        </article>
    `;
}

function renderFeaturedProducts() {
    if (!elements.featuredGrid) return;
    const featured = getShopProducts().slice(0, 4);
    elements.featuredGrid.innerHTML = featured.map(createProductCard).join('');
    lucide.createIcons();
}

function renderShopMainFilters() {
    if (!elements.shopMainFilters) return;
    elements.shopMainFilters.innerHTML = shopMainFilters.map((mainFilter) => {
        const activeClass = mainFilter === state.activeMainFilter ? 'active' : '';
        return `
            <button class="filter-menu-item ${activeClass}" type="button" data-main="${mainFilter}">
                <span>${mainFilter}</span>
                <i data-lucide="chevron-right" size="16"></i>
            </button>
        `;
    }).join('');

    elements.shopMainFilters.querySelectorAll('.filter-menu-item').forEach((button) => {
        button.addEventListener('click', () => {
            state.activeMainFilter = button.dataset.main || 'Todos';
            state.selectedSubFilters = [];
            renderShopMainFilters();
            renderShopSubFilters();
            renderShopProducts();
        });
    });
}

function renderShopSubFilters() {
    if (!elements.shopSubFilters) return;
    const subItems = shopSubMap[state.activeMainFilter] || [];
    if (subItems.length === 0) {
        elements.shopSubFilters.innerHTML = '<p class="filter-sub-title">Sem subcategorias.</p>';
        return;
    }

    elements.shopSubFilters.innerHTML = `
        <p class="filter-sub-title">Subcategoria</p>
        ${subItems.map((sub) => {
            const checked = state.selectedSubFilters.includes(sub) ? 'checked' : '';
            return `
                <label class="filter-checkbox">
                    <input type="checkbox" value="${sub}" ${checked} />
                    <span>${sub}</span>
                </label>
            `;
        }).join('')}
    `;

    elements.shopSubFilters.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const selected = Array.from(elements.shopSubFilters.querySelectorAll('input[type="checkbox"]:checked'))
                .map((input) => input.value);
            state.selectedSubFilters = selected;
            renderShopProducts();
        });
    });
}

function setupPriceFilter() {
    if (!elements.priceRange || !elements.priceValue) return;
    const maxProductPrice = Math.max(...getShopProducts().map((product) => product.price), 0);
    const roundedMax = Math.ceil(maxProductPrice);

    elements.priceRange.min = '0';
    elements.priceRange.max = String(roundedMax);
    if (!Number.isFinite(state.maxPrice) || state.maxPrice > roundedMax) {
        state.maxPrice = roundedMax;
    }
    elements.priceRange.value = String(state.maxPrice);
    elements.priceValue.textContent = formatCurrency(state.maxPrice);

    elements.priceRange.oninput = () => {
        state.maxPrice = Number(elements.priceRange.value);
        elements.priceValue.textContent = formatCurrency(state.maxPrice);
        renderShopProducts();
    };
}

function renderPhotoMainFilters() {
    if (!elements.photoMainFilters) return;
    elements.photoMainFilters.innerHTML = photoMainFilters.map((mainFilter) => {
        const activeClass = mainFilter === state.activePhotoMainFilter ? 'active' : '';
        return `
            <button class="filter-menu-item ${activeClass}" type="button" data-photo-main="${mainFilter}">
                <span>${mainFilter}</span>
                <i data-lucide="chevron-right" size="16"></i>
            </button>
        `;
    }).join('');

    elements.photoMainFilters.querySelectorAll('.filter-menu-item').forEach((button) => {
        button.addEventListener('click', () => {
            state.activePhotoMainFilter = button.dataset.photoMain || 'Todos';
            state.selectedPhotoSubFilters = [];
            renderPhotoMainFilters();
            renderPhotoSubFilters();
            renderPhotocardProducts();
        });
    });
}

function renderPhotoSubFilters() {
    if (!elements.photoSubFilters) return;
    const subItems = photoSubMap[state.activePhotoMainFilter] || [];
    if (subItems.length === 0) {
        elements.photoSubFilters.innerHTML = '<p class="filter-sub-title">Sem subcategorias.</p>';
        return;
    }

    elements.photoSubFilters.innerHTML = `
        <p class="filter-sub-title">Subcategoria</p>
        ${subItems.map((sub) => {
            const checked = state.selectedPhotoSubFilters.includes(sub) ? 'checked' : '';
            return `
                <label class="filter-checkbox">
                    <input type="checkbox" value="${sub}" ${checked} />
                    <span>${sub}</span>
                </label>
            `;
        }).join('')}
    `;

    elements.photoSubFilters.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const selected = Array.from(elements.photoSubFilters.querySelectorAll('input[type="checkbox"]:checked'))
                .map((input) => input.value);
            state.selectedPhotoSubFilters = selected;
            renderPhotocardProducts();
        });
    });
}

function setupPhotoPriceFilter() {
    if (!elements.photoPriceRange || !elements.photoPriceValue) return;
    const maxProductPrice = Math.max(...getPhotocardProducts().map((product) => product.price), 0);
    const roundedMax = Math.ceil(maxProductPrice);

    elements.photoPriceRange.min = '0';
    elements.photoPriceRange.max = String(roundedMax);
    if (!Number.isFinite(state.maxPhotoPrice) || state.maxPhotoPrice > roundedMax) {
        state.maxPhotoPrice = roundedMax;
    }
    elements.photoPriceRange.value = String(state.maxPhotoPrice);
    elements.photoPriceValue.textContent = formatCurrency(state.maxPhotoPrice);

    elements.photoPriceRange.oninput = () => {
        state.maxPhotoPrice = Number(elements.photoPriceRange.value);
        elements.photoPriceValue.textContent = formatCurrency(state.maxPhotoPrice);
        renderPhotocardProducts();
    };
}

function clearShopFilters() {
    state.activeMainFilter = 'Todos';
    state.selectedSubFilters = [];
    state.maxPrice = Math.ceil(Math.max(...getShopProducts().map((product) => product.price), 0));
    renderShopMainFilters();
    renderShopSubFilters();
    setupPriceFilter();
    renderShopProducts();
}

function clearPhotocardFilters() {
    state.activePhotoMainFilter = 'Todos';
    state.selectedPhotoSubFilters = [];
    state.maxPhotoPrice = Math.ceil(Math.max(...getPhotocardProducts().map((product) => product.price), 0));
    renderPhotoMainFilters();
    renderPhotoSubFilters();
    setupPhotoPriceFilter();
    renderPhotocardProducts();
}

function renderShopProducts() {
    if (!elements.productGrid) return;
    const list = filterShopProducts();
    elements.productGrid.innerHTML = list.map(createProductCard).join('');
    if (list.length === 0) {
        elements.productGrid.innerHTML = '<div class="empty-cart"><strong>Nenhum produto encontrado.</strong><p>Use os filtros para refinar a busca.</p></div>';
    }
    lucide.createIcons();
}

function renderPhotocardProducts() {
    if (!elements.photocardGrid) return;
    const list = filterPhotocardProducts();
    elements.photocardGrid.innerHTML = list.map(createProductCard).join('');
    if (list.length === 0) {
        elements.photocardGrid.innerHTML = '<div class="empty-cart"><strong>Nenhum photocard encontrado.</strong><p>Selecione outros grupos para ver resultados.</p></div>';
    }
    lucide.createIcons();
}

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));
}

function findProduct(productId) {
    return products.find((candidate) => candidate.id === productId);
}

function getCartLines() {
    return state.cart
        .map((item) => ({ item, product: findProduct(item.id) }))
        .filter((line) => line.product);
}

function getCartTotals() {
    const subtotal = getCartLines().reduce((sum, { item, product }) => sum + product.price * item.quantity, 0);
    const rate = COUPONS[state.coupon] || 0;
    const discount = subtotal * rate;
    return { subtotal, discount, total: subtotal - discount };
}

function renderCart() {
    if (!elements.cartList) return;
    const lines = getCartLines();

    if (lines.length === 0) {
        elements.cartList.innerHTML = `
            <div class="empty-cart">
                <strong>Seu carrinho está vazio.</strong>
                <p>Que tal começar pelos photocards?</p>
                <button type="button" class="btn btn-primary" onclick="showView('photocards')">Ver photocards</button>
            </div>`;
        return;
    }

    const rows = lines.map(({ item, product }) => `
        <li class="cart-row">
            <a class="cart-thumb" href="#produto/${product.id}">
                <img src="${getProductImageUrl(product)}" alt="" loading="lazy" />
            </a>
            <div class="cart-row-info">
                <a href="#produto/${product.id}" class="cart-row-name">${escapeHtml(product.name)}</a>
                <span class="cart-row-unit">${formatCurrency(product.price)} cada</span>
                <button type="button" class="link-button" onclick="removeFromCart(${product.id})">Remover</button>
            </div>
            <div class="qty-stepper" aria-label="Quantidade">
                <button type="button" onclick="changeQuantity(${product.id}, -1)" aria-label="Diminuir">−</button>
                <span>${item.quantity}</span>
                <button type="button" onclick="changeQuantity(${product.id}, 1)" aria-label="Aumentar">+</button>
            </div>
            <strong class="cart-row-total">${formatCurrency(product.price * item.quantity)}</strong>
        </li>`).join('');

    const { subtotal, discount, total } = getCartTotals();
    const couponLine = state.coupon
        ? `<div class="sum-line discount"><span>Cupom ${escapeHtml(state.coupon)} <button type="button" class="link-button" onclick="removeCoupon()">remover</button></span><span>− ${formatCurrency(discount)}</span></div>`
        : `<form class="coupon-form" onsubmit="applyCoupon(event)">
                <input id="couponInput" type="text" placeholder="Cupom de desconto" autocomplete="off" />
                <button type="submit" class="btn btn-secondary">Aplicar</button>
           </form>
           <p class="coupon-feedback" id="couponFeedback"></p>`;

    elements.cartList.innerHTML = `
        <div class="cart-layout">
            <ul class="cart-items">${rows}</ul>
            <aside class="cart-box">
                <h3>Resumo</h3>
                <div class="sum-line"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
                ${couponLine}
                <div class="sum-line muted"><span>Frete</span><span>Calculado no checkout</span></div>
                <div class="sum-line total"><span>Total</span><strong class="cart-total">${formatCurrency(total)}</strong></div>
                <button type="button" class="btn btn-primary cart-checkout" onclick="goToCheckout()">Finalizar compra</button>
                <button type="button" class="link-button" onclick="showView('shop')">Continuar comprando</button>
            </aside>
        </div>`;
}

function addToCart(productId, quantity = 1) {
    const product = findProduct(productId);
    if (!product) return;
    const existingItem = state.cart.find((item) => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        state.cart.push({ id: productId, quantity });
    }
    saveCart();
    updateCartCount();
    renderCart();
    showToast(`<span>${escapeHtml(product.name)} adicionado.</span><button type="button" onclick="showView('cart')">Ver carrinho</button>`);
}

function changeQuantity(productId, delta) {
    const item = state.cart.find((candidate) => candidate.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    saveCart();
    updateCartCount();
    renderCart();
}

function removeFromCart(productId) {
    state.cart = state.cart.filter((item) => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

function applyCoupon(event) {
    event.preventDefault();
    const input = document.getElementById('couponInput');
    const code = (input?.value || '').trim().toUpperCase();
    if (!COUPONS[code]) {
        const feedback = document.getElementById('couponFeedback');
        if (feedback) feedback.textContent = 'Cupom inválido.';
        return;
    }
    state.coupon = code;
    localStorage.setItem('memokkiCoupon', code);
    renderCart();
}

function removeCoupon() {
    state.coupon = '';
    localStorage.removeItem('memokkiCoupon');
    renderCart();
}

let toastTimer;
function showToast(html) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerHTML = html;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 3500);
}

function renderProductPage(product) {
    const container = document.getElementById('productDetail');
    if (!container) return;

    if (!product) {
        container.innerHTML = `
            <div class="empty-cart">
                <strong>Produto não encontrado.</strong>
                <p>Ele pode ter saído do catálogo.</p>
                <button type="button" class="btn btn-primary" onclick="showView('shop')">Ver a loja</button>
            </div>`;
        return;
    }

    const crumbs = [product.category, product.subCategory].filter(Boolean).map(escapeHtml).join(' / ');
    const related = products
        .filter((candidate) => candidate.id !== product.id && candidate.category === product.category)
        .slice(0, 4);

    container.innerHTML = `
        <div class="product-detail">
            <figure class="pd-media">
                <img src="${getProductImageUrl(product)}" alt="${escapeHtml(product.name)}" />
            </figure>
            <div class="pd-info">
                ${crumbs ? `<p class="pd-crumb">${crumbs}</p>` : ''}
                <h1>${escapeHtml(product.name)}</h1>
                <p class="pd-price">${formatCurrency(product.price)}</p>
                ${product.description ? `<p class="pd-desc">${escapeHtml(product.description)}</p>` : ''}
                <div class="pd-buy">
                    <div class="qty-stepper">
                        <button type="button" onclick="stepProductQuantity(-1)" aria-label="Diminuir">−</button>
                        <span id="pdQty">1</span>
                        <button type="button" onclick="stepProductQuantity(1)" aria-label="Aumentar">+</button>
                    </div>
                    <button type="button" class="btn btn-primary" onclick="addToCart(${product.id}, Number(document.getElementById('pdQty').textContent))">Adicionar ao carrinho</button>
                </div>
                <ul class="pd-notes">
                    <li>Produzido sob encomenda</li>
                    <li>Envio para todo o Brasil</li>
                    <li>Frete calculado no checkout</li>
                </ul>
            </div>
        </div>
        ${related.length ? `
            <div class="section-head pd-related-head"><h2>Você também pode gostar</h2></div>
            <div class="product-grid">${related.map(createProductCard).join('')}</div>` : ''}`;
    lucide.createIcons();
}

function stepProductQuantity(delta) {
    const display = document.getElementById('pdQty');
    if (!display) return;
    display.textContent = Math.max(1, Number(display.textContent) + delta);
}

function openProductFromHash() {
    const match = location.hash.match(/^#produto\/(\d+)$/);
    if (!match) {
        if (state.activeView === 'product') showView(state.lastView || 'shop');
        return;
    }
    renderProductPage(findProduct(Number(match[1])));
    showView('product');
}

function goBack() {
    showView(state.lastView || 'shop');
}

// ---------- Checkout (somente visual: não grava pedido nem cobra) ----------

// Valores de exemplo até integrar o cálculo real de frete.
const SHIPPING_OPTIONS = [
    { id: 'pac', label: 'PAC', detail: '6 a 10 dias úteis após a produção', price: 18.9 },
    { id: 'sedex', label: 'SEDEX', detail: '2 a 4 dias úteis após a produção', price: 32.9 }
];
const MAX_INSTALLMENTS = 3;

const checkout = { shippingId: null };

const MASKS = {
    cep: (digits) => digits.slice(0, 8).replace(/^(\d{5})(\d)/, '$1-$2'),
    cpf: (digits) => digits.slice(0, 11)
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1-$2'),
    phone: (digits) => digits.slice(0, 11)
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,4})$/, '$1-$2'),
    card: (digits) => digits.slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 '),
    exp: (digits) => digits.slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2')
};

function applyMask(event) {
    const input = event.target;
    const mask = MASKS[input.dataset.mask];
    if (!mask) return;
    input.value = mask(input.value.replace(/\D/g, ''));
}

function getShipping() {
    return SHIPPING_OPTIONS.find((option) => option.id === checkout.shippingId) || null;
}

function getCheckoutTotals() {
    const totals = getCartTotals();
    const shipping = getShipping();
    return { ...totals, shipping: shipping ? shipping.price : null, grandTotal: totals.total + (shipping ? shipping.price : 0) };
}

function renderCheckoutSummary() {
    const container = document.getElementById('checkoutSummary');
    if (!container) return;
    const { subtotal, discount, shipping, grandTotal } = getCheckoutTotals();
    const items = getCartLines().map(({ item, product }) => `
        <li>
            <span class="co-sum-thumb"><img src="${getProductImageUrl(product)}" alt="" /><em>${item.quantity}</em></span>
            <span class="co-sum-name">${escapeHtml(product.name)}</span>
            <span>${formatCurrency(product.price * item.quantity)}</span>
        </li>`).join('');

    container.innerHTML = `
        <h3>Seu pedido</h3>
        <ul class="co-sum-items">${items}</ul>
        <div class="sum-line"><span>Subtotal</span><span>${formatCurrency(subtotal)}</span></div>
        ${discount ? `<div class="sum-line discount"><span>Cupom ${escapeHtml(state.coupon)}</span><span>− ${formatCurrency(discount)}</span></div>` : ''}
        <div class="sum-line ${shipping === null ? 'muted' : ''}"><span>Frete</span><span>${shipping === null ? 'Informe o CEP' : formatCurrency(shipping)}</span></div>
        <div class="sum-line total"><span>Total</span><strong>${formatCurrency(grandTotal)}</strong></div>`;
    renderInstallments(grandTotal);
}

function renderInstallments(total) {
    const select = document.getElementById('installments');
    if (!select) return;
    const current = select.value;
    select.innerHTML = Array.from({ length: MAX_INSTALLMENTS }, (_, index) => {
        const count = index + 1;
        return `<option value="${count}">${count}x de ${formatCurrency(total / count)} sem juros</option>`;
    }).join('');
    if (current) select.value = current;
}

function renderShippingOptions() {
    const container = document.getElementById('shippingOptions');
    if (!container) return;
    if (!checkout.shippingId) checkout.shippingId = SHIPPING_OPTIONS[0].id;
    container.innerHTML = SHIPPING_OPTIONS.map((option) => `
        <label class="co-option">
            <input type="radio" name="shipping" value="${option.id}" ${option.id === checkout.shippingId ? 'checked' : ''} required />
            <span class="co-option-body">
                <strong>${option.label}</strong>
                <small>${option.detail}</small>
            </span>
            <span class="co-option-price">${formatCurrency(option.price)}</span>
        </label>`).join('');
    renderCheckoutSummary();
}

async function lookupCep(cep) {
    const hint = document.getElementById('cepHint');
    const setField = (id, value) => {
        const field = document.getElementById(id);
        if (field && value) field.value = value;
    };
    try {
        if (hint) hint.textContent = 'Buscando endereço...';
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) throw new Error('CEP não encontrado');
        setField('coStreet', data.logradouro);
        setField('coDistrict', data.bairro);
        setField('coCity', data.localidade);
        setField('coState', data.uf);
        if (hint) hint.textContent = '';
        document.getElementById('coNumber')?.focus();
    } catch (error) {
        if (hint) hint.textContent = 'Não encontramos esse CEP. Preencha o endereço à mão.';
    }
    renderShippingOptions();
}

function handleCheckoutInput(event) {
    const { target } = event;
    if (target.dataset.mask) applyMask(event);
    if (target.id === 'coCep') {
        const digits = target.value.replace(/\D/g, '');
        if (digits.length === 8) lookupCep(digits);
    }
}

function handleCheckoutChange(event) {
    const { target } = event;
    if (target.name === 'shipping') {
        checkout.shippingId = target.value;
        renderCheckoutSummary();
    }
    if (target.name === 'payment') {
        const cardFields = document.getElementById('cardFields');
        const isCard = target.value === 'card';
        if (cardFields) cardFields.hidden = !isCard;
        cardFields?.querySelectorAll('input').forEach((input) => { input.required = isCard; });
    }
}

function goToCheckout() {
    if (getCartLines().length === 0) {
        showToast('<span>Seu carrinho está vazio.</span>');
        return;
    }
    const emailField = document.getElementById('coEmail');
    const signedEmail = window.firebaseServices?.auth?.currentUser?.email;
    if (emailField && !emailField.value && signedEmail) emailField.value = signedEmail;
    renderCheckoutSummary();
    showView('checkout');
}

function handleCheckoutSubmit(event) {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity() || !getShipping()) {
        form.classList.add('was-validated');
        form.reportValidity();
        return;
    }

    const data = Object.fromEntries(new FormData(form));
    const order = {
        number: `MK-${Date.now().toString(36).toUpperCase().slice(-6)}`,
        lines: getCartLines(),
        totals: getCheckoutTotals(),
        shipping: getShipping(),
        data
    };

    renderConfirmation(order);
    state.cart = [];
    state.coupon = '';
    localStorage.removeItem('memokkiCoupon');
    saveCart();
    updateCartCount();
    renderCart();
    form.reset();
    form.classList.remove('was-validated');
    checkout.shippingId = null;
    document.getElementById('shippingOptions').innerHTML = '<p class="co-empty">Informe o CEP para ver as opções de entrega.</p>';
    document.getElementById('cardFields').hidden = true;
    showView('confirmation');
}

function renderConfirmation(order) {
    const container = document.getElementById('confirmationDetail');
    if (!container) return;
    const { data, totals, shipping } = order;
    const isPix = data.payment === 'pix';
    const address = `${escapeHtml(data.street)}, ${escapeHtml(data.number)}${data.complement ? ` – ${escapeHtml(data.complement)}` : ''}<br>${escapeHtml(data.district)}, ${escapeHtml(data.city)}/${escapeHtml(data.state)}<br>CEP ${escapeHtml(data.cep)}`;
    const items = order.lines.map(({ item, product }) => `
        <li><span>${item.quantity}× ${escapeHtml(product.name)}</span><span>${formatCurrency(product.price * item.quantity)}</span></li>`).join('');

    container.innerHTML = `
        <div class="confirm-head">
            <p class="hero-kicker">Pedido ${order.number}</p>
            <h1>${isPix ? 'Falta só o pagamento.' : 'Pedido recebido!'}</h1>
            <p class="hero-text">Tudo certo, ${escapeHtml(data.name.split(' ')[0])}! ${isPix ? 'Pague o Pix abaixo para a gente começar a produzir.' : 'Assim que o pagamento for aprovado, começamos a produção.'}</p>
        </div>

        <div class="confirm-layout">
            <div class="confirm-main">
                ${isPix ? `
                <div class="pix-box">
                    <div class="pix-qr" aria-hidden="true">QR Code Pix</div>
                    <div>
                        <strong>${formatCurrency(totals.grandTotal)}</strong>
                        <p>Abra o app do seu banco, escolha Pix e escaneie o código, ou copie o código abaixo.</p>
                        <div class="pix-copy">
                            <input type="text" readonly value="Código Pix aparece aqui" aria-label="Código Pix copia e cola" />
                            <button type="button" class="btn btn-secondary" onclick="showToast('<span>Código copiado.</span>')">Copiar</button>
                        </div>
                    </div>
                </div>` : ''}

                <ol class="confirm-steps">
                    <li class="${isPix ? 'current' : 'done'}"><strong>Pagamento</strong><span>${isPix ? 'Aguardando Pix' : 'Em análise'}</span></li>
                    <li><strong>Produção</strong><span>Imprimimos e montamos seu pedido</span></li>
                    <li><strong>Envio</strong><span>Mandamos o código de rastreio no WhatsApp</span></li>
                </ol>
            </div>

            <aside class="cart-box confirm-summary">
                <h3>Resumo</h3>
                <ul class="confirm-items">${items}</ul>
                <div class="sum-line"><span>Frete (${shipping.label})</span><span>${formatCurrency(shipping.price)}</span></div>
                ${totals.discount ? `<div class="sum-line discount"><span>Desconto</span><span>− ${formatCurrency(totals.discount)}</span></div>` : ''}
                <div class="sum-line total"><span>Total</span><strong>${formatCurrency(totals.grandTotal)}</strong></div>
                <div class="confirm-address">
                    <h4>Entrega</h4>
                    <p>${address}</p>
                </div>
                <button type="button" class="btn btn-primary" onclick="showView('home')">Voltar para a loja</button>
            </aside>
        </div>`;
}

const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('input', handleCheckoutInput);
    checkoutForm.addEventListener('change', handleCheckoutChange);
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
}

function showView(viewId) {
    if (viewId !== 'product' && state.activeView !== 'product') state.lastView = state.activeView;
    if (viewId !== 'product' && location.hash.startsWith('#produto/')) {
        history.pushState(null, '', location.pathname + location.search);
    }
    state.activeView = viewId;
    document.querySelectorAll('.page-section').forEach((section) => section.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    elements.navLinks.forEach((link) => link.classList.toggle('active', link.dataset.target === viewId));
}

function toggleSearch() {
    if (!elements.searchbar) return;
    elements.searchbar.classList.toggle('active');
    if (elements.searchbar.classList.contains('active') && elements.searchInput) {
        elements.searchInput.focus();
    }
}

function handleSearch(event) {
    event.preventDefault();
    if (!elements.searchInput) return;
    state.searchTerm = elements.searchInput.value.trim();
    renderShopProducts();
    renderPhotocardProducts();
}

function updateSlider() {
    if (!sliderWrapper) return;
    sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    sliderDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function moveSlider(direction) {
    if (totalSlides === 0) return;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSlider();
}

function jumpToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function renderAll() {
    rebuildFilterStructures();
    sanitizeCartItems();
    renderFeaturedProducts();
    renderShopMainFilters();
    renderShopSubFilters();
    setupPriceFilter();
    renderShopProducts();
    renderPhotoMainFilters();
    renderPhotoSubFilters();
    setupPhotoPriceFilter();
    renderPhotocardProducts();
    renderCart();
    updateCartCount();
}

async function initializeStore() {
    try {
        const workbookProducts = await loadProductsFromWorkbook();
        const merged = mergeProducts(workbookProducts, PDF_CATALOG_PRODUCTS);
        const photoByGroup = buildGroupPhotocardProducts();
        products = assignIds([...merged, ...photoByGroup]);
    } catch (error) {
        console.warn('Falha ao carregar produtos do XLSX. Usando fallback local.', error);
        const merged = mergeProducts(FALLBACK_PRODUCTS, PDF_CATALOG_PRODUCTS);
        const photoByGroup = buildGroupPhotocardProducts();
        products = assignIds([...merged, ...photoByGroup]);
    }

    if (products[0]) products[0].label = 'hot';
    if (products[1]) products[1].label = 'new';
    renderAll();
    openProductFromHash();
}

window.moveSlider = moveSlider;
window.jumpToSlide = jumpToSlide;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeQuantity = changeQuantity;
window.applyCoupon = applyCoupon;
window.removeCoupon = removeCoupon;
window.goToCheckout = goToCheckout;
window.showToast = showToast;
window.stepProductQuantity = stepProductQuantity;
window.goBack = goBack;
window.addEventListener('hashchange', openProductFromHash);
window.showView = showView;
window.toggleSearch = toggleSearch;

lucide.createIcons();

if (elements.searchForm) {
    elements.searchForm.addEventListener('submit', handleSearch);
}

if (elements.clearFiltersBtn) {
    elements.clearFiltersBtn.addEventListener('click', clearShopFilters);
}

if (elements.clearPhotoFiltersBtn) {
    elements.clearPhotoFiltersBtn.addEventListener('click', clearPhotocardFilters);
}

if (!location.hash.startsWith('#produto/')) showView('home');
initializeStore();

if (totalSlides > 1) {
    setInterval(() => moveSlider(1), 5000);
}
