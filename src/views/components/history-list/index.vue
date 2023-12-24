<script setup>
    import Edit from './../edit/index.vue'

    import { ref } from 'vue'

    const props = defineProps({
        list: {
            type: Array,
            default: () => []
        },
    })

    // let { list } = props;
</script>

<template>
    <div class="history-list">
        <template v-for="(item, index) in list">
            <div class="text-item">
                <div class="line-1 line">
                    <p class="item-name" v-if="item.status=='create'"><span class="name">{{ item.name }}</span> 发布了页面</p>
                    <p class="item-name" v-else><span class="name">{{ item.name }}</span> 更新到版本 <span class="time">「{{ item.hTime }}」</span></p>
                </div>
                <div class="line-3 line">
                    <p class="item-time">{{ item.time }}</p>
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="scss">
    .history-list {
        width: 100%;
        margin-top: 4px;

        p {
            margin: 0;
        }

        .text-item {
            width: 100%;
            padding: 8px;
            border-bottom: 1px solid #f7f8fa;

            .line {
                display: flex;
                align-items: baseline;
            }

            .col {
                flex-direction: column;
            }

            .item-name {
                font-size: 15px;
                font-weight: 400;
                color: #9a9a9a;

                .name {
                    color: #2d2d2e;
                }

                .time {
                    color: #409eff;
                }
            }

            .item-time {
                font-size: 13px;
                color: #9a9a9a;
                margin-top: 8px;
            }
        }
    }
</style>