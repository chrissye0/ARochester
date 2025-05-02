const checkIfLocal = (latitude, longitude) => {
  const radius = 1000; // radius in meters
  const distance = Math.hypot(latitude - latitude, longitude - longitude); 
  //For Roco event allows them to be accessed wherever they are. will always be distance 0

  if(distance<=radius){

      const place = {
          name: "Template Location",
          latitude: latitude,
          longitude: longitude
      };

      // alert("In Range!! Loading poster");
      loadPlaces(place);

  }else{

      console.error("Not within Radius");
      alert("Too far from location. Experience Will not load");
  }
}

const loadPlaces = (place) => {
  const scene = document.querySelector("a-scene");

  const entity = document.createElement("a-entity");
  const plane = document.createElement('a-box');

  plane.setAttribute('material', 'src: #poster;');
  plane.setAttribute('position', '0 2 0'); 
  plane.setAttribute('depth', '0.05'); // adds thickness

  plane.setAttribute('class', 'clickable'); // Enables raycaster detection

  plane.setAttribute('width', '6');
  plane.setAttribute('height', '6');
  plane.setAttribute('rotation', '0 0 0');

  plane.setAttribute('look-at', '[gps-camera]');

  entity.appendChild(plane);
  scene.appendChild(entity);

  entity.setAttribute("position", "0 1.5 -6"); 

  // plane.addEventListener("click", () => alert(`You clicked on: ${place.name}`));

  plane.addEventListener("click", () => {
      plane.setAttribute('animation', {
      property: 'rotation',
      to: '0 1080 0', // 3 full spins
      dur: 3000,
      easing: 'easeOutElastic',
      loop: false
      });

      // Reset to original rotation after animation
      setTimeout(() => {
      plane.setAttribute('rotation', '0 0 0');
      plane.removeAttribute('animation');
      }, 3100); // slight buffer after animation ends
  });
  // alert("Poster loaded");
};

window.onload = () => {
  navigator.geolocation.getCurrentPosition(
      (position) => {
          const { latitude, longitude } = position.coords;
          checkIfLocal(latitude, longitude);
      },
      (error) => {
          console.error("Geolocation error:", error);
          alert("Failed to get location. Please enable location services.");
      }
  );
};

// const checkIfLocal = (latitude, longitude) => {
//   const radius = 1000; // radius in meters
//   const distance = Math.hypot(latitude - latitude, longitude - longitude); //change 2nd lat long pair to other locations later------------

//   if(distance<=radius){

//     const place = {
//           name: "Template Location",
//           latitude: latitude,
//           longitude: longitude
//       };

//     // alert("In Range!! Loading poster");
//     loadPlaces(place);

//   }else{

//       console.error("Not within Radius");
//       alert("Might need to be a bit closer!");
//   }
// }

// const loadPlaces = (place) => {
//   const scene = document.querySelector("a-scene");

//   // places.forEach(place => {
//       const entity = document.createElement("a-entity");
//       const plane = document.createElement('a-box');

//       plane.setAttribute('material', 'src: #sentinel;');
//       plane.setAttribute('position', '0 2 0'); 
//       plane.setAttribute('depth', '0.05'); // adds thickness

//       plane.setAttribute('class', 'clickable'); // Enables raycaster detection

//       plane.setAttribute('width', '6');
//       plane.setAttribute('height', '6');
//       plane.setAttribute('rotation', '0 0 0');

//       plane.setAttribute('look-at', '[gps-camera]');

//       entity.appendChild(plane);
//       scene.appendChild(entity);

//       entity.setAttribute("position", "0 1.5 -6"); 

//       // plane.addEventListener("click", () => alert(`You clicked on: ${place.name}`));

//       plane.addEventListener("click", () => {
//         plane.setAttribute('animation', {
//           property: 'rotation',
//           to: '0 1080 0', // 3 full spins
//           dur: 3000,
//           easing: 'easeOutElastic',
//           loop: false
//         });
  
//         // Reset to original rotation after animation
//         setTimeout(() => {
//           plane.setAttribute('rotation', '0 0 0');
//           plane.removeAttribute('animation');
//         }, 3100); // slight buffer after animation ends
//       });



//       alert("Poster loaded");
//   // });
// };

// window.onload = () => {
//   navigator.geolocation.getCurrentPosition(
//       (position) => {
//           const { latitude, longitude } = position.coords;
//           checkIfLocal(latitude, longitude);
//       },
//       (error) => {
//           console.error("Geolocation error:", error);
//           alert("Failed to get location. Please enable location services.");
//       }
//   );
// };