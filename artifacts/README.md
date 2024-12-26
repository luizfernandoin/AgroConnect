# Artefatos do Projeto

## Diagrama Entidade-Relacionamento (DER)

![Diagrama Entidade-Relacionamento](Diagrama%20Entidade-Relacionamento.png)

## Modelo Lógico

- Usuario (id, email, nome, foto, telefone, latitude, longitude, senha)
- Produtor (tipo_producao, avaliacao, descricao)
- Candidaturas (id_usuario, id_oportunidade, data)
- Oportunidade (id, titulo, descricao, tipo, latitude, longitude, dt_inicio, dt_fim, valor, id_produtor, dt_publicacao)
- Produto (id, nome, descricao, categoria, preco, uni_medida, quantidade, imagem, status, id_produtor)
- Proposta (id, oferta, quantidade, status, id_produto, id_cliente, dt_proposta, id_carrinho)
- AvaliaProduto (id_usuario, idProduto, comentario)
- AvaliaUsuario (id_avaliador, id_avaliado, comentario)

