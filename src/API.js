const urlBase = 'https://jsonplaceholder.typicode.com';

export function fetchArticleAll() {
  const url = urlBase + '/posts';
  return fetch(url)
  .then(r => r.json())
  .then(result => result)
  .catch(() => alert('알 수 없는 오류가 발생했습니다. \n 다시 시도해주세요.'))
}