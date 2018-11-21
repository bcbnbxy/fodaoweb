<template>
  <div :class="[className]">
    <input size="small" type="file" name="file" @change="handleFileChange"
           accept="image/gif,image/jpeg,image/jpg,image/png"/>
  </div>
</template>

<script>
  import {fileUpload} from '@/api/index';
  import {Indicator, Toast} from 'mint-ui';
  import {EXIF} from './exif.js';

  export default {
    props: [
      'maxSize', 'widths', 'heights', 'className'
    ],
    methods: {
      // 上传
      handleFileChange(e) {
        // 获取选中的文件列表
        let file = e.target.files[0];
        if (!file.size) {
          return false
        }
        Indicator.open({
          spinnerType: 'fading-circle'
        });
        let that = this;
        let Orientation;
        // 获取照相的角度
        EXIF.getData(file, function () {
          Orientation = EXIF.getTag(this, 'Orientation') || '';
        });

        // 缩放图片需要的canvas
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (theFile) {
          let image = new Image();
          image.src = theFile.target.result;
          image.onload = function () {
            if (this.width > 750) {
              let targetWidth = 750;
              let targetHeight = 750 * this.height / this.width;
              // canvas对图片进行缩放
              // 判断照片角度
              switch (Number(Orientation)) {
                case 3: // 180°
                  canvas.width = targetWidth;
                  canvas.height = targetHeight;
                  // 清除画布
                  context.clearRect(0, 0, targetWidth, targetHeight);
                  context.save();
                  // 设置中心的
                  context.translate(targetWidth / 2, targetHeight / 2);
                  context.rotate(180 * Math.PI / 180);
                  context.drawImage(image, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);
                  break;
                case 6: // 顺时针 +90°
                  canvas.width = 750;
                  canvas.height = 750 * targetHeight / targetWidth * 2;
                  // 清除画布
                  context.clearRect(0, 0, canvas.width, canvas.height);
                  context.save();
                  // 设置中心的
                  context.translate(canvas.width / 2, canvas.height / 2);
                  context.rotate(90 * Math.PI / 180);
                  context.drawImage(image, -canvas.height / 2, -canvas.width / 2, canvas.height, canvas.width);
                  break;
                case 8: // 逆时针 -90
                  canvas.width = 750;
                  canvas.height = 750 * targetHeight / targetWidth * 2;
                  // 清除画布
                  context.clearRect(0, 0, canvas.width, canvas.height);
                  context.save();
                  // 设置中心的
                  context.translate(canvas.width / 2, canvas.height / 2);
                  context.rotate(-90 * Math.PI / 180);
                  context.drawImage(image, -targetHeight / 2, -targetWidth / 2, targetHeight, targetWidth);
                  break;
                default:
                  canvas.width = targetWidth;
                  canvas.height = targetHeight;
                  // 清除画布
                  context.clearRect(0, 0, targetWidth, targetHeight);
                  context.drawImage(image, 0, 0, targetWidth, targetHeight);
                  break;

              }
              context.restore();
              // 图片压缩
              // 获取新的图片对象
              canvas.toBlob((blob) => {
                if (blob.size / 1024 / 1024 > 2) {
                  Indicator.close();
                  Toast('图片大小不能超过 ' + 2 + 'MB!');
                  return false;
                }
                let imgFormData = new FormData();
                imgFormData.append('file', blob);
                fileUpload(imgFormData).then(res => {
                  Indicator.close();
                  if (res.code === 'Y') {
                    that.$emit('uploadImgFun', res.data);
                  } else {
                    Toast({
                      message: res.msg,
                      position: 'top',
                      duration: 2000
                    });
                  }
                });
              }, file.type)

            } else {
              if (file.size / 1024 / 1024 > 2) {
                Indicator.close();
                Toast('图片大小不能超过 ' + 2 + 'MB!');
                return false;
              }
              let imgFormData = new FormData();
              imgFormData.append('file', file);
              fileUpload(imgFormData).then(res => {
                Indicator.close();
                if (res.code === 'Y') {
                  that.$emit('uploadImgFun', res.data);
                } else {
                  Toast({
                    message: res.msg,
                    position: 'top',
                    duration: 2000
                  });
                }
              });
            }
          };
        };
      }
    }
  }
</script>

