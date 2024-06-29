import css from "./AboutUs.module.css";

export function AboutUs() {
  return (
    <div>
      <h1 className="text-center">About Retrowares</h1>
      <div className="text-center my-5 mw-100">
        <img src="/images/arcadebg.jpg" className={css.AboutImage} />
      </div>

      <p>
        Retrowares is your ultimate destination for classic gaming treasures.
        Our passion for preserving the golden era of video games drives us to
        offer a meticulously curated selection of vintage titles from iconic
        platforms like PC-98, NES, Commodore 64, and Apple II. Whether you're a
        seasoned collector or a newcomer eager to experience the magic of retro
        gaming, we provide high-quality, well-maintained products and expert
        knowledge to ensure every item meets our high standards. Our mission is
        to bring the joy of retro gaming to enthusiasts everywhere, offering a
        seamless shopping experience and exceptional customer service.
      </p>
      <p>
        Retrowares is more than just an ecommerce site; it's a community of
        like-minded individuals who share a love for classic games. Join us on
        social media to stay updated on the latest arrivals, exclusive offers,
        and retro gaming news. Thank you for choosing Retrowares—let's keep
        celebrating the games that started it all!
      </p>
      <div className="text-center my-5 mw-100">
        <img src="/images/citybg.png" className={css.AboutImage} />
      </div>

      <p>
        Unfortunately, as this website is a demo, none of the products are
        actually on sale (I'm sorry!), so please check out <a href="https://www.mobygames.com/">MobyGames</a>, from which most of
        the details on the games presented here was taken.
      </p>
    </div>
  );
}
