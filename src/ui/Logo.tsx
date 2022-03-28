import React from 'react'

type LogoProps = {
  drawer?: boolean
  width?: number
}

export const Logo = (props: LogoProps) => {
  return (
    <svg fill="currentColor" viewBox="0 0 266.12 140.18" width={props.width || '60px'}>
      <path
        strokeWidth={6}
        fill="none"
        stroke="currentColor"
        d="M110.08,54.52c0,11.25-24,20.36-53.54,20.36S3,65.77,3,54.52"
      />
      <path
        strokeWidth={6}
        fill="none"
        stroke="currentColor"
        d="M110.08,85.66c0,11.24-24,20.36-53.54,20.36S3,96.9,3,85.66"
      />
      <ellipse
        strokeWidth={6}
        fill="none"
        stroke="currentColor"
        cx="56.54"
        cy="23.36"
        rx="53.54"
        ry="20.36"
      />
      <path
        strokeWidth={6}
        stroke="currentColor"
        fill="none"
        d="M3,23.36v93.46c0,11.25,24,20.36,53.54,20.36s53.54-9.11,53.54-20.36V23.36"
      />
      <path d="M140.62,78.41l-3.76-.74a33.73,33.73,0,0,1-7.06-2.16,27.94,27.94,0,0,1-6-3.54l4.95-6.83A23.57,23.57,0,0,0,136.08,69a28.19,28.19,0,0,0,8.64,1.3q5.68,0,8.83-1.86a5.81,5.81,0,0,0,3.14-5.25v0a5.15,5.15,0,0,0-1.41-3.81,8.35,8.35,0,0,0-3.66-2.07A49.59,49.59,0,0,0,145.81,56a.67.67,0,0,0-.24,0,.66.66,0,0,1-.23,0l-.7-.1a60.11,60.11,0,0,1-9.36-2A13.49,13.49,0,0,1,129,49.59c-1.71-2-2.57-4.9-2.57-8.61v0a14.52,14.52,0,0,1,2.42-8.44,14.88,14.88,0,0,1,7-5.32A29.9,29.9,0,0,1,147,25.35a30.23,30.23,0,0,1,6.1.63,33.13,33.13,0,0,1,6,1.82,33.85,33.85,0,0,1,5.71,3l-4.52,7a27.67,27.67,0,0,0-6.66-3.25A21.33,21.33,0,0,0,147,33.47c-3.59,0-6.36.6-8.33,1.8a5.69,5.69,0,0,0-2.94,5.1v0a5.1,5.1,0,0,0,1.52,3.9,9.17,9.17,0,0,0,3.8,2.09q2.28.66,6.38,1.41l.29.06.29,0,.43.07.43.07a50,50,0,0,1,8.79,2.33,13.7,13.7,0,0,1,5.91,4.36q2.37,3,2.37,8.19V63a13.9,13.9,0,0,1-2.49,8.33,15.3,15.3,0,0,1-7.25,5.27,32.2,32.2,0,0,1-11.46,1.81Z" />
      <path d="M185,76a17.2,17.2,0,0,1-7.13-6.72,19.62,19.62,0,0,1-2.54-10.07V44.52a19.62,19.62,0,0,1,2.54-10.07A17.14,17.14,0,0,1,185,27.73a25,25,0,0,1,21.29,0,17.26,17.26,0,0,1,7.13,6.72,19.61,19.61,0,0,1,2.53,10.07V59.24a19.61,19.61,0,0,1-2.53,10.07A17.32,17.32,0,0,1,206.24,76,25,25,0,0,1,185,76Zm16.28-7.38A9.11,9.11,0,0,0,205,65a11.1,11.1,0,0,0,1.32-5.49V44.26A11.08,11.08,0,0,0,205,38.78a9.11,9.11,0,0,0-3.76-3.67,13,13,0,0,0-11.27,0,9,9,0,0,0-3.76,3.67,11,11,0,0,0-1.33,5.48V59.49A11,11,0,0,0,186.2,65,9,9,0,0,0,190,68.65a13,13,0,0,0,11.27,0Zm-6.53-5.19,4.91-5.72L221.13,73l-4.91,5.76Z" />
      <path d="M228.93,25.89h9.31v52h-9.31Zm4.36,43.79h32.83v8.19H233.29Z" />
      <path
        strokeWidth={0.75}
        strokeMiterlimit={10}
        d="M124.76,90.25h16.68V94H124.76Zm6.44,1.93H135V113.8h-3.8Z"
      />
      <path
        strokeWidth={0.75}
        strokeMiterlimit={10}
        d="M143.67,90.25h3.81V113.8h-3.81Zm1.58,0h13.62V94H145.25Zm0,10h11.87V104H145.25Zm0,9.83h13.62v3.71H145.25Z"
      />
      <path
        strokeWidth={0.75}
        strokeMiterlimit={10}
        d="M168.63,114l-1.54-.33a12.86,12.86,0,0,1-2.88-1,11.25,11.25,0,0,1-2.47-1.6l2-3.09a9.58,9.58,0,0,0,3,1.74,10.59,10.59,0,0,0,3.53.59,6.53,6.53,0,0,0,3.61-.84,2.7,2.7,0,0,0,1.29-2.39h0a2.46,2.46,0,0,0-.58-1.73,3.38,3.38,0,0,0-1.5-.94,17.66,17.66,0,0,0-2.37-.55.16.16,0,0,0-.1,0l-.09,0-.29-.05a22.36,22.36,0,0,1-3.82-.92A5.44,5.44,0,0,1,163.9,101a6.26,6.26,0,0,1-1.06-3.9v0a7.08,7.08,0,0,1,1-3.82,6.22,6.22,0,0,1,2.87-2.41,12.18,12.18,0,0,1,7-.55,13.2,13.2,0,0,1,2.46.83,13.4,13.4,0,0,1,2.33,1.35l-1.85,3.19a10.82,10.82,0,0,0-2.72-1.47,7.84,7.84,0,0,0-2.71-.5,6.1,6.1,0,0,0-3.41.81,2.65,2.65,0,0,0-1.2,2.31v0a2.45,2.45,0,0,0,.62,1.76,3.76,3.76,0,0,0,1.56,1,26.68,26.68,0,0,0,2.6.64l.12,0,.12,0,.18,0,.17,0a19.37,19.37,0,0,1,3.6,1.06,5.72,5.72,0,0,1,2.41,2,6.28,6.28,0,0,1,1,3.71v0a6.8,6.8,0,0,1-1,3.78,6.34,6.34,0,0,1-3,2.39,12.2,12.2,0,0,1-4.69.81Z"
      />
      <path
        strokeWidth={0.75}
        strokeMiterlimit={10}
        d="M180.09,90.25h16.67V94H180.09Zm6.44,1.93h3.79V113.8h-3.79Z"
      />
    </svg>
  )
}
