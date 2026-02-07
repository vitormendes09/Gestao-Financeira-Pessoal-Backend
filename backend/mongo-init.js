// Script de inicialização do MongoDB
db = db.getSiblingDB('financial_management');

// Criar índices
db.createCollection('users');
db.createCollection('transactions');

print('MongoDB inicializado com sucesso!');