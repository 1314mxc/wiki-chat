<script setup>
    import { defineExpose, reactive, ref, defineEmits } from 'vue'

    import editorText from './components/editor-text/index.vue'
</script>

<template>
    <section class="editor">
        <editor-text></editor-text>
    </section>
</template>

<style lang="scss">
    .editor {
        width: 80%;
        margin: 0 auto;
    }
</style>