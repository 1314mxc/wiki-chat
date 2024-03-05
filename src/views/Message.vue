<script setup>
  import { inject, ref, reactive, watch } from 'vue'

  const { setList } = inject('send-message')

  setList(0);

  // const listItem = item.value

  // // 使用 watch 监听 myObject 是否从 null 变成非 null
  // watch(listItem, (newValue, oldValue) => {
  //   if (newValue !== null) {
  //     // 往list中添加数据

  //     // 恢复初始值
  //     setList(null)
  //   }
  // });

  let list = reactive([
    {
      gId: 'wiki所属的wiki组的id',
      gname: 'wiki所属的wiki组的名字',
      pId: 'wiki的id',
      pname: 'wiki的名字',
      name: '评论的人的名字（谁评论了）',
      time: '评论的时间',
      text: '评论的内容'
    }
  ]);

  for(let i=0; i<list.length; i++) {
    if(list[i].text.length > 7) {
      list[i].text = list[i].text.slice(0, 7) + "..."
    }
  }
</script>

<template>
  <section class="msg-list">
    <template v-for="(item, index) in list">
      <div class="text-item">
        <div class="line-1 line">
          <p class="item-name">{{ item.time }}</p>
        </div>
        <div class="line-2 line col">
          <p class="item-text">用户<span style="color: #409eff;">「{{ item.name }}」</span>在“ {{ item.gname }} ”下的“ {{ item.pname }} ”中评论了: “ <span class="text">{{ item.text }}</span> ”</p>
        </div>
      </div>
    </template>
  </section>
</template>

<style lang="scss">
  .msg-list {
    width: 100%;
    height: 100vh;
    padding: 9px;

    p {
      margin: 0;
    }

    .text-item {
      width: 100%;
      padding: 8px;
      border-bottom: 1px solid #f7f8fa;
      cursor: pointer;

      &:hover {
        .text {
          color: #409eff;
        }
      }

      .child-item {
        padding-left: 60px;
        padding-top: 8px;
      }

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
      }

      .item-text {
        margin: 16px 0 4px;
        font-size: 13px;
        color: #9a9a9a;
      }
    }
  }
</style>