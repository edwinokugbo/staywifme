// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import GoogleMapReact from "google-map-react";

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
              Purpose Thoughts Project
            </div>
            <div className="mb-1">
              <span className="text-orange-800 font-bold">Phone:</span>{" "}
              090977702991, 08030000000
            </div>
            <div className="mb-1">
              <span className="text-orange-800 font-bold">Email:</span>{" "}
              contact@Purpose Thoughts.com
            </div>
            <div className="mb-1">
              <span className="text-orange-800 font-bold">Facebook:</span>{" "}
              <a
                href="https://facebook.com/Purpose Thoughts"
                target="_blank"
                rel="noreferrer"
              >
                https://facebook.com/Purpose Thoughts
              </a>
            </div>
            <div className="mb-1">
              <span className="text-orange-800 font-bold">Twitter:</span>{" "}
              <a
                href="https://twitter.com/Purpose Thoughts"
                target="_blank"
                rel="noreferrer"
              >
                https://twitter.com/Purpose Thoughts
              </a>
            </div>
            <div className="mb-1">
              <span className="text-orange-800 font-bold">Instagram:</span>{" "}
              <a
                href="https://instagram.com/Purpose Thoughts"
                target="_blank"
                rel="noreferrer"
              >
                @Purpose Thoughts
              </a>
            </div>
            <div className="mb-1">
              <span className="text-orange-800 font-bold">Youtube:</span>{" "}
              <a
                href="https://youtube.com/Purpose Thoughts"
                target="_blank"
                rel="noreferrer"
              >
                https://youtube.com/Purpose Thoughts
              </a>
            </div>
          </p>
        </div>
        <div className="contact__box--right">
          {/* <Map
            google={props.google}
            zoom={12}
            style={mapStyles}
            initialCenter={{ lat: 6.6039262, lng: 3.3327518 }}
          >
            <Marker
              position={{ lat: 6.615570827198901, lng: 3.3761745839766446 }}
            />
          </Map> */}
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={'center'}
            defaultZoom={'yes'}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            {/* <
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            /> */}
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
}

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyD92udZaH8WPWsFj9NmZYeghlMFl0Nentg",
// })(Contact);

export default Contact;
