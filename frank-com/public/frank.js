//使用CORS跨域
const request = new XMLHttpRequest();
request.open("GET", "http://qq.com:8888/friends.json");
request.onreadystatechange = () => {
  if (request.readyState === 4 && request.status === 200) {
    console.log(request.response);
  }
};
request.send();

//使用JSONP跨域
function jsonp(url) {
  return new Promise((resolve, reject) => {
    const random = "frankJSONPCallbackName" + Math.random();
    //随机生成函数名
    window[random] = (data) => {
      resolve(data);
    };
    const script = document.createElement("script");
    script.src = `${url}?callback=${random}`;
    script.onload = () => {
      script.remove(); //删除生成的script标签
    };
    script.onerror = () => {
      reject();
    };
    document.body.appendChild(script);
  });
}

jsonp("http://qq.com:8888/friends.js").then((data) => {
  console.log(data);
});
