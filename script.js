document.addEventListener('DOMContentLoaded', function() {
    // Обновление времени в реальном времени
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }
    
    updateTime();
    setInterval(updateTime, 1000);
    
    // ФИКСИРОВАННЫЙ уровень угрозы (без анимации)
    const threatMeter = document.querySelector('.meter-bar');
    if (threatMeter) {
        const threatValue = document.querySelector('.threat-value');
        
        // Устанавливаем фиксированные значения
        const fixedThreatLevel = 74;
        threatMeter.style.width = fixedThreatLevel + '%';
        if (threatValue) threatValue.textContent = fixedThreatLevel + '%';
        
        // Устанавливаем цвет в зависимости от уровня
        if (fixedThreatLevel > 80) {
            threatMeter.style.background = 'linear-gradient(90deg, #333333, #ff0000)';
        } else if (fixedThreatLevel > 70) {
            threatMeter.style.background = 'linear-gradient(90deg, #333333, #ff9900)';
        } else {
            threatMeter.style.background = 'linear-gradient(90deg, #333333, #666666)';
        }
    }
    
    // Поиск
    const searchInput = document.querySelector('.nav-search input');
    const searchButton = document.querySelector('.nav-search button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            if (searchInput.value.trim()) {
                alert(`Поиск: "${searchInput.value}"\nРезультаты будут отображены в консоли.`);
                console.log(`Поиск выполнен: "${searchInput.value}"`);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                alert(`Поиск: "${this.value}"\nРезультаты будут отображены в консоли.`);
                console.log(`Поиск выполнен: "${this.value}"`);
            }
        });
    }
    
    // Эффект наведения на строки таблицы
    const tableRows = document.querySelectorAll('.data-table tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#1a1a1a';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Плавная прокрутка к разделам
    const tocLinks = document.querySelectorAll('.content-toc a');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Эффект мигания статуса
    const statusIndicator = document.querySelector('.status-indicator');
    if (statusIndicator) {
        setInterval(() => {
            statusIndicator.style.opacity = statusIndicator.style.opacity === '0.5' ? '1' : '0.5';
        }, 1000);
    }
    
    // Генератор новых дел
    const generateBtn = document.getElementById('generate-case');
    const generatedContent = document.getElementById('generated-content');
    
    if (generateBtn && generatedContent) {
        const cases = [
            {
                number: "GK-247-92",
                date: "Новая",
                location: "Подземные туннели",
                description: "Обнаружены следы незаконной деятельности. Требуется расследование."
            },
            {
                number: "GK-247-93",
                date: "Новая",
                location: "Заброшенный завод",
                description: "Подозрительная активность в ночное время. Возможна лаборатория."
            },
            {
                number: "GK-247-94",
                date: "Новая",
                location: "Порт Готэма",
                description: "Контрабанда высокотехнологичного оборудования. Причастны коррумпированные чиновники."
            },
            {
                number: "GK-247-95",
                date: "Новая",
                location: "Университет Готэма",
                description: "Исчезновение профессора биохимии. Возможна связь с новым токсином."
            },
            {
                number: "GK-247-96",
                date: "Новая",
                location: "Финансовый район",
                description: "Кибератака на банковские системы. Следы ведут к известному хакеру."
            }
        ];
        
        generateBtn.addEventListener('click', function() {
            // Очищаем предыдущий контент
            generatedContent.innerHTML = '';
            
            // Выбираем случайное дело
            const randomCase = cases[Math.floor(Math.random() * cases.length)];
            
            // Создаем элемент для нового дела
            const caseElement = document.createElement('div');
            caseElement.className = 'generated-case';
            caseElement.innerHTML = `
                <div><strong>${randomCase.number}</strong> | ${randomCase.date}</div>
                <div><i class="fas fa-map-marker-alt"></i> ${randomCase.location}</div>
                <div>${randomCase.description}</div>
            `;
            
            // Добавляем анимацию
            caseElement.style.opacity = '0';
            caseElement.style.transform = 'translateY(20px)';
            
            generatedContent.appendChild(caseElement);
            
            // Анимация появления
            setTimeout(() => {
                caseElement.style.opacity = '1';
                caseElement.style.transform = 'translateY(0)';
                caseElement.style.transition = 'all 0.5s ease';
            }, 100);
            
            // Добавляем кнопку закрытия
            const closeBtn = document.createElement('button');
            closeBtn.className = 'filter-btn';
            closeBtn.style.marginTop = '10px';
            closeBtn.innerHTML = '<i class="fas fa-times"></i> Удалить дело';
            closeBtn.addEventListener('click', function() {
                caseElement.style.opacity = '0';
                caseElement.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (caseElement.parentNode) {
                        caseElement.remove();
                    }
                }, 500);
            });
            
            caseElement.appendChild(closeBtn);
        });
    }
    
    // ========== СИСТЕМА ДОЖДЯ ==========
    const rainContainer = document.getElementById('rain-container');
    if (rainContainer) {
        let rainIntensity = 30; // Количество капель
        let rainSpeed = 1.5; // Скорость падения
        let wind = 0.3; // Сила ветра
        
        // Создание капель дождя
        function createRaindrop() {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            
            // Случайная позиция
            const startX = Math.random() * 100;
            const startY = -20;
            
            // Случайная скорость
            const speed = 1 + Math.random() * 2;
            const size = 15 + Math.random() * 15;
            const opacity = 0.2 + Math.random() * 0.4;
            
            // Применение стилей
            raindrop.style.left = startX + 'vw';
            raindrop.style.top = startY + 'px';
            raindrop.style.height = size + 'px';
            raindrop.style.opacity = opacity;
            raindrop.style.animationDuration = (speed * rainSpeed) + 's';
            raindrop.style.animationDelay = Math.random() * 2 + 's';
            
            // Добавление ветра
            raindrop.style.transform = `translateX(${wind * 50}px)`;
            
            // Добавление в контейнер
            rainContainer.appendChild(raindrop);
            
            // Создание волны при "падении" капли
            setTimeout(() => {
                createRipple(startX, startY + 100);
            }, speed * rainSpeed * 1000);
            
            // Удаление капли после анимации
            setTimeout(() => {
                if (raindrop.parentNode) {
                    raindrop.remove();
                }
            }, speed * rainSpeed * 1000 + 1000);
            
            return raindrop;
        }
        
        // Создание волн от капель
        function createRipple(x, y) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            
            ripple.style.left = x + 'vw';
            ripple.style.top = y + 'px';
            
            rainContainer.appendChild(ripple);
            
            // Удаление волны после анимации
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        }
        
        // Запуск дождя
        function startRain() {
            // Создаём начальные капли
            for (let i = 0; i < rainIntensity; i++) {
                setTimeout(() => createRaindrop(), i * 100);
            }
            
            // Постоянное создание новых капель
            setInterval(() => {
                if (Math.random() > 0.3) { // 70% шанс создать новую каплю
                    createRaindrop();
                }
            }, 100);
        }
        
        // Контроль интенсивности дождя
        function setRainIntensity(intensity) {
            rainIntensity = intensity;
        }
        
        // Контроль скорости дождя
        function setRainSpeed(speed) {
            rainSpeed = speed;
        }
        
        // Контроль ветра
        function setWind(force) {
            wind = force;
        }
        
        // Старт дождя
        startRain();
        
        // Смена погоды по таймеру (опционально)
        let weatherTimer = setInterval(() => {
            // Случайное изменение интенсивности
            const newIntensity = 20 + Math.random() * 40;
            setRainIntensity(newIntensity);
            
            // Случайное изменение скорости
            const newSpeed = 0.8 + Math.random() * 1.5;
            setRainSpeed(newSpeed);
            
            // Случайное изменение ветра
            const newWind = -0.5 + Math.random() * 1;
            setWind(newWind);
            
            console.log(`Погода изменена: Интенсивность ${Math.round(newIntensity)}%, Скорость x${newSpeed.toFixed(1)}, Ветер ${newWind > 0 ? '+' : ''}${newWind.toFixed(1)}`);
        }, 30000); // Меняем каждые 30 секунд
        
        // Управление дождём через консоль (для разработки)
        window.rainControl = {
            setIntensity: setRainIntensity,
            setSpeed: setRainSpeed,
            setWind: setWind,
            stop: function() {
                clearInterval(weatherTimer);
                rainContainer.innerHTML = '';
            },
            start: function() {
                startRain();
                weatherTimer = setInterval(() => {
                    const newIntensity = 20 + Math.random() * 40;
                    setRainIntensity(newIntensity);
                    const newSpeed = 0.8 + Math.random() * 1.5;
                    setRainSpeed(newSpeed);
                    const newWind = -0.5 + Math.random() * 1;
                    setWind(newWind);
                }, 30000);
            }
        };
        
        // Консольные команды для управления дождём
        console.log('%c🌧️ СИСТЕМА ДОЖДЯ АКТИВИРОВАНА', 'color: #00ffff; font-weight: bold;');
        console.log('%cДоступные команды:', 'color: #cccccc;');
        console.log('%crainControl.setIntensity(50) - установить интенсивность', 'color: #999999;');
        console.log('%crainControl.setSpeed(2) - установить скорость', 'color: #999999;');
        console.log('%crainControl.setWind(0.5) - установить ветер', 'color: #999999;');
        console.log('%crainControl.stop() - остановить дождь', 'color: #999999;');
        console.log('%crainControl.start() - запустить дождь', 'color: #999999;');
    }
    
    // Консольное сообщение
    console.log('%c⚡ GOTHAM KNIGHT DATABASE ⚡', 'font-family: "Orbitron"; font-size: 20px; color: #ffffff; text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);');
    console.log('%cСистема активна. Уровень безопасности: МАКСИМУМ', 'color: #00ff00; font-family: "Share Tech Mono";');
    console.log('%cПогодные условия: ДОЖДЬ. Интенсивность: 30%', 'color: #00ffff; font-family: "Share Tech Mono";');
});
// Расширяем существующий скрипт

