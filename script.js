const INVENTORY_FILE = 'Invent%C3%A1rio%20Memokki%203D.xlsx';

const PHOTO_GROUPS = {
    boys: ['BTS', 'SEVENTEEN', 'STRAY KIDS', 'ENHYPEN', 'ATEEZ', 'GOT7', 'BOYNEXTDOOR', 'XLOV', 'TXT'],
    girls: ['TWICE', 'KATSEYE', 'BABYMONSTER', 'HEART2HEART', 'ILLIT', 'BLACKPINK', 'IVE', 'NMIXX']
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

const state = {
    activeView: 'home',
    searchTerm: '',
    activeMainFilter: 'Todos',
    selectedSubFilters: [],
    maxPrice: Infinity,
    selectedPhotoGroups: [],
    cart: JSON.parse(localStorage.getItem('kpopCart') || '[]')
};

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
    photoBoysFilters: document.getElementById('photoBoysFilters'),
    photoGirlsFilters: document.getElementById('photoGirlsFilters'),
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
                subCategory: template.subCategory,
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
        const groupMatch = state.selectedPhotoGroups.length === 0 || state.selectedPhotoGroups.includes(product.group);
        const query = state.searchTerm.toLowerCase();
        const searchMatch = product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
        return groupMatch && searchMatch;
    });
}

function getTagMarkup(product) {
    if (product.label === 'hot') return '<span class="product-tag hot">HOT</span>';
    if (product.label === 'new') return '<span class="product-tag new">NOVO</span>';
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
            <div class="product-image">
                <img src="${imageUrl}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'; this.parentElement.style.background='#dcdcdc';" />
            </div>
            <h3>${product.name}</h3>
            <p class="product-price">${formatCurrency(product.price)}</p>
            <button class="add-round" type="button" onclick="addToCart(${product.id})" aria-label="Adicionar ao carrinho">
                <i data-lucide="plus"></i>
            </button>
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
        elements.shopSubFilters.innerHTML = '<p class="filter-sub-title">Sem subfiltros disponiveis.</p>';
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

function renderPhotoGroupList(container, groups) {
    if (!container) return;
    container.innerHTML = groups.map((group) => {
        const checked = state.selectedPhotoGroups.includes(group) ? 'checked' : '';
        return `
            <label class="filter-checkbox">
                <input type="checkbox" value="${group}" ${checked} />
                <span>${group}</span>
            </label>
        `;
    }).join('');

    container.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const allChecked = [
                ...Array.from(elements.photoBoysFilters ? elements.photoBoysFilters.querySelectorAll('input[type="checkbox"]:checked') : []),
                ...Array.from(elements.photoGirlsFilters ? elements.photoGirlsFilters.querySelectorAll('input[type="checkbox"]:checked') : [])
            ].map((input) => input.value);
            state.selectedPhotoGroups = allChecked;
            renderPhotocardProducts();
        });
    });
}

function renderPhotocardGroupFilters() {
    renderPhotoGroupList(elements.photoBoysFilters, PHOTO_GROUPS.boys);
    renderPhotoGroupList(elements.photoGirlsFilters, PHOTO_GROUPS.girls);
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
    state.selectedPhotoGroups = [];
    renderPhotocardGroupFilters();
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

function renderCart() {
    if (!elements.cartList || !elements.cartTotal) return;
    const rows = state.cart.map((item) => {
        const product = products.find((candidate) => candidate.id === item.id);
        if (!product) return '';
        return `
            <tr>
                <td>${product.name}</td>
                <td>${formatCurrency(product.price)}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(product.price * item.quantity)}</td>
                <td><button type="button" class="btn btn-secondary" onclick="removeFromCart(${product.id})">Remover</button></td>
            </tr>
        `;
    }).join('');

    if (!rows.trim()) {
        elements.cartList.innerHTML = '<div class="empty-cart"><strong>Seu carrinho esta vazio.</strong><p>Adicione produtos e eles aparecerao aqui.</p></div>';
        elements.cartTotal.textContent = formatCurrency(0);
        return;
    }

    const total = state.cart.reduce((sum, item) => {
        const product = products.find((candidate) => candidate.id === item.id);
        if (!product) return sum;
        return sum + product.price * item.quantity;
    }, 0);

    elements.cartList.innerHTML = `
        <table class="table">
            <thead>
                <tr><th>Produto</th><th>Preco</th><th>Quantidade</th><th>Total</th><th>Acao</th></tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
    elements.cartTotal.textContent = formatCurrency(total);
}

function addToCart(productId) {
    const existingItem = state.cart.find((item) => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({ id: productId, quantity: 1 });
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

function showView(viewId) {
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
    renderPhotocardGroupFilters();
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
}

window.moveSlider = moveSlider;
window.jumpToSlide = jumpToSlide;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
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

showView('home');
initializeStore();

if (totalSlides > 1) {
    setInterval(() => moveSlider(1), 5000);
}
