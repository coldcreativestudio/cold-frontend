let conversionChartInstance = null;
let leadsDayChartInstance = null;

const chartService = {
    initConversionChart: (data) => {
        const ctx = document.getElementById('conversionChart').getContext('2d');
        if(conversionChartInstance) conversionChartInstance.destroy();
        conversionChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Fechados', 'Perdidos', 'Em Negociação'],
                datasets: [{
                    data: [data.fechados, data.perdidos, data.negociacao],
                    backgroundColor: ['#10b981', '#ef4444', '#a855f7'],
                    borderWidth: 0
                }]
            },
            options: { cutout: '70%', plugins: { legend: { position: 'bottom', labels: { color: '#8b8b9e' } } } }
        });
    },
    
    initLeadsByDay: (labels, data) => {
        const ctx = document.getElementById('leadsByDayChart').getContext('2d');
        if(leadsDayChartInstance) leadsDayChartInstance.destroy();
        leadsDayChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Novos Leads',
                    data: data,
                    backgroundColor: 'rgba(168, 85, 247, 0.5)',
                    borderColor: '#a855f7',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: { scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8b8b9e' } }, x: { grid: { display: false }, ticks: { color: '#8b8b9e' } } }, plugins: { legend: { display: false } } }
        });
    }
};