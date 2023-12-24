<script setup>
    import { provide, ref, onMounted } from 'vue'
    import Header from './Header.vue'
    import Login from './Login.vue'

    import { getToken } from '@/utils/auth'

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

    // onMounted(() => { // if网页版，注释掉
    //     myApi.resetSize()
    // })


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