<script setup>
    import { reactive, onMounted, ref } from 'vue'
    import documentList from '../document-list/index.vue'

    import { useRouter } from 'vue-router'
    const router = useRouter()

    const value = ref('')
    const loading = ref(false)
    const options = reactive([
        {
            value: '1',
            label: '1a'
        },
        {
            value: '2',
            label: '2a'
        },
        {
            value: '3',
            label: '3a'
        },
    ])

    const remoteMethod = (query) => {
        if (query) {
            loading.value = true
            setTimeout(() => {
                loading.value = false
                console.log(options, query)
            }, 200)
        } else {
            options = []
        }
    }

    const goEditor = () => {
        router.push('/editor')
    }
</script>

<template>
    <section class="wiki-list">
        <div class="top">
            <el-select v-model="value" multiple filterable remote reserve-keyword placeholder=""
                :remote-method="remoteMethod" :loading="loading" style="width: 139px;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <div class="icon-box" title="新建wiki协同页面" @click="goEditor">
                <el-icon class="icon">
                    <Plus />
                </el-icon>
            </div>
        </div>
        <document-list></document-list>
    </section>
</template>

<style lang="scss">
    .wiki-list {
        .top {
            display: flex;
            justify-content: space-around;
            align-items: center;

            .icon-box {
                padding: 3px 4px 1px;
                border-radius: 50%;
                background-color: #409eff;
            }

            .icon {
                color: white;
                font-size: 15px;
            }
        }
    }
</style>