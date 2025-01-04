import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' 
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados SQLite foi bem-sucedida!');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

testConnection();

export const Produto = sequelize.define('Produto', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false, 
    },
    disponivel: {
      type: DataTypes.BOOLEAN, 
      allowNull: false, 
    },
  });

  try {
    
    await sequelize.sync({ force: false }); 
    console.log('Banco de dados sincronizado com sucesso!');
  } catch (error) {
    console.error('Erro ao sincronizar banco de dados:', error);
  }
export default sequelize
