const uploadBox=document.querySelector(".upload-box");
let ogImageRatio;

fileInput=uploadBox.querySelector("input");
previewImg=uploadBox.querySelector("img");
const widthInput=document.querySelector(".column-width input");
const heightInput=document.querySelector(".column-height input");
const ratioInput=document.querySelector(".ratio input");
const downloadBtn=document.querySelector(".download-btn");
const qualityInput=document.querySelector(".quality input");
const loadFile=(e)=>{
        console.log("Inside load File Function....");
		const file=e.target.files[0];
		console.log(file);
		previewImg.src=URL.createObjectURL(file);
		document.querySelector(".wrapper").classList.add("active");
		previewImg.addEventListener("load",()=>{
			widthInput.value=previewImg.naturalWidth;
			heightInput.value=previewImg.naturalHeight;	
			ogImageRatio=previewImg.naturalWidth/previewImg.naturalHeight;	
		});	
}
const resizeandDownload=()=>{
		console.log("clicked");
		const canvas=document.createElement("canvas");
		const ctx=canvas.getContext("2d");
		const a = document.createElement("a");
		const imgQuality=qualityInput.checked? 0.05 : 1.0;
		canvas.width=widthInput.value;
		canvas.height=heightInput.value;
		ctx.drawImage(previewImg,0,0,canvas.width,canvas.height);
		//document.body.appendChild(canvas);
		a.href=canvas.toDataURL("image/jpeg",imgQuality);
		//a.download=d.getTime();
		a.download="myimage.jpeg";
		a.click();
}

widthInput.addEventListener("keyup",()=>{ 
const height=ratioInput.checked? widthInput.value/ogImageRatio:heightInput.value;
heightInput.value=Math.floor(height); 
});
heightInput.addEventListener("keyup",()=>{
const width=ratioInput.checked? ogImageRatio*heightInput.value:widthInput.value;
widthInput.value=Math.floor(width);
});
downloadBtn.addEventListener("click", resizeandDownload);
fileInput.addEventListener("change",loadFile);
uploadBox.addEventListener("click",()=> fileInput.click());

/*
const uploadBox1=document.querySelector(".upload-box1");

fileInput1=uploadBox1.querySelector("input");

const loadFile1=(e)=>{
        console.log("Inside load File Function....")
}


fileInput1.addEventListener("change",loadFile);

uploadBox1.addEventListener("click",()=> fileInput1.click());
*/