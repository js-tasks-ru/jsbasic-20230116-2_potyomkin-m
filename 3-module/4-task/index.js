function showSalary(users, age) {

  // let res = '';

  // users.forEach(user => {
  //   if (user.age <= age) {
  //     res += `${user.name}, ${user.balance}\n`; 
  //   }
  // });

  // return res.slice(0, -1);

  return users.filter((user) => user.age <= age).map(user => `${user.name}, ${user.balance}`).join('\n');
  

}
