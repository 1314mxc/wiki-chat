<script setup>
  import Edit from './components/edit/index.vue'
  import coList from './components/co-list/index.vue'
  import hList from './components/history-list/index.vue'
  import editorText from './components/editor-text/index.vue'
  import documentList from './components/document-list/index.vue'

  import { onMounted, ref, reactive, nextTick, inject } from 'vue'
  import { getName } from '@/utils/auth'
  import { getParameterByName } from '@/utils/href'
  import { setupScrollHandler } from '@/utils/scrollHandler';

  const { plList, clearListObj } = inject('send-message')

  // const textarea = ref('')
  const text = ref('')
  const showTextBar = ref(false)

  let item = null

  // created，判断url里是否有gId和pId，如果有，就要展示“对应的某篇wiki”
  const currentURL = window.location.href;
  if (window.location.search.length) {
    const gId = getParameterByName('gId', currentURL);
    const pId = getParameterByName('pId', currentURL);
    console.log(gId, pId)
  }

  // 模拟评论数据，暂时先别删
  const list = reactive([
    {
      quote: "哈哈哈哈哈啥u哦i哈偶和三都澳涮独爱个度啊哈萨u哦吼啊u就好滴哦啊厉害的啊手超速丢安度啊u很对啊是爆粗口不阿斯伯格",
      name: 'mxc',
      text: '1111111',
      time: '2023-12-19',
      endorse: 0,
      children: [
        {
          name: 'mxc2',
          text: '1111111',
          time: '2023-12-19',
          endorse: 0,
          parent: 'mxc',
        },
        {
          name: 'mxc3',
          text: '1111111',
          time: '2023-12-19',
          endorse: 0,
          parent: 'mxc2',
        }
      ]
    }
  ])

  // socket的消息加到评论/回复中
  if (JSON.stringify(plList) !== '{}') {
    if (plList.parent) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].name == plList.parent) {
          list[i].children.push(plList);
        } else if (list[i].children.length) {
          for (let j = 0; j < list[i].children.length; j++) {
            if (list[i].children[j].name == plList.parent) {
              list[i].children.push(plList);
            }
          }
        }
      }
    }
    clearListObj({})
  }

  // 模拟历史记录数据，暂时先别删
  const list2 = reactive([
    {
      name: 'mxc',
      status: 'create',
      time: '2023-12-19',
    },
    {
      name: 'mxc',
      status: 'update',
      time: '2023-12-24',
      hTime: '2023-12-19'
    }
  ])

  // 新增文章评论
  const handleAddList = async (val) => {
    list.push({
      quote: text,
      name: getName(),
      text: val,
      time: '2023-12-19',
      endorse: 0,
      children: [],
    })
    await nextTick()
    item.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  const activeName = ref('1')
  const handleClick = (tab, event) => {
    activeName.value = tab.index
  }

  // 触底的元素获取
  const rightSection = ref(null);
  const yourCallbackFunction = () => {
    console.log("触底1.5秒后执行的回调函数");
    list.push({
      quote: "",
      name: 'mxc',
      text: '2222222',
      time: '2023-12-21',
      endorse: 1,
      children: []
    })
  };
  const scrollHandler = setupScrollHandler(rightSection, yourCallbackFunction);

  onMounted(() => {
    item = document.querySelector('.r-bottom');
    // 在组件挂载后添加滚动事件监听器
    rightSection.value.addEventListener('scroll', scrollHandler);
  })

</script>

<template>
  <section class="wiki">
    <div class="left">
      <!-- 左侧是“分组”组件：显示组、添加组、组内添加/删除wiki -->
      <div style="width: 100%;height: 100%;">
        <document-list></document-list>
      </div>
    </div>
    <div class="right" ref="rightSection" @scroll="handleScroll">
      <!-- 右侧是显示具体文本的区域，分为上下两部分：上部分是内容区域，下部分是评论框和评论、回复功能区域 -->
      <div class="r-top" style="width: 100%;height: 1100px;">
        <editor-text></editor-text>
      </div>
      <!-- 以下为：评论框和评论、回复功能区域。孟笑晨在写 -->
      <div class="r-bottom">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="评论" name="1"></el-tab-pane>
          <el-tab-pane label="变更记录" name="2"></el-tab-pane>
        </el-tabs>
        <div v-show="activeName == 1">
          <Edit :text="text" :showTextBar="showTextBar" :showBar="true" @add="handleAddList"></Edit>
          <co-list :list="list"></co-list>
        </div>
        <div v-show="activeName == 2">
          <h-list :list="list2"></h-list>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .wiki {
    display: flex;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .left {
      flex-shrink: 0;
      width: 17%;
      height: 100%;
      padding-top: 12px;
      border-right: 1px solid #dfe1e5;

      p {
        padding-left: 6px;
        font-family: cursive;
      }
    }

    .right {
      flex: 1;
      height: 100%;
      padding: 12px 1%;
      overflow-y: auto;

      .r-bottom {
        padding: 0 12px;
      }

      /* .text-box {
        display: flex;
        align-items: flex-end;
        width: 100%;
        height: 94px;
        border: 1px solid red;
      }

      .text-content {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin-right: 8px;
      } */

      .text-bar {
        width: 100%;
        height: 21px;
        /* background: #cccccc; */
        border-left: 2px solid #cccccc;
        padding: 4px 8px;
        white-space: nowrap;

        p {
          margin: 0 !important;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 13px;
          color: #999;
          line-height: 13px;
        }

        .el-textarea__inner {
          border-radius: 0;
        }
      }
    }
  }
</style>