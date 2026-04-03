// Elementos principales
const contentFrame = document.getElementById('contentFrame');
const pageTitle = document.getElementById('pageTitle');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const menuButtons = document.querySelectorAll('.menu-btn:not(.dropdown-btn)');
const dropdownBtns = document.querySelectorAll('.dropdown-btn');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const notificationsBtn = document.getElementById('notificationsBtn');
const logoutBtn = document.getElementById('btn-logout');
const mobileBackBtn = document.getElementById('mobileBackBtn');

// Mapeo de páginas a títulos
const pageTitles = {
    'inicio': 'Inicio',
    'calendario': 'Calendario',
    'estudio': 'Área de Estudio',
    'iglesia': 'Mi Vida Espiritual',
    'economia': 'Control Financiero',
    'cuidado-personal': 'Cuidado Personal',
    'comidas': 'Comidas Saludables',
    'familia': 'Familia y Mascota',
    'pareja': 'Pareja',
    'shana': '❤️ SHANA ❤️',
    'recomendaciones': 'Recomendaciones',
    'trabajo': 'Trabajo',
    'amistad': 'Amigos',
    'metas': 'Metas',
    'notas': '📝 Bloc de Notas',
    'diario': '📔 Mi Diario Personal',
};

// Mapeo de páginas a archivos
const pageFiles = {
    'inicio': 'contenido-inicio.html',
    'calendario': 'calendario.html',
    'estudio': 'estudio.html',
    'iglesia': 'iglesia.html',
    'economia': 'economia.html',
    'cuidado-personal': 'cuidado-personal.html',
    'comidas': 'comidas-saludables.html',
    'familia': 'familia.html',
    'pareja': 'pareja.html',
    'shana': 'shana.html',
    'recomendaciones': 'recomendaciones.html',
    'trabajo': 'trabajo.html',
    'amistad': 'amistad.html',
    'metas': 'metas.html',
    'notas': 'notas.html',
    'diario': 'diario.html',
};

// Configurar tema inicial
let currentTheme = localStorage.getItem('theme') || 'light';

// Historial de navegación
let navigationHistory = ['inicio'];
let currentPage = 'inicio';

// Aplicar tema
function applyTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    localStorage.setItem('theme', currentTheme);
}

// Actualizar icono del tema
function updateThemeIcon() {
    if (currentTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeToggle.setAttribute('title', 'Cambiar a modo claro');
    } else {
        themeIcon.className = 'fas fa-moon';
        themeToggle.setAttribute('title', 'Cambiar a modo oscuro');
    }
}

// Funciones del menú lateral
function closeMenu() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
}

function openMenu() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    document.body.style.overflow = 'hidden';
}

function toggleMenu() {
    if (sidebar.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
}

// ===== FUNCIÓN PARA MANEJAR DROPDOWNS =====
function toggleDropdown(btn) {
    const dropdownId = btn.getAttribute('data-dropdown');
    const dropdownMenu = document.getElementById(`dropdown-${dropdownId}`);
    
    if (!dropdownMenu) return;
    
    // Cerrar otros dropdowns abiertos
    dropdownBtns.forEach(otherBtn => {
        if (otherBtn !== btn) {
            const otherId = otherBtn.getAttribute('data-dropdown');
            const otherMenu = document.getElementById(`dropdown-${otherId}`);
            if (otherMenu && otherMenu.classList.contains('show')) {
                otherMenu.classList.remove('show');
                otherBtn.classList.remove('active-dropdown');
            }
        }
    });
    
    // Toggle el dropdown actual
    dropdownMenu.classList.toggle('show');
    btn.classList.toggle('active-dropdown');
}

// ===== FUNCIÓN PARA CAMBIAR DE PÁGINA =====
function changePage(page) {
    // Actualizar todos los botones (incluyendo dropdown items)
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Activar el botón correcto
    const activeBtn = document.querySelector(`[data-page="${page}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Cambiar título
    pageTitle.textContent = pageTitles[page] || 'Página';
    
    // Cargar archivo
    if (pageFiles[page]) {
        contentFrame.src = pageFiles[page];
    }
    
    // Actualizar página actual
    currentPage = page;
    
    // Agregar al historial
    navigationHistory.push(page);
    
    // Cerrar menú en móvil
    if (window.innerWidth <= 992) {
        closeMenu();
    }
}

// ===== EVENT LISTENERS =====

// Dropdown buttons
dropdownBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleDropdown(this);
    });
});

// Regular menu buttons (páginas)
menuButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.getAttribute('data-page');
        changePage(page);
        
        // Cerrar dropdowns al seleccionar una página
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
        dropdownBtns.forEach(btn => {
            btn.classList.remove('active-dropdown');
        });
    });
});

// Botón de retroceso móvil
if (mobileBackBtn) {
    mobileBackBtn.addEventListener('click', () => {
        if (navigationHistory.length > 1) {
            navigationHistory.pop();
            const previousPage = navigationHistory[navigationHistory.length - 1];
            changePage(previousPage);
        }
    });
}

// Toggle menú
menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
});

// Cerrar menú al hacer clic en overlay
sidebarOverlay.addEventListener('click', closeMenu);

// Toggle tema
themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme();
});

// Notificaciones
notificationsBtn.addEventListener('click', () => {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--mauvelous);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideIn 0.3s;
    `;
    notification.innerHTML = `
        <strong><i class="fas fa-bell"></i> Notificaciones</strong>
        <p style="margin-top: 5px;">Tienes 3 notificaciones pendientes</p>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
});

// Logout
logoutBtn.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        const logoutMsg = document.createElement('div');
        logoutMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--white);
            color: var(--text-primary);
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 2000;
            text-align: center;
            border: 2px solid var(--mauvelous);
        `;
        logoutMsg.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--mauvelous); margin-bottom: 15px;"></i>
            <h3>Sesión cerrada</h3>
            <p style="margin: 15px 0;">Hasta pronto</p>
            <button onclick="location.reload()" style="padding: 10px 25px; background: var(--denim); color: white; border: none; border-radius: 25px; cursor: pointer;">OK</button>
        `;
        document.body.appendChild(logoutMsg);
    }
});

// Manejar resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 992) {
            closeMenu();
            document.body.style.overflow = '';
        }
    }, 250);
});

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (sidebar.classList.contains('active') && window.innerWidth <= 992) {
            closeMenu();
        }
        // Cerrar dropdowns con Escape
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
        dropdownBtns.forEach(btn => {
            btn.classList.remove('active-dropdown');
        });
    }
});

// Guardar última página
window.addEventListener('beforeunload', () => {
    localStorage.setItem('lastPage', currentPage);
});

// Cargar última página
function loadLastPage() {
    const lastPage = localStorage.getItem('lastPage');
    if (lastPage && pageFiles[lastPage]) {
        changePage(lastPage);
    } else {
        document.querySelector('[data-page="inicio"]').classList.add('active');
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    
    if (window.innerWidth <= 992) {
        closeMenu();
    }
    
    loadLastPage();
});

// Manejar errores de iframe
if (contentFrame) {
    contentFrame.addEventListener('error', () => {
        console.error('Error al cargar la página');
        contentFrame.src = 'contenido-inicio.html';
    });
}