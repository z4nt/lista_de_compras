import sequelize ,{ Produto } from '../models/model.js';
import PDFDocument from 'pdfkit'


export const criarProduto = async (req, res) => {
  try {
    const { nome, descricao, valor, disponivel } = req.body;
    const novoProduto = await Produto.create({
      nome,
      descricao,
      valor,
      disponivel: disponivel === 'Sim' ? true : false,
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};


export const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
};

export const obterProdutoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter produto:', error);
    res.status(500).json({ error: 'Erro ao obter produto' });
  }
};

export const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, valor, disponivel } = req.body;
    const produto = await Produto.findByPk(id);
    if (produto) {
      produto.nome = nome;
      produto.descricao = descricao;
      produto.valor = valor;
      produto.disponivel = disponivel === 'Sim' ? true : false;
      await produto.save();
      res.status(200).json(produto);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};


export const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);
    if (produto) {
      await produto.destroy();
      res.status(200).json({ message: 'Produto deletado com sucesso' });
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};

export const baixarPdf = async (req, res) => {
  try{
    const produtos = await Produto.findAll()
    const doc = new PDFDocument()
    let filename = 'produtos.pdf'
    filename = encodeURIComponent(filename);

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)

    doc.text('Listagem de Produtos', { align: 'center' })
    doc.moveDown()

    produtos.forEach(produtos => {
      doc.text(`Produto: ${produtos.nome}  Descricao: ${produtos.descricao}  Valor: ${produtos.valor}  Disponivel: ${produtos.disponivel ? 'sim' : 'não'}`)
      doc.moveDown()
    })
    doc.pipe(res)
    doc.end()

  }catch (error){
    console.error('Erro ao gerar pdf:', error)
    res.status(500).send('erro ao gerar PDF')
  }
}
