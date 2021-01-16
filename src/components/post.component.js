import { Component } from '../core/component';
import { apiService } from '../services/api.service';
import { transformService } from '../services/transform.service';

export class PostComponent extends Component {
  constructor(id) {
    super(id)
  }
  
  async onShow() {
    const fbData = await apiService.fetchPosts();
    const posts = transformService.fbObjectToArray(fbData);
    console.log(posts);
  }
}