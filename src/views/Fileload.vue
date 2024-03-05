<script setup>
  import { onMounted, ref, reactive } from 'vue'
  import { getName } from '@/utils/auth'

  import filetable from './components/table/index.vue'
  import fileupload from './components/upload/index.vue'

  const calendarDay = ref(new Date())
  const activeName = ref('1')

  const tableList = reactive([{
    date: '2024-3-1',
    text: 'xxx.zip',
    type: 'zip',
    name: '111',
    link: '-'
  },{
    date: '2024-3-1',
    text: 'xxx.zip',
    type: 'zip',
    name: '22',
    link: '-'
  }])
  const mineList = reactive([])
  for(let i=0; i<tableList.length; i++) {
    if(tableList[i].name === getName()) {
      mineList.push(tableList[i])
    }
  }

  let cacheIndex = 1;
  const handleClick = (tab, event) => {
  }
</script>

<template>
  <section class="fl">
    <div class="left">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="ch-left">
              <el-icon :size="16" color="#409EFC">
                <SetUp />
              </el-icon>
              <span style="font-size: 14px;margin-left: 3px;font-weight: 800;">文件列表</span>
            </div>
            <div class="ch-right">
              <fileupload></fileupload>
            </div>
          </div>
        </template>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane :label="`全部文件(${tableList.length})`" name="1"></el-tab-pane>
          <el-tab-pane label="我的提交" name="2"></el-tab-pane>
        </el-tabs>
        <template v-if="activeName == 1">
          <filetable :tableData="tableList"></filetable>
        </template>
        <template v-if="activeName == 2">
          <filetable :tableData="mineList"></filetable>
        </template>
      </el-card>
    </div>
    <div class="right">
      <el-calendar v-model="calendarDay" />
    </div>
  </section>
</template>

<style lang="scss">
  .fl {
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding: 10px 0;

    .left {
      flex-shrink: 0;
      width: 75%;
      height: 100%;

      p {
        padding-left: 6px;
        font-family: cursive;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .ch-left {
          display: flex;
          align-items: center;
        }
      }
    }

    .right {
      flex: 1;
      padding: 0 8px 0;
    }
  }
</style>