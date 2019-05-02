import { http } from './util/http';

export default class ServiceAdmin {
  constructor(group, id, url) {
    this.group = group;
    this.id = id;
    this.url = url
  }

  // public function
  async register() {
    let url = `${this.url}/admin/status/${this.id}/online`;
    let result = await http.put(url);
    console.log('result online:', result);
    return result;
  }

  async unregister() {
    let url = `${this.url}/admin/status/${this.id}/offline`;
    let result = await http.put(url);
    console.log('result offline:', result);
    return result;
  }


  async collectSession(session_id) {
    let url = `${this.url}/session/${session_id}/get`;
    let result = await http.get(url);
    console.log('result collect user:', result);
    return result;
  }

  async answerUser(user_id, data) {
    let url = `${this.url}/user/${user_id}/answer`;
    let result = await http.post(url, data);
    console.log('result answer user:', result);
    return result;
  }
}
