import React from 'react'
import '../css/Home.css'
import { Link } from 'react-router-dom'

export default function Home2() {
  return (
    <section className="container-h">
    <div className="home1-bg">
        <h5 className="home-h5">Hi,</h5>
        <h5 className="home-h5">Chào mừng các bạn đến với blog của mình.</h5>
    </div>
    <div className="h-gt">
        <h1 className="gt-h1">Giới thiệu</h1>
    </div>
    <div>
        <form className="gt-text">
            <p>Hi các bạn,</p>

            <p>Câu chuyện của mình kể ra cũng rất…buồn cười. Ngày còn nhỏ, mình từng năn nỉ ỉ ôi với mẹ rằng mình rất muốn có phòng ngủ riêng, dù bé tí cũng không sao. Năm lên 8, cuối cùng mình cũng có một căn phòng riêng như mơ ước. Nhưng mình chẳng ngờ được, mẹ lại hào phòng cho mình ở phòng lớn nhất nhà, còn nằm ngay trước mặt tiền, mà mình thì đã quen ở phòng nhỏ nên cảm thấy rất không an toàn. Thế là mình thường chui vào mấy góc nhỏ nhỏ trong phòng ngồi, đặc biệt là những lúc ngẫm nghĩ, nghe nhạc hay xem phim. Mình an tâm, thoải mái khi một mình trú tại cái Góc nhỏ riêng tư của bản thân.</p>

            <p>Mình hay có thói quen viết review và ghi lại những mẫu chuyện vụn vặt xảy ra trong ngày, chẳng hạn như khi nghe một bài hát, đọc một mẫu chuyện, xem một bộ phim. Dù vui hay buồn, mình đều muốn viết bừa gì đó. Nhưng mình chẳng có can đảm để đăng lên mạng xã hội hay chia sẻ cùng ai. Đó cũng là lý do vì sao mình lập cái Blog này từ hồi xưa lắc xưa lơ nhưng chưa bao giờ để công khai.</p>

            <p>Hôm trước mình tình cờ đọc lại trang nhật ký cũ: “Mình bỗng nhận ra rằng nếu muốn mọi thứ đến với mình thì cần chủ động hơn, mở lòng và chia sẻ. Nếu cứ đóng mãi cánh cửa ấy thì cuộc đời mình sẽ trôi qua trong lãng quên.” Có lẽ hồi đó, mình đã ngộ ra được, nhưng chưa đủ dũng khí để mở cánh cửa đó chăng?</p>

            <p>Thế nên, với tất cả can đảm vốn có, mình lập nên ngôi nhà nhỏ này để viết và chia sẻ những điều mình luôn muốn tỏ bày. Cảm ơn bạn đã lựa chọn lắng nghe những câu chuyện nhỏ và dòng tâm sự của mình. Cảm ơn gấp bội nếu bạn thấy bản thân trong đó. Và xin bạn đừng quên, mình cũng muốn nghe câu chuyện của bạn. Gửi confession cho mình tại đường link này: 
            <Link to = '/status'>Share_Confession_with_Nhat.dang</Link></p>

            <p>Nếu ưa thích những bài viết của mình, ghé đọc thêm những bài viết khác trên trang fanpage này bạn nhé: Góc nhỏ của Annie</p>
        </form>
    </div>
</section>
  )
}
