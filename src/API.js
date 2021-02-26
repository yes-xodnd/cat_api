export function fetchPostList(count = 10) {
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Array(count).fill(''));
    }, 2000);  
  })
}