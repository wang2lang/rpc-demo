# rpc-demo

> 前端RPC通信demo，包括h5与移动客户端通信原理、iframe与外壳通信原理和跨tab页面通信原理

## Build Setup

``` bash
# install dependencies
npm install

# install http-server
npm install -g http-server-spa

# serve for shared-variable at localhost:8080
npm run build:sharedVariable

http-server-spa dist/shared-variable


# serve for post-message at localhost:8080
npm run build:postMessage

http-server-spa dist/post-message

# serve for shared-storage at localhost:8080 and localhost:8080/b.html
npm run build:sharedStorage

http-server-spa dist/shared-storage

```
