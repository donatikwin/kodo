import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as htmlToImage from 'html-to-image';
import styles from './Certificate.module.css';

const Certificate = ({ course, username }) => {
    const navigate = useNavigate();
    const certificateRef = useRef();

    const handleDownloadPNG = async () => {
        if (!certificateRef.current) return;

        const dataUrl = await htmlToImage.toPng(certificateRef.current, { quality: 1 });
        const link = document.createElement('a');
        link.download = `certificate-${username}.png`;
        link.href = dataUrl;
        link.click();
    };

    const handleDownloadPDF = async () => {
        if (!certificateRef.current) return;

        const dataUrl = await htmlToImage.toPng(certificateRef.current, { quality: 1 });

        const jsPDF = (await import('jspdf')).default;
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [certificateRef.current.offsetWidth, certificateRef.current.offsetHeight]
        });

        pdf.addImage(dataUrl, 'PNG', 0, 0);
        pdf.save(`certificate-${username}.pdf`);
    };

    const currentDate = new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const certificateId = `KODO-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    return (
        <div className={styles.certificateModal}>
            <div className={styles.certificateContainer}>
                <div ref={certificateRef} className={styles.certificate}>
                    {/* Весь твой сертификат (оставляем без изменений) */}
                    <div className={styles.certificateBorder}>
                        <div className={styles.certificateHeader}>
                            <div className={styles.watermark}>Kodo</div>
                            <h2>Сертификат об окончании курса</h2>
                            <div className={styles.logo}>
                                <svg width="80" height="80" viewBox="0 0 120 120" fill="none">
                                    <circle cx="60" cy="60" r="55" fill="#6366F1"/>
                                    <path d="M80 50L55 75L40 60" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                                </svg>
                                <span>Kodo Platform</span>
                            </div>
                        </div>
                        
                        <div className={styles.certificateBody}>
                            <p className={styles.certificateText}>Настоящим удостоверяется, что</p>
                            <h3 className={styles.userName}>{username}</h3>
                            <p className={styles.certificateText}>успешно завершил(а) курс</p>
                            <h4 className={styles.courseTitle}>"{course.title}"</h4>
                            
                            <div className={styles.details}>
                                <div className={styles.detailItem}>
                                    <span>Дата завершения: {currentDate}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span>Продолжительность: {course.duration || '8 часов'}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.signatures}>
                            <div className={styles.signature}>
                                <p className={styles.signatureName}>Данил Бессараб</p>
                                <div className={styles.signatureLine}></div>
                                <p className={styles.signatureTitle}>Директор образовательной платформы</p>
                            </div>
                        </div>

                        <div className={styles.certificateFooter}>
                            <p className={styles.certificateId}>Уникальный ID: {certificateId}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.certificateActions}>
                    <button className={styles.printButton} onClick={handleDownloadPNG}>
                        Скачать как PNG
                    </button>
                    <button className={styles.printButton} onClick={handleDownloadPDF}>
                        Скачать как PDF
                    </button>
                    <button className={styles.closeButton} onClick={() => navigate('/courses')}>
                        Завершить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Certificate;
