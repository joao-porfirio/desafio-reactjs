import React, {useState} from 'react';
import '../../css/reset.css';
import '../../css/style.css';
const Search = () => {
  const [usuarioConsulta, setUsuarioConsulta] = useState("");
  const [usuario, setUsuario] = useState({
    nome:"",
    id:"",
    localizacao:"",
    url:"",
    foto:"",
    seguidores:"",
    seguindo:"",
    login:""
  });
  const buscarUsuario = (event) =>{
    event.preventDefault();
    const url = `https://api.github.com/users/${usuarioConsulta}`;
    console.log(url)
    return fetch(url)
    .then(resposta =>{
      return resposta.json();
    }).then(resposta=>{
      setUsuario(usuario.nome = resposta.name);
      setUsuario(usuario.id = resposta.id);
      setUsuario(usuario.localizacao = resposta.location);
      setUsuario(usuario.url = resposta.name);
      setUsuario(usuario.foto = resposta.avatar_url);
      setUsuario(usuario.seguidores = resposta.followers);
      setUsuario(usuario.seguindo = resposta.following);
      setUsuario(usuario.login = resposta.login);
      window.location=`/${usuario.login}`;
    })
  }

  return (
    <main className="main">
      <article className="main__container">
        <h3 className="main__titulo">Search Devs</h3>
        <form 
          onSubmit={(event)=>{buscarUsuario(event.target)}} className="main__form"
        >
          <input onChange={(event) =>{setUsuarioConsulta(event.target.value)}} 
            value={usuarioConsulta} 
            type="search" 
            placeholder="Pesquisar Dev..." 
            name="search"
          />
          <button onClick={buscarUsuario} className="main__button" type="submit"><i className="fa fa-search"></i>Buscar</button>
        </form>       
      </article>
    </main>
  )
}

export default Search
