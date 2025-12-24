class CaseGenerator {
    constructor() {
        this.casesContainer = document.getElementById('generatedCases');
        this.generateBtn = document.getElementById('generateCaseBtn');
        this.clearBtn = document.getElementById('clearCasesBtn');
        this.autoGenerateCheckbox = document.getElementById('autoGenerate');
        
        this.generatedCases = [];
        this.caseNumber = 247; // Начинаем с 247
        
        this.init();
    }
    
    init() {
        if (!this.casesContainer || !this.generateBtn) return;
        
        // Кнопка генерации
        this.generateBtn.addEventListener('click', () => this.generateCase());
        
        // Кнопка очистки
        if (this.clearBtn) {
            this.clearBtn.addEventListener('click', () => this.clearCases());
        }
        
        // Автогенерация
        if (this.autoGenerateCheckbox) {
            this.autoGenerateCheckbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.startAutoGeneration();
                } else {
                    this.stopAutoGeneration();
                }
            });
            
            // Запускаем автогенерацию если включено
            if (this.autoGenerateCheckbox.checked) {
                this.startAutoGeneration();
            }
        }
        
        // Загружаем сохранённые дела
        this.loadSavedCases();
    }
    
    generateCase() {
        this.caseNumber++;
        const caseData = this.createRandomCase();
        
        // Добавляем в массив
        this.generatedCases.push(caseData);
        
        // Рендерим
        this.renderCase(caseData);
        
        // Сохраняем
        this.saveCases();
        
        // Уведомление
        this.showNotification(`Сгенерировано дело: ${caseData.id}`);
    }
    
    createRandomCase() {
        const locations = [
            "Амёбный Город", "Угрюмый Пирс", "Порт Готэма", "Финансовый район",
            "Промзона", "Аркхем Асайлум", "Ботанический сад", "Завод Ace Chemicals",
            "Университет Готэма", "Музей Готэма", "Подземные туннели", "Заброшенный завод"
        ];
        
        const suspects = [
            "БЕЙН", "ДЖОКЕР", "ДВУЛИКИЙ", "ПИНГВИН", "ЗАГАДОЧНИК", "ПУГАЛО",
            "ЯДОВИТЫЙ ПЛЮЩ", "МИСТЕР ФРИЗ", "КОШКА", "РА'С АЛЬ ГУЛ", "ХАРЛИ КВИНН",
            "ЧЕРНАЯ МАСКА", "УБИЙЦА КРОК"
        ];
        
        const caseTypes = [
            "Исчезновение", "Ограбление", "Кибератака", "Наркоторговля",
            "Контрабанда", "Убийство", "Похищение", "Вымогательство",
            "Поджог", "Терроризм", "Химическая атака", "Биологическая угроза"
        ];
        
        const descriptions = [
            "Подозрительная активность в ночное время. Требуется расследование.",
            "Обнаружены следы незаконной деятельности. Возможна лаборатория.",
            "Контрабанда высокотехнологичного оборудования.",
            "Исчезновение сотрудника. Возможна связь с новым токсином.",
            "Кибератака на системы безопасности. Следы ведут к известному хакеру.",
            "Ритуальные преступления. Все жертвы связаны между собой.",
            "Новый наркотик на улицах. Источник неизвестен.",
            "Подпольные бои. Участники получают смертельные травмы.",
            "Эксперименты над людьми. Все жертвы имеют одинаковые шрамы.",
            "Коррупционная схема. Вовлечены высокопоставленные чиновники."
        ];
        
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        const randomSuspect = suspects[Math.floor(Math.random() * suspects.length)];
        const randomType = caseTypes[Math.floor(Math.random() * caseTypes.length)];
        const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
        const randomThreat = 40 + Math.floor(Math.random() * 50); // 40-90%
        
        return {
            id: `GK-247-${this.caseNumber}`,
            date: new Date().toLocaleDateString('ru-RU'),
            location: randomLocation,
            suspect: randomSuspect,
            type: randomType,
            description: randomDescription,
            threat: randomThreat,
            status: 'active',
            timestamp: Date.now()
        };
    }
    
    renderCase(caseData) {
        const caseElement = document.createElement('div');
        caseElement.className = 'generated-case';
        caseElement.dataset.id = caseData.id;
        
        // Определяем цвет угрозы
        let threatColor = '#00cc00';
        if (caseData.threat > 80) threatColor = '#ff0000';
        else if (caseData.threat > 60) threatColor = '#ff9900';
        
        caseElement.innerHTML = `
            <div class="case-header">
                <div class="case-id">${caseData.id}</div>
                <div class="case-status active">АКТИВНО</div>
                <button class="case-close">&times;</button>
            </div>
            <div class="case-body">
                <div class="case-type">${caseData.type}</div>
                <div class="case-location">
                    <i class="fas fa-map-marker-alt"></i> ${caseData.location}
                </div>
                <div class="case-suspect">
                    <i class="fas fa-user-secret"></i> Подозреваемый: ${caseData.suspect}
                </div>
                <div class="case-description">${caseData.description}</div>
                <div class="case-threat">
                    <div class="threat-label">Уровень угрозы:</div>
                    <div class="threat-meter">
                        <div class="threat-fill" style="width: ${caseData.threat}%; background: ${threatColor};"></div>
                    </div>
                    <div class="threat-value">${caseData.threat}%</div>
                </div>
            </div>
            <div class="case-footer">
                <span class="case-date"><i class="far fa-clock"></i> ${caseData.date}</span>
                <button class="assign-btn">Назначить на себя</button>
            </div>
        `;
        
        // Обработчики событий
        caseElement.querySelector('.case-close').addEventListener('click', () => {
            this.removeCase(caseData.id);
        });
        
        caseElement.querySelector('.assign-btn').addEventListener('click', () => {
            this.assignCase(caseData.id);
        });
        
        // Добавляем анимацию
        caseElement.style.opacity = '0';
        caseElement.style.transform = 'translateY(20px)';
        
        // Вставляем в начало
        this.casesContainer.prepend(caseElement);
        
        // Анимация появления
        setTimeout(() => {
            caseElement.style.transition = 'all 0.5s ease';
            caseElement.style.opacity = '1';
            caseElement.style.transform = 'translateY(0)';
        }, 10);
        
        // Удаляем пустое состояние если есть
        const emptyState = this.casesContainer.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
        
        // Ограничиваем количество отображаемых дел
        const allCases = this.casesContainer.querySelectorAll('.generated-case');
        if (allCases.length > 10) {
            allCases[allCases.length - 1].remove();
            this.generatedCases.shift(); // Удаляем из массива
        }
    }
    
    removeCase(caseId) {
        // Удаляем из DOM
        const caseElement = this.casesContainer.querySelector(`[data-id="${caseId}"]`);
        if (caseElement) {
            caseElement.style.opacity = '0';
            caseElement.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                caseElement.remove();
                
                // Удаляем из массива
                this.generatedCases = this.generatedCases.filter(c => c.id !== caseId);
                this.saveCases();
                
                // Показываем пустое состояние если дел нет
                if (this.generatedCases.length === 0) {
                    this.showEmptyState();
                }
            }, 500);
        }
    }
    
    assignCase(caseId) {
        const caseItem = this.generatedCases.find(c => c.id === caseId);
        if (caseItem) {
            this.showNotification(`Дело ${caseId} назначено на вас`);
            
            // Меняем статус в DOM
            const caseElement = this.casesContainer.querySelector(`[data-id="${caseId}"]`);
            if (caseElement) {
                const statusElement = caseElement.querySelector('.case-status');
                statusElement.textContent = 'НАЗНАЧЕНО';
                statusElement.style.background = '#006400';
            }
        }
    }
    
    clearCases() {
        if (!confirm('Удалить все сгенерированные дела?')) return;
        
        // Удаляем все дела с анимацией
        const cases = this.casesContainer.querySelectorAll('.generated-case');
        cases.forEach((caseElement, index) => {
            setTimeout(() => {
                caseElement.style.opacity = '0';
                caseElement.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    caseElement.remove();
                }, 500);
            }, index * 100);
        });
        
        // Очищаем массив
        this.generatedCases = [];
        this.saveCases();
        
        // Показываем пустое состояние
        setTimeout(() => {
            this.showEmptyState();
        }, cases.length * 100 + 500);
        
        this.showNotification('Все дела удалены');
    }
    
    showEmptyState() {
        this.casesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-folder-open"></i>
                <p>Нажмите кнопку выше для генерации нового дела</p>
            </div>
        `;
    }
    
    startAutoGeneration() {
        // Генерируем дело каждые 5 минут
        this.autoGenerateInterval = setInterval(() => {
            this.generateCase();
        }, 5 * 60 * 1000); // 5 минут
        
        console.log('Автогенерация запущена (каждые 5 минут)');
    }
    
    stopAutoGeneration() {
        if (this.autoGenerateInterval) {
            clearInterval(this.autoGenerateInterval);
            console.log('Автогенерация остановлена');
        }
    }
    
    saveCases() {
        try {
            localStorage.setItem('gothamGeneratedCases', JSON.stringify({
                cases: this.generatedCases,
                lastCaseNumber: this.caseNumber,
                timestamp: Date.now()
            }));
        } catch (e) {
            console.error('Ошибка сохранения дел:', e);
        }
    }
    
    loadSavedCases() {
        try {
            const saved = localStorage.getItem('gothamGeneratedCases');
            if (saved) {
                const data = JSON.parse(saved);
                this.generatedCases = data.cases || [];
                this.caseNumber = data.lastCaseNumber || 247;
                
                // Восстанавливаем только если прошло меньше суток
                const hoursSinceSave = (Date.now() - data.timestamp) / (1000 * 60 * 60);
                if (hoursSinceSave < 24) {
                    this.generatedCases.forEach(caseData => {
                        this.renderCase(caseData);
                    });
                } else {
                    this.generatedCases = [];
                    this.saveCases();
                }
            }
        } catch (e) {
            console.error('Ошибка загрузки дел:', e);
        }
    }
    
    showNotification(message) {
        // Создаём уведомление
        const notification = document.createElement('div');
        notification.className = 'temp-notification';
        notification.textContent = message;
        
        // Стили
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(30,30,30,0.95);
            color: white;
            padding: 15px 20px;
            border-radius: 4px;
            border: 1px solid #333;
            border-left: 4px solid #8b0000;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Добавляем анимацию
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Автоматическая инициализация
document.addEventListener('DOMContentLoaded', () => {
    new CaseGenerator();
});