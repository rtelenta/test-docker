export default (type = 'all') => {
    const iDevices = [];

    if (type === 'all' || type === 'other') {
      const other = ['iPad Simulator', 'iPod Simulator', 'iPod', 'iPad'];
      iDevices.push(...other);
    }

    if (type === 'all' || type === 'iphone') {
      const iphone = ['iPhone Simulator', 'iPhone'];
      iDevices.push(...iphone);
    }
  
    if (!!navigator.platform) {
      while (iDevices.length) {
        if (navigator.platform === iDevices.pop()){ return true; }
      }
    }
  
    return false;
}