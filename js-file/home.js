const issueContainer = document.getElementById('issue-container');
const issueCount = document.getElementById('issue-count');
const loadingSpinner = document.getElementById('loading');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('issue_modal');
const modalContent = document.getElementById('modal-content');

let allIssuesData = [];

// API theke data fetch kora
async function fetchIssues(filter = 'all') {
    loadingSpinner.classList.remove('hidden');
    issueContainer.innerHTML = '';
    
    try {
        const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const data = await response.json();
        allIssuesData = data.data;

        let filteredData = allIssuesData;
        if (filter === 'open') filteredData = allIssuesData.filter(i => i.status === 'open');
        if (filter === 'closed') filteredData = allIssuesData.filter(i => i.status === 'closed');

        displayIssues(filteredData);
        updateActiveBtn(filter);
    } catch (error) {
        console.error("Error fetching issues:", error);
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}

// Card display

function displayIssues(issues) {
    issueContainer.innerHTML = '';
    issueCount.innerText = `${issues.length} Issues`;

    issues.forEach(issue => {
        
        const borderColor = issue.status === 'open' ? 'border-green-500' : 'border-purple-500';
        const statusIcon = issue.status === 'open' ? '✓' : '✕';
        const statusBg = issue.status === 'open' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600';

      
        let priorityClass = "";
        const priority = issue.priority.toLowerCase();

        if (priority === 'high') {
            priorityClass = "bg-red-100 text-red-600";
        } else if (priority === 'medium') {
            priorityClass = "bg-orange-100 text-orange-600";
        } else if (priority === 'low') {
            priorityClass = "bg-blue-100 text-blue-600";  
        } else {
            priorityClass = "bg-gray-100 text-gray-600";    
        }

        
        let labelsHtml = '';
        if (issue.labels && Array.isArray(issue.labels)) {
            issue.labels.forEach(label => {
                let labelColor = "bg-gray-50 text-gray-600 border-gray-100";
                if (label.toLowerCase() === 'bug') labelColor = "bg-red-50 text-red-500 border-red-100";
                else if (label.toLowerCase() === 'help wanted') labelColor = "bg-orange-50 text-orange-600 border-orange-100";
                else if (label.toLowerCase() === 'enhancement') labelColor = "bg-green-50 text-green-600 border-green-100";

                labelsHtml += `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${labelColor} uppercase">${label}</span>`;
            });
        }

        const card = document.createElement('div');
        card.className = `bg-white rounded-xl shadow-sm border-t-4 ${borderColor} p-5 cursor-pointer hover:shadow-md transition flex flex-col h-full`;
        card.onclick = () => showIssueDetails(issue.id);

        card.innerHTML = `
            <div class="flex-grow">
                <div class="flex justify-between items-center mb-3">
                    <div class="w-7 h-7 flex items-center justify-center ${statusBg} rounded-full">
                        <span class="text-sm font-bold">${statusIcon}</span>
                    </div>
                    <span class="text-[10px] font-bold ${priorityClass} px-3 py-1 rounded-full uppercase">
                        ${issue.priority}
                    </span>
                </div>
                <h3 class="font-bold text-gray-800 leading-5 mb-1 text-lg">${issue.title}</h3>
                <p class="text-sm text-gray-500 mb-3 line-clamp-2">${issue.description}</p>
                
                <div class="flex flex-wrap gap-2 mb-4">
                    ${labelsHtml}
                </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 flex justify-between items-end">
                <div>
                    <p class="mb-1">#${issue.id} by <span class="text-gray-600 font-medium">${issue.author}</span></p>
                    <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
                </div>
                
            </div>
        `;
        issueContainer.appendChild(card);
    });
}

// Search Functionality
searchInput.addEventListener('input', async (e) => {
    const query = e.target.value;
    if (query.length < 2) {
        if(query.length === 0) fetchIssues();
        return;
    }

    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`);
        const data = await res.json();
        displayIssues(data.data);
    } catch (err) {
        console.log(err);
    }
});

//  Issue Detail 
async function showIssueDetails(id) {
    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
        const result = await res.json();
        const issue = result.data;

        modalContent.innerHTML = `
            <h2 class="text-xl font-bold text-gray-800 mb-2">${issue.title}</h2>
            <div class="flex items-center gap-2 text-sm mb-4">
                <span class="px-2 py-1 rounded-full text-xs font-bold ${issue.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}">
                    ${issue.status.toUpperCase()}
                </span>
                <span class="text-gray-500">Opened by <b>${issue.author}</b> • ${new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
            
            <p class="text-gray-600 text-sm mb-6 leading-relaxed">${issue.description}</p>
            
            <div class="bg-gray-50 rounded-lg p-4 flex justify-between items-center mb-6">
                <div>
                    <p class="text-xs text-gray-400 uppercase font-bold mb-1">Assignee:</p>
                    <p class="font-medium text-gray-700">${issue.author}</p>
                </div>
                <div class="text-center">
                    <p class="text-xs text-gray-400 uppercase font-bold mb-1">Priority</p>
                    <span class="bg-red-500 text-white text-[10px] px-3 py-1 rounded-full font-bold">${issue.priority.toUpperCase()}</span>
                </div>
            </div>

            <div class="modal-action">
                <form method="dialog">
                    <button class="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none px-6">Close</button>
                </form>
            </div>
        `;
        modal.showModal();
    } catch (err) {
        console.error(err);
    }
}

// Active Button
function updateActiveBtn(filter) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if (btn.innerText.toLowerCase() === filter) {
            btn.classList.add('bg-indigo-600', 'text-white');
            btn.classList.remove('bg-transparent', 'text-gray-600');
        } else {
            btn.classList.remove('bg-indigo-600', 'text-white');
            btn.classList.add('bg-transparent', 'text-gray-600');
        }
    });
}

fetchIssues();