import Comment from './Comment';

export default class SportsReportWidget {
  constructor(parentEl, eventSourceUrl) {
    this.parentEl = parentEl;
    this.eventSourceUrl = eventSourceUrl;
    this.classes = this.constructor.classes;
  }

  static get classes() {
    return {
      widget: 'sports-report-widget',
      wrap: 'comments-wrap',
      comments: 'comments',
      error: 'error',
    };
  }

  static get markup() {
    return `
      <div class="${this.classes.wrap}">
        <div class="${this.classes.comments}">
        </div>
      </div>
      <p class="${this.classes.error} hidden">Нет связи с сервером</p>  
    `;
  }

  bindToDOM() {
    this.widget = document.createElement('div');
    this.widget.className = this.classes.widget;
    this.widget.innerHTML = this.constructor.markup;

    this.comments = this.widget.querySelector(`.${this.classes.comments}`);
    this.error = this.widget.querySelector(`.${this.classes.error}`);

    this.parentEl.append(this.widget);

    this.connect();
  }

  connect() {
    const eventSource = new EventSource(this.eventSourceUrl);

    eventSource.addEventListener('action', (evt) => this.addComment(evt));
    eventSource.addEventListener('freekick', (evt) => this.addComment(evt));
    eventSource.addEventListener('goal', (evt) => this.addComment(evt));
    eventSource.addEventListener('open', () => this.hideError());
    eventSource.addEventListener('error', () => this.showError());
  }

  addComment(evt) {
    const comment = new Comment(this.comments, evt);
    comment.bindToDOM();
  }

  hideError() {
    this.error.classList.add('hidden');
  }

  showError() {
    this.error.classList.remove('hidden');
  }
}
