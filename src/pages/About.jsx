import ImageUpload from   "@/components/ImageUpload"
function About() {
  // 图片上传成功
  const handleUploadSuccess = (data) => {
    // setUploadedImage(data);
    // setUploadError(null);
 
    console.log('上传成功:', data.data);
  };

  const handleUploadFail = async (msg) => {
 
    console.log('上传失败:', msg);
    
  };

  // fetch('http://localhost:3000/api/images/upload', {
  //   method: 'POST',
  //   body: formData // formData 包含 image 文件
  // })
  return (
    <div>
      <h1>About</h1>

      <ImageUpload onUploadSuccess={handleUploadSuccess} onUploadFail={handleUploadFail}/>
       
    </div>
  );
}

export default About;