// JavaScript para o widget de contagem regressiva
document.addEventListener('DOMContentLoaded', function() {
    const countdownList = document.getElementById('countdown-list');
    const addDateBtn = document.getElementById('add-date-btn');
    const newDateInput = document.getElementById('new-date');

    // Unidades de tempo disponíveis para a contagem regressiva
    const timeUnits = {
        years: document.getElementById('years'),
        months: document.getElementById('months'),
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    // Adiciona uma nova data à lista de contagens regressivas
    addDateBtn.addEventListener('click', function() {
        const selectedDate = new Date(newDateInput.value);
        if (!isNaN(selectedDate)) {
            createCountdownItem(selectedDate);
            newDateInput.value = ''; // Limpa o campo de entrada após adicionar a data
        } else {
            alert('Por favor, insira uma data válida.');
        }
    });

    // Cria um item de contagem regressiva para a data selecionada
    function createCountdownItem(date) {
        const countdownItem = document.createElement('div');
        countdownItem.classList.add('countdown-item');

        const dateInfo = document.createElement('span');
        dateInfo.textContent = `${date.toLocaleString()}`;
        countdownItem.appendChild(dateInfo);

        const timeRemaining = document.createElement('span');
        timeRemaining.classList.add('time-remaining');
        countdownItem.appendChild(timeRemaining);

        countdownList.appendChild(countdownItem);
        updateCountdown(countdownItem, date);
    }

    // Atualiza a contagem regressiva para cada item
    function updateCountdown(item, date) {
        function update() {
            const now = new Date();
            const diff = date - now;

            if (diff <= 0) {
                item.querySelector('.time-remaining').textContent = 'Tempo esgotado!';
                clearInterval(intervalId); // Para a atualização quando o tempo se esgota
                return;
            }

            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
            const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30) % 12);
            const days = Math.floor(diff / (1000 * 60 * 60 * 24) % 30);
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            // Formata a saída de acordo com as unidades de tempo selecionadas
            let timeStr = '';
            if (timeUnits.years.checked) timeStr += `${years} anos `;
            if (timeUnits.months.checked) timeStr += `${months} meses `;
            if (timeUnits.days.checked) timeStr += `${days} dias `;
            if (timeUnits.hours.checked) timeStr += `${hours} horas `;
            if (timeUnits.minutes.checked) timeStr += `${minutes} minutos `;
            if (timeUnits.seconds.checked) timeStr += `${seconds} segundos`;

            item.querySelector('.time-remaining').textContent = timeStr.trim();
        }

        update();
        const intervalId = setInterval(update, 1000);
    }
});
