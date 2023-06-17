const getPath = (path) => {
  const prefix = '/mock-images/';
  return path.startsWith('http') ? path : prefix + path;
}
