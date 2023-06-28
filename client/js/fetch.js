const URL = "http://localhost:3000/heroes"; //

const $loader = document.getElementById("loader-section");

export const getObjetos = async () => {
  try {
    $loader.style.display = "flex";
    let res = await fetch(URL);
    if (!res.ok) throw Error(`Error: ${res.status} - ${res.statusText}`);

    let data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  } finally {
    $loader.style.display = "none";
  }
};