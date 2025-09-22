import dados from "./../models/dados.js";

const { podcasts } = dados;

const getAllPodcasts = (req, res) => {
  let resultado = podcasts;

  const { tema, plataforma, frequencia, duracao } = req.query;

  if (tema) {
    resultado = resultado.filter(
      (p) => p.tema.toLowerCase() === tema.toLowerCase()
    );
  }

  if (plataforma) {
    resultado = resultado.filter(
      (p) => p.plataforma.toLowerCase() === plataforma.toLowerCase()
    );
  }

  if (frequencia) {
    resultado = resultado.filter(
      (p) => p.frequencia.toLowerCase() === frequencia.toLowerCase()
    );
  }

  let curtos = [];
  let medios = [];
  let longos = [];

  for (let i = 0; i < duracao.length; i++) {
    if (duracao[i] < 30) {
      duracao[i].push(curtos);
    } else if (duracao[i] >= 30 && duracao[i] <= 60) {
      duracao[i].push(medios);
    } else {
      duracao[i].push(longos);
    }
  }

  if (curtos) {
    
  }


  res.status(200).json({
    total: resultado.length,
    podcasts: resultado,
  });
};

const getPodcastsById = (req, res) => {
  const id = parseInt(req.params.id);

  const podcast = podcasts.find((p) => p.id === id);

  if (podcast) {
    res.status(200).json(podcast);
  } else {
    res.status(404).json({
      success: false,
      message: `Podcast com o id: ${id} não encontrado`,
    });
  }
};

const createPodcast = (req, res) => {
  const {
    nome,
    apresentadores,
    tema,
    episodios,
    duracao,
    plataforma,
    frequencia,
    ativo,
  } = req.body;

  if (!nome) {
    return res.status(400).json({
      success: false,
      message: "O campo 'nome' é obrigatório",
    });
  }

  if (!apresentadores) {
    return res.status(400).json({
      success: false,
      message: "O campo 'apresentadores' é obrigatório",
    });
  }

  if (!tema) {
    return res.status(400).json({
      success: false,
      message: "O campo 'tema' é obrigatório",
    });
  }

  if (!episodios) {
    return res.status(400).json({
      success: false,
      message: "O campo 'episodios' é obrigatório",
    });
  }

  if (!duracao) {
    return res.status(400).json({
      success: false,
      message: "O campo 'duracao' é obrigatório",
    });
  }

  if (!plataforma) {
    return res.status(400).json({
      success: false,
      message: "O campo 'plataforma' é obrigatório",
    });
  }

  if (!frequencia) {
    return res.status(400).json({
      success: false,
      message: "O campo 'frequencia' é obrigatório",
    });
  }

  if (!ativo) {
    return res.status(400).json({
      success: false,
      message: "O campo 'ativo' é obrigatório",
    });
  }

  if (duracao < 30) {
    return res.status(400).json({
      success: false,
      message: "A duração média do episódio deve ser maior que 15 minutos!",
    });
  }

  if (episodios < 0) {
    return res.status(400).json({
      success: false,
      message: "O número de epsiódios não pode ser negativo!",
    });
  }

  const novoPodcast = {
    id: podcasts.length + 1,
    nome,
    tema,
    apresentadores,
    episodios,
    duracao,
    plataforma,
    frequencia,
    ativo,
  };

  podcasts.push(novoPodcast);

  res.status(200).json({
    success: true,
    message: "Podcast cadastrado com sucesso!",
    podcast: novoPodcast,
  });
};

const deletePodcast = (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "O id deve ser válido",
    });
  }

  const idParaApagar = parseInt(id);

  const podcastParaRemover = podcasts.find((p) => p.id === idParaApagar);

  if (!podcastParaRemover) {
    return res.status(404).json({
      success: false,
      message: "Podcast com o id não existe",
    });
  }

  const podcastFiltrado = podcasts.filter((p) => p.id !== id);
  console.log(podcastFiltrado);

  podcasts.splice(0, podcasts.length, ...podcastFiltrado);

  return res.status(200).json({
    success: true,
    message: "O podcast foi removido com sucesso!",
    podcastDeletado: podcastParaRemover,
  });
};

const updatePodcast = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    nome,
    apresentadores,
    tema,
    episodios,
    duracao,
    plataforma,
    frequencia,
    ativo,
  } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "O id deve ser válido",
    });
  }

  const podcastExiste = podcasts.find((p) => p.id === id);

  if (!podcastExiste) {
    return res.status(404).json({
      success: false,
      message: "O Podcast não existe",
    });
  }

  if (duracao < 30) {
    return res.status(400).json({
      success: false,
      message: "A duração média do episódio deve ser maior que 15 minutos!",
    });
  }

  if (episodios < 0) {
    return res.status(400).json({
      success: false,
      message: "O número de epsiódios não pode ser negativo!",
    });
  }

  const podcastsAtualizados = podcasts.map((p) =>
    p.id === id
      ? {
          ...p,
          ...(nome && {
            nome,
          }),
          ...(apresentadores && {
            apresentadores,
          }),
          ...(tema && {
            tema,
          }),
          ...(episodios && {
            episodios,
          }),
          ...(duracao && {
            duracao,
          }),
          ...(plataforma && {
            plataforma,
          }),
          ...(frequencia && {
            frequencia,
          }),
          ...(ativo && {
            ativo,
          }),
        }
      : p
    );

    podcasts.splice(0, podcasts.length, ...podcastsAtualizados);

    const podcastAtualizado = podcasts.find((p) => p.id === id);

    res.status(200).json({
        success: true,
        message: "Podcast atualizado com sucesso",
        podcast: podcastAtualizado,
      });
};

export { getAllPodcasts, getPodcastsById, createPodcast, deletePodcast, updatePodcast };
