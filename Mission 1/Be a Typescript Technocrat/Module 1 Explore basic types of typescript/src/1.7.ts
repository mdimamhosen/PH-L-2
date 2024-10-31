{
  // spread operator
  // rest operator
  // destructuring
  // Spread operator
  const numbers = [1, 2, 3, 4, 5];
  const [first, second, ...rest] = numbers;
  console.log(first); // 1
  console.log(second); // 2
  console.log(rest); // [3, 4, 5]

  const mentors = {
    daniel: "Daniel",
    irina: "Irina",
    gordon: "Gordon",
    juan: "Juan",
  };
  const newMentors = {
    "daniel 1": "Daniel San",
    "irina 1": "Irina 1",
    "gordon 1": "Gordon 1",
    "juan 1": "Juan 1",
  };

  const allMentors = { ...mentors, ...newMentors };
  // Destructuring objects
  const user = {
    name: "Daniel",
    age: 26,
    balance: 0,
  };
  const { name, age, balance } = user;
  console.log(name); // Daniel
  console.log(age); // 26
  console.log(balance); // 0

  //   rest operator

  const greetFriends = (...friends: string[]): void => {
    console.log(friends);
    friends.forEach((friend: string) => console.log(friend));
  };

  greetFriends("Daniel", "Irina", "Gordon", "Juan");
}
