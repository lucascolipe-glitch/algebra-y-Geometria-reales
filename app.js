(() => {
  'use strict';

  const STORAGE_KEY = 'algebra-reales-progress-v1';
  const DEFAULT_STATE = { completed: {}, lastModule: 'inicio', quizBest: 0 };
  let state = loadState();
  let toastTimer;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    renderSteppers();
    setupNavigation();
    setupProgressButtons();
    setupClassifier();
    setupTrueFalse();
    setupIntervalBuilder();
    setupSetOperations();
    setupStrategyActivity();
    setupSignActivity();
    setupDomainLab();
    setupAbsoluteExplorer();
    setupAbsoluteCases();
    setupLogChallenges();
    setupVideos();
    setupSimulators();
    setupQuiz();
    setupGlobalActions();
    restoreCompletionButtons();
    updateProgress();

    const initialTarget = location.hash.replace('#', '') || state.lastModule || 'inicio';
    showModule(document.getElementById(initialTarget) ? initialTarget : 'inicio', false);
    typeset();
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return { ...DEFAULT_STATE, ...(saved || {}), completed: { ...(saved?.completed || {}) } };
    } catch {
      return { ...DEFAULT_STATE };
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function typeset(elements) {
    if (!window.MathJax?.typesetPromise) return;
    const targets = elements ? (Array.isArray(elements) ? elements : [elements]) : undefined;
    window.MathJax.typesetPromise(targets).catch(() => {});
  }

  function selectedRadioValue(name, root = document) {
    return $$('input[type="radio"]', root).find((input) => input.name === name && input.checked)?.value || '';
  }

  function renderChoiceCards(name, options, ariaLabel, extraClass = '') {
    return `<div class="choice-cards ${extraClass}" role="radiogroup" aria-label="${escapeHtml(ariaLabel)}">
      ${options.map((option, index) => {
        const value = typeof option === 'string' ? String(index) : option.value;
        const label = typeof option === 'string' ? option : option.label;
        return `<label class="choice-card">
          <input type="radio" name="${escapeHtml(name)}" value="${escapeHtml(value)}">
          <span class="choice-card__content">${label}</span>
        </label>`;
      }).join('')}
    </div>`;
  }

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  function markCompleted(key, silent = false) {
    if (!state.completed[key]) {
      state.completed[key] = true;
      saveState();
      updateProgress();
      if (!silent) showToast('Progreso guardado en este dispositivo.');
    }
  }

  function setupNavigation() {
    const sidebar = $('#sidebar');
    const menuButton = $('#menuButton');

    $('#moduleNav').addEventListener('click', (event) => {
      const button = event.target.closest('[data-target]');
      if (!button) return;
      showModule(button.dataset.target);
      sidebar.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });

    $$('[data-go]').forEach((button) => {
      button.addEventListener('click', () => showModule(button.dataset.go));
    });

    menuButton.addEventListener('click', () => {
      const open = sidebar.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', (event) => {
      if (window.innerWidth > 820) return;
      if (!sidebar.classList.contains('open')) return;
      if (sidebar.contains(event.target) || menuButton.contains(event.target)) return;
      sidebar.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });

    window.addEventListener('hashchange', () => {
      const target = location.hash.replace('#', '');
      if (target && document.getElementById(target)) showModule(target, false);
    });
  }

  function showModule(id, updateHash = true) {
    $$('.module').forEach((section) => {
      const active = section.id === id;
      section.hidden = !active;
      section.classList.toggle('active', active);
    });
    $$('.nav-item').forEach((button) => button.classList.toggle('active', button.dataset.target === id));
    state.lastModule = id;
    saveState();
    if (updateHash) history.pushState(null, '', `#${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    typeset(document.getElementById(id));
  }

  function setupProgressButtons() {
    $$('[data-complete]').forEach((button) => {
      button.addEventListener('click', () => {
        const key = `module:${button.dataset.complete}`;
        const done = !state.completed[key];
        state.completed[key] = done;
        button.classList.toggle('done', done);
        button.textContent = done ? '✓ Módulo revisado' : 'Marcar módulo como revisado';
        saveState();
        updateProgress();
      });
    });
  }

  function restoreCompletionButtons() {
    $$('[data-complete]').forEach((button) => {
      const done = Boolean(state.completed[`module:${button.dataset.complete}`]);
      button.classList.toggle('done', done);
      button.textContent = done ? '✓ Módulo revisado' : 'Marcar módulo como revisado';
    });
  }

  function updateProgress() {
    const trackedKeys = [
      'module:conjuntos', 'module:intervalos', 'module:ecuaciones', 'module:inecuaciones',
      'module:dominio', 'module:valor-absoluto', 'module:logaritmos', 'module:modelizacion',
      'activity:classifier', 'activity:truefalse', 'activity:sets', 'activity:strategy',
      'activity:sign', 'activity:domain', 'activity:absolute-cases', 'activity:logs',
      'activity:quiz', 'stepper:quadratic', 'stepper:biquadratic', 'stepper:radical',
      'stepper:rationalEquation', 'stepper:logarithmicEquation', 'stepper:productInequality',
      'stepper:rationalInequality', 'stepper:absoluteInequality', 'stepper:boxModel'
    ];
    const done = trackedKeys.filter((key) => state.completed[key]).length;
    const percent = Math.round((done / trackedKeys.length) * 100);
    $('#progressText').textContent = `${percent}%`;
    $('#progressBar').style.width = `${percent}%`;
    $('#progressDetail').textContent = `${done} de ${trackedKeys.length} hitos completados.`;
  }

  function renderSteppers() {
    const examples = window.APP_CONTENT?.guidedExamples || {};
    $$('[data-stepper]').forEach((container) => {
      const key = container.dataset.stepper;
      const data = examples[key];
      if (!data) return;

      container.innerHTML = `
        <div class="stepper-header">
          <div><h3>${data.title}</h3><p>${data.source}</p></div>
          <span class="step-count" aria-live="polite">0 / ${data.steps.length} pasos</span>
        </div>
        <div class="stepper-statement">${data.statement}</div>
        <div class="stepper-body"><div class="step-list">
          ${data.steps.map((step, index) => `<div class="step-item" data-step-index="${index}"><h4>Paso ${index + 1} · ${step.label}</h4><div>${step.html}</div></div>`).join('')}
        </div></div>
        <div class="step-controls">
          <button class="button ghost step-prev" type="button" disabled>Anterior</button>
          <button class="button primary step-next" type="button">Mostrar primer paso</button>
          <button class="button ghost step-reset" type="button">Reiniciar</button>
        </div>`;

      let visibleCount = 0;
      const count = $('.step-count', container);
      const prev = $('.step-prev', container);
      const next = $('.step-next', container);
      const reset = $('.step-reset', container);
      const items = $$('.step-item', container);

      const update = () => {
        items.forEach((item, index) => item.classList.toggle('visible', index < visibleCount));
        count.textContent = `${visibleCount} / ${items.length} pasos`;
        prev.disabled = visibleCount === 0;
        next.disabled = visibleCount === items.length;
        next.textContent = visibleCount === 0 ? 'Mostrar primer paso' : visibleCount === items.length - 1 ? 'Mostrar conclusión' : 'Siguiente paso';
        if (visibleCount === items.length) {
          markCompleted(`stepper:${key}`, true);
          count.textContent = `✓ ${items.length} / ${items.length} pasos`;
        }
        typeset(container);
      };

      prev.addEventListener('click', () => { visibleCount = Math.max(0, visibleCount - 1); update(); });
      next.addEventListener('click', () => { visibleCount = Math.min(items.length, visibleCount + 1); update(); });
      reset.addEventListener('click', () => { visibleCount = 0; update(); });
      update();
    });
  }

  function setupClassifier() {
    const data = [
      { latex: String.raw`\(7\)`, answer: 'N' },
      { latex: String.raw`\(0\)`, answer: 'N0' },
      { latex: String.raw`\(-4\)`, answer: 'Z' },
      { latex: String.raw`\(\frac35\)`, answer: 'Q' },
      { latex: String.raw`\(\sqrt2\)`, answer: 'I' },
      { latex: String.raw`\(\pi-3\)`, answer: 'I' }
    ];
    const setOptions = [
      { value: 'N', label: String.raw`\(\mathbb N\)` },
      { value: 'N0', label: String.raw`\(\mathbb N_0\)` },
      { value: 'Z', label: String.raw`\(\mathbb Z\)` },
      { value: 'Q', label: String.raw`\(\mathbb Q\)` },
      { value: 'I', label: String.raw`\(\mathbb I\)` }
    ];
    const grid = $('#classifierGrid');
    grid.innerHTML = data.map((item, index) => {
      const name = `classifier-${index}`;
      return `<fieldset class="classifier-item" data-answer="${item.answer}" data-radio-name="${name}">
        <legend class="number"><span class="sr-only">Número ${index + 1}: </span>${item.latex}</legend>
        ${renderChoiceCards(name, setOptions, `Clasificar el número ${index + 1}`, 'choice-cards--sets')}
      </fieldset>`;
    }).join('');
    typeset(grid);

    $('#checkClassifier').addEventListener('click', () => {
      const items = $$('.classifier-item', grid);
      let correct = 0;
      items.forEach((item) => {
        const ok = selectedRadioValue(item.dataset.radioName, item) === item.dataset.answer;
        item.classList.toggle('good', ok);
        item.classList.toggle('bad', !ok);
        if (ok) correct += 1;
      });
      const feedback = $('#classifierFeedback');
      feedback.className = `feedback show ${correct === data.length ? 'correct' : 'incorrect'}`;
      feedback.textContent = correct === data.length
        ? '¡Muy bien! Elegiste en cada caso el conjunto más pequeño.'
        : `Hay ${correct} de ${data.length} respuestas correctas. Revisá especialmente la diferencia entre ℕ, ℕ₀, ℤ y ℚ.`;
      if (correct === data.length) markCompleted('activity:classifier');
    });

    $('#resetClassifier').addEventListener('click', () => {
      $$('.classifier-item', grid).forEach((item) => {
        $$('input[type="radio"]', item).forEach((input) => { input.checked = false; });
        item.classList.remove('good', 'bad');
      });
      $('#classifierFeedback').className = 'feedback';
    });
  }

  function setupTrueFalse() {
    const statements = [
      { text: String.raw`Para todo \(a\in\mathbb R\), existe \(\frac{1}{a}\in\mathbb R\).`, answer: false, explanation: String.raw`Falso. Si \(a=0\), \(1/a\) no está definido.` },
      { text: String.raw`Si \(a\lt b\), entonces \(ac\lt bc\) para todo \(c\in\mathbb R\).`, answer: false, explanation: String.raw`Falso. Si \(c\lt 0\), el sentido se invierte; si \(c=0\), los productos son iguales.` },
      { text: String.raw`Si \(a\lt b\), entonces \(a-b\lt 0\).`, answer: true, explanation: String.raw`Verdadero. Restar \(b\) en ambos miembros da \(a-b\lt 0\).` },
      { text: String.raw`Si \(a\lt b\), entonces \(a^2\lt b^2\).`, answer: false, explanation: String.raw`Falso. Por ejemplo, \(-3\lt -2\), pero \(9\gt 4\).` }
    ];
    const root = $('#vfList');
    root.innerHTML = statements.map((item, index) => `
      <div class="vf-item" data-answer="${item.answer}" data-index="${index}">
        <div class="vf-question"><span>${item.text}</span><button type="button" data-value="true">Verdadero</button><button type="button" data-value="false">Falso</button></div>
        <div class="vf-explanation">${item.explanation}</div>
      </div>`).join('');

    root.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-value]');
      if (!button) return;
      const item = button.closest('.vf-item');
      const ok = button.dataset.value === item.dataset.answer;
      item.classList.add('answered');
      $$('.vf-question button', item).forEach((b) => {
        b.disabled = true;
        if (b === button) {
          b.style.background = ok ? 'var(--green-soft)' : 'var(--red-soft)';
          b.style.color = ok ? 'var(--green)' : 'var(--red)';
        }
      });
      item.dataset.resolved = 'true';
      if ($$('.vf-item[data-resolved="true"]', root).length === statements.length) markCompleted('activity:truefalse');
      typeset(item);
    });
  }

  function setupIntervalBuilder() {
    const leftInput = $('#leftEndpoint');
    const rightInput = $('#rightEndpoint');
    const leftClosed = $('#leftClosed');
    const rightClosed = $('#rightClosed');
    const line = $('#intervalLine');

    const update = () => {
      let left = Number(leftInput.value);
      let right = Number(rightInput.value);
      if (!Number.isFinite(left)) left = -2;
      if (!Number.isFinite(right)) right = 4;
      if (left >= right) {
        right = left + 1;
        rightInput.value = right;
      }
      const lSymbol = leftClosed.checked ? '[' : '(';
      const rSymbol = rightClosed.checked ? ']' : ')';
      $('#intervalNotation').textContent = `${lSymbol}${formatNumber(left)}, ${formatNumber(right)}${rSymbol}`;
      $('#intervalSet').textContent = `{x ∈ ℝ : ${formatNumber(left)} ${leftClosed.checked ? '≤' : '<'} x ${rightClosed.checked ? '≤' : '<'} ${formatNumber(right)}}`;
      line.innerHTML = makeIntervalSvg(left, right, leftClosed.checked, rightClosed.checked);
    };

    [leftInput, rightInput, leftClosed, rightClosed].forEach((control) => control.addEventListener('input', update));
    update();
  }

  function makeIntervalSvg(left, right, leftClosed, rightClosed) {
    const min = Math.floor(left - Math.max(2, (right - left) * .3));
    const max = Math.ceil(right + Math.max(2, (right - left) * .3));
    const width = 720;
    const height = 110;
    const x = (value) => 50 + ((value - min) / (max - min)) * (width - 100);
    const ticks = [];
    const step = max - min > 14 ? 2 : 1;
    for (let value = Math.ceil(min / step) * step; value <= max; value += step) {
      ticks.push(`<line x1="${x(value)}" y1="45" x2="${x(value)}" y2="57" stroke="#627087"/><text x="${x(value)}" y="76" text-anchor="middle" font-size="12" fill="#627087">${formatNumber(value)}</text>`);
    }
    const leftPoint = leftClosed
      ? `<circle cx="${x(left)}" cy="51" r="7" fill="#2f6fed"/>`
      : `<circle cx="${x(left)}" cy="51" r="7" fill="#fff" stroke="#2f6fed" stroke-width="4"/>`;
    const rightPoint = rightClosed
      ? `<circle cx="${x(right)}" cy="51" r="7" fill="#2f6fed"/>`
      : `<circle cx="${x(right)}" cy="51" r="7" fill="#fff" stroke="#2f6fed" stroke-width="4"/>`;
    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Intervalo desde ${left} hasta ${right}">
      <defs><marker id="arrowL" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto"><path d="M8,0 L0,4 L8,8" fill="none" stroke="#627087"/></marker><marker id="arrowR" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="none" stroke="#627087"/></marker></defs>
      <line x1="40" y1="51" x2="680" y2="51" stroke="#627087" stroke-width="2" marker-start="url(#arrowL)" marker-end="url(#arrowR)"/>
      ${ticks.join('')}
      <line x1="${x(left)}" y1="51" x2="${x(right)}" y2="51" stroke="#2f6fed" stroke-width="10" stroke-linecap="round" opacity=".55"/>
      ${leftPoint}${rightPoint}
    </svg>`;
  }

  function setupSetOperations() {
    $('#checkSetOperations').addEventListener('click', () => {
      const ok = selectedRadioValue('unionAnswer') === 'correct' && selectedRadioValue('intersectionAnswer') === 'correct';
      const feedback = $('#setOperationsFeedback');
      feedback.className = `feedback show ${ok ? 'correct' : 'incorrect'}`;
      feedback.innerHTML = ok
        ? 'Correcto: \(A\cup B=(-2,6)\) y \(A\cap B=[0,2]\).'
        : 'Revisá: la unión reúne todo lo cubierto por ambos intervalos; la intersección conserva solo la zona común.';
      if (ok) markCompleted('activity:sets');
      typeset(feedback);
    });
  }

  function setupStrategyActivity() {
    const data = [
      { q: String.raw`\(x^4-10x^2+9=0\)`, options: ['Aplicar logaritmos', String.raw`Hacer \(y=x^2\)`, String.raw`Multiplicar por \(x\)`], answer: 1 },
      { q: String.raw`\(\sqrt{x}-2/\sqrt{x}=1\)`, options: [String.raw`Escribir primero \(x>0\)`, 'Cancelar las raíces', String.raw`Suponer \(x\lt 0\)`], answer: 0 },
      { q: String.raw`\(\frac{x+2}{x-2}=\frac{x+3}{x-3}+\frac2{(x-2)(x-3)}\)`, options: ['Eliminar denominadores sin restricciones', String.raw`Anotar \(x\ne2,3\)`, 'Tomar logaritmo'], answer: 1 },
      { q: String.raw`\(2^{x^2-x-3}=\frac12\)`, options: [String.raw`Escribir \(\frac12=2^{-1}\)`, 'Elevar al cuadrado', 'Factorizar el denominador'], answer: 0 }
    ];
    const root = $('#strategyQuestions');
    root.innerHTML = data.map((item, index) => `<div class="strategy-question" data-index="${index}">
      <p>${item.q}</p>
      ${renderChoiceCards(`strategy-${index}`, item.options, `Estrategia para la pregunta ${index + 1}`, 'choice-cards--strategy')}
    </div>`).join('');
    typeset(root);

    root.addEventListener('change', (event) => {
      const input = event.target.closest('input[type="radio"]');
      if (!input || input.disabled) return;
      const question = input.closest('.strategy-question');
      const index = Number(question.dataset.index);
      const choiceIndex = Number(input.value);
      const ok = choiceIndex === data[index].answer;
      $$('.choice-card', question).forEach((card) => card.classList.remove('correct', 'wrong'));
      input.closest('.choice-card').classList.add(ok ? 'correct' : 'wrong');
      if (ok) {
        $$('input[type="radio"]', question).forEach((radio) => { radio.disabled = true; });
        question.dataset.resolved = 'true';
        if ($$('.strategy-question[data-resolved="true"]', root).length === data.length) markCompleted('activity:strategy');
      }
      showToast(ok ? 'Buena elección: esa es la primera decisión útil.' : 'No es el mejor primer paso. Probá otra estrategia.');
    });
  }

  function setupSignActivity() {
    $('#checkSignSolution').addEventListener('click', () => {
      const selected = $('input[name="signSolution"]:checked');
      const ok = selected?.value === 'b';
      const feedback = $('#signSolutionFeedback');
      feedback.className = `feedback show ${ok ? 'correct' : 'incorrect'}`;
      feedback.innerHTML = ok
        ? 'Correcto. El numerador y el denominador tienen el mismo signo solo en \((1,5)\). Los extremos no se incluyen: \(1\) anula el denominador y \(5\) hace cero la fracción.'
        : 'Probá valores de cada intervalo: \(x=0\), \(x=2\) y \(x=6\). Recordá que la desigualdad es estricta.';
      if (ok) markCompleted('activity:sign');
      typeset(feedback);
    });
  }

  function setupDomainLab() {
    const exercises = [
      {
        expression: String.raw`\[\frac1{x^2-9}\]`,
        options: [
          { text: String.raw`\(x^2-9\ne0\)`, correct: true },
          { text: String.raw`\(x^2-9\ge0\)`, correct: false },
          { text: 'No hay restricciones', correct: false }
        ],
        result: String.raw`\(D=\mathbb R\setminus\{-3,3\}\)`
      },
      {
        expression: String.raw`\[\sqrt[3]{x-\frac54}\]`,
        options: [
          { text: String.raw`\(x-\frac54\ge0\)`, correct: false },
          { text: String.raw`\(x-\frac54\gt 0\)`, correct: false },
          { text: 'No hay restricciones: la raíz tiene índice impar', correct: true }
        ],
        result: String.raw`\(D=\mathbb R\)`
      },
      {
        expression: String.raw`\[\frac{\sqrt[4]{x+3}}{x-2}\]`,
        options: [
          { text: String.raw`\(x+3\ge0\)`, correct: true },
          { text: String.raw`\(x-2\ne0\)`, correct: true },
          { text: String.raw`\(x+3\gt 0\)`, correct: false },
          { text: 'No hay restricciones', correct: false }
        ],
        result: String.raw`\(D=[-3,2)\cup(2,+\infty)\)`
      },
      {
        expression: String.raw`\[\frac{\sqrt{x^2-4}}{\log(x+5)}\]`,
        options: [
          { text: String.raw`\(x^2-4\ge0\)`, correct: true },
          { text: String.raw`\(x+5\gt  0\)`, correct: true },
          { text: String.raw`\(\log(x+5)\ne0\)`, correct: true },
          { text: String.raw`\(x^2-4>0\)`, correct: false }
        ],
        result: String.raw`\(D=(-5,-4)\cup(-4,-2]\cup[2,+\infty)\)`
      }
    ];
    let index = 0;
    const expression = $('#domainExpression');
    const optionsRoot = $('#domainOptions');
    const feedback = $('#domainFeedback');
    const next = $('#nextDomain');

    const render = () => {
      const item = exercises[index];
      expression.innerHTML = item.expression;
      optionsRoot.innerHTML = item.options.map((option, i) => `<label><input type="checkbox" data-index="${i}"> <span>${option.text}</span></label>`).join('');
      $('#domainCounter').textContent = `${index + 1} / ${exercises.length}`;
      feedback.className = 'feedback';
      next.disabled = true;
      next.textContent = index === exercises.length - 1 ? 'Finalizar' : 'Siguiente expresión';
      typeset([expression, optionsRoot]);
    };

    $('#checkDomain').addEventListener('click', () => {
      const selected = new Set($$('input:checked', optionsRoot).map((input) => Number(input.dataset.index)));
      const correctSet = new Set(exercises[index].options.map((o, i) => o.correct ? i : null).filter((i) => i !== null));
      const ok = selected.size === correctSet.size && [...selected].every((i) => correctSet.has(i));
      feedback.className = `feedback show ${ok ? 'correct' : 'incorrect'}`;
      feedback.innerHTML = ok ? `Correcto. ${exercises[index].result}` : 'Todavía no. Revisá cada operación: denominador, raíz par/impar y logaritmo pueden imponer restricciones diferentes.';
      next.disabled = !ok;
      typeset(feedback);
    });

    next.addEventListener('click', () => {
      if (index < exercises.length - 1) {
        index += 1;
        render();
      } else {
        markCompleted('activity:domain');
        next.disabled = true;
        showToast('Laboratorio de dominio completado.');
      }
    });
    render();
  }

  function setupAbsoluteExplorer() {
    const slider = $('#absoluteSlider');
    const line = $('#absoluteLine');
    const update = () => {
      const value = Number(slider.value);
      $('#absoluteX').textContent = formatNumber(value);
      $('#absoluteValue').textContent = `|${formatNumber(value)}| = ${formatNumber(Math.abs(value))}`;
      line.innerHTML = makeAbsoluteSvg(value);
    };
    slider.addEventListener('input', update);
    update();
  }

  function makeAbsoluteSvg(value) {
    const min = -8, max = 8, width = 720, height = 115;
    const x = (v) => 50 + ((v - min) / (max - min)) * (width - 100);
    const ticks = [];
    for (let i = min; i <= max; i += 1) {
      ticks.push(`<line x1="${x(i)}" y1="48" x2="${x(i)}" y2="58" stroke="#627087"/><text x="${x(i)}" y="76" text-anchor="middle" font-size="11" fill="#627087">${i}</text>`);
    }
    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Distancia entre ${value} y cero">
      <line x1="45" y1="53" x2="675" y2="53" stroke="#627087" stroke-width="2"/>
      ${ticks.join('')}
      <line x1="${x(0)}" y1="35" x2="${x(value)}" y2="35" stroke="#2f6fed" stroke-width="6" stroke-linecap="round"/>
      <circle cx="${x(0)}" cy="53" r="6" fill="#173d7a"/><circle cx="${x(value)}" cy="53" r="8" fill="#2f6fed"/>
      <text x="${(x(0)+x(value))/2}" y="24" text-anchor="middle" font-size="14" font-weight="700" fill="#173d7a">distancia = ${formatNumber(Math.abs(value))}</text>
    </svg>`;
  }

  function setupAbsoluteCases() {
    $('#checkCases').addEventListener('click', () => {
      const ok = selectedRadioValue('caseA') === 'correct' && selectedRadioValue('caseB') === 'correct';
      const feedback = $('#casesFeedback');
      feedback.className = `feedback show ${ok ? 'correct' : 'incorrect'}`;
      feedback.innerHTML = ok
        ? 'Correcto. La primera rama da \(x=-\frac15\), que cumple \(x\ge-\frac72\). La segunda da \(x=13\), pero no cumple \(x<-\frac72\). Entonces \(S=\{-\frac15\}\).'
        : 'Revisá la definición: si la expresión interior es negativa, el valor absoluto cambia su signo.';
      if (ok) markCompleted('activity:absolute-cases');
      typeset(feedback);
    });
  }

  function setupLogChallenges() {
    const data = [
      { q: String.raw`\(\log_2 16\)`, answer: '4' },
      { q: String.raw`\(\log_5 125\)`, answer: '3' },
      { q: String.raw`\(\log_3 \frac19\)`, answer: '-2' },
      { q: String.raw`\(\log_7\sqrt[3]7\)`, answer: '1/3' }
    ];
    const root = $('#logChallenges');
    root.innerHTML = data.map((item, index) => `<div class="log-challenge"><div>${item.q}</div><input type="text" data-index="${index}" inputmode="decimal" placeholder="Exponente"></div>`).join('');
    $('#checkLogs').addEventListener('click', () => {
      let correct = 0;
      $$('.log-challenge', root).forEach((card, index) => {
        const value = normalizeMathAnswer($('input', card).value);
        const ok = value === normalizeMathAnswer(data[index].answer);
        card.classList.toggle('good', ok);
        card.classList.toggle('bad', !ok);
        if (ok) correct += 1;
      });
      const feedback = $('#logFeedback');
      feedback.className = `feedback show ${correct === data.length ? 'correct' : 'incorrect'}`;
      feedback.textContent = correct === data.length ? '¡Excelente! En todos los casos encontraste el exponente correcto.' : `${correct} de ${data.length} correctas. Volvé a la equivalencia log_b(a)=x ⇔ b^x=a.`;
      if (correct === data.length) markCompleted('activity:logs');
    });
  }

  function setupVideos() {
    $$('.load-video').forEach((button) => {
      button.addEventListener('click', () => {
        const card = button.closest('[data-video-id]');
        const id = card.dataset.videoId;
        const placeholder = $('.video-placeholder', card);
        placeholder.outerHTML = `<iframe class="video-frame" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0" title="Video de apoyo" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
        button.disabled = true;
        button.textContent = 'Video cargado';
      });
    });
  }

  function setupSimulators() {
    const gradeSlider = $('#gradeSlider');
    const updateGrade = () => {
      const grade = Number(gradeSlider.value);
      const average = (356 + grade) / 5;
      $('#gradeValue').textContent = grade;
      $('#averageValue').textContent = average.toFixed(1);
      let result = 'No alcanza una beca';
      if (average >= 90 && average <= 100) result = 'Beca completa';
      else if (average >= 80 && average < 90) result = 'Beca de transporte';
      $('#scholarshipResult').textContent = result;
    };
    gradeSlider.addEventListener('input', updateGrade);
    updateGrade();

    const distanceSlider = $('#distanceSlider');
    const updateTemperature = () => {
      const distance = Number(distanceSlider.value);
      const temp = 15000 / (distance ** 2 + 80);
      $('#distanceValue').textContent = distance.toFixed(1);
      $('#temperatureValue').textContent = `${temp.toFixed(2)} °C`;
      $('#temperatureStatus').textContent = temp < 100 ? 'Sí' : 'No';
    };
    distanceSlider.addEventListener('input', updateTemperature);
    updateTemperature();

    const carSlider = $('#carCostSlider');
    const money = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
    const updateCar = () => {
      const second = Number(carSlider.value);
      const first = 30000000 - second;
      const profit = .30 * first - .05 * second;
      $('#carCostValue').textContent = money.format(second);
      $('#profitValue').textContent = money.format(profit);
      $('#profitStatus').textContent = profit >= 6000000 ? 'Se alcanza' : 'No se alcanza';
    };
    carSlider.addEventListener('input', updateCar);
    updateCar();
  }

  function setupQuiz() {
    const allQuestions = window.APP_CONTENT?.quizQuestions || [];
    let quizQuestions = [];
    let current = 0;
    let score = 0;
    let answered = false;

    $('#startQuiz').addEventListener('click', start);
    $('#submitQuizAnswer').addEventListener('click', submit);
    $('#nextQuizQuestion').addEventListener('click', next);

    function start() {
      quizQuestions = shuffle([...allQuestions]).slice(0, 10);
      current = 0;
      score = 0;
      answered = false;
      $('#quizIntro').hidden = true;
      $('#quizResult').hidden = true;
      $('#quizShell').hidden = false;
      renderQuestion();
    }

    function renderQuestion() {
      const question = quizQuestions[current];
      $('#quizProgress').textContent = `Pregunta ${current + 1} de ${quizQuestions.length}`;
      $('#quizScore').textContent = `Puntaje: ${score}`;
      $('#quizCard').innerHTML = `
        <p class="tag">${question.module}</p>
        <h3>${question.prompt}</h3>
        <div class="quiz-options">
          ${question.options.map((option, index) => `<label class="quiz-option"><input type="radio" name="quizOption" value="${index}"><span>${option}</span></label>`).join('')}
        </div>
        <div class="quiz-feedback" hidden></div>`;
      answered = false;
      $('#submitQuizAnswer').hidden = false;
      $('#nextQuizQuestion').hidden = true;
      typeset($('#quizCard'));
    }

    function submit() {
      if (answered) return;
      const selected = $('input[name="quizOption"]:checked');
      if (!selected) {
        showToast('Elegí una opción antes de responder.');
        return;
      }
      answered = true;
      const question = quizQuestions[current];
      const chosen = Number(selected.value);
      const ok = chosen === question.answer;
      if (ok) score += 1;
      $$('.quiz-option', $('#quizCard')).forEach((label, index) => {
        $('input', label).disabled = true;
        if (index === question.answer) label.classList.add('correct');
        else if (index === chosen) label.classList.add('wrong');
      });
      const feedback = $('.quiz-feedback', $('#quizCard'));
      feedback.hidden = false;
      feedback.innerHTML = `<strong>${ok ? 'Correcto.' : 'Revisemos.'}</strong> ${question.feedback}`;
      $('#quizScore').textContent = `Puntaje: ${score}`;
      $('#submitQuizAnswer').hidden = true;
      $('#nextQuizQuestion').hidden = false;
      $('#nextQuizQuestion').textContent = current === quizQuestions.length - 1 ? 'Ver resultado' : 'Siguiente';
      typeset(feedback);
    }

    function next() {
      if (current < quizQuestions.length - 1) {
        current += 1;
        renderQuestion();
      } else {
        finish();
      }
    }

    function finish() {
      $('#quizShell').hidden = true;
      const result = $('#quizResult');
      result.hidden = false;
      const percent = Math.round(score / quizQuestions.length * 100);
      const name = $('#studentName').value.trim();
      const message = percent >= 80
        ? 'Muy buen dominio. Probá ahora resolver ejercicios completos sin abrir los pasos.'
        : percent >= 60
          ? 'Buen avance. Revisá los módulos de las preguntas que fallaste y repetí la evaluación.'
          : 'Conviene volver a la teoría y completar los ejemplos guiados antes de repetir.';
      result.innerHTML = `
        <p class="tag">Resultado</p>
        <h3>${name ? `${escapeHtml(name)}, tu` : 'Tu'} autoevaluación terminó</h3>
        <div class="result-score">${score}/${quizQuestions.length}</div>
        <p><strong>${percent}%</strong> de respuestas correctas. ${message}</p>
        <p>Mejor puntaje guardado: <strong>${Math.max(state.quizBest || 0, score)}/${quizQuestions.length}</strong>.</p>
        <div class="result-actions"><button class="button primary" type="button" id="retryQuiz">Repetir con otras preguntas</button><button class="button secondary" type="button" id="printQuiz">Imprimir resultado</button></div>`;
      state.quizBest = Math.max(state.quizBest || 0, score);
      saveState();
      markCompleted('activity:quiz', true);
      $('#retryQuiz').addEventListener('click', start);
      $('#printQuiz').addEventListener('click', () => window.print());
    }
  }

  function setupGlobalActions() {
    $('#printButton').addEventListener('click', () => window.print());
    $('#resetProgressButton').addEventListener('click', () => {
      const accepted = window.confirm('¿Querés borrar todo el progreso guardado en este navegador?');
      if (!accepted) return;
      localStorage.removeItem(STORAGE_KEY);
      state = { ...DEFAULT_STATE, completed: {} };
      restoreCompletionButtons();
      updateProgress();
      showToast('Progreso reiniciado.');
    });
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function formatNumber(value) {
    return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2))).replace('.', ',');
  }

  function normalizeMathAnswer(value) {
    return String(value).trim().replace(/\s+/g, '').replace(',', '.').replace('−', '-');
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }
})();
