export default function debounce(fn, wait = 300) {
  let timeout = null;
  return function() {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  };
}
