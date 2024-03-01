
import { EventBus } from "../../utils/eventBus";

const eventBus = new EventBus(20);

// eventBus.subscribe("testName", fun1);
// const { unSubscribe } = eventBus.subscribe("testName", fun2);
// unSubscribe();// 取消订阅fun2
// eventBus.emit("testName", "额外参数");