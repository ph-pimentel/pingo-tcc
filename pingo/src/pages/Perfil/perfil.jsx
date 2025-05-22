import React, { useState, useRef } from "react";
import Layout from "../../components/Layout/index";
import styles from "./perfil.module.css";

function Perfil() {
    const [isProfileOption, setProfileOption] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState("Biografia Mais Bonita deste Brasil Quadrado que eu tanto amo. Viva a vida como se você tivesse apenas um ultimo bloco.");
    const [name, setName] = useState("Bravudo");
    const [originalBio, setOriginalBio] = useState("");
    const [originalName, setOriginalName] = useState("");
    const [profileImage, setProfileImage] = useState("../../img/Header/steve.png");
    const [originalImage, setOriginalImage] = useState("");
    const fileInputRef = useRef(null);

    const toggleMenu = () => {
        setProfileOption(!isProfileOption);
    };

    const handleEditClick = () => {
        setOriginalBio(bio); 
        setOriginalName(name);
        setOriginalImage(profileImage); 
        setIsEditing(true);
        setProfileOption(false);
    };

    const validateAndSaveName = () => {
        // Verifica se o nome está vazio ou com menos de 3 caracteres
        if (name.trim() === "" || name.trim().length < 3) {
            setName(originalName); // Reseta para o nome original
            return false;
        }
        return true;
    };

    const handleSaveClick = () => {
        if (validateAndSaveName()) {
            setIsEditing(false);
            // Backend Area
        }
    };

    const handleCancelClick = () => {
        setBio(originalBio);
        setName(originalName);
        setProfileImage(originalImage); 
        setIsEditing(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <Layout>
            <div className={styles.main_container}>
                <div className={styles.profile_main_container}>
                    <button className={styles.options_container} onClick={toggleMenu}>
                        <img src='../../img/profile/option.png' alt="Opções"/>
                    </button>

                    {isProfileOption && (
                        <div className={styles.menu_container}>
                            <button onClick={handleEditClick}>Editar</button>
                        </div>
                    )}

                    <div className={styles.profile_block_container}>
                        <div className={styles.profile_img_container}>
                            {isEditing ? (
                                <>
                                    <img 
                                        src={profileImage} 
                                        alt="Foto de perfil" 
                                        onClick={triggerFileInput}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                    />
                                </>
                            ) : (
                                <img src={profileImage} alt="Foto de perfil"/>
                            )}
                        </div>

                        <div className={styles.profile_content_container}>
                            <div className={styles.profile_header}>
                                <div className={styles.profile_name_container}>
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className={styles.name_input}
                                                maxLength={75}
                                                onBlur={validateAndSaveName} 
                                            />
                                            {name.trim().length < 3 && name.trim() !== "" && (
                                                <p className={styles.name_error}>Nome deve ter pelo menos 3 caracteres</p>
                                            )}
                                        </>
                                    ) : (
                                        <h1>{name}</h1>
                                    )}
                                </div>

                                <div className={styles.social_container}>
                                    <div className={styles.social_item}>
                                        <h3>Seguidores</h3>
                                        <img src="../../img/profile/social.png" alt="Ícone seguidores"/>
                                        <h3>9,3B</h3>
                                    </div>
                                    <div className={styles.social_item}>
                                        <h3>Seguindo</h3>
                                        <img src="../../img/profile/social.png" alt="Ícone seguindo"/>
                                        <h3>25</h3>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.bio_main_container}>
                                {isEditing ? (
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        className={styles.bio_input}
                                        maxLength={250}
                                    />
                                ) : (
                                    bio && <h2>{bio}</h2>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {isEditing && (
                        <div className={styles.edit_buttons_container}>
                            <button onClick={handleSaveClick} className={styles.save_button}>
                                Salvar
                            </button>
                            <button onClick={handleCancelClick} className={styles.cancel_button}>
                                Cancelar
                            </button>
                        </div>
                    )}

                    <div className={styles.friends_main_container}>
                        <div className={styles.friends_title_container}>
                            <h1>Amigos</h1>             
                        </div>

                        <div className={styles.friends_item_main_container}>
                            <a className={styles.friends_item_container}>
                                <img src="../../img/Header/steve.png" alt="Amigo"/>
                                <a href="/">Jorge</a>
                            </a>
                            <a className={styles.friends_item_container}>
                                <img src="../../img/Header/steve.png" alt="Amigo"/>
                                <a href="/">Jorge</a>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Perfil;