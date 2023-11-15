export default function AvatarPost({attachment}) {
  return (
    <img alt="avatar" src={attachment} style={{width: "40px", height: "40px", borderRadius: "50%"}}/>
  )
}