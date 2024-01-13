<script setup>
  import { ref, inject } from 'vue'
  import { getName, removeToken } from '@/utils/auth'
  import { useRouter } from 'vue-router';

  const { item } = inject('send-message')

  const router = useRouter();

  let number = ref(0)
  let showTip = ref(false)

  number.value = Number(item.value) > 999 ? '999+' : Number(item.value)

  const checkTip = () => {
    removeToken()
    showTip.value = !showTip.value;
    router.push('/login')
  }

  const showCheck = () => {
    showTip.value = !showTip.value;
  }

</script>

<template>
  <div class="header-box">
    <div class="header-container">
      <div class="router">
        <router-link to="/home" custom v-slot="{ isActive, navigate }">
          <div :class="{ 'active': isActive, 'title': true }" @click="navigate">
            <el-icon class="icon">
              <FolderOpened />
            </el-icon>
            知识库
          </div>
        </router-link>
        <router-link to="/message" custom v-slot="{ isActive, navigate }">
          <div :class="{ 'active': isActive, 'title': true }" @click="navigate">
            <el-icon class="icon">
              <Bell />
            </el-icon>
            通知
            <span class="num" v-show="number > 0">{{ number }}</span>
          </div>
        </router-link>
        <router-link to="/imageGallery" custom v-slot="{ isActive, navigate }">
          <div :class="{ 'active': isActive, 'title': true }" @click="navigate">
            <el-icon class="icon">
              <ChatDotRound />
            </el-icon>
            信鸽
          </div>
        </router-link>
      </div>
      <div class="setting">
        <div style="line-height: 32px;">{{ getName() }}</div>
        <div class="ft-item" @click="checkTip">登出</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .header-box {
    width: 100%;
    height: 100vh;
    background: #409eff;
  }

  .header-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* background: #1e90ff; */
    width: 120px;
    height: 100vh;
    padding-top: 3px;

    .router {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .title {
      position: relative;
      height: 42px;
      line-height: 42px;
      padding: 8px 12px 0;
      display: flex;
      align-items: center;
      cursor: pointer;

      &.active {
        color: #fff;
      }

      .num {
        position: absolute;
        top: 8px;
        left: 55%;
        font-size: 11px;
        border-radius: 5px;
        background-color: red;
        /* height: 11px; */
        line-height: 12px;
        padding: 1px 3px;
      }

      .icon {
        /* margin-right: .2rem;
        fill: #ccc; */
        width: 16px;
        margin-right: 3px;
      }

    }

    .setting {
      display: flex;
      flex-direction: column;
      padding: 8px 12px 0;
      color: white;

      .ft-item {

        &:hover {
          opacity: .5;
          cursor: pointer;
        }
      }
    }

  }

  .set-tip {
    position: fixed;
    left: 35px;
    bottom: 14px;
    width: 100px;
    padding: 12px 8px;
    border-radius: 6px;
    background-color: white;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    z-index: 1000;

    .ft-item {
      width: 100%;
      text-align: center;
      height: 28px;
      font-size: 16px;
      padding: 6px 2px;
      border-radius: 4px;
      margin-top: 2px;
      
      &:not(:last-of-type) {
        border-bottom: 1px solid rgba(0,0,0,.1);
      }

      &:hover {
        opacity: .5;
        cursor: pointer;
      }
    }
  }
</style>