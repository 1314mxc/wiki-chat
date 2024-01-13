<script setup>
    import { onMounted, ref, reactive } from 'vue'
    import { setToken, setName, getToken } from '@/utils/auth'
    import { useRouter, useRoute } from 'vue-router'

    import md5 from "js-md5"

    const router = useRouter();
    const route = useRoute();

    const usr = reactive({
        name: "",
        pwd: "",
        group: ""
    })
    const usrRight = reactive({
        name: true,
        pwd: true,
        group: true
    })
    const disabled = ref(false)
    const placeholder = ref('例：豫超电子科技前端组')

    // 搜索组
    const loading = ref(false)
    const isJoin = ref(false) // 只要请求回来就true
    const groups = ref([]) // 组名列表
    const switchType = ref('选择已加入的组')

    const redirectUrl = ref('')

    const changeLoading = () => {
        loading.value = true

        setTimeout(() => {
            isJoin.value = true
            groups.value = [{
                label: '豫超电子科技',
                value: '1'
            }]
        }, 1000)
    }

    const changeSwitch = () => {
        switchType.value = switchType.value === '选择已加入的组' ? '创建新的组' : '选择已加入的组'
        usr.group = ""
    }

    const handleCheckName = () => {
        usrRight.name = usr.name.length;
    }
    const handleCheckPwd = () => {
        usrRight.pwd = usr.pwd.length && (usr.pwd.length >= 8 && usr.pwd.length <= 16);
    }
    const handleCheckGroup = () => {
        usrRight.group = usr.group.length;
    }

    const handleLogin = () => {
        console.log('md5化密码', md5(md5(usr.pwd)))
        let check = true;
        if (!usr.name.length) {
            usrRight.name = false;
            check = false;
        }
        if (usr.pwd.length < 8 || usr.pwd.length > 16) {
            usrRight.pwd = false;
            check = false;
        }
        if (!usr.group.length) {
            usrRight.group = false;
            check = false;
        }
        if (!check) return false;
        
        usrRight.name = true;
        usrRight.pwd = true;
        usrRight.group = true;

        // 请求
        // 拿到值
        // 存储
        setToken('123') //模拟数据
        setName(usr.name)

        router.push(redirectUrl.value);

    }

    const open = (text) => {
        ElNotification({
            message: text,
            type: 'error',
        })
    }

    onMounted(() => {
        redirectUrl.value = route.query && route.query.redirect ? route.query.redirect : '/home'
    })
</script>

<template>
    <section class="login">
        <div class="left"></div>
        <div class="right">
            <div class="r-top">
                <div class="l-item">
                    <el-input :class="[usrRight.name ? '' : 'err']" v-model="usr.name" placeholder="请输入账号名"
                        @change="handleCheckName">
                        <template #prepend>用户名:</template>
                    </el-input>
                    <div class="err-text" v-show="!usrRight.name">请输入账户名称</div>
                </div>
                <div class="l-item">
                    <el-input :class="[usrRight.pwd ? '' : 'err']" v-model="usr.pwd" type="password"
                        placeholder="请输入8-16位字母/数字" show-password
                        :formatter="(value) => value.replace(new RegExp(`[^a-z0-9]`, 'g'), '')"
                        @change="handleCheckPwd">
                        <template #prepend>密&nbsp;&nbsp;码&nbsp;:</template>
                    </el-input>
                    <div class="err-text" v-show="!usrRight.pwd">请输入8-16位字母/数字</div>
                </div>
                <div class="l-item">
                    <el-text class="mx-1" style="margin-bottom: 3px;" type="info">填写/选择要加入的组名:</el-text>
                    <div class="line">
                        <el-button v-show="!loading" type="primary" text
                            @click="changeLoading">查询已加入的组</el-button>
                        <el-button v-show="loading && !isJoin && !groups.length" type="primary" text loading>查询中...</el-button>
                        <el-text v-show="loading && isJoin && !groups.length"
                            style="white-space: nowrap;margin-right: 6px;" type="info">您还未加入组，请创建:</el-text>
                        <el-button v-show="loading && isJoin && groups.length" type="primary" text @click="changeSwitch">切换为-{{ switchType
                            }}</el-button>
                        <el-input v-show="switchType === '选择已加入的组'" :class="[usrRight.group ? '' : 'err']"
                            v-model="usr.group" :disabled="disabled" :placeholder="placeholder" @change="handleCheckGroup">
                        </el-input>
                        <el-select v-show="switchType === '创建新的组'" v-model="usr.group" :class="[usrRight.group ? '' : 'err']" class="m-2" placeholder="请选择组名" @change="handleCheckGroup">
                            <el-option v-for="item in groups" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                        <div class="err-text" style="top: 53px;left: 165px;" v-show="!usrRight.group">请填写组名</div>
                    </div>
                </div>
            </div>
            <div class="r-bottom">
                <el-button type="primary" link @click="handleLogin">进入知识库</el-button>
            </div>
            <div class="r-bottom">
                <span style="color: red;">*</span>如果没有登录过，会直接注册新账号
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .login {
        display: flex; /* if应用版，注释掉 */
        width: 100%;
        height: 100vh;
        overflow: hidden;

        .left { /* if应用版，注释掉 */
            flex-shrink: 0;
            width: 71%;
            height: 100%;
            background: url(../assets/IMG_0027.png);
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }

        .right {

            /* width: 100%; */

            flex: 1; /* if应用版，注释掉 */
            display: flex;
            flex-direction: column;
            background-color: white;

            .r-top {
                width: 100%;
                padding: 114px 36px 12px;

                .l-item {
                    position: relative;
                    margin-top: 21px;

                    .err {
                        .el-input__wrapper {
                            box-shadow: 0 0 0 1px red inset;
                        }
                    }

                    .err-text {
                        position: absolute;
                        top: 33px;
                        left: 85px;
                        font-size: 12px;
                        color: red;
                    }

                    .line {
                        display: flex;
                        align-items: center;
                    }

                    .el-button {
                        flex-shrink: 0;
                        padding-left: 0 !important;
                        width: 153px !important;
                        justify-content: flex-start;
                    }
                }
            }

            .r-bottom {
                width: 100%;
                height: 24px;
                text-align: center;
                line-height: 24px;
                font-size: 13px;
                color: #9A9A9A;
                margin-top: 8px;
            }
        }
    }
</style>