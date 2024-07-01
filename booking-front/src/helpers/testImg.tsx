export function testImage(url: string) {
  var tester = new Image();
  tester.addEventListener('load', () => imageFound(url));
  
  tester.addEventListener('error', () => imageNotFound(url));


  tester.src = url;
}

function imageFound(url: string) {
  // console.log(`Image ${url} is found and loaded`);
  return true;
}

function imageNotFound(url: string) {
  // console.log(`Image ${url} was not found`);
  return false;
}

// testImage("http://foo.com/bar.jpg");
