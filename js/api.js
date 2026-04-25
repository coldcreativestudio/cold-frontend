const API_URL = 'https://cold-hunter-api.onrender.com/api';

const api = {
    getToken: () => localStorage.getItem('token'),
    
    request: async (endpoint, options = {}) => {
        const headers = { 'Content-Type': 'application/json' };
        const token = api.getToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;
        
        const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },

    getLeads: () => api.request('/leads'),
    updateStatus: (id, status) => api.request(`/leads/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
    startScraping: (nicho, cidade) => api.request('/scraper/iniciar', { method: 'POST', body: JSON.stringify({ nicho, cidade }) }),
    getMetrics: () => api.request('/metrics/totals')
};