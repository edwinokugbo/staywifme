const mapStyles = {
  width: "50%",
  height: "50%",
};

function Contact(props) {
  return (
    <div className="page__body1 w-full lg:w-[50%] mx-auto min-h-screen">
      <div className="contact__box">
        <div className="contact__box--left">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <hr className="my-5" />
          <p>
            <div className="text-lg font-bold mb-2">
              staywifme_official Project
            </div>
            <div className="mb-1">
              <span className="text-orange-800 font-bold">Phone:</span>{" "}
              090977702991, 08030000000
            </div>
            <div className="mb-1">
              <span className="text-orange-800 font-bold">Email:</span>{" "}
              contact@staywifme_official.com
            </div>
            <div className="mb-1">
              <span className="text-orange-800 font-bold">Facebook:</span>{" "}
              <a
                href="https://facebook.com/staywifme_official"
                target="_blank"
                rel="noreferrer"
              >
                https://facebook.com/staywifme_official
              </a>
            </div>
            <div className="mb-1">
              <span className="text-orange-800 font-bold">Twitter:</span>{" "}
              <a
                href="https://twitter.com/staywifme_official"
                target="_blank"
                rel="noreferrer"
              >
                https://twitter.com/staywifme_official
              </a>
            </div>
            <div className="mb-1">
              <span className="text-orange-800 font-bold">Instagram:</span>{" "}
              <a
                href="https://instagram.com/staywifme_official"
                target="_blank"
                rel="noreferrer"
              >
                @staywifme_official
              </a>
            </div>
            <div className="mb-1">
              <span className="text-orange-800 font-bold">Youtube:</span>{" "}
              <a
                href="https://youtube.com/staywifme_official"
                target="_blank"
                rel="noreferrer"
              >
                https://youtube.com/staywifme_official
              </a>
            </div>
          </p>
        </div>
        <div className="contact__box--right">Coming Soon...</div>
      </div>
    </div>
  );
}

export default Contact;
