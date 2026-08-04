import React, { useRef, useState } from 'react'
import John from "../../img/John.png"
import Tim from "../../img/Tim.png"
import Angelina from "../../img/Angelina.png"
import Luna from "../../img/Luna.png"
import User from "../../img/User.png"
import { FaCamera } from 'react-icons/fa'
import { ref, update } from "firebase/database";
import { db, auth } from "../../services/firebase";
import { useNavigate } from 'react-router-dom';
import "./ProfileImage.css"

const AVATAR_URLS ={
    John:"https://res.cloudinary.com/dfnubplys/image/upload/v1781195421/John_d4ocre.png",
    Tim:"https://res.cloudinary.com/dfnubplys/image/upload/v1781195448/Tim_q3xrit.png",
    Angelina:"https://res.cloudinary.com/dfnubplys/image/upload/v1781195467/Angelina_blqvg1.png",
    Luna:"https://res.cloudinary.com/dfnubplys/image/upload/v1781195487/Luna_v7rdsu.png"
}
const ProfileImage = () => {
    const fileInputRef = useRef(null);
    const [currentImg,setCurrentImg] = useState(User);
    const [fileToUpload, setFileToUpload] = useState(null);
    const [selectedAvatarUrl,setSelectedAvatarUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

    const handleSelectButton = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        if(!file) return;

        //validate file type
        if(!file.type.startsWith("image/")){
            alert("Please select a valid image file.");
            return;
        }

        // Create a preview URL
        const imageUrl = URL.createObjectURL(file);
        setCurrentImg(imageUrl);
        setFileToUpload(file);
        setSelectedAvatarUrl(null);

    };

    const handleAvatarClick = (localImg,permanentUrl)=>{
        setCurrentImg(localImg);
        setFileToUpload(null);
        setSelectedAvatarUrl(permanentUrl);
    }
    
    const handleUpload = async () => {
        if(!fileToUpload && !selectedAvatarUrl){
            alert("Please select an image or choose an avatar first");
            return;
        }

        const currentUser = auth.currentUser;
        if(!currentUser){
            alert("User Not Found Login Again");
            return;
        }

        setUploading(true);
        let finalImageUrl = "";

        try{
            if(fileToUpload){
                const data = new FormData();
                data.append("file", fileToUpload);
                data.append("upload_preset", uploadPreset);
                data.append("cloud_name", cloudName);

                const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{
                    method: "POST",
                    body: data
                });
                const uploadedImageData = await res.json();
                finalImageUrl = uploadedImageData.secure_url;
            }
            else if(selectedAvatarUrl){
                finalImageUrl = selectedAvatarUrl;
            }

            const useRef = ref(db, `Users/${currentUser.uid}`);
            await update (useRef,{
                image_url:finalImageUrl
            });

            console.log("Database updated! URL:", finalImageUrl);
            alert("Profile Picture Updated Successfully!");

            navigate('/main/chats');

        }catch(error){
            console.error("Error updating profile:",error);
            alert("Failed to update profile picture.");
        }finally{
            setUploading(false);
        }
    };

  return (
    <div className="profileImage-wrapper">
        <div className="profileImage-container">
            <h1>Upload Image</h1>
            <div className="profileImage-holder">
                <img src={currentImg} alt="profile-picture" />
                <input 
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}/>
                <button className='btn' onClick={handleSelectButton}>Select Image</button>
            </div>
            <div className="avatar-wrapper">
                <h4>choose from Avatars:</h4>
                <div className="avatar-container">
                    <img src={John} alt="avatar 01" className="avatar" onClick={()=>handleAvatarClick(John, AVATAR_URLS.John)}/>
                    <img src={Tim} alt="avatar 02" className="avatar" onClick={()=>handleAvatarClick(Tim, AVATAR_URLS.Tim)}/>
                    <img src={Angelina} alt="avatar 03" className="avatar" onClick={()=>handleAvatarClick(Angelina, AVATAR_URLS.Angelina)}/>
                    <img src={Luna} alt="avatar 04" className="avatar" onClick={()=>handleAvatarClick(Luna, AVATAR_URLS.Luna)}/>
                </div>
            </div>
            <button className='btn' onClick={handleUpload} disabled={uploading}>Upload</button>
            {uploading&&<div className='loading'>Uploading...</div>}
        </div>
    </div>
  )
}

export default ProfileImage
