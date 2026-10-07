const templateDefinitions = {
  saas: {
    title: 'HiMat SaaS Platform Documentation',
    summary:
      'HiMat Technology is an AI-first web engineering platform building high-performance web applications, custom microservices, and AI agent architectures.',
    optional:
      'HiMat Technology specializes in Next.js, React, TypeScript, Tailwind CSS, and Generative Engine Optimization (GEO).',
    sections: [
      {
        name: 'Core Documentation',
        links: [
          {
            title: 'API Quickstart',
            url: 'https://example.com/docs',
            description: 'Short summary of what this document covers.'
          },
          {
            title: 'Getting Started',
            url: 'https://example.com/getting-started',
            description: 'Introduction and setup instructions.'
          },
          {
            title: 'Deployment Guide',
            url: 'https://example.com/deploy',
            description: 'Production-ready rollout and monitoring guidance.'
          }
        ]
      },
      {
        name: 'Developer Resources',
        links: [
          {
            title: 'SDK Overview',
            url: 'https://example.com/sdk',
            description: 'Overview of the client libraries and integrations.'
          }
        ]
      }
    ]
  },
  developer: {
    title: 'Developer API Reference',
    summary:
      'Build fast, secure integrations with a clean API ecosystem designed for modern production workloads.',
    optional: 'This documentation focuses on REST APIs, authentication patterns, rate limits, and secure deployment practices.',
    sections: [
      {
        name: 'Getting Started',
        links: [
          {
            title: 'Authentication',
            url: 'https://example.com/docs/auth',
            description: 'API token generation and secure authentication flows.'
          },
          {
            title: 'Quickstart',
            url: 'https://example.com/docs/quickstart',
            description: 'Execute your first request and review the basic response format.'
          }
        ]
      },
      {
        name: 'Reference',
        links: [
          {
            title: 'Endpoints',
            url: 'https://example.com/docs/endpoints',
            description: 'Full list of resource endpoints, expected payloads, and examples.'
          }
        ]
      }
    ]
  },
  blog: {
    title: 'Tech Blog Knowledge Base',
    summary:
      'Explore product engineering stories, technical explainers, and practical lessons from shipping AI-first products.',
    optional: 'This list highlights engineering notes, product thinking, and front-end performance insights.',
    sections: [
      {
        name: 'Latest Insights',
        links: [
          {
            title: 'AI Product Design',
            url: 'https://example.com/blog/ai-product-design',
            description: 'Frameworks for designing useful AI experiences with measurable UX outcomes.'
          },
          {
            title: 'Web Performance',
            url: 'https://example.com/blog/performance',
            description: 'Strategies for reducing latency and retaining user trust.'
          }
        ]
      },
      {
        name: 'Engineering Notes',
        links: [
          {
            title: 'Type-Safe Frontends',
            url: 'https://example.com/blog/type-safe-frontend',
            description: 'Making frontend architecture easier to reason about and scale.'
          }
        ]
      }
    ]
  },
  commerce: {
    title: 'Shopwell Commerce Documentation',
    summary:
      'Everything needed to understand the storefront, checkout flow, merchandising system, and fulfillment workflows.',
    optional: 'This store supports product discovery, personalized recommendations, subscription logic, and automated fulfillment.',
    sections: [
      {
        name: 'Storefront',
        links: [
          {
            title: 'Catalog Guide',
            url: 'https://example.com/docs/catalog',
            description: 'Learn how products, variants, pricing, and inventory are displayed.'
          },
          {
            title: 'Checkout Flow',
            url: 'https://example.com/docs/checkout',
            description: 'Understand step-by-step purchasing, validation, and payment processing.'
          }
        ]
      },
      {
        name: 'Operations',
        links: [
          {
            title: 'Fulfillment',
            url: 'https://example.com/docs/fulfillment',
            description: 'Review shipping workflows, returns, and order management.'
          }
        ]
      }
    ]
  },
  agency: {
    title: 'Creative Studio Services Manual',
    summary:
      'A guide to design, engineering, and growth services for SaaS founders, teams, and digital brands.',
    optional: 'The studio specializes in branding, conversion-focused web design, product strategy, and AI-enhanced growth systems.',
    sections: [
      {
        name: 'Services',
        links: [
          {
            title: 'Brand Strategy',
            url: 'https://example.com/services/brand',
            description: 'Positioning, messaging, and design systems for growth stages.'
          },
          {
            title: 'Web Design',
            url: 'https://example.com/services/design',
            description: 'User experience design for websites that convert and scale.'
          }
        ]
      },
      {
        name: 'Case Studies',
        links: [
          {
            title: 'Recent Launches',
            url: 'https://example.com/case-studies',
            description: 'Examples of product strategy and implementation across high-growth teams.'
          }
        ]
      }
    ]
  }
};

