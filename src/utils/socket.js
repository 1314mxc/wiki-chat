
import { ref } from 'vue'

export let data = ref(null);
let timeout = 28 * 1000; //30秒一次心跳
let timeoutObj = null; //心跳心跳倒计时
let serverTimeoutObj = null; //心跳倒计时
let timeoutnum = null; //断开 重连倒计时
let websocket = null;
let lockReconnect = false;

//socket--start
export function initWebSocket(url) {
    // let url = ''
    websocket = new WebSocket(url)
    // 连接错误
    websocket.onerror = setErrorMessage

    // 连接成功
    websocket.onopen = setOnopenMessage

    // 收到消息的回调
    websocket.onmessage = setOnmessageMessage

    // 连接关闭的回调
    websocket.onclose = setOncloseMessage

    // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = onbeforeunload
}

export function reconnect() { // 重新连接
    if (lockReconnect) return;
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    timeoutnum && clearTimeout(timeoutnum);
    timeoutnum = setTimeout(() => {
        //新连接
        initWebSocket();
        lockReconnect = false;
    }, 5000);
}

export function reset() { // 重置心跳
    // 清除时间
    clearTimeout(timeoutObj);
    clearTimeout(serverTimeoutObj);
    // 重启心跳
    start();
}

export function start() { // 开启心跳
    timeoutObj && clearTimeout(timeoutObj);
    serverTimeoutObj && clearTimeout(serverTimeoutObj);
    timeoutObj = setTimeout(() => {
        // 这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (websocket && websocket.readyState == 1) { // 如果连接正常
            let actions = { "heartbeat": "12345" };
            websocketsend(JSON.stringify(actions));
        } else { // 否则重连
            reconnect();
        }
        serverTimeoutObj = setTimeout(() => {
            //超时关闭
            websocket.close();
        }, timeout);

    }, timeout)
}

export function setOnmessageMessage(event) {
    let obj = JSON.parse(event.data);
    console.log("obj", obj)
    switch (obj.type) {
        case 'heartbeat':
            //收到服务器信息，心跳重置
            reset();
            break;
        case 'sendMessage':
            data.value = obj.data
            console.log("接收到的服务器消息：", obj.data)
    }

}

export function setErrorMessage() {
    //重连
    reconnect();
    console.log("WebSocket连接发生错误" + '   状态码：' + websocket.readyState)
}

export function setOnopenMessage() {
    //开启心跳
    start();
    console.log("WebSocket连接成功" + '   状态码：' + websocket.readyState)
}

export function setOncloseMessage() {
    //重连
    reconnect();
    console.log("WebSocket连接关闭" + '   状态码：' + websocket.readyState)
}

export function onbeforeunload() {
    closeWebSocket();
}

//websocket发送消息
export function websocketsend(messsage) {
    websocket.send(messsage)
}

export function closeWebSocket() { // 关闭websocket
    websocket.close()
}
//socket--end

