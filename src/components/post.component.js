import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { transformService } from '../services/transform.service';

export class PostComponent extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
  }
  
  async onShow() {
    this.loader.show();
    const fbData = await apiService.fetchPosts();
    const posts = transformService.fbObjectToArray(fbData);
    const html = posts.map(renderPost).join(' ');
    this.loader.hide();
    this.$el.insertAdjacentHTML('afterbegin', html)
  }

  onHide() {
    this.$el.innerHTML = '';
  }
}

function renderPost({title, type, fulltext, date}) {
  const tag = type === 'news'
    ? '<li class="tag tag-blue tag-rounded">Новость</li>'
    : '<li class="tag tag-rounded">Заметка</li>';

  const button = '<button class="button-round button-small button-primary">Сохранить</button>';

  return `
    <div class="panel">
      <div class="panel-head">
        <p class="panel-title">${title}</p>
        <ul class="tags">
          ${tag}
        </ul>
      </div>
      <div class="panel-body">
        <p class="multi-line">${fulltext}</p>
      </div>
      <div class="panel-footer w-panel-footer">
        <small>${date}</small>
        ${button}
      </div>
    </div>`
}