const state = {
  title: '',
  summary: '',
  optional: '',
  sections: [],
  activeTab: 'llms'
};

const els = {
  title: document.getElementById('documentTitle'),
  summary: document.getElementById('documentSummary'),
  optional: document.getElementById('optionalContent'),
  sectionsContainer: document.getElementById('sectionsContainer'),
  resultOutput: document.getElementById('resultOutput'),
  previewOutput: document.getElementById('previewOutput'),
  validationList: document.getElementById('validationList'),
  addSectionBtn: document.getElementById('addSectionBtn'),
  resetTemplateBtn: document.getElementById('resetTemplateBtn'),
  copyBtn: document.getElementById('copyBtn'),
  downloadLlmsBtn: document.getElementById('downloadLlmsBtn'),
  downloadFullBtn: document.getElementById('downloadFullBtn'),
  templateButtons: Array.from(document.querySelectorAll('.template-btn')),
  tabButtons: Array.from(document.querySelectorAll('.tab-btn'))
};

function createEmptyLink() {
  return {
    id: crypto.randomUUID(),
    title: '',
    url: '',
    description: ''
  };
}

function createEmptySection() {
  return {
    id: crypto.randomUUID(),
    name: '',
    links: [createEmptyLink()]
  };
}

function resetStateToTemplate(key) {
  const template = templateDefinitions[key] || templateDefinitions.saas;
  state.title = template.title;
  state.summary = template.summary;
  state.optional = template.optional;
  state.sections = template.sections.map((section) => ({
    id: crypto.randomUUID(),
    name: section.name,
    links: section.links.map((link) => ({
      id: crypto.randomUUID(),
      title: link.title,
      url: link.url,
      description: link.description
    }))
  }));

  syncInputs();
  renderSections();
  refreshAll();
}

function syncInputs() {
  els.title.value = state.title;
  els.summary.value = state.summary;
  els.optional.value = state.optional;
}

function renderSections() {
  els.sectionsContainer.innerHTML = '';

  state.sections.forEach((section) => {
    const card = document.createElement('div');
    card.className = 'section-card';
    card.dataset.sectionId = section.id;

    const header = document.createElement('div');
    header.className = 'section-card-header';
    header.innerHTML = `
      <h3>Section</h3>
      <button class="remove-btn" type="button" data-remove-section="${section.id}">Remove Section</button>
    `;

    const nameField = document.createElement('div');
    nameField.className = 'field-group';
    nameField.innerHTML = `
      <label>Section Name</label>
      <input
        type="text"
        value="${escapeAttribute(section.name)}"
        data-section-name="${section.id}"
        placeholder="Core Documentation"
      />
    `;

    const linkList = document.createElement('div');
    linkList.className = 'link-list';

    section.links.forEach((link) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'link-card';
      wrapper.dataset.linkId = link.id;

      wrapper.innerHTML = `
        <div class="link-row">
          <div class="field-group">
            <label>Link Title</label>
            <input type="text" value="${escapeAttribute(link.title)}" data-link-title="${link.id}" placeholder="API Quickstart" />
          </div>
          <div class="field-group">
            <label>URL</label>
            <input type="url" value="${escapeAttribute(link.url)}" data-link-url="${link.id}" placeholder="https://example.com/docs" />
          </div>
        </div>
        <div class="field-group">
          <label>Description</label>
          <textarea rows="2" data-link-description="${link.id}" placeholder="Short summary of what this document covers.">${escapeHtml(link.description)}</textarea>
        </div>
        <div class="link-actions">
          <button class="remove-btn" type="button" data-remove-link="${link.id}">Remove Link</button>
        </div>
      `;

      linkList.appendChild(wrapper);
    });

    const addLinkButton = document.createElement('button');
    addLinkButton.className = 'add-link-btn';
    addLinkButton.type = 'button';
    addLinkButton.dataset.addLinkToSection = section.id;
    addLinkButton.textContent = '+ Add Link';

    card.appendChild(header);
    card.appendChild(nameField);
    card.appendChild(linkList);
    card.appendChild(addLinkButton);
    els.sectionsContainer.appendChild(card);
  });

  if (!state.sections.length) {
    const emptyState = document.createElement('div');
    emptyState.className = 'section-card';
    emptyState.innerHTML = '<p>No sections yet. Add a documentation section to begin.</p>';
    els.sectionsContainer.appendChild(emptyState);
  }
}

