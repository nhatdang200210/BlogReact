export default function AvatarPost({attachment}) {
  return (
    <img alt='Avt' src={attachment} style={{width: "40px", height: "40px", borderRadius: "50%"}}/>
  )
}