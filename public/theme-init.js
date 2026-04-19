(function () {
  try {
    var k = 'sorgel-design-theme'
    var legacy = 'csoftware-theme'
    var s = localStorage.getItem(k)
    if (s == null) {
      var old = localStorage.getItem(legacy)
      if (old === 'light' || old === 'dark') {
        localStorage.setItem(k, old)
        localStorage.removeItem(legacy)
        s = old
      }
    }
    var dark =
      s === 'dark' ||
      (s !== 'light' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.toggle('dark', dark)
  } catch (e) {}
})()
