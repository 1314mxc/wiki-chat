<script setup>
    import { provide, inject, ref, onMounted } from 'vue'
    import Header from './Header.vue'
    import Login from './Login.vue'

    import { getToken } from '@/utils/auth'
    import { data, initWebSocket } from '@/utils/socket'

    // const { setList } = inject('send-message') //暂时注释掉，函数降级到当前组件 - 函数，socket返回的东西传递过去，通过这玩意给Message组件

    // initWebSocket('ws://localhost/dev-api/process/websocket/processSocket/zkawsystem 请求url示例');
    console.log(data)

    const token = localStorage.getItem('token') || false

    // provide + reject 实现：Home页面选中文字后“发送到聊天框”功能
    const text = ref('')
    const setText = (value) => {
        text.value = value
    }
    provide('send-select', {
        text,
        setText
    })

    const item = ref(null)

    // socket返回的东西传递过去，通过这玩意给Message组件
    const setList = (value) => {
        item.value = value
    }

    provide('send-message', {
        item,
        setList
    })

</script>

<template>
    <section class="box">
        <Header></Header>
        <section class="content">
            <router-view></router-view>
        </section>
    </section>
</template>

<style lang="scss">
    .box {
        position: relative;
        width: 100%;
        height: 100vh;

        .content {
            position: absolute;
            top: 0;
            left: 100px;
            right: 0;
            bottom: 0;
            border-radius: 14px 0 0 14px;
            background-color: white;
            overflow: hidden;
        }
    }
</style>