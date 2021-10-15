export default function listarRepositorios(usuario){
  // event.preventDefault();
  const url = `https://api.github.com/users/${usuario}/repos`;
  console.log(url)
  return fetch(url)
  .then(resposta =>{
    return resposta.json();
  }).then(resposta=>{
    console.log(resposta)
  })
}