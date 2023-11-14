import React, { useState } from 'react';



export default function AvatarPost({attachment}) {
  return (
    <img src={attachment} style={{width: "40px", height: "40px", borderRadius: "50%"}}/>
  )
}