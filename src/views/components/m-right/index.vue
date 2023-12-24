<script setup>
    import { onMounted, ref, reactive } from 'vue'

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

    // const handleRightClick = (event) => {
    //     event.preventDefault(); // 阻止默认右键菜单

    //     // 获取鼠标右键按下时的位置信息
    //     popupData.popupTop = event.clientY;
    //     popupData.popupLeft = event.clientX;

    //     console.log(popupData)

    // }

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

    onMounted(() => {
        selectCheck()
    })

</script>

<template>
    <section class="msg-right">
        <div class="r-top">
            <!---  @contextmenu.prevent.capture="handleRightClick" -->
            <p>哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈</p>
            <p>哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈啊哈哈</p>
            <p>s哈哈哈哈哈哈哈啊哈哈</p>
        </div>
        <div class="text-bar" :style="{'visibility': showTextBar ? 'visible' : 'hidden'}">
            <p>{{ text }}</p>
        </div>
        <div class="r-bottom">
            <el-input v-model="textarea" placeholder="" autofocus resize="none" type="textarea" />
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
        }

        .text-bar {
            width: 100%;
            height: 21px;
            background: red;
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
            border-top: 1px solid green;

            .el-textarea {
                height: 93%;
            }

            .el-textarea__inner {
                width: 100% !important;
                height: 100% !important;
                border: none !important;
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