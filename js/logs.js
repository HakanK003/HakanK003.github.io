/**
 * Dev Logs Page JavaScript
 * Handles tag-based filtering of development log entries
 */

// Development logs data
const logs = [
    {
        date: "2026-03-05",
        title: "Started Capstone Project Design for ECE 350",
        content: "Formed pair groups and started discusing capstone project ideas for our embedded systems class.",
        tags: ["Python", "Linux", "Sensors", "Single Board Computer (SBC)", "Raspberry Pi", "Embedded Systems", "Hardware", "Software"]
    },
    {
        date: "2026-02-20",
        title: "Bench Oscilloscope Exploration",
        content: "Spent around 4 hours to learn how to use a bench oscilloscope (Rigol DS 1104). Used a Raspberry Pi to generate pulses.",
        tags: ["Tools", "Embedded Systems", "Raspberry Pi", "Hardware"]
    },
    {
        date: "2026-02-17",
        title: "Joined BLIMPs Program",
        content: "Started to BLIMPs program. We will meet weekly and build prototypes using C and MCU in three student groups.",
        tags: ["C", "Microcontroller (MCU)", "Bio-Inpired Design", "Embedded Systems", "Hardware", "Software"]
    },
    {
        date: "2026-01-09",
        title: "Updated My Portfolio Website",
        content: "Spent around 6 hours to change whole design and update information.",
        tags: ["HTML", "CSS", "JavaScript", "Software"]
    },
    {
        date: "2024-09-18",
        title: "Raspberry Pi Cluster Setup",
        content: "Got all 4 Raspberry Pis networked and running Kubernetes. Still troubleshooting some networking issues, but the cluster is operational. Planning to use it for distributed computing experiments.",
        tags: ["Learning", "Software", "Hardware", "Software"]
    },
    {
        date: "2024-08-30",
        title: "Internship Reflection",
        content: "Last day of my summer internship. Learned so much about professional embedded systems development. Working with experienced engineers showed me how much there is to learn. Excited to apply these lessons to my projects.",
        tags: ["Career", "Internship", "Reflection", "Embedded Systems"]
    },
    {
        date: "2024-08-12",
        title: "3D Printer Calibration",
        content: "Spent the weekend calibrating my 3D printer. Dialed in the perfect settings for printing electronics enclosures. The dimensional accuracy is now within 0.1mm. Time to print all those pending project cases!",
        tags: ["Hobbies", "3D Printing", "Tools", "Personal Project"]
    }
];

// State
let activeFilters = [];
let filterOpen = false;

// Extract all unique tags
const allTags = [...new Set(logs.flatMap(log => log.tags))].sort();

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderFilterTags();
    renderLogs();
    setupEventListeners();
});

// Render filter tags
function renderFilterTags() {
    const container = document.getElementById('filterTags');
    container.innerHTML = allTags.map(tag => 
        `<button class="filter-tag" data-tag="${tag}" onclick="toggleFilter('${tag}')">${tag}</button>`
    ).join('');
}

// Render logs
function renderLogs() {
    const container = document.getElementById('logsContainer');
    const filteredLogs = getFilteredLogs();
    
    if (filteredLogs.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <p>No logs match the selected filters.</p>
                <button onclick="clearFilters()">Clear filters</button>
            </div>
        `;
    } else {
        container.innerHTML = filteredLogs.map((log, idx) => `
            <div class="log-entry" style="animation-delay: ${idx * 0.1}s">
                <div class="log-date">${log.date}</div>
                <div class="log-content">
                    <h3>${log.title}</h3>
                    <p>${log.content}</p>
                    <div class="log-tags">
                        ${log.tags.map(tag => 
                            `<span class="log-tag" onclick="toggleFilter('${tag}')">${tag}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Update counter
    const counter = document.getElementById('logsCounter');
    counter.textContent = `Showing ${filteredLogs.length} of ${logs.length} logs`;
}

// Get filtered logs
function getFilteredLogs() {
    if (activeFilters.length === 0) {
        return logs;
    }
    return logs.filter(log => 
        activeFilters.every(filter => log.tags.includes(filter))
    );
}

// Toggle filter
function toggleFilter(tag) {
    const index = activeFilters.indexOf(tag);
    if (index > -1) {
        activeFilters.splice(index, 1);
    } else {
        activeFilters.push(tag);
    }
    updateFilters();
    renderLogs();
}

// Clear all filters
function clearFilters() {
    activeFilters = [];
    updateFilters();
    renderLogs();
}

// Update filter UI
function updateFilters() {
    // Update filter tags
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        if (activeFilters.includes(tag.dataset.tag)) {
            tag.classList.add('active');
        } else {
            tag.classList.remove('active');
        }
    });
    
    // Update active filters display
    const activeFiltersContainer = document.getElementById('activeFilters');
    if (activeFilters.length > 0) {
        activeFiltersContainer.style.display = 'flex';
        activeFiltersContainer.innerHTML = `
            ${activeFilters.map(tag => 
                `<span class="active-filter-tag" onclick="toggleFilter('${tag}')">${tag} ×</span>`
            ).join('')}
            <button class="clear-filters" onclick="clearFilters()">Clear all</button>
        `;
    } else {
        activeFiltersContainer.style.display = 'none';
        activeFiltersContainer.innerHTML = '';
    }
    
    // Update filter count badge
    const filterCount = document.getElementById('filterCount');
    if (activeFilters.length > 0) {
        filterCount.style.display = 'inline';
        filterCount.textContent = activeFilters.length;
    } else {
        filterCount.style.display = 'none';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Filter dropdown toggle
    const filterToggle = document.getElementById('filterToggle');
    const filterDropdown = document.getElementById('filterDropdown');
    
    filterToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        filterOpen = !filterOpen;
        filterDropdown.style.display = filterOpen ? 'block' : 'none';
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const filterContainer = document.querySelector('.logs-filter-container');
        if (!filterContainer.contains(event.target)) {
            filterOpen = false;
            filterDropdown.style.display = 'none';
        }
    });
}
