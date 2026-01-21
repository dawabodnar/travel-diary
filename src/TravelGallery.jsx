import React, { useState, useEffect, useRef } from 'react'
import './TravelGallery.css'
function TravelGallery() {
    const [files, setFiles] = useState([]);
    const [travels, setTravels] = useState([]);
    const [selectedTravelID, setSelectedTravelID] = useState(null);
    const [activeTravelID, setActiveTravelID] = useState(null);
    const [previewPhotos, setPreviewPhotos] = useState([]);
    const fileInputRef = useRef(null);
    useEffect(() => {
        const savedTravels = JSON.parse(localStorage.getItem("myTravels")) || [];
        setTravels(savedTravels)
    }, []);

    const handleShowPhotos = () => {
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewPhotos(previews);
    };
    const handleFilesSelect = (e) => {
        setFiles(Array.from(e.target.files));
    }
    const handleAddToAlbum = async () => {
        if (!selectedTravelID || files.length === 0) return;

        const fileToDataURL = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }
        try {
            const photosBase64 = await Promise.all(files.map(fileToDataURL));
            const newPhotos = photosBase64.map((url) => ({
                id: Date.now() + Math.random(),
                url,
            }));

            const updatedTravel = travels.map((t) =>
                t.id === selectedTravelID
                    ? { ...t, photos: [...(t.photos || []), ...newPhotos] }
                    : t
            );
            setTravels(updatedTravel);
            localStorage.setItem("myTravels", JSON.stringify(updatedTravel));

            setFiles([]);
            setPreviewPhotos([]);
            fileInputRef.current.value = "";


        } catch (error) {
            console.log("Помилка зчитування файлів:", error)

        }
    }

    const handleDeletePhoto = (travelId, photoId) => {
        const updatedTravel = travels.map((t) =>
            t.id === travelId
                ? { ...t, photos: t.photos.filter((p) => p.id !== photoId) }
                : t)
        setTravels(updatedTravel)
        localStorage.setItem("myTravels", JSON.stringify(updatedTravel))
    }

    const handleOpenTravelAlbum = (travelId) => {
        setActiveTravelID(travelId);
    }
    const handleBackToAll = () => {
        setActiveTravelID(null);
    }
    const activeTravels = travels.find((t) => t.id === Number(activeTravelID));

    return (
        <div className='gallery-page'>
            <div className='gallery-content'>
                <h1>Фотоальбом подорожей</h1>
                {!activeTravelID ? (
                    <div>
                        <label>Виберіть подорож:</label>
                        <select value={selectedTravelID || ""}
                            onChange={(e) => setSelectedTravelID(Number(e.target.value))}>
                            <option value={""}>-- Оберіть подорож --</option>
                            {travels.map((t) => (
                                <option key={t.id} value={t.id}>{t.country} - {t.city}</option>
                            ))}
                        </select>

                        {!selectedTravelID ? (
                            <p>Спочатку виберіть одну із відвіданих вами подорожей.</p>
                        ) : (
                            <>
                                <div className="controls-group">
                                    <input type="file" ref={fileInputRef} multiple accept='image/*' onChange={handleFilesSelect} className="hidden-file-input" />
                                    <button onClick={handleShowPhotos}> Показати фото</button>
                                </div>

                                {previewPhotos.length > 0 && (
                                    <div className="photo-preview">
                                        {previewPhotos.map((src, i) => (
                                            <div key={i} className="foto-item">
                                                <img src={src} alt={`preview-${i}`} />
                                            </div>
                                        ))}
                                    </div>
                                )}


                                <button onClick={handleAddToAlbum}> Додати до фотоальбому</button>
                                <div>
                                    <h2>Всі подорожі</h2>
                                    <div className='all-travel-album'>
                                        {travels.map((t) => (
                                            <div className='travel-cart' key={t.id} onClick={() => handleOpenTravelAlbum(t.id)}>
                                                {t.photos?.[0] ? (
                                                    <img alt='' src={t.photos[0].url} className='cover-foto' />
                                                ) : (
                                                    <div>Немає фото</div>
                                                )}
                                                <p>{t.country} - {t.city}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="back-button-wrapper">
                            <a href="/travel-form" className="back-button">← Назад</a>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p><strong>Країна:</strong>{activeTravels.country}</p>
                        <p><strong>Місто:</strong>{activeTravels.city}</p>
                        <div className="photo-album">
                            {activeTravels?.photos?.length ? (

                                activeTravels.photos.map((p) => (
                                    <div key={p.id} className='foto-item'>
                                        <img src={p.url} alt='' />
                                        <button onClick={() => handleDeletePhoto(activeTravels.id, p.id)}>X</button>
                                    </div>
                                ))
                            ) : (
                                <p>Немає фото</p>

                            )}

                        </div>
                        <button onClick={handleBackToAll}>Назад до всіх подорожей</button>
                    </div>
                )}





            </div >

        </div >
    );
}
export default TravelGallery;