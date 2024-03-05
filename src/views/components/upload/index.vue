<script setup>
    import { onMounted, ref, reactive } from 'vue'

    const dialogFormVisible = ref(false)
    const formLabelWidth = '120px'
    const form = reactive({
        name: '',
        region: '',
    })

    const handleUploadFile = () => {
        dialogFormVisible.value = true
    }

    // 文件相关
    const loading = ref(false)
    const hash = ref('')
    const chunkList = reactive([])
    const name = ref('')

    const beforeUpload = async (file) => {
        loading.value = true;
        // 请求
        await onFrontImgChange(file)
    }

    const fileToBuffer = (file) => {
        return new Promise((resolve, reject) => {
            const fr = new FileReader()
            fr.onload = e => {
                console.log('result?', e.target.result)
                resolve(e.target.result)
            }
            fr.readAsArrayBuffer(file)
            fr.onerror = () => {
                reject(new Error('转换文件格式发生错误'))
            }
        })
    }

    const onFrontImgChange = async (file) => {
        if (!file) {
            loading.value = false;
            return;
        }
        name.value = file.name;

        //此处打印file可看到file下的raw为文件属性

        // 获取文件并转成 ArrayBuffer 对象
        const fileObj = file.raw
        let buffer
        try {
            buffer = await fileToBuffer(fileObj)
        } catch (e) {
            console.log(e)
        }
        if (!buffer) {
            loading.value = false;
        }

        return

        let spark = new SparkMD5.ArrayBuffer();
        spark.append(buffer)
        const hash = spark.end()

        if (fileObj.size < 209715200) {
            // 直接上传完整流程
            uploadAllFile(fileObj, hash)
            return
        }

        // 将文件按固定大小（1M）进行切片，注意此处同时声明了多个常量
        const chunkSize = 2097152, //1048576 2097152
            chunkList = [], // 保存所有切片的数组
            chunkListLength = Math.ceil(fileObj.size / chunkSize) // 计算总共多个切片

        // 携带md5，校验是否有改动
        // --- md5通过axios传给后端校验一次
        let checkRes = await checkFileLoad({ md5: hash });
        if (checkRes) {
            if (!checkRes.data) {
                loading.value = false;
                return false;
            }
            // --- md5校验结束，拿到返回值
            if (Number(checkRes.data.next) < 0 && checkRes.code != '200') {
                // 生成切片，这里后端要求传递的参数为字节数据块（chunk）和每个数据块的文件名（fileName）
                let curChunk = 0 // 切片时的初始位置
                for (let i = 0; i < chunkListLength; i++) {
                    const item = {
                        key: i,
                        chunk: fileObj.slice(curChunk, curChunk + chunkSize)
                    }
                    curChunk += chunkSize
                    chunkList.push(item)
                }

            } else if (Number(checkRes.data.next) >= 0) {
                let next = checkRes.data.next; // 这里接收后端返回的，上一次传的最后一个索引值
                // 生成切片，这里后端要求传递的参数为字节数据块（chunk）和每个数据块的文件名（fileName）
                let curChunk = chunkSize * next; // 切片时的初始位置
                for (let i = next; i < chunkListLength; i++) {
                    const item = {
                        key: i,
                        chunk: fileObj.slice(curChunk, curChunk + chunkSize)
                    }
                    curChunk += chunkSize
                    chunkList.push(item)
                }

            } else {
                // 上一次上传且是完整状态，结束
                return;
            }

            chunkList = chunkList // sendRequest 要用到
            hash.value = hash // sendRequest 要用到
            sendRequest(chunkList, hash)
        }
    }

    const handleExceed = (files) => {
        ElMessage.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，请重新选择`);
    }

    const uploadAllFile = (fileObj, hash) => {
        var form = new FormData();
        form.append('file', fileObj)
        form.append('areaId', localStorage.getItem('areaId') + "")
        form.append('excelType', this.docType)

        axios({
            url: `${BASEURL}/excel/data/generic/import`,
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data;charset=utf-8', 'Authorization': `Bearer ${getToken()}` },
            data: form
        }).then(res2 => {
            loading.value = false;
            if (res2.data.code == 200) {
                loading.value = false;
                // this.$emit('upload', res2.data.data)
            } else if (res2.data.code != 200) {
                loading.value = false;
                ElMessage.error('Network error!');
            }
        }).catch(err => {
            loading.value = false;
            ElMessage.error('Network error!');
        })
    }

    const sendRequest = (chunkList, hash) => {
        const requestList = [] // 请求集合
        chunkList.forEach((item, index) => {
            const fn = async () => {
                const formData = new FormData()
                formData.append('data', item.chunk)
                formData.append('index', item.key)
                formData.append('md5', hash)
                return axios({
                    url: `${BASEURL}/upload/do`,
                    method: 'post',
                    headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' },
                    data: formData
                }).then(res => {
                    if (res.data.code == '201') { // 成功
                        this.chunkList.splice(index, 1) // 一旦上传成功就删除这一个 chunk，方便断点续传
                    }
                })
            }
            requestList.push(fn)
        })

        let i = 0 // 记录发送的请求个数
        // 文件切片全部发送完毕后，需要请求 '/merge' 接口，把文件的 hash 传递给服务器
        const complete = async () => {
            axios({
                url: `/upload/merge?md5=${hash.value}&name=${name.value}`,
                method: 'get',
            }).then(res => {
                console.log(res)
                // this.$emit('upload', true)
            })
        }
        const send = async () => {
            if (i >= requestList.length) {
                // 发送完毕
                complete()
                return
            }
            await requestList[i]()
            i++
            send()
        }
        send() // 发送请求
    }


</script>

<template>
    <section class="upload">
        <el-button type="primary" link @click="handleUploadFile">+上传文件</el-button>
        <el-dialog v-model="dialogFormVisible" title="文件上传" width="500">
            <el-form :model="form">
                <el-form-item label="文件选择" :label-width="formLabelWidth">
                    <!-- <el-input v-model="form.name" autocomplete="off" /> -->
                    <el-upload class="upload-btn" ref="frontFile" :show-file-list="false" :auto-upload="false" action=""
                        :on-change="beforeUpload" :limit="1" :on-exceed="handleExceed">
                        <!--  before-upload :http-request="fileSuccess" :on-change="onFrontImgChange"-->
                        <!-- <el-button size="small" type="primary" :loading="loading" @click="beforeChoseFile"><i class="el-icon-upload"></i>上传</el-button> -->
                        <el-button type="primary" :loading="loading" style="width: 72px !important;"><el-icon
                                class="el-icon--right">
                                <Upload />
                            </el-icon>选择</el-button>
                    </el-upload>
                    <div class="bbq"></div>
                </el-form-item>
                <el-form-item label="关联文件" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="Please select a wiki">
                        <el-option label="Zone No.1" value="shanghai" />
                        <el-option label="Zone No.2" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">
                        上传
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </section>
</template>

<style lang="scss">
    .upload {}
</style>