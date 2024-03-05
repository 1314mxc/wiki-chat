<script setup>
    import { onMounted, ref, reactive, provide } from 'vue'
    import Ms from './ms.vue'

    import { setListArr, addListItem } from './index.js'
    import { getName } from '@/utils/auth'

    const textarea = ref('')
    const popupData = reactive({
        popupTop: 0,
        popupLeft: 0
    })
    const text = ref('')
    const watching = ref(0)
    const showTip = ref(false)
    const showTextBar = ref(false)

    let x = 0, y = 0;
    let _text = "";

    const handleCheck = (val) => {
        if(val == 1) {
            showTextBar.value = true;
            text.value = _text;
        }
        showTip.value = false;
    }

    const selectCheck = () => {
        let mouse = document.querySelector('.r-top');
        console.log(mouse)
        mouse.addEventListener('mousedown', (e) => {
            watching.value = 1;
            showTip.value = false;
            x = e.clientX;
            y = e.clientY;
        })
        mouse.addEventListener('mousemove', (e) => {
            if (watching.value == 1) {
                if(Math.abs(e.clientX - x) > 0 || Math.abs(e.clientY - y) > 0) {
                    watching.value = 2;
                }
            }
        })
        mouse.addEventListener('mouseup', (event) => {
            if (watching.value == 2) {
                showTip.value = true;
                var txt = window.getSelection();
                var selectStr = txt.toString();
                _text = selectStr.replace(/[\s\n]+/g, "\\n ");
                popupData.popupTop = event.clientY;
                popupData.popupLeft = event.clientX;
            }
            watching.value = 0;
        })
    }

    // 消息列表
    const msList = reactive([
        {img: [1], text: "", status: 'send', id: '2', name: '33'},
        {img: [], text: "这是测试？", status: 'send', id: '2', name: '33'},
        {img: [1,1,1], text: "", status: 'send', id: '1', name: '111'},
        {img: [1], text: "", status: 'pending', id: '1', name: '111'},
    ])

    setListArr(msList)

    // 重新发送消息
    const handleResend = (data) => {
        console.log(data)
        msList.pop();
        // 重新执行 新增-发请求 这个流程
    }

    // 发送完消息后端要返回一个status，前端去处理消息列表

    const rightTop = ref(null);

    onMounted(() => {
        // selectCheck()
        rightTop.value.scrollTop = rightTop.value.scrollHeight;
    })

    const handleEnterKey = (event) => {
        if(event.metaKey && event.key === 'Enter') {
            textarea.value = "";
            addListItem({
                img: [],
                text: textarea.value,
                status: 'pending',
                id: '1',
                name: getName()
            }, msList)

            setTimeout(() => {
                msList[msList.length - 1].status = 'send'
            }, 3000)
        }
    }

    // const messageObj = reactive({
    //     img: [],
    //     text: "",
    //     status: 'pending'
    // })
    // const setMsg = (key, value) => {
    //     messageObj[key] = value
    //     messageObj.status = 'send'
    // }
    // const setStatus = (status)=> {
    //     messageObj.status = status
    //     if(status === 'pending') {
    //         messageObj.img = [];
    //         messageObj.text = [];
    //     }
    // }
    // provide('ms-status', {
    //     messageObj,
    //     setMsg,
    //     setStatus
    // })

</script>

<template>
    <section class="msg-right">
        <div class="r-top" ref="rightTop">
            <!-- <p>哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈</p>
            <p>哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈</p>
            <p>s哈哈哈哈哈哈哈啊哈哈</p> -->
            <template v-for="(item, index) in msList" :key="index">
                <Ms :item="item" :name="getName()" @send="handleResend"></Ms>
            </template>
        </div>
        <div class="text-bar" :style="{'visibility': showTextBar ? 'visible' : 'hidden'}">
            <p>{{ text }}</p>
        </div>
        <div class="r-bottom">
            <el-input v-model="textarea" placeholder="command+回车键发送消息" autofocus resize="none" type="textarea" @keydown="handleEnterKey" />
            <!-- <el-button type="primary" round @click="handleEnterKey">fasong</el-button> -->
        </div>
    </section>
    <div class="fix-tip" v-show="showTip" :style="{'top': popupData.popupTop + 'px', 'left': popupData.popupLeft + 'px'}">
        <div class="ft-item" @click="handleCheck(1)">针对选中文字评论</div>
        <div class="ft-item" @click="handleCheck(2)">发送至聊天群</div>
    </div>
</template>

<style lang="scss">
    .msg-right {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .r-top {
            width: 100%;
            flex: 1;
            overflow-y: auto;
            padding-top: 9px;
        }

        .text-bar {
            width: 100%;
            height: 21px;
            /* background: red; */
            padding: 4px 8px;
            white-space: nowrap;
            overflow: hidden;

            p {
                margin: 0 !important;
                width: 98%;
                max-width: 1100px;
                font-size: 13px;
                line-height: 13px;
                overflow: hidden;
                text-overflow: ellipsis;
                user-select: none;
            }
        }

        .r-bottom {
            width: 100%;
            height: 120px;
            border-top: 1px solid #dfe1e5;

            .el-textarea {
                height: 93%;
            }

            .el-textarea__inner {
                width: 100% !important;
                height: 100% !important;
                box-shadow: none !important;
                padding: 12px 8px;
                outline: none !important;
            }
        }
    }

    .fix-tip {
        position: fixed;
        width: 146px;
        padding: 9px 8px;
        background-color: #e9e6e4;
        border-radius: 8px;
        z-index: 1100;

        .ft-item {
            width: 100%;
            height: 19px;
            font-size: 13px;
            padding: 3px 2px;
            border-radius: 4px;

            &:hover {
                color: white;
                background-color: #6b9ff8;
                cursor: pointer;
            }
        }
    }
</style>