function getSectionById(sectionId) {
  return state.sections.find((section) => section.id === sectionId);
}

function getLinkById(sectionId, linkId) {
  const section = getSectionById(sectionId);
  return section ? section.links.find((link) => link.id === linkId) : null;
}

function handleSectionNameInput(sectionId, value) {
  const section = getSectionById(sectionId);
  if (!section) return;
  section.name = value;
  renderOutput();
  renderValidation();
}

function handleLinkInput(linkId, field, value) {
  for (const section of state.sections) {
    const link = section.links.find((item) => item.id === linkId);
    if (!link) continue;
    link[field] = value;
    renderOutput();
    renderValidation();
    break;
  }
}

function addSection() {
  state.sections.push(createEmptySection());
  renderSections();
  refreshAll();
}

function addLinkToSection(sectionId) {
  const section = getSectionById(sectionId);
  if (!section) return;
  section.links.push(createEmptyLink());
  renderSections();
  refreshAll();
}

function removeSection(sectionId) {
  state.sections = state.sections.filter((item) => item.id !== sectionId);
  renderSections();
  refreshAll();
}

function removeLink(linkId) {
  for (const section of state.sections) {
    const foundIndex = section.links.findIndex((link) => link.id === linkId);
    if (foundIndex === -1) continue;
    section.links.splice(foundIndex, 1);
    if (section.links.length === 0) {
      section.links.push(createEmptyLink());
    }
    renderSections();
    refreshAll();
    return;
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

function generateLlmsMarkdown() {
  const title = state.title.trim() || 'Untitled Documentation';
  const summary = state.summary.trim() || 'Add a summary to describe your site.';
  const lines = [`# ${title}`, '', `> ${summary}`, ''];

  const validSections = state.sections.filter((section) => {
    if (!section.name.trim() && section.links.length === 0) return false;
    return true;
  });

  if (!validSections.length) {
    lines.push('## Documentation');
    lines.push('');
    lines.push('- Add sections and links to generate your llms.txt content.');
    lines.push('');
  }

  validSections.forEach((section) => {
    const sectionName = section.name.trim() || 'Documentation';
    lines.push(`## ${sectionName}`);

    if (!section.links.length) {
      lines.push('');
      lines.push('- Add links to this section to populate documentation.');
      lines.push('');
      return;
    }

    section.links.forEach((link) => {
      const titleValue = link.title.trim() || 'Untitled Link';
      const urlValue = link.url.trim() || 'https://example.com';
      const description = link.description.trim() || 'No description provided.';
      lines.push(`- [${titleValue}](${urlValue}): ${description}`);
    });
    lines.push('');
  });

  if (state.optional.trim()) {
    lines.push('## Optional');
    lines.push(state.optional.trim());
    lines.push('');
  }

  return lines.join('\n').trim() + '\n';
}

function generateLlmsFullMarkdown() {
  const title = state.title.trim() || 'Untitled Documentation';
  const summary = state.summary.trim() || 'Add a summary to describe your site.';
  const lines = [`# ${title} — Full Documentation Bundle`, '', `> ${summary}`, ''];

  state.sections.forEach((section) => {
    const sectionName = section.name.trim() || 'Documentation';
    lines.push(`## ${sectionName}`);
    lines.push('');

    section.links.forEach((link) => {
      const titleValue = link.title.trim() || 'Untitled Link';
      const urlValue = link.url.trim() || 'https://example.com';
      const description = link.description.trim() || 'No description provided.';
      lines.push(`### [${titleValue}](${urlValue})`);
      lines.push(`- URL: ${urlValue}`);
      lines.push(`- Description: ${description}`);
      lines.push('');
    });
  });

  if (state.optional.trim()) {
    lines.push('## Optional');
    lines.push(state.optional.trim());
  }

  return lines.join('\n').trim() + '\n';
}

function renderOutput() {
  const llmsMarkdown = generateLlmsMarkdown();
  const fullMarkdown = generateLlmsFullMarkdown();

  if (state.activeTab === 'full') {
    els.resultOutput.textContent = fullMarkdown;
    els.previewOutput.classList.add('hidden');
    els.resultOutput.classList.remove('hidden');
    return;
  }

  if (state.activeTab === 'preview') {
    els.resultOutput.classList.add('hidden');
    els.previewOutput.classList.remove('hidden');
    els.previewOutput.innerHTML = markdownToHtml(llmsMarkdown);
    return;
  }

  els.resultOutput.textContent = llmsMarkdown;
  els.previewOutput.classList.add('hidden');
  els.resultOutput.classList.remove('hidden');
}

function markdownToHtml(markdown) {
  const lines = markdown.split('\n');
  let html = '';
  let listOpen = false;

  const closeList = () => {
    if (listOpen) {
      html += '</ul>';
      listOpen = false;
    }
  };

  const renderInline = (text) => {
    const escaped = escapeHtml(text);
    return escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  };

  lines.forEach((line) => {
    if (!line.trim()) {
      closeList();
      return;
    }

    if (line.startsWith('> ')) {
      closeList();
      html += `<blockquote>${renderInline(line.slice(2))}</blockquote>`;
      return;
    }

    if (line.startsWith('# ')) {
      closeList();
      html += `<h1>${renderInline(line.slice(2))}</h1>`;
      return;
    }

    if (line.startsWith('## ')) {
      closeList();
      html += `<h2>${renderInline(line.slice(3))}</h2>`;
      return;
    }

    if (line.startsWith('### ')) {
      closeList();
      html += `<h3>${renderInline(line.slice(4))}</h3>`;
      return;
    }

    if (line.startsWith('- ')) {
      if (!listOpen) {
        html += '<ul>';
        listOpen = true;
      }
      html += `<li>${renderInline(line.slice(2))}</li>`;
      return;
    }

    closeList();
    html += `<p>${renderInline(line)}</p>`;
  });

  closeList();
  return html;
}

function validateDocument(markdown) {
  const checks = [
    { label: 'H1 title present', status: /^#\s+\S+/m.test(markdown) ? 'success' : 'error' },
    { label: 'Blockquote summary present', status: /^>\s+\S+/m.test(markdown) ? 'success' : 'error' },
    { label: 'At least one documentation section exists', status: /^(##\s+.+)$/m.test(markdown) ? 'success' : 'error' },
    { label: 'H2 section formatting is valid', status: /^(##\s+.+)$/m.test(markdown) ? 'success' : 'error' },
    { label: 'Markdown links are valid', status: validateLinks(markdown) ? 'success' : 'error' },
    { label: 'URLs are valid', status: validateUrls(markdown) ? 'success' : 'error' },
    { label: 'Descriptions exist', status: validateDescriptions(markdown) ? 'success' : 'error' },
    { label: 'Optional word count warning', status: getOptionalWordWarning() }
  ];

  return checks;
}

function validateLinks(markdown) {
  const matches = [...markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)];
  if (!matches.length) return false;
  return matches.every((match) => /^https?:\/\//.test(match[1]) || /^\//.test(match[1]) || /^#/.test(match[1]));
}

function validateUrls(markdown) {
  const urlMatches = [...markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)];
  if (!urlMatches.length) return false;

  return urlMatches.every(([_, url]) => {
    try {
      if (url.startsWith('#') || url.startsWith('/')) return true;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  });
}

function validateDescriptions(markdown) {
  const matches = [...markdown.matchAll(/\[[^\]]+\]\(([^)]+)\):\s*([^\n]+)/g)];
  return matches.length > 0 ? matches.every((match) => match[2] && match[2].trim().length > 0) : false;
}

function getOptionalWordWarning() {
  const wordCount = state.optional.trim().split(/\s+/).filter(Boolean).length;
  if (!state.optional.trim()) return 'success';
  if (wordCount > 120) return 'warning';
  return 'success';
}

function renderValidation() {
  const markdown = generateLlmsMarkdown();
  const checks = validateDocument(markdown);

  els.validationList.innerHTML = '';

  checks.forEach((check) => {
    const row = document.createElement('li');
    row.className = `validation-item ${check.status}`;

    const icon = document.createElement('span');
    icon.className = 'status-icon';
    if (check.status === 'success') icon.textContent = '✓';
    else if (check.status === 'warning') icon.textContent = '⚠';
    else icon.textContent = '✕';

    const label = document.createElement('span');
    label.textContent = check.label;
    if (check.status === 'warning' && check.label === 'Optional word count warning') {
      label.textContent = '⚠ Word count is high';
    }

    row.appendChild(icon);
    row.appendChild(label);
    els.validationList.appendChild(row);
  });
}

function refreshAll() {
  syncInputs();
  renderSections();
  renderOutput();
  renderValidation();
}

function selectTab(tabName) {
  state.activeTab = tabName;
  els.tabButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tabName);
  });
  renderOutput();
}

function copyCurrentMarkdown() {
  const markdown = generateLlmsMarkdown();
  navigator.clipboard.writeText(markdown).then(() => {
    const originalText = els.copyBtn.textContent;
    els.copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      els.copyBtn.textContent = originalText;
    }, 1200);
  }).catch(() => {
    els.copyBtn.textContent = 'Copy failed';
    setTimeout(() => {
      els.copyBtn.textContent = 'Copy llms.txt';
    }, 1200);
  });
}

