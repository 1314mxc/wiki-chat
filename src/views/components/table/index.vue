<script setup>
    import { ref, defineEmits, watch } from 'vue'
    import { getName } from '@/utils/auth'

    const emit = defineEmits();

    const props = defineProps({
        tableData: {
            type: Array,
            default: () => [] // 上传日期、文件名、文件类型、用户名、关联wiki（没有的话写-）
        },
    })

    let { tableData } = props;

    const changePage = (data) => {
        emit('pagecheck', data)
    }

    const handleDelete = () => {
        ElMessageBox.confirm(
            '确认后不可恢复，是否删除?',
            'Warning',
            {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(() => {
            })
            .catch(() => {
            })
    }
</script>

<template>
    <div class="wj-table">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="date" label="上传日期" width="150" />
            <el-table-column prop="text" label="文件名" width="120" />
            <el-table-column prop="type" label="文件类型" width="90" />
            <el-table-column prop="name" label="上传者" width="150" />
            <el-table-column prop="link" label="关联wiki" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default>
                    <el-button link type="primary" size="small" @click="handleDown">下载</el-button>
                    <el-button link type="primary" size="small" @click="handleDelete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin-top: 8px;" layout="prev, pager, next" :total="tableData.length"
            :hide-on-single-page="true" @current-change="changePage" />
    </div>
</template>

<style lang="scss">
    .wj-table {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
</style>