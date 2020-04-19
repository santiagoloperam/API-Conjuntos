var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        user(email: String!): User
        login(email: String!, password: String!): User
        users(tipo_usuario: String!): [User]
    },
    type Mutation {
        updateUserActive(email: String!, active: Boolean!): User
    }
    type User {
        id: Int
        name: String
        last_name: String
        email: String
        dni: String
        telefono: String
        password: String
        active: String
        tipo_usuario: Int
    }
`);
var usersData = [
    {
        id: 1,
        name: 'Carlos',
        last_name: 'Jaramillo',
        email: 'carlosjara@gmail.com',
        dni: '789654321',
        telefono: '111111111',
        password: '123456',
        active: true,
        tipo_usuario: 2
    },
    {
        id: 2,
        name: 'Ana Maria',
        last_name: 'Brad Traversy',
        email: 'anabrad@gmail.com',
        dni: '654987789',
        telefono: '22222222',
        password: '123456',
        active: true,
        tipo_usuario: 2
    },
    {
        id: 3,
        name: 'Javier',
        last_name: 'Alicea',
        email: 'javiali@gmail.com',
        dni: '123321123',
        telefono: '3333333',
        password: '123456',
        active: true,
        tipo_usuario: 3
    }
]
var getUser = function(args) { 
    var email = args.email;
    return usersData.filter(user => {
        return user.email == email;
    })[0];
}
var login = function({email, pass}) { 
    usersData.map(user => {
         if (user.email == email && user.password == pass);
         return user;
    });
    return usersData.filter(user => user.email === email) [0];
}
var getUsers = function(args) {
    if (args.active) {
        var active = args.active;
        return usersData.filter(user => user.active === active);
    } else {
        return usersData;
    }
}
var updateUserActive = function({email, active}) {
    usersData.map(user => {
        if (user.email === email) {
            user.active = active;
            return user;
        }
    });
    return usersData.filter(user => user.email === email) [0];
}
var root = {
    user: getUser,
    login: login,
    users: getUsers,
    updateUserActive: updateUserActive
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));