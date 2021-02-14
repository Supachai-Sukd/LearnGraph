const { GraphQLServer } = require('graphql-yoga');
const { v4: uuidv4 } = require('uuid')

const users = [
  {
    id: '1',
    name: 'John',
    age: '20',
    location: {
      state: 'Bangkok',
      city: 'Chitlom'
    }
  },
  {
    id: '2',
    name: 'Doe',
    age: '19',
    location: {
      state: 'Bangkok',
      city: 'Chitlom'
    }
  },
  {
    id: '3',
    name: 'Humyai',
    age: '99',
    location: {
      state: 'Bangkok',
      city: 'Chitlom'
    }
  }
]
  



//กำหนด Schema ของ GraphQL
//การใส่ตกใจข้างหลังคือเป็นการกำหนดว่าเท่านั้น
//array ก็กำหนดเป็น int เท่านั้น และ return array เท่านั้นไม่ให้ null
//Object ต้องสร้างเป็น Custom type ขึ้นมาในที่นี้คือ Location
//ตรง type User ถ้าจะ Query id ด้วยต้องใส่ id ไปด้วยไม่งั้นเรียกไม่ได้
//Mutation คือ การเพิ่ม ลบ แก้ไข
const typeDefs = `
  type Query {
    name: String!
    age: Int!
    isSingle: Boolean
    number: [Int!]!
    location: Location
    users: [User!]!
  }

  type Location {
    state: String!
    city: String!
  }

  type User {
    id: ID!
    name: String!
    age: Int!
    location: Location
  }

  type Mutation {
    addUser(name: String!, age: Int!): [User!]!
  }

`

const resolvers = {
  Query: {
    name() {
      return 'Supachai';
    },
    age() {
      return 31;
    },
    isSingle() {
      return null
    },
    number() {
      return [10, 20, 30, 40, 50]
    },
    location() {
      return {
        state: 'Samutprakan',
        city: 'Paknam'
      }
    },
    users() {
      return users;
    }
  },
  Mutation: {
    addUser(parent, args, ctx, info) {
      const { name, age } = args;

      users.push({
        id: uuidv4(),
        name,
        age
      })

      return users
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

const options = {
  port: 4000,
  endpoint: '/graphql'
}


server.start(options, ({ port }) => {
  console.log(`Server start on ${port}`);
})