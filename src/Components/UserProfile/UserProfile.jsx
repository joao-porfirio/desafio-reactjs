import React, { useState, useEffect } from 'react';
import '../../css/style.css';
import Card from '../Card/Card';
import axios from 'axios';
import moment from 'moment';

const UserProfile = (props) => {
	const [repositorios, setRepositorios] = useState([]);
	const [informacoes, setInformacoes] = useState([]);

	useEffect(() => {
		const getData = async () => {
			await axios.get(`https://api.github.com/users/${props.match.params.name}/repos`)
				.then((response) => {
					setRepositorios(response.data)
					console.log(response.data)
				}).catch(() => {
					console.log('err')
				})
		}
		getData()
	}, [props])

	useEffect(() => {
		const getUser = () => {
			axios.get(`https://api.github.com/users/${props.match.params.name}`)
				.then((response) => {
					setInformacoes(response.data)
					document.title = `Usuário(a) ${response.data.name}`
				}).catch(() => {
					alert("Usuário não encontrado ...");
					setTimeout(() => {
						window.location=`/`;
					}, 100);
				})
		}
		getUser()
	}, [props])

	const goHome = () => {
		window.location = "/";
	}

	const translate = (texto) => {
		if (texto.includes("a year")) texto = texto.replaceAll("a year", "um ano");
		if (texto.includes("year")) texto = texto.replaceAll("year", "ano");
		if (texto.includes("years")) texto = texto.replaceAll("years", "anos");
		if (texto.includes("ago")) texto = texto.replaceAll("ago", "atrás");
		if (texto.includes("months")) texto = texto.replaceAll("months", "meses");
		if (texto.includes("month")) texto = texto.replaceAll("month", "mês");
		return texto
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
					<h1 className="user__legend">Clique nos repositórios para ver no Github</h1>
					{repositorios.map((repositorios, key) => {
						return (
							<Card
								key={key}
								title={repositorios.name}
								link={repositorios.html_url}
								descricao={repositorios.key}
								stars={repositorios.stargazers_count}
								update={'Modificado ' + translate(moment(repositorios.updated_at, "YYYYMMDD").fromNow())}
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