class GothamArchive {
    constructor() {
        this.systemStatus = 'active';
        this.currentUser = 'DELTA_USER';
        this.encryptionLevel = 'A';
        this.dataVersion = '2.4.7';
        this.lastUpdate = new Date();
        this.activeCases = [];
        this.featuredContent = [];
    }
    
    init() {
        this.setupEventListeners();
        this.loadInitialData();
        this.startSystemChecks();
        this.setupNotifications();
        this.updateSystemInfo();
    }
    
    setupEventListeners() {
        // Поиск
        document.querySelectorAll('.nav-search input').forEach(input => {
            input.addEventListener('keypress', (e) => this.handleSearch(e));
        });
        
        document.querySelectorAll('.nav-search button').forEach(button => {
            button.addEventListener('click', () => this.performSearch());
        });
        
        // Обновление времени
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        
        // Генератор дел
        const generateBtn = document.getElementById('generate-case');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateNewCase());
        }
        
        // Клики по тёмным секциям
        document.querySelectorAll('.dark-section').forEach(section => {
            section.addEventListener('click', (e) => this.toggleDarkSection(e));
        });
        
        // Сохранение состояния
        window.addEventListener('beforeunload', () => this.saveState());
        
        // Офлайн/онлайн статус
        window.addEventListener('online', () => this.handleOnlineStatus());
        window.addEventListener('offline', () => this.handleOfflineStatus());
    }
    
    loadInitialData() {
        // Загрузка активных статей
        this.loadActiveArticles();
        
        // Загрузка последних изменений
        this.loadRecentChanges();
        
        // Загрузка статистики
        this.loadStatistics();
        
        // Загрузка дел для таблицы
        this.loadCasesForTable();
        
        // Проверка обновлений
        this.checkForUpdates();
    }
    
    loadActiveArticles() {
        const articles = [
            {
                title: "Бэтмобиль Mark III",
                edits: 127,
                url: "vehicles.html#batmobile-mk3",
                lastEdit: "2 часа назад"
            },
            {
                title: "Схемы 'Карнавала'",
                edits: 43,
                url: "cases.html#carnival-schemes",
                lastEdit: "5 часов назад"
            },
            {
                title: "Амёбный Город",
                edits: 89,
                url: "locations.html#amoebic-city",
                lastEdit: "вчера"
            },
            {
                title: "Протокол 'Ночная Сова'",
                edits: 56,
                url: "technology.html#night-owl",
                lastEdit: "3 дня назад"
            }
        ];
        
        const container = document.getElementById('activeArticles');
        if (container) {
            container.innerHTML = articles.map(article => `
                <a href="${article.url}" class="article-link">
                    <span class="article-title">${article.title}</span>
                    <span class="article-meta">${article.edits} правок • ${article.lastEdit}</span>
                </a>
            `).join('');
        }
    }
    
    loadRecentChanges() {
        const changes = [
            { time: "23:45", description: "Обновлён отчёт №247-90", user: "Oracle" },
            { time: "22:30", description: "Добавлены новые фотографии", user: "GCPD_Archivist" },
            { time: "21:15", description: "Карта Амёбного Города", user: "BatComputer" },
            { time: "20:00", description: "Исправлены данные по Joker", user: "Alfred" },
            { time: "19:30", description: "Добавлено новое дело", user: "Commissioner" }
        ];
        
        const container = document.getElementById('recentChanges');
        if (container) {
            container.innerHTML = changes.map(change => `
                <div class="change-item">
                    <div class="change-left">
                        <span class="change-time">${change.time}</span>
                        <span class="change-user">${change.user}</span>
                    </div>
                    <span class="change-desc">${change.description}</span>
                </div>
            `).join('');
        }
    }
    
    loadCasesForTable() {
        const cases = [
            {
                number: "GK-247-89",
                date: "25.11.2023",
                location: "Угрюмый пирс",
                status: "closed",
                description: "Ликвидирована сеть по торговле 'Сомной'. Подземная аптека. Шесть задержанных.",
                threat: 65
            },
            {
                number: "GK-247-90",
                date: "23.11.2023",
                location: "Galavan Enterprises",
                status: "closed",
                description: "Вскрыты схемы отмывания средств. Данные сброшены в прокуратуру.",
                threat: 78
            },
            {
                number: "GK-247-91",
                date: "АКТИВНО",
                location: "Амёбный город",
                status: "active",
                description: "Лицо, известное как 'БЕЙН'. Исчезновения носят ритуальный характер.",
                threat: 91
            },
            {
                number: "GK-247-88",
                date: "20.11.2023",
                location: "Промзона",
                status: "closed",
                description: "Задержана банда 'Стражи Ночи'. Изъято оружие.",
                threat: 45
            }
        ];
        
        const tbody = document.getElementById('cases-table-body');
        if (tbody) {
            tbody.innerHTML = cases.map(caseItem => `
                <tr data-threat="${caseItem.threat}" data-status="${caseItem.status}">
                    <td class="case-number">${caseItem.number}</td>
                    <td class="case-date">${caseItem.date}</td>
                    <td class="case-location">${caseItem.location}</td>
                    <td>
                        <span class="status-badge status-${caseItem.status}">
                            ${caseItem.status === 'active' ? 'В РАБОТЕ' : 'ЗАКРЫТО'}
                        </span>
                    </td>
                    <td class="case-desc centered-text">${caseItem.description}</td>
                </tr>
            `).join('');
        }
    }
    
    loadStatistics() {
        const stats = {
            total: 247,
            closed: 198,
            active: 49,
            arrests: 312
        };
        
        document.getElementById('total-cases')?.textContent = stats.total;
        document.getElementById('closed-cases')?.textContent = stats.closed;
        document.getElementById('active-cases')?.textContent = stats.active;
        document.getElementById('arrests')?.textContent = stats.arrests;
    }
    
    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        const dateString = now.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        document.getElementById('current-time')?.textContent = timeString;
        document.getElementById('last-update')?.textContent = `сегодня, ${timeString}`;
    }
    
    handleSearch(e) {
        if (e.key === 'Enter') {
            this.performSearch();
        }
    }
    
    performSearch() {
        const searchInput = document.querySelector('.nav-search input, .mobile-search-container input');
        if (!searchInput) return;
        
        const query = searchInput.value.trim();
        if (!query) {
            this.showNotification('Введите поисковый запрос', 'warning');
            return;
        }
        
        this.showNotification(`Поиск: "${query}"`, 'info');
        
        // Логика поиска
        this.searchDatabase(query);
        
        // Сброс поля
        searchInput.value = '';
        
        // Закрытие мобильного поиска если открыт
        const mobileSearch = document.getElementById('mobileSearch');
        if (mobileSearch?.classList.contains('active')) {
            mobileSearch.classList.remove('active');
            mobileSearch.style.display = 'none';
        }
    }
    
    searchDatabase(query) {
        // Здесь будет логика поиска по всем данным
        console.log(`Поиск в базе данных: "${query}"`);
        
        // В реальном приложении здесь будет запрос к API или поиск по локальной базе
        const results = this.simulateSearch(query);
        
        if (results.length > 0) {
            console.log('Найдено результатов:', results.length);
            this.displaySearchResults(results);
        } else {
            console.log('Результатов не найдено');
            this.showNotification('Ничего не найдено', 'warning');
        }
    }
    
    simulateSearch(query) {
        // Имитация поиска
        const mockResults = [
            { type: 'case', title: 'Дело о Сомне', relevance: 95 },
            { type: 'character', title: 'Джокер', relevance: 85 },
            { type: 'location', title: 'Угрюмый Пирс', relevance: 75 },
            { type: 'article', title: 'Хроники Ночи', relevance: 65 }
        ];
        
        return mockResults.filter(result => 
            result.title.toLowerCase().includes(query.toLowerCase())
        ).sort((a, b) => b.relevance - a.relevance);
    }
    
    displaySearchResults(results) {
        // Создание модального окна с результатами
        const modal = document.createElement('div');
        modal.className = 'search-results-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3><i class="fas fa-search"></i> Результаты поиска</h3>
                <div class="results-list">
                    ${results.map(result => `
                        <div class="result-item">
                            <span class="result-type ${result.type}">${this.getTypeName(result.type)}</span>
                            <span class="result-title">${result.title}</span>
                            <span class="result-relevance">${result.relevance}%</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Закрытие по клику вне
        setTimeout(() => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }, 100);
    }
    
    getTypeName(type) {
        const types = {
            'case': 'Дело',
            'character': 'Персонаж',
            'location': 'Локация',
            'article': 'Статья'
        };
        return types[type] || type;
    }
    
    toggleDarkSection(e) {
        const section = e.currentTarget;
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            section.classList.toggle('expanded');
        } else {
            // На десктопе работает только ховер
        }
    }
    
    generateNewCase() {
        const cases = this.getRandomCases();
        const randomCase = cases[Math.floor(Math.random() * cases.length)];
        
        const generatedContent = document.getElementById('generated-content');
        if (!generatedContent) return;
        
        const caseElement = this.createCaseElement(randomCase);
        generatedContent.prepend(caseElement);
        
        // Анимация появления
        setTimeout(() => {
            caseElement.classList.add('visible');
        }, 10);
        
        // Ограничение количества отображаемых дел
        const allCases = generatedContent.querySelectorAll('.generated-case');
        if (allCases.length > 5) {
            allCases[allCases.length - 1].remove();
        }
        
        // Обновление статистики
        this.updateCaseCount();
        
        this.showNotification('Новое дело сгенерировано', 'success');
    }
    
    getRandomCases() {
        return [
            {
                number: `GK-247-${Math.floor(Math.random() * 50) + 92}`,
                date: new Date().toLocaleDateString('ru-RU'),
                location: "Подземные туннели",
                description: "Обнаружены следы незаконной деятельности. Требуется расследование.",
                threat: Math.floor(Math.random() * 30) + 40
            },
            {
                number: `GK-247-${Math.floor(Math.random() * 50) + 92}`,
                date: new Date().toLocaleDateString('ru-RU'),
                location: "Заброшенный завод",
                description: "Подозрительная активность в ночное время. Возможна лаборатория.",
                threat: Math.floor(Math.random() * 30) + 50
            },
            {
                number: `GK-247-${Math.floor(Math.random() * 50) + 92}`,
                date: new Date().toLocaleDateString('ru-RU'),
                location: "Порт Готэма",
                description: "Контрабанда высокотехнологичного оборудования.",
                threat: Math.floor(Math.random() * 30) + 60
            }
        ];
    }
    
    createCaseElement(caseData) {
        const element = document.createElement('div');
        element.className = 'generated-case';
        element.innerHTML = `
            <div class="case-header">
                <span class="case-number">${caseData.number}</span>
                <span class="case-date">${caseData.date}</span>
                <button class="case-close" aria-label="Удалить дело">&times;</button>
            </div>
            <div class="case-body">
                <div class="case-location">
                    <i class="fas fa-map-marker-alt"></i> ${caseData.location}
                </div>
                <div class="case-description">${caseData.description}</div>
                <div class="case-threat">
                    <div class="threat-label">Угроза:</div>
                    <div class="threat-meter-small">
                        <div class="meter-bar" style="width: ${caseData.threat}%"></div>
                    </div>
                    <div class="threat-value">${caseData.threat}%</div>
                </div>
            </div>
            <div class="case-actions">
                <button class="btn-secondary assign-btn">
                    <i class="fas fa-user-check"></i> Назначить
                </button>
                <button class="btn-primary investigate-btn">
                    <i class="fas fa-search"></i> Расследовать
                </button>
            </div>
        `;
        
        // Добавляем обработчики событий
        element.querySelector('.case-close').addEventListener('click', () => {
            element.classList.add('removing');
            setTimeout(() => element.remove(), 300);
            this.updateCaseCount();
        });
        
        element.querySelector('.assign-btn').addEventListener('click', () => {
            this.showNotification(`Дело ${caseData.number} назначено на вас`, 'info');
        });
        
        element.querySelector('.investigate-btn').addEventListener('click', () => {
            this.showNotification(`Начато расследование ${caseData.number}`, 'success');
        });
        
        return element;
    }
    
    updateCaseCount() {
        const generatedContent = document.getElementById('generated-content');
        if (generatedContent) {
            const count = generatedContent.querySelectorAll('.generated-case').length;
            const counter = document.getElementById('generated-count');
            if (counter) {
                counter.textContent = count;
            }
        }
    }
    
    startSystemChecks() {
        // Проверка состояния системы каждые 30 секунд
        setInterval(() => {
            this.checkSystemHealth();
        }, 30000);
        
        // Обновление уровня угрозы каждые 5 минут
        setInterval(() => {
            this.updateThreatLevel();
        }, 300000);
    }
    
    checkSystemHealth() {
        const indicators = [
            'database',
            'encryption',
            'network',
            'storage',
            'backup'
        ];
        
        let allHealthy = true;
        indicators.forEach(indicator => {
            const healthy = Math.random() > 0.1; // 90% шанс что всё хорошо
            if (!healthy) {
                allHealthy = false;
                this.logSystemIssue(indicator);
            }
        });
        
        if (!allHealthy) {
            this.showNotification('Обнаружены незначительные неполадки системы', 'warning');
        }
    }
    
    logSystemIssue(component) {
        const timestamp = new Date().toISOString();
        console.warn(`[${timestamp}] Проблема с компонентом: ${component}`);
    }
    
    updateThreatLevel() {
        // Имитация изменения уровня угрозы
        const threatMeter = document.querySelector('.meter-bar');
        const threatValue = document.querySelector('.threat-value');
        
        if (threatMeter && threatValue) {
            const current = parseInt(threatValue.textContent);
            const change = Math.floor(Math.random() * 10) - 3; // -3 до +6
            const newValue = Math.max(30, Math.min(95, current + change));
            
            threatMeter.style.width = newValue + '%';
            threatValue.textContent = newValue + '%';
            
            // Обновление цвета в зависимости от уровня
            if (newValue > 80) {
                threatMeter.style.background = 'linear-gradient(90deg, #8b0000, #ff0000)';
                document.getElementById('status-message').textContent = 'Критическая ситуация. Высокая активность преступных элементов.';
            } else if (newValue > 70) {
                threatMeter.style.background = 'linear-gradient(90deg, #cc6600, #ff9900)';
                document.getElementById('status-message').textContent = 'Повышенная угроза. Требуется повышенная бдительность.';
            } else {
                threatMeter.style.background = 'linear-gradient(90deg, #333333, #666666)';
                document.getElementById('status-message').textContent = 'Относительное спокойствие. Ситуация под контролем.';
            }
        }
    }
    
    setupNotifications() {
        this.notificationContainer = document.createElement('div');
        this.notificationContainer.className = 'notifications-container';
        document.body.appendChild(this.notificationContainer);
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                ${this.getNotificationIcon(type)}
            </div>
            <div class="notification-content">${message}</div>
            <button class="notification-close">&times;</button>
        `;
        
        this.notificationContainer.appendChild(notification);
        
        // Автоматическое удаление через 5 секунд
        setTimeout(() => {
            notification.classList.add('fading');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Закрытие по клику
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.add('fading');
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    getNotificationIcon(type) {
        const icons = {
            'info': '<i class="fas fa-info-circle"></i>',
            'success': '<i class="fas fa-check-circle"></i>',
            'warning': '<i class="fas fa-exclamation-triangle"></i>',
            'error': '<i class="fas fa-exclamation-circle"></i>'
        };
        return icons[type] || icons.info;
    }
    
    handleOnlineStatus() {
        this.showNotification('Соединение восстановлено', 'success');
        document.getElementById('system-status-text').textContent = 'СИСТЕМА АКТИВНА';
    }
    
    handleOfflineStatus() {
        this.showNotification('Потеряно соединение. Работа в автономном режиме.', 'warning');
        document.getElementById('system-status-text').textContent = 'АВТОНОМНЫЙ РЕЖИМ';
    }
    
    saveState() {
        const state = {
            lastVisit: new Date().toISOString(),
            generatedCases: this.getGeneratedCasesData(),
            user: this.currentUser
        };
        
        localStorage.setItem('gothamArchiveState', JSON.stringify(state));
    }
    
    getGeneratedCasesData() {
        const cases = [];
        document.querySelectorAll('.generated-case').forEach(caseElement => {
            const number = caseElement.querySelector('.case-number').textContent;
            const description = caseElement.querySelector('.case-description').textContent;
            cases.push({ number, description });
        });
        return cases;
    }
    
    loadState() {
        const savedState = localStorage.getItem('gothamArchiveState');
        if (savedState) {
            const state = JSON.parse(savedState);
            this.restoreGeneratedCases(state.generatedCases);
        }
    }
    
    restoreGeneratedCases(cases) {
        cases.forEach(caseData => {
            // Восстановление сгенерированных дел
        });
    }
    
    checkForUpdates() {
        // Проверка обновлений каждые 10 минут
        setTimeout(() => {
            const hasUpdate = Math.random() > 0.7; // 30% шанс на обновление
            
            if (hasUpdate) {
                this.showNotification('Доступно обновление базы данных', 'info');
            }
        }, 600000);
    }
    
    updateSystemInfo() {
        document.getElementById('system-version')?.textContent = this.dataVersion;
        document.getElementById('encryption-level')?.textContent = this.encryptionLevel;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const archive = new GothamArchive();
    archive.init();
    
    // Глобальные функции для консоли
    window.gothamArchive = archive;
    
    // Консольное приветствие
    console.log(`
%c⚡ GOTHAM KNIGHT DATABASE v${archive.dataVersion} ⚡
%cСистема инициализирована. Уровень безопасности: ${archive.encryptionLevel}
%cДоступные команды: 
%c- gothamArchive.showNotification("Сообщение", "тип")
%c- gothamArchive.generateNewCase()
%c- gothamArchive.updateThreatLevel()
    `, 
    'font-family: "Orbitron"; font-size: 18px; color: #ffffff; text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);',
    'color: #00ff00; font-family: "Share Tech Mono";',
    'color: #cccccc; font-family: "Share Tech Mono";',
    'color: #999999; font-family: "Share Tech Mono";',
    'color: #999999; font-family: "Share Tech Mono";',
    'color: #999999; font-family: "Share Tech Mono";'
    );
});