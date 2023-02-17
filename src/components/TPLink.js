import React from 'react'

export default function TPLink({link, img, text}) {
  return (
    <div class="TP">
        <a href={link}>
            <img src={img} alt={link} class="TP-image"/>
        </a>
        <a href={link}>
            <figcaption class="TP-caption">
                {text}
            </figcaption>
        </a>
    </div>
  )
}
