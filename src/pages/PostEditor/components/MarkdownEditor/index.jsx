// frontend/src/components/MarkdownEditor/index.jsx
import React from 'react';
import { Editor } from '@bytemd/react';
import frontmatter from '@bytemd/plugin-frontmatter' // front-matter 支持
import gemoji from '@bytemd/plugin-gemoji'  // emoji 支持
import gfm from '@bytemd/plugin-gfm'  // GitHub Flavored Markdown
import highlight from '@bytemd/plugin-highlight' // 代码高亮
import mediumZoom from '@bytemd/plugin-medium-zoom' // 图片缩放
import math from '@bytemd/plugin-math' // 数学公式
import mermaid from '@bytemd/plugin-mermaid' // 图表支持
 

// 导入样式
import 'bytemd/dist/index.css'
import 'highlight.js/styles/github.css' // 代码高亮样式
import 'katex/dist/katex.css' // 数学公式样式
import './style.css' // 自定义样式

const MarkdownEditor = ({ value, onChange }) => {
  // 配置插件
  const plugins = [
    gfm(),
    gemoji(),
    highlight(),
    mediumZoom(),
    math(),
    mermaid(),
    frontmatter(),
    // imageUploadPlugin()
  ]

  // 自定义工具栏
  const toolbar = {
    hide: false, // 显示工具栏
    emoji: true, // emoji 选择器
    // upload: true, // 上传按钮
    custom: [ // 自定义工具栏按钮
      {
        title: '插入表格',
        icon: '<svg>...</svg>', // 这里放表格图标的 SVG
        handler: {
          type: 'action',
          click: (ctx) => {
            const table = `
                      | 表头 1 | 表头 2 |
                      | ------ | ------ |
                      | 内容 1 | 内容 2 |
            `.trim()
            ctx.replaceSelection(table)
          }
        }
      }
    ]
  }


    // 添加文件验证
  const validateFile = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('不支持的文件类型');
    }
    
    if (file.size > maxSize) {
      throw new Error('文件大小超出限制');
    }
  };

  // 在 handleImageUpload 中使用
  // files.forEach(validateFile);


  // 处理图片上传
  const handleImageUpload = async (files) => {
    try {
      // 处理每个文件
      const urls = await Promise.all(
        files.map(async (file) => {
          validateFile(file)
          // 创建 FormData
          const formData = new FormData();
          formData.append('file', file);

        
          // 发送上传请求
          // const response = await uploadApi.uploadImage(formData).then(res => {
          //   console.log('上传请求 res',res)
            
          // })

          // console.log('++response',response)
          const response = await fetch('http://localhost:3001/api/upload', {
            method: 'POST',
            body: formData,
            // 可能需要的headers
            headers: {
              // 注意：使用 FormData 时不要设置 Content-Type
              // 'Authorization': 'YOUR_AUTH_TOKEN', // 如果需要认证
            },
          });

          if (!response.ok) {
            throw new Error('Upload failed');
          }

          const data = await response.json();
          console.log('data.url',data.url)
          return data.url; // 返回图片URL
        })
      );
      // console.log('urls',urls)

      return urls 
    } catch (error) {
      console.error('Upload error:', error.message);
      // 可以添加错误提示
      // alert('图片上传失败');
      alert(error.message)
      return [];
    }
  };


  return (
    <div className="markdown-editor">
      <Editor
        value={value}
        plugins={plugins}
        onChange={onChange}
        uploadImages={handleImageUpload}
        toolbar={toolbar}
        mode="auto" // 可以是 'auto', 'tab', 'split'
        placeholder="开始编写..."
      />
    </div>
  )
}

export default MarkdownEditor;

