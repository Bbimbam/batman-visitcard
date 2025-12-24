class RainEffect {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.drops = [];
        this.intensity = 30;
        this.isRaining = false;
        this.wind = 0;
        
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        // Создаём стили для дождя
        const style = document.createElement('style');
        style.textContent = `
            .raindrop {
                position: absolute;
                width: 1px;
                height: 15px;
                background: linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.2));
                pointer-events: none;
                border-radius: 0 0 1px 1px;
            }
            
            .ripple {
                position: absolute;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                pointer-events: none;
            }
            
            @keyframes fall {
                to {
                    transform: translateY(100vh);
                }
            }
            
            @keyframes ripple {
                0% {
                    transform: scale(1);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    createDrop() {
        const drop = document.createElement('div');
        drop.className = 'raindrop';
        
        // Случайная позиция
        const startX = Math.random() * 100;
        const speed = 0.5 + Math.random() * 1.5;
        const length = 10 + Math.random() * 20;
        
        // Применяем стили
        drop.style.left = `${startX}vw`;
        drop.style.top = '-20px';
        drop.style.height = `${length}px`;
        drop.style.opacity = 0.2 + Math.random() * 0.3;
        drop.style.animation = `fall ${speed}s linear`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        
        // Ветер
        if (this.wind !== 0) {
            drop.style.transform = `translateX(${this.wind * 20}px)`;
        }
        
        // Добавляем в контейнер
        this.container.appendChild(drop);
        
        // Создаём волну при "падении"
        setTimeout(() => {
            this.createRipple(startX);
        }, speed * 1000);
        
        // Удаляем после анимации
        setTimeout(() => {
            if (drop.parentNode) {
                drop.remove();
            }
        }, speed * 1000 + 1000);
        
        return drop;
    }
    
    createRipple(x) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        
        ripple.style.left = `${x}vw`;
        ripple.style.top = '90vh';
        ripple.style.animation = `ripple 1s ease-out`;
        
        this.container.appendChild(ripple);
        
        // Удаляем после анимации
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 1000);
    }
    
    start(intensity = 30) {
        this.isRaining = true;
        this.intensity = intensity;
        
        // Создаём начальные капли
        for (let i = 0; i < intensity; i++) {
            setTimeout(() => this.createDrop(), i * 100);
        }
        
        // Постоянное создание новых капель
        this.rainInterval = setInterval(() => {
            if (Math.random() > 0.4) {
                this.createDrop();
            }
        }, 50);
        
        console.log('🌧️ Дождь начался. Интенсивность:', intensity);
    }
    
    stop() {
        this.isRaining = false;
        if (this.rainInterval) {
            clearInterval(this.rainInterval);
        }
        
        // Удаляем все капли
        const drops = this.container.querySelectorAll('.raindrop, .ripple');
        drops.forEach(drop => drop.remove());
        
        console.log('🌧️ Дождь остановлен');
    }
    
    setIntensity(intensity) {
        this.intensity = intensity;
        if (this.isRaining) {
            this.stop();
            this.start(intensity);
        }
    }
    
    setWind(force) {
        this.wind = force; // -1 до 1
        console.log('🌪️ Ветер установлен:', force);
    }
}

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RainEffect;
}