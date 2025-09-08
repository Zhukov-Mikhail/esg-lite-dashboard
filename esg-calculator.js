// ESG Lite Calculator - Простой расчет ESG метрик для малого бизнеса
document.addEventListener('DOMContentLoaded', function() {
    // Проверка, есть ли сохраненные данные
    const savedRepo = localStorage.getItem('esgRepo');
    if (savedRepo) {
        document.getElementById('repoUrl').value = savedRepo;
    }
});

function fetchESGData() {
    const repoInput = document.getElementById('repoUrl').value.trim();
    const statusEl = document.getElementById('status');
    
    if (!repoInput) {
        statusEl.textContent = 'Пожалуйста, введите название репозитория (логин/название)';
        statusEl.className = 'status error';
        return;
    }
    
    statusEl.textContent = 'Загрузка данных...';
    statusEl.className = 'status loading';
    
    // Сохраняем для будущих сессий
    localStorage.setItem('esgRepo', repoInput);
    
    // Разбиваем на owner и repo
    const [owner, repo] = repoInput.split('/');
    
    if (!owner || !repo) {
        statusEl.textContent = 'Неверный формат. Используйте: логин/название-репозитория';
        statusEl.className = 'status error';
        return;
    }
    
    // Для демонстрации используем фейковые данные (в реальном проекте здесь будет GitHub API)
    setTimeout(() => {
        calculateMetrics(owner, repo);
        statusEl.textContent = 'Данные успешно обновлены!';
        statusEl.className = 'status success';
    }, 1000);
}

function calculateMetrics(owner, repo) {
    // Генерируем случайные, но реалистичные данные для демонстрации
    const carbonScore = Math.floor(Math.random() * 30) + 70; // 70-100
    const engagementScore = Math.floor(Math.random() * 25) + 75; // 75-100
    const transparencyScore = Math.floor(Math.random() * 20) + 60; // 60-80
    const efficiencyScore = Math.floor(Math.random() * 30) + 70; // 70-100
    const socialScore = Math.floor(Math.random() * 40) + 60; // 60-100
    
    // Обновляем отображение
    document.getElementById('carbon').textContent = carbonScore + '%';
    document.getElementById('engagement').textContent = engagementScore + '%';
    document.getElementById('transparency').textContent = transparencyScore + '%';
    document.getElementById('efficiency').textContent = efficiencyScore + '%';
    document.getElementById('social').textContent = socialScore + '%';
    
    // Вычисляем общий рейтинг
    const total = Math.round((carbonScore + engagementScore + transparencyScore + 
                   efficiencyScore + socialScore) / 5);
    
    document.getElementById('totalScore').textContent = total + '%';
    
    // Сохраняем для экспорта
    localStorage.setItem('esgData', JSON.stringify({
        repo: `${owner}/${repo}`,
        carbon: carbonScore,
        engagement: engagementScore,
        transparency: transparencyScore,
        efficiency: efficiencyScore,
        social: socialScore,
        total: total,
        date: new Date().toISOString()
    }));
}

function generatePDF() {
    alert('В реальной версии здесь будет генерация PDF.\n\nДля полноценной версии с генерацией PDF добавьте библиотеку jsPDF в проект.');
}
