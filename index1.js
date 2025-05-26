
async function Main(){
 const data = "https://www.w3schools.com/js/js_maps.asp"
  const links = await fetch(data)
  console.log(links)
}
Main()