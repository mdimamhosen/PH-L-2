// Name aliasing and destructuring assignment
{
  const user = {
    age: 26,
    address: "Tokyo",
    name: {
      first: "Taro",
      last: "Yamada",
    },
    contactInfo: "090-1234-5678",
  };

  const {
    age,
    name: { first: firstName },
  } = user;
  console.log(age); // 26
  console.log(firstName); // Taro

  //   Array destructuring

  const myFriends = ["Alice", "Bob", "Charlie"];
  const [a, b, c] = myFriends;
  console.log(a); // Alice
  console.log(b); // Bob
  console.log(c); // Charlie

  const people = ["Alice", "Bob", "Charlie", "Dave", "Eve"];
  const [, , bestFriend, ...friends] = people;
  console.log(bestFriend); // Charlie
  console.log(friends); // [ 'Dave', 'Eve' ]
}
