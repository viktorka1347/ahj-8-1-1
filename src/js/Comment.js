import moment from 'moment';

export default class Comment {
  constructor(parentEl, comment) {
    this.parentEl = parentEl;
    this.comment = comment;
    this.classes = this.constructor.classes;
  }

  static get classes() {
    return {
      widget: 'comment',
      icon: 'icon',
      text: 'text',
    };
  }

  static get markup() {
    return `
      <div class="${this.classes.icon}"></div>
      <div class="${this.classes.text}">
        <time datetime="2000">qqqq</time>
        <p></p>
      </div>
    `;
  }

  bindToDOM() {
    this.widget = document.createElement('div');
    this.widget.className = this.classes.widget;
    this.widget.innerHTML = this.constructor.markup;

    const data = JSON.parse(this.comment.data);

    this.icon = this.widget.querySelector(`.${this.classes.icon}`);
    switch (this.comment.type) {
      case 'freekick':
        this.icon.classList.add('red');
        this.icon.innerHTML = '!!';
        break;
      case 'goal':
        this.icon.innerHTML = '&#x26BD;';
        break;
      default:
        this.icon.innerHTML = '&nbsp;';
    }

    this.text = this.widget.querySelector(`.${this.classes.text} p`);
    this.text.innerHTML = data.text;

    this.time = this.widget.querySelector(`.${this.classes.text} time`);
    this.time.innerHTML = moment(data.time).format('HH:mm:ss  DD.MM.YY');

    this.parentEl.append(this.widget);
  }
}

/*
<div class="comment">
  <div class="icon red">!!</div>
  <div class="text">
    <time datetime="2000">22:08:00&nbsp;&nbsp;22.01.19</time>
    <p>
      Игра началась
    </p>
  </div>
</div>
<div class="comment">
  <div class="icon">&#x26BD;</div>
  <div class="text">
    <time datetime="2000">22:08:00&nbsp;&nbsp;22.01.19</time>
    <p>
      Арбитр кашляет, чихает... Какой дриблинг!
    </p>
  </div>
</div>
<div class="comment">
  <div class="icon">&nbsp;</div>
  <div class="text">
    <time datetime="2000">22:08:00&nbsp;&nbsp;22.01.19</time>
    <p>
      Игра началась
    </p>
  </div>
</div>
*/
