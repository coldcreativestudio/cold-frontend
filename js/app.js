document.addEventListener('DOMContentLoaded', async () => {
    // Mock inicial se a API não estiver rodando
    try {
        await loadDashboard();
    } catch (e) {
        console.warn("API offline. Carregando dados de fallback.");
        fallbackData();
    }

    document.getElementById('startScrapingBtn').addEventListener('click', async (e) => {
        e.target.innerText = '⏳ Raspando...';
        try {
            await api.startScraping('clinica-estetica', 'São Paulo SP');
            alert('Scraping iniciado em background!');
        } catch (error) {
            console.error(error);
        }
        e.target.innerText = '🚀 Raspar Agora';
    });
});

async function loadDashboard() {
    const leads = await api.getLeads();
    renderLeads(leads);
    
    // Configura gráficos (mock temporário)
    chartService.initConversionChart({ fechados: 12, perdidos: 25, negociacao: 8 });
    chartService.initLeadsByDay(['Seg', 'Ter', 'Qua', 'Qui', 'Sex'], [10, 25, 15, 30, 22]);
}

function renderLeads(leads) {
    const container = document.getElementById('leadsList');
    container.innerHTML = leads.map(l => `
        <div class="lead-item">
            <div><h4>⭐ ${l.avaliacao || 0} ${l.nome}</h4><p>📍 ${l.endereco?.cidade || 'N/A'}</p></div>
            <div><p>📞 ${l.telefone || 'Sem número'}</p></div>
            <div>${!l.temSite ? '<span class="tag">🚫 SEM SITE</span>' : ''}</div>
            <div><p>🔗 ${l.previewUrl || 'Gerando...'}</p></div>
            <div>
                <button class="action-btn" onclick="window.open('https://wa.me/${l.whatsapp}', '_blank')">📱</button>
            </div>
        </div>
    `).join('');
}

function fallbackData() {
    renderLeads([
        { nome: "Clínica Teste", telefone: "11999999999", avaliacao: 4.8, temSite: false, previewUrl: "teste.vercel.app" }
    ]);
    chartService.initConversionChart({ fechados: 5, perdidos: 10, negociacao: 3 });
    chartService.initLeadsByDay(['Seg', 'Ter'], [5, 10]);
}