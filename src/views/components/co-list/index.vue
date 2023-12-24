<script setup>
    import Edit from './../edit/index.vue'

    import { ref, defineEmits, watch } from 'vue'
    import { getName } from '@/utils/auth'

    const props = defineProps({
        list: {
            type: Array,
            default: () => []
        },
    })

    let { list } = props;

    let items = null;

    // 添加点赞判断
    for (let i = 0; i < list.length; i++) {
        list[i].ischeck = false;
        if (list[i].children.length) {
            for (let j = 0; j < list[i].children.length; j++) {
                list[i].children[j].ischeck = false;
            }
        }
    }

    // 添加输入显示判断
    for (let i = 0; i < list.length; i++) {
        list[i].showEdit = false;
        if (list[i].children.length) {
            for (let j = 0; j < list[i].children.length; j++) {
                list[i].children[j].showEdit = false;
            }
        }
    }

    const handleAddEndorse = (item) => {
        if (item.ischeck) {
            item.endorse -= 1;
            item.ischeck = false;
        } else {
            item.endorse += 1;
            item.ischeck = true;
        }
    }

    const handleDelEndorse = (index, pIndex) => {
        if (pIndex < 0) {
            list.splice(index, 1)
        } else {
            list[pIndex].children.splice(index, 1);
        }
    }

    const handleReply = (item) => {
        item.showEdit = !item.showEdit;
    }

    const handleAddItem = async (index, name, val, pIndex) => {
        if (pIndex < 0) {
            list[index].showEdit = false;
            list[index].children.push({
                name: getName(),
                text: val,
                time: '2023-12-19',
                endorse: 0,
                parent: name,
                ischeck: false,
                showEdit: false,
            })

            items[index].scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
            list[pIndex].children[index].showEdit = false;
            list[pIndex].children.push({
                name: getName(),
                text: val,
                time: '2023-12-19',
                endorse: 0,
                parent: name,
                ischeck: false,
                showEdit: false,
            })

            items[pIndex].scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }

    // 监听数组变化
    watch(list, (newArray, oldArray) => {
        items = document.querySelectorAll('.text-item');
    }, { deep: true });

    // onMounted(() => {
    //     items = document.querySelectorAll('.text-item');
    // })
</script>

<template>
    <div class="text-list">
        <template v-for="(item, index) in list">
            <div class="text-item">
                <div class="line-1 line">
                    <p class="item-name">{{ item.name }}: </p>
                </div>
                <div class="line-2 line col">
                    <div class="text-bar" v-if="item.quote.length">
                        <p>{{ item.quote }}</p>
                    </div>
                    <p class="item-text">{{ item.text }}</p>
                </div>
                <div class="line-3 line">
                    <p class="item-time">{{ item.time }}</p>
                    <el-button type="primary" link @click="handleAddEndorse(item)">赞同({{ item.endorse }})</el-button>
                    <el-button type="primary" link @click="handleDelEndorse(index, -1)">删除</el-button>
                    <el-button type="primary" link @click="handleReply(item)">回复</el-button>
                </div>
                <div class="input-item" v-show="item.showEdit">
                    <Edit @add="handleAddItem(index, item.name, $event, -1)"></Edit>
                </div>
                <template v-for="(citem, cindex) in item.children">
                    <div class="child-item">
                        <div class="line-1 line">
                            <p class="item-name">{{ citem.name }} 回复 {{ citem.parent }}: </p>
                        </div>
                        <div class="line-2">
                            <p class="item-text">{{ citem.text }}</p>
                        </div>
                        <div class="line-3 line">
                            <p class="item-time">{{ citem.time }}</p>
                            <el-button type="primary" link @click="handleAddEndorse(citem)">赞同({{ citem.endorse
                                }})</el-button>
                            <el-button type="primary" link @click="handleDelEndorse(cindex, index)">删除</el-button>
                            <el-button type="primary" link @click="handleReply(citem)">回复</el-button>
                        </div>
                        <div class="input-item" v-show="citem.showEdit">
                            <Edit @add="handleAddItem(cindex, citem.name, $event, index)"></Edit>
                        </div>
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>

<style lang="scss">
    .text-list {
        width: 100%;
        margin-top: 4px;

        p {
            margin: 0;
        }

        .text-item {
            width: 100%;
            padding: 8px;
            border-bottom: 1px solid #f7f8fa;

            .child-item {
                padding-left: 60px;
                padding-top: 8px;
            }

            .input-item {}

            .line {
                display: flex;
                align-items: baseline;
            }

            .col {
                flex-direction: column;
            }

            .item-name {
                font-size: 17px;
                font-weight: 400;
                color: #9a9a9a;
            }

            .item-time {
                font-size: 13px;
                color: #9a9a9a;
                margin-right: 20px;
            }

            .item-text {
                margin: 4px 0;
                font-size: 17px;
            }
        }
    }
</style>