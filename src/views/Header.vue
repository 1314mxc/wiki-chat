<script setup>
  import { ref, inject } from 'vue'
  import { getName, removeToken, removeGroup } from '@/utils/auth'
  import { useRouter } from 'vue-router';

  const { item } = inject('send-message')

  const router = useRouter();

  let number = ref(0)

  number.value = Number(item.value) > 999 ? '999+' : Number(item.value)

  const checkTip = () => {
    removeToken()
    removeGroup()
    router.push('/login')
  }

</script>

<template>
  <div class="header-box">
    <div class="header-container">
      <div class="router">
        <router-link to="/home" custom v-slot="{ isActive, navigate }">
          <div :class="{ 'active': isActive, 'title': true, 'font-14': true }" @click="navigate">
            <el-icon class="icon">
              <FolderChecked />
            </el-icon>
            知识库
          </div>
        </router-link>
        <router-link to="/message" custom v-slot="{ isActive, navigate }">
          <div :class="{ 'active': isActive, 'title': true, 'font-14': true }" @click="navigate">
            <el-icon class="icon">
              <Bell />
            </el-icon>
            通知
            <span class="num" v-show="number > 0">{{ number }}</span>
          </div>
        </router-link>
        <router-link to="/fileload" custom v-slot="{ isActive, navigate }">
          <div :class="{ 'active': isActive, 'title': true, 'font-14': true }" @click="navigate">
            <el-icon class="icon">
              <Files />
            </el-icon>
            文件库
            <span class="num" v-show="number > 0">{{ number }}</span>
          </div>
        </router-link>
        <router-link to="/imageGallery" custom v-slot="{ isActive, navigate }">
          <div :class="{ 'active': isActive, 'title': true, 'font-14': true }" @click="navigate">
            <el-icon class="icon">
              <ChatDotRound />
            </el-icon>
            Chat
          </div>
        </router-link>
      </div>
      <div class="setting">
        <router-link to="/setting" custom v-slot="{ isActive, navigate }">
          <div :class="{ 'active': isActive, 'title': true, 'font-14': true }" @click="navigate">
            <el-icon class="icon">
              <Setting />
            </el-icon>
            配置中心
          </div>
        </router-link>
        <div :class="{ 'title': true, 'font-14': true }">
          <div class="name-i">{{ getName().slice(0, 1) }}</div>
          {{ getName() }}
        </div>
        <div :class="{ 'title': true, 'font-14': true }" @click="checkTip">
          <el-icon class="icon">
            <SwitchButton />
          </el-icon>
          退出
        </div>
        <!-- <div style="line-height: 32px;">{{ getName() }}</div>background-color: #009cad;
        <div class="ft-item" @click="checkTip">登出</div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .header-box {
    width: 100%;
    height: 100vh;
    /* background: #409eff; */
  }

  .header-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* background: #1e90ff; */
    width: 120px;
    height: 100vh;
    border-right: 1px solid #dfe1e5;
    user-select: none;

    .router {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .title {
      position: relative;
      height: 36px;
      line-height: 36px;
      padding: 6px 12px 0;
      display: flex;
      align-items: center;
      cursor: pointer;

      &.active {
        color: #409eff;
        background-color: #F0F6FF;
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
      /* padding: 8px 0 0; */
      /* color: white; */

      .name-i {
        position: relative;
        color: white;
        font-size: 10px;
        width: 16px;
        text-align: center;
        margin-right: 4px;

        &::after {
          content: "";
          position: absolute;
          top: 9px;
          right: 0px;
          bottom: 10px;
          left: 0px;
          background-color: #009cad;
          z-index: -1;
          border-radius: 14px;
        }
      }

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
        border-bottom: 1px solid rgba(0, 0, 0, .1);
      }

      &:hover {
        opacity: .5;
        cursor: pointer;
      }
    }
  }
</style>