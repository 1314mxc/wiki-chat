<script setup>
import { ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const content = ref('<p>初始内容...</p>');

const onEditorBlur = () => {
  console.log('quill-editor blur');
};

const onEditorFocus = () => {
  console.log('quill-editor focus');
};

const onEditorChange = () => {
  console.log('quill-editor change');
};

const editorOptions = {
  placeholder: '请输入内容',
  theme: 'snow', // or 'bubble'
  modules: {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
        ['blockquote', 'code-block'], // 引用  代码块
        [{ header: 1 }, { header: 2 }], // 1、2 级标题
        [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
        [{ script: 'sub' }, { script: 'super' }], // 上标/下标
        [{ indent: '-1' }, { indent: '+1' }], // 缩进
        // [{ direction: 'rtl' }], // 文本方向
        [{ size: ['12', '14', '16', '18', '20', '22', '24', '28', '32', '36'] }], // 字体大小
        [{ header: [1, 2, 3, 4, 5, 6] }], // 标题
        [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
        // [{ font: ['songti'] }], // 字体种类
        [{ align: [] }], // 对齐方式
        ['clean'], // 清除文本格式
        ['image'] // 链接、图片，需要视频的可以加上video
      ],
      handlers: {   //此处是图片上传时候需要使用到的
        'image': function (value) {
          console.log(value)
          if (value) {  // 点击图片
            document.querySelector('#upload').click()
          }
        }
      },
      imageDrop: true,   // 图片拖拽
        imageResize: {     // 图片放大缩小
          displayStyles: {
            backgroundColor: "black",
            border: "none",
            color: "white"
          },
          modules: ["Resize", "DisplaySize", "Toolbar"]
        }
    }
  }
}
</script>

<template>
  <div class="eidtor-container">
    <quill-Editor
      theme="snow"
      :options="editorOptions"
      @blur="onEditorBlur"
      @focus="onEditorFocus"
      @change="onEditorChange"
      v-model="content"
    ></quill-Editor>
  </div>
     
</template>

<style scoped>
.editor-container .custom-quill-editor .ql-container {
  height: 300px !important;
}
</style>