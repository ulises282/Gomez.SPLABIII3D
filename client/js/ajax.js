const URL = "http://localhost:3000/heroes";

const $loader = document.getElementById("loader-section");

export const create = (data) => {
  $loader.style.display = "flex";

  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);

        console.log(data);
      } else {
        console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
      }
      $loader.style.display = "none";
    }
  });
  xhr.open("POST", URL);
  xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify(data));
};

export const deleteObj = (id) => {
  $loader.style.display = "flex";

  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
      } else {
        console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
      }
      $loader.style.display = "none";
    }
  });
  xhr.open("DELETE", URL + "/" + id);
  xhr.send();
};


export const update = (data) => {
  $loader.style.display = "flex";

  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);

        console.log(data);
      } else {
        console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
      }
      $loader.style.display = "none";
    }
  });
  xhr.open("PUT", URL + "/" + data.id);
  xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
  xhr.send(JSON.stringify(data));
};