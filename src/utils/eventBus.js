
export class EventBus {
    constructor(maxListeners) {
        // 用来存储发布订阅事件的集合
        this.eventMap = {};
        this.maxListeners = maxListeners || Infinity;
        this.callbackId = 0;
    }
    /**
     * 订阅
     * @param {事件名称} eventName
     * @param {事件函数} funCallback
     */
    subscribe(eventName, funCallback) {
        // 判断是否订阅过
        if (!Reflect.has(this.eventMap, eventName)) {
            Reflect.set(this.eventMap, eventName, {});
        }
        // 判断是否超过了最大监听数
        if (
            this.maxListeners !== Infinity &&
            Object.keys(this.eventMap[eventName]).length >= this.maxListeners
        ) {
            console.warn(`该事件${eventName}超过了最大监听数`);
        }
        // 以下原始订阅部分要做修改，因为存储结构从普通对象调整
        // ====> 修改前代码
        // this.eventMap[eventName].push(funCallback);
        // ====> 修改后代码
        const thisCallbackId = this.callbackId++;
        this.eventMap[eventName][thisCallbackId] = funCallback;
        // 用于取消订阅的函数
        const unSubscribe = () => {
            // 根据 callbackId 取消订阅对应的 funCallback
            delete this.eventMap[eventName][thisCallbackId];
            // 如果一个事件下的 funCallback 为空，清掉 eventName
            if (Object.keys(this.eventMap[eventName]).length === 0) {
                delete this.eventMap[eventName]
            }
        }
        return {
            unSubscribe
        }
    }
    /**
     * 只订阅一次
     * @param {*} evenName 
     * @param {*} callback 
     * @returns 
     */
    subscribeOne(evenName, callback) {
        if (!this.eventSet[evenName]) {
            this.eventSet[evenName] = {};
        }
        const theCallbackId = 'one' + this.callbackId++;
        this.eventSet[evenName][theCallbackId] = callback;
        // 取消订阅(这种订阅取消，只能通过)
        const unSubscribe = () => {
            // 根据callbackId去取消订阅对应的callback
            delete this.eventSet[eventName][theCallbackId]
            // 如果一个事件下的callback为空，直接清掉eventName
            if (Object.keys(this.eventSet[evenName]).length === 0) {
                delete this.eventSet[eventName]
            }
        }
        return unSubscribe
    }
    /**
     * 发布
     * @param {*} eventName 
     * @param  {...any} args 
     * @returns 
     */
    emit(eventName, ...args) {
        if (!Reflect.has(this.eventMap, eventName)) {
            console.warn(`从未订阅过此事件${eventName}`);
            return;
        }
        const callbackList = this.eventMap[eventName];
        // 因eventMap 结构变化后，一下发布调用函数部分会有变化
        // ====> 改动前
        // if (callbackList.length === 0) {
        //   console.warn(`该事件${eventName}下无可执行的订阅者`);
        //   return;
        // }

        // if (this.eventMap[eventName].length) {
        //   for (const fun of this.eventMap[eventName]) {
        //     fun.call(this, ...args);
        //   }
        // }
        if (Object.keys(callbackList).length === 0) {
            console.warn(`该事件${eventName}下无可执行的订阅者`);
            return;
        }

        // ====> 改动前
        // for (const callback of Object.values(callbackList)) {
        //     callback()
        // }
        for (const [id, callback] of Object.entries(callbackList)) {
            callback(...args);
            // 如果是只执行一次的订阅者 判断只订阅一次的回调函数要删除
            if (id.startsWith('one')) {
                delete callbackList[id];
            }
        }
    }
    /**
     * 清空某个事件名称下所有回调函数
     * @param {事件名称} eventName
     * @returns
     */
    clear(eventName) {
        if (!eventName) {
            console.warn(`需提供要被清除的事件名称${eventName}`);
            return;
        }
        // delete this.eventMap[eventName];
        Reflect.deleteProperty(this.eventMap, eventName);
    }
    /**
     * 清空事件监听函数
     */
    clearAll() {
        this.eventMap = {};
    }
}