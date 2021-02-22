const urlBase = 'https://jsonplaceholder.typicode.com';

export function fetchPostAll() {
  const url = urlBase + '/posts';
  return fetch(url)
  .then(r => r.json())
  .then(result => result)
  .catch(e => alert('오류가 발생했습니다. \n 다시 시도해주세요.'));
}

export function fetchPostList(lastIndex = 0, count = 20) {
  
}