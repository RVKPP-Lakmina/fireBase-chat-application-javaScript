import React from "react";

const Center = ({toTheEndRef}) => {
  return (
    <div className="center">
      <div className="message">
        <img
          src="/avatar.png"
          alt="user-avatar-image"
          name="user-avatar-img-icon"
        />
        <div className="text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsa
            cum modi laboriosam, minima voluptate qui illo doloremque
            voluptatibus iusto labore perspiciatis nostrum debitis! Similique et
            quo placeat expedita dolorem?
          </p>
          <span>1 min ago</span>
        </div>
      </div>
      <div className="message own">
        <div className="text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsa
            cum modi laboriosam, minima voluptate qui illo doloremque
            voluptatibus iusto labore perspiciatis nostrum debitis! Similique et
            quo placeat expedita dolorem?
          </p>
          <span>1 min ago</span>
        </div>
      </div>
      <div className="message">
        <img
          src="/avatar.png"
          alt="user-avatar-image"
          name="user-avatar-img-icon"
        />
        <div className="text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsa
            cum modi laboriosam, minima voluptate qui illo doloremque
            voluptatibus iusto labore perspiciatis nostrum debitis! Similique et
            quo placeat expedita dolorem?
          </p>
          <span>1 min ago</span>
        </div>
      </div>
      <div className="message own">
        <div className="text">
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Ford_Mustang_FR500GT_Nr22_Oschersleben2008.jpg"
            alt="text-image"
            name="text-img-icon"
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsa
            cum modi laboriosam, minima voluptate qui illo doloremque
            voluptatibus iusto labore perspiciatis nostrum debitis! Similique et
            quo placeat expedita dolorem?
          </p>
          <span>1 min ago</span>
        </div>
      </div>
      <div className="message">
        <img
          src="/avatar.png"
          alt="user-avatar-image"
          name="user-avatar-img-icon"
        />
        <div className="text">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Ford_Mustang_FR500GT_Nr22_Oschersleben2008.jpg"
            alt="text-image"
            name="text-img-icon"
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsa
            cum modi laboriosam, minima voluptate qui illo doloremque
            voluptatibus iusto labore perspiciatis nostrum debitis! Similique et
            quo placeat expedita dolorem?
          </p>
          <span>1 min ago</span>
        </div>
      </div>
      <div ref={toTheEndRef}></div>
    </div>
  );
};

export default React.memo(Center);
