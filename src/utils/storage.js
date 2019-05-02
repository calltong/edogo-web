
export class Storages {
  save(cname, cvalue) {
    let message = JSON.stringify(cvalue);
    localStorage.setItem(cname, message);
  }

  load(cname) {
    let temp = localStorage.getItem(cname);
    if (temp !== undefined && temp !== '') {
      return JSON.parse(temp);
    } else {
      return undefined;
    }
  }
}

export const storage = new Storages()
export default storage
