<script setup>
    import { ref, reactive } from 'vue'

    const checkedm = ref(false)

</script>

<template>
    <section class="set-list">
        <div class="s-box">
            <h2>新功能 提前用～</h2>
            <div class="list">
                <div class="l-left">
                    <p class="font-14">面容安全认证:</p>
                </div>
                <div class="l-right">
                    <el-checkbox class="font-14" style="height: 18px;" v-model="checkedm" disabled>是否开启</el-checkbox>
                    <p class="font-11 desc">如果开启，需要录入面容并进入数据库匹配认证（首次录入不认证），当在此网页中按下键盘ctrl+q的时候，网页内容会被遮挡，隐私更安全！离开也放心～</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .set-list {
        width: 100%;
        height: 100vh;
        padding: 9px;

        .s-box {
            width: 64%;
            margin: 0 auto;

            .list {
                display: flex;
                align-items: flex-start;

                p {
                    margin: 0;
                    padding: 0;
                }

                .l-left {
                    width: 100px;
                    text-align: right;
                }
                .l-right {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    margin-left: 12px;

                    .desc {
                        color: #9a9a9a;
                        margin-top: 3px;
                    }
                }
            }
        }
    }
</style>