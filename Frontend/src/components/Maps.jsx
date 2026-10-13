import React from 'react'

export default function ContactKaart() {
    return (
        <div className="map-container">
            <iframe
                src="https://maps.google.com/maps?q=Nijmegen&z=13&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Locatie op Google Maps"
            />
        </div>
    );
}