function downloadFile(filename, contents) {
  const blob = new Blob([contents], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function attachEventHandlers() {
  els.title.addEventListener('input', (event) => {
    state.title = event.target.value;
    renderOutput();
    renderValidation();
  });

  els.summary.addEventListener('input', (event) => {
    state.summary = event.target.value;
    renderOutput();
    renderValidation();
  });

  els.optional.addEventListener('input', (event) => {
    state.optional = event.target.value;
    renderOutput();
    renderValidation();
  });

  els.addSectionBtn.addEventListener('click', addSection);
  els.resetTemplateBtn.addEventListener('click', () => {
    resetStateToTemplate('saas');
    els.templateButtons.forEach((button) => button.classList.toggle('active', button.dataset.template === 'saas'));
  });

  els.copyBtn.addEventListener('click', copyCurrentMarkdown);
  els.downloadLlmsBtn.addEventListener('click', () => downloadFile('llms.txt', generateLlmsMarkdown()));
  els.downloadFullBtn.addEventListener('click', () => downloadFile('llms-full.txt', generateLlmsFullMarkdown()));

  els.templateButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.template;
      resetStateToTemplate(key);
      els.templateButtons.forEach((templateButton) => templateButton.classList.toggle('active', templateButton === button));
    });
  });

  els.tabButtons.forEach((button) => {
    button.addEventListener('click', () => selectTab(button.dataset.tab));
  });

  document.addEventListener('input', (event) => {
    const target = event.target;
    if (target.matches('[data-section-name]')) {
      handleSectionNameInput(target.dataset.sectionName, target.value);
    }

    if (target.matches('[data-link-title]')) {
      handleLinkInput(target.dataset.linkTitle, 'title', target.value);
    }

    if (target.matches('[data-link-url]')) {
      handleLinkInput(target.dataset.linkUrl, 'url', target.value);
    }

    if (target.matches('[data-link-description]')) {
      handleLinkInput(target.dataset.linkDescription, 'description', target.value);
    }
  });

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-remove-section]');
    if (button) {
      removeSection(button.dataset.removeSection);
      return;
    }

    const linkButton = event.target.closest('[data-remove-link]');
    if (linkButton) {
      removeLink(linkButton.dataset.removeLink);
      return;
    }

    const addLinkButton = event.target.closest('[data-add-link-to-section]');
    if (addLinkButton) {
      addLinkToSection(addLinkButton.dataset.addLinkToSection);
    }
  });
}

function initialize() {
  resetStateToTemplate('saas');
  attachEventHandlers();
  selectTab('llms');
  renderValidation();
}

initialize();
