<script setup>
    import { inject, ref, watch } from 'vue'
    
    const { item, setList } = inject('send-message')

    const listItem = item.value

    // 使用 watch 监听 myObject 是否从 null 变成非 null
    watch(listItem, (newValue, oldValue) => {
      if (newValue !== null) {
        // 往list中添加数据

        // 恢复初始值
        setList(null)
      }
    });
</script>

<template>
    <section class="msg-list">
    </section>
</template>

<style lang="scss">
    .msg-list {
        width: 100%;
        height: 100vh;
    }
</style>