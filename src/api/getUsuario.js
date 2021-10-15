export default function buscarUsuario(usuario){
  const url = `https://api.github.com/users/${usuario}`;
  console.log(url)
  return fetch(url)
  .then(resposta =>{
    return resposta.json();
  })
}