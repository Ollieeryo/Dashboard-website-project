export const baseUrl = () => {
  let baseUrl;

  // 檢查是否在 localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    baseUrl = 'http://localhost:3000/api';
  } else {
    // 使用確定 IP 的網址
    baseUrl = 'http://20.205.21.105:3000/api';
  }

  return baseUrl;
};
