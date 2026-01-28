const uploadBox=document.querySelector(".upload-box2");
let ogImageRatio;

fileInput=uploadBox.querySelector("input");
previewImg=uploadBox.querySelector("img");
const widthInput=document.querySelector(".column-width input");
const heightInput=document.querySelector(".column-height input");
const ratioInput=document.querySelector(".ratio input");
const downloadBtn=document.querySelector(".download-btn");
const qualityInput=document.querySelector(".quality input");
let IMG=[];
let File=[];
const loadFile=(e)=>{
        const container=document.getElementById("containerID");
		container.innerHTML="";
		const file=e.target.files;
		if(!file) return;
		File=file;
		document.querySelector(".wrapper").classList.add("active");
		ogImageRatio=previewImg.naturalWidth/previewImg.naturalHeight;
		for(let i=0;i<File.length;i++)
		{
			IMG[i]=e.target.files[i];
			const image=document.createElement("img");
			image.src=URL.createObjectURL(IMG[i]);
			const div=document.createElement("div");
			div.classList.add("upload-box");
			div.appendChild(image);
			container.appendChild(div);
		};
};
const resizeandDownload=()=>{
		for (let i=0;i<IMG.length;i++)
		{
			console.log("clicked");
			const canvas=document.createElement("canvas");
			const ctx=canvas.getContext("2d");
			const a = document.createElement("a");
			const imgQuality=qualityInput.checked? 0.05 : 1.0;
			canvas.width=widthInput.value;
			canvas.height=heightInput.value;
			const img = new Image(); 
			img.src = URL.createObjectURL(IMG[i]);
			img.onload = () => {
				ctx.drawImage(img,0,0,canvas.width,canvas.height);
				//document.body.appendChild(canvas);
				a.href=canvas.toDataURL("image/jpeg",imgQuality);
				//a.download=d.getTime();
				a.download="myimage.jpeg";
				a.click();	
			}
		};
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