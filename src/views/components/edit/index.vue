<!--
一个简单的 markdown 编辑器。
-->

<script setup>
    // import { marked } from 'marked'
    // import { debounce } from 'lodash-es'
    import { ref, defineEmits } from 'vue'
    const emit = defineEmits();

    const props = defineProps({
        text: {
            type: String,
            default: ""
        },
        showTextBar: {
            type: Boolean,
            default: false
        },
        showBar: {
            type: Boolean,
            default: false
        }
    })

    const textarea = ref('')

    // const input = ref('# hello')

    // const output = computed(() => marked(input.value))

    // const update = debounce((e) => {
    //     input.value = e.target.value
    // }, 100)

    const handleAddList = () => {
        emit('add', textarea.value)
        textarea.value = ""
    }
</script>

<template>
    <div class="text-box">
        <div class="text-content">
            <div class="text-bar" v-show="showBar" :style="{'visibility': showTextBar ? 'visible' : 'hidden'}">
                <p>{{ text }}</p>
            </div>
            <el-input v-model="textarea" placeholder="挥洒你的想法吧～" :rows="3" resize="none" type="textarea" />
        </div>
        <el-button type="primary" round @click="handleAddList">评论</el-button>
    </div>
</template>

<style>
    .text-box {
        display: flex;
        align-items: flex-end;
        width: 100%;
        /* height: 94px; */
    }

    .text-content {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin-right: 8px;
    }
</style>