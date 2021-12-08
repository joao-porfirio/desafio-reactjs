import React, {useState, useEffect} from 'react';
import '../../css/style.css';
import Card from '../Card/Card';
import axios from 'axios';
import moment from 'moment';

const UserProfile = (props) => {
  const [repositorios, setRepositorios] = useState([]);
  const [informacoes, setInformacoes] = useState([]);
  
  useEffect(() => {
    const getData = async ()=>{
      await axios.get(`https://api.github.com/users/${props.match.params.name}/repos`)
      .then((response)=>{
        setRepositorios(response.data)
      }).catch(()=>{
        console.log('err')
      })
    }
    getData()
  }, [props])

  useEffect(() => {
    const getUser = ()=>{
      axios.get(`https://api.github.com/users/${props.match.params.name}`)
      .then((response)=>{
        setInformacoes(response.data)
        document.title = `${response.data.name}`
      }).catch(()=>{
        console.log('err')
      })
    }
    getUser()
  }, [props])

  const goHome = () =>{
    window.location = "/";
  }
  return (
    <section className="user">
      <section className="user__container">
        <article className="user__profile profile">
          <img className="profile__photo" src={informacoes.avatar_url} alt="" />
            <div className="profile__info">
              <h1 className="profile__nome">{informacoes.name}</h1>
              <p className="profile__login">@{informacoes.login}</p>
              <p className="profile__bio">{informacoes.bio}</p>
              <div className="profile__icons">
                <span className="profile__followers">{informacoes.followers} seguidores</span>
                <span className="profile__following">{informacoes.following} seguindo</span>
              </div>
              <div className="profile__social-media">
                <span className="profile__organization">{informacoes.company}</span>
                <span className="profile__location">{informacoes.location}</span>
                <span className="profile__email">{informacoes.email}</span>
                <span className="profile__link">{informacoes.blog}</span>
                <span className="profile__twitter">{informacoes.twitter_username}</span>
              </div>
            </div>
          <button className="button-back" onClick={goHome}>Voltar</button>
        </article>
        <article className="user__repository">
          {repositorios.map((repositorios, key)=>{
            return(
              <Card
                key={key}
                title={repositorios.name}
                descricao={repositorios.key}
                stars={repositorios.stargazers_count}
                update={'Updated '+ moment(repositorios.updated_at, "YYYYMMDD").fromNow()}
              />
            )
          })}
          <button className="button-back-mobile" onClick={goHome}>Voltar</button>
        </article>
      </section>
    </section>
  )
}

export default UserProfile
