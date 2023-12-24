<script setup>
    import { onMounted, ref } from 'vue'
</script>

<template>
    <section class="msg-list">
        <div class="item">
            <div class="line">
                <div class="title">xxx</div>
                <div class="time">2023-12-4</div>
            </div>
            <div class="msg">xxxxxxxxxxxxxxxxxxxxxxxx</div>
        </div>
    </section>
</template>

<style lang="scss">
    .msg-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        .item {
            width: 100%;
            height: 54px;
            padding: 8px 6px;
            border-bottom: 1px solid blue;

            .line {
                display: flex;
                align-items: baseline;
                justify-content: space-between;
            }

            .title {
                font-size: 18px;
                font-weight: 600;
            }

            .time {
                font-size: 12px;
                color: darkgray;
            }

            .msg {
                font-size: 14px;
                color: darkgray;
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
</